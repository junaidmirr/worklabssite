import Mailjet from 'node-mailjet';

export default async function handler(req, res) {
  // Handle CORS for local dev just in case
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, business, service, budget, message, turnstileToken } = req.body;

    // Validate required fields
    if (!name || !email || !service || !message || !turnstileToken) {
      return res.status(400).json({ error: 'Please provide all required fields, including CAPTCHA verification.' });
    }

    // Verify Cloudflare Turnstile token
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecretKey) {
      const formData = new URLSearchParams();
      formData.append('secret', turnstileSecretKey);
      formData.append('response', turnstileToken);

      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const turnstileResult = await turnstileResponse.json();
      
      if (!turnstileResult.success) {
        console.warn('CAPTCHA validation failed:', turnstileResult);
        return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
      }
    } else {
      console.warn('Warning: TURNSTILE_SECRET_KEY is not set. Skipping CAPTCHA validation.');
    }

    // Initialize Mailjet client
    const mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_SECRET_KEY
    });

    const senderEmail = process.env.MAILJET_SENDER_EMAIL || 'support@worklabs.studio';

    // Construct Mailjet request payload
    const request = mailjet.post("send", { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: "Work Labs Website"
          },
          To: [
            {
              Email: senderEmail,
              Name: "Work Labs Support"
            }
          ],
          ReplyTo: {
            Email: email,
            Name: name
          },
          Subject: `New Lead: ${name} (${service})`,
          HTMLPart: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Business Name:</strong> ${business || 'Not provided'}</p>
            <p><strong>Service Requested:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <hr />
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        }
      ]
    });

    await request;
    
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email via Mailjet:', error.statusCode || error, error.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
