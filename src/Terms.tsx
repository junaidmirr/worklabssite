import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-24 pb-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <button 
          onClick={() => { window.location.hash = ''; window.scrollTo(0,0); }}
          className="inline-flex items-center gap-2 text-[13px] font-semibold mb-10 transition-opacity hover:opacity-70 cursor-pointer border-none bg-transparent"
          style={{ color: 'var(--c-accent)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="terms-content">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--c-text)' }}>Terms & Conditions</h1>
          <p className="text-[14px] font-semibold mb-12" style={{ color: 'var(--c-text-3)' }}>Last Updated: July 12, 2026</p>

          <p>Welcome to Worklabs. These Terms & Conditions ("Terms") govern your use of our website and services. By accessing our website or engaging our services, you agree to these Terms.</p>

          <h2>1. About Worklabs</h2>
          <p>Worklabs provides software development, website development, web applications, business automation, UI/UX design, consulting, maintenance, and related digital services.</p>

          <h2>2. Acceptance of Terms</h2>
          <p>By using our website, contacting us, requesting a quotation, or purchasing our services, you acknowledge that you have read, understood, and agreed to these Terms.</p>
          <p>If you do not agree with these Terms, please do not use our website or services.</p>

          <h2>3. Services</h2>
          <p>The services offered by Worklabs may include, but are not limited to:</p>
          <ul>
            <li>Website Design & Development</li>
            <li>Custom Web Applications</li>
            <li>ERP & Business Management Solutions</li>
            <li>Booking & Appointment Systems</li>
            <li>Landing Pages</li>
            <li>Portfolio Websites</li>
            <li>Business Automation</li>
            <li>API Integrations</li>
            <li>Maintenance & Technical Support</li>
            <li>UI/UX Design</li>
            <li>Software Consulting</li>
          </ul>
          <p>Each project will be governed by the scope, timeline, and pricing agreed upon between Worklabs and the client.</p>

          <h2>4. Quotations & Pricing</h2>
          <p>All quotations are valid for the period specified in the proposal unless otherwise stated.</p>
          <p>Project pricing depends on project requirements, complexity, revisions, integrations, and requested features.</p>
          <p>Any work outside the agreed project scope may require additional charges.</p>

          <h2>5. Project Timeline</h2>
          <p>Estimated timelines are provided in good faith. Delivery schedules may change due to:</p>
          <ul>
            <li>Changes requested by the client</li>
            <li>Delayed client feedback</li>
            <li>Delayed content or assets from the client</li>
            <li>Third-party service delays</li>
            <li>Technical issues beyond reasonable control</li>
          </ul>
          <p>Worklabs will make reasonable efforts to communicate any expected delays.</p>

          <h2>6. Client Responsibilities</h2>
          <p>Clients agree to:</p>
          <ul>
            <li>Provide accurate information.</li>
            <li>Supply required content, images, branding, and documents.</li>
            <li>Respond to review requests promptly.</li>
            <li>Review deliverables within a reasonable timeframe.</li>
            <li>Ensure they have the legal right to use any materials they provide.</li>
          </ul>
          <p>Worklabs is not responsible for delays caused by missing client information.</p>

          <h2>7. Payments</h2>
          <p>Payment terms will be specified in the project proposal or invoice. Unless otherwise agreed:</p>
          <ul>
            <li>Work may begin only after the agreed advance payment is received.</li>
            <li>Final delivery may occur after outstanding payments are cleared.</li>
            <li>Late payments may delay project delivery or ongoing support.</li>
          </ul>

          <h2>8. Revisions</h2>
          <p>Reasonable revisions are included according to the agreed project scope. Requests that significantly change functionality, design direction, or project objectives may be treated as additional work.</p>

          <h2>9. Intellectual Property</h2>
          <p>Upon full payment, ownership of the final deliverables created specifically for the client will be transferred to the client unless otherwise agreed in writing.</p>
          <p>Worklabs retains ownership of:</p>
          <ul>
            <li>Internal frameworks</li>
            <li>Development tools</li>
            <li>Reusable components</li>
            <li>Libraries</li>
            <li>Templates</li>
            <li>Proprietary methodologies</li>
          </ul>
          <p>Open-source software remains subject to its respective licenses.</p>

          <h2>10. Portfolio Rights</h2>
          <p>Unless otherwise agreed in writing, Worklabs may display completed work, project screenshots, company names, and publicly available project links in its portfolio, website, and marketing materials. Clients may request confidentiality before project commencement.</p>

          <h2>11. Third-Party Services</h2>
          <p>Projects may rely on third-party services including:</p>
          <ul>
            <li>Domain registrars</li>
            <li>Hosting providers</li>
            <li>Cloud platforms</li>
            <li>Payment gateways</li>
            <li>APIs</li>
            <li>Analytics tools</li>
          </ul>
          <p>Worklabs is not responsible for outages, pricing changes, service interruptions, or policy changes made by third-party providers.</p>

          <h2>12. Support & Maintenance</h2>
          <p>Support or maintenance is only provided if included in the project agreement or purchased separately. Requests beyond the agreed support scope may incur additional charges.</p>

          <h2>13. Website Availability</h2>
          <p>We strive to keep our website available at all times but do not guarantee uninterrupted access. We may suspend or modify the website without prior notice for maintenance, updates, or security reasons.</p>

          <h2>14. Prohibited Use</h2>
          <p>Users agree not to:</p>
          <ul>
            <li>Use our website for unlawful purposes.</li>
            <li>Attempt unauthorized access to our systems.</li>
            <li>Distribute malware or harmful software.</li>
            <li>Copy or reproduce website content without permission.</li>
            <li>Interfere with website functionality.</li>
          </ul>

          <h2>15. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Worklabs shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from the use of our website or services. Our total liability for any claim shall not exceed the amount paid by the client for the specific project giving rise to the claim.</p>

          <h2>16. Warranties</h2>
          <p>Worklabs provides services using commercially reasonable skill and care. Except as expressly stated, services are provided on an "as is" and "as available" basis without warranties of uninterrupted operation or fitness for a particular purpose.</p>

          <h2>17. Confidentiality</h2>
          <p>Worklabs will make reasonable efforts to protect confidential information shared by clients and will not disclose such information except where required by law or with the client's consent.</p>

          <h2>18. Termination</h2>
          <p>Either party may terminate a project according to the agreed contract. Payments for work completed up to the termination date remain payable.</p>

          <h2>19. Privacy</h2>
          <p>Your use of our website is also governed by our Privacy Policy.</p>

          <h2>20. Changes to These Terms</h2>
          <p>Worklabs may update these Terms from time to time. Updated versions become effective once published on this website.</p>

          <h2>21. Governing Law</h2>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the competent courts having authority over Worklabs' principal place of business, unless otherwise required by applicable law.</p>

          <h2>22. Contact</h2>
          <p>For any questions regarding these Terms, please contact:</p>
          <div className="p-6 rounded-xl mt-6 border" style={{ borderColor: 'var(--c-border)', background: 'var(--c-bg-card)' }}>
            <p className="font-bold mb-1" style={{ color: 'var(--c-text)' }}>Worklabs</p>
            <p className="mb-1"><a href="mailto:support@worklabs.studio" style={{ color: 'var(--c-accent)' }}>support@worklabs.studio</a></p>
            <p><a href="https://worklabs.studio" style={{ color: 'var(--c-accent)' }}>https://worklabs.studio</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
