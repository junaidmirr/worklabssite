import { useState } from 'react';
import { Database, Dumbbell, Stethoscope, Store, ArrowRight, ChevronLeft, Phone, MessageCircle, Calendar } from 'lucide-react';

// ─── Shared Mockup Wrapper (macOS style window) ───────────────────────────────
function MockupFrame({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl transition-all duration-500" 
         style={{ background: '#f8fafc', border: '1px solid var(--c-border)' }}>
      {/* Browser Header */}
      <div className="h-10 px-4 flex items-center gap-2" style={{ background: '#e2e8f0', borderBottom: '1px solid #cbd5e1' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="mx-auto flex items-center justify-center h-6 px-4 rounded text-[11px] font-medium text-slate-500 bg-white shadow-sm w-1/2 max-w-sm truncate">
          {title.toLowerCase().replace(/\s+/g, '')}.com
        </div>
      </div>
      {/* App Content Area */}
      <div className="h-[450px] overflow-y-auto relative bg-white text-slate-900">
        {children}
      </div>
    </div>
  );
}

// ─── Individual Mockups ───────────────────────────────────────────────────────

function ERPMockup({ businessName }: { businessName: string }) {
  return (
    <div className="flex h-full bg-slate-50">
      <div className="w-48 bg-slate-900 text-white p-4 flex flex-col gap-4 hidden sm:flex">
        <div className="font-bold text-sm mb-6 truncate">{businessName || 'ERP System'}</div>
        {['Dashboard', 'Inventory', 'Orders', 'Customers', 'Reports'].map(i => (
          <div key={i} className={`text-xs px-2 py-1.5 rounded ${i === 'Dashboard' ? 'bg-indigo-600' : 'text-slate-400 hover:text-white'}`}>
            {i}
          </div>
        ))}
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-6 text-slate-800">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <div className="text-xs text-slate-500 mb-1">Total Revenue</div>
            <div className="text-lg font-bold text-slate-800">$24,590</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <div className="text-xs text-slate-500 mb-1">Active Orders</div>
            <div className="text-lg font-bold text-slate-800">142</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <div className="text-xs text-slate-500 mb-1">Low Stock Items</div>
            <div className="text-lg font-bold text-red-500">12</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 h-48 flex items-center justify-center">
          <div className="text-slate-400 text-sm">[ Analytics Chart Placeholder ]</div>
        </div>
      </div>
    </div>
  );
}

function GymMockup({ businessName }: { businessName: string }) {
  return (
    <div className="h-full bg-neutral-900 text-white relative">
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <div className="font-black text-xl italic tracking-tighter text-red-500 truncate max-w-[200px]">
          {businessName || 'PUMP FITNESS'}
        </div>
        <div className="hidden sm:flex gap-4 text-xs font-bold uppercase tracking-wider text-neutral-300">
          <span>Classes</span>
          <span>Trainers</span>
          <span>Pricing</span>
        </div>
      </div>
      <div className="h-[300px] bg-neutral-800 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 to-transparent"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-black uppercase italic mb-3">Push Your Limits</h1>
          <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-6">Join {businessName || 'our gym'} today and transform your life.</p>
          <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-sm text-sm hover:bg-red-600 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm font-bold uppercase mb-4 text-neutral-400">Class Schedule</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-neutral-800 p-3 rounded flex justify-between items-center">
            <div><div className="font-bold text-sm">HIIT Blast</div><div className="text-xs text-neutral-400">Today, 5:00 PM</div></div>
            <button className="bg-neutral-700 text-xs px-3 py-1 rounded">Book</button>
          </div>
          <div className="bg-neutral-800 p-3 rounded flex justify-between items-center">
            <div><div className="font-bold text-sm">Powerlifting</div><div className="text-xs text-neutral-400">Today, 7:00 PM</div></div>
            <button className="bg-neutral-700 text-xs px-3 py-1 rounded">Book</button>
          </div>
        </div>
      </div>
      {/* Floating WhatsApp */}
      <div className="absolute bottom-4 right-4 bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
        <MessageCircle size={20} color="white" />
      </div>
    </div>
  );
}

function ClinicMockup({ businessName }: { businessName: string }) {
  return (
    <div className="h-full bg-blue-50">
      <div className="bg-white p-4 shadow-sm flex justify-between items-center border-b border-blue-100">
        <div className="flex items-center gap-2 text-blue-700">
          <Stethoscope size={20} />
          <span className="font-bold text-sm sm:text-base truncate max-w-[150px]">{businessName || 'City Clinic'}</span>
        </div>
        <button className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-sm hover:bg-blue-700">
          Patient Portal Login
        </button>
      </div>
      <div className="p-6 sm:p-10 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-blue-50 p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Book an Appointment</h2>
          <p className="text-slate-500 text-sm mb-6">Schedule your visit with {businessName || 'our specialists'} in seconds.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-slate-200 rounded-lg p-3 text-left">
              <div className="text-xs text-slate-400 font-medium mb-1">Select Department</div>
              <select className="w-full text-sm outline-none bg-transparent text-slate-700">
                <option>General Practice</option>
                <option>Cardiology</option>
                <option>Pediatrics</option>
              </select>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 text-left">
              <div className="text-xs text-slate-400 font-medium mb-1">Date</div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Calendar size={14} className="text-blue-500" />
                <span>Select Date</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Find Available Slots
          </button>
        </div>
      </div>
    </div>
  );
}

function LocalMockup({ businessName }: { businessName: string }) {
  return (
    <div className="h-full bg-stone-50">
      <div className="bg-stone-900 text-stone-50 p-4 flex justify-between items-center">
        <div className="font-serif font-bold text-lg tracking-wide truncate max-w-[180px]">
          {businessName || 'Local Services'}
        </div>
        <div className="text-xs flex items-center gap-2">
          <Phone size={12} className="text-amber-500" />
          <span className="hidden sm:inline">Call Now: </span>(555) 123-4567
        </div>
      </div>
      <div className="relative h-48 bg-stone-200 flex items-center justify-center overflow-hidden">
        {/* Fake background image using CSS gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-400 to-stone-300 mix-blend-multiply opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Top Rated Services in Town</h1>
          <p className="text-stone-700 text-sm max-w-md mx-auto">{businessName || 'We'} provides reliable, professional, and affordable services for your home and business.</p>
        </div>
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-12 relative z-20">
          <div className="bg-white p-4 rounded shadow border border-stone-100 text-center">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600 font-bold">1</div>
            <div className="text-sm font-bold text-stone-800">Get a Quote</div>
          </div>
          <div className="bg-white p-4 rounded shadow border border-stone-100 text-center">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600 font-bold">2</div>
            <div className="text-sm font-bold text-stone-800">Schedule</div>
          </div>
          <div className="bg-white p-4 rounded shadow border border-stone-100 text-center">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600 font-bold">3</div>
            <div className="text-sm font-bold text-stone-800">Relax</div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Main Interactive Demos Component ─────────────────────────────────────────
export default function InteractiveDemos() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('');

  const demoTypes = [
    { id: 'erp', icon: <Database size={24} />, title: 'Custom ERP / Dashboard', desc: 'Internal tools for inventory, CRM, and ops.' },
    { id: 'gym', icon: <Dumbbell size={24} />, title: 'Gym & Fitness Studio', desc: 'Booking portals with WhatsApp integration.' },
    { id: 'clinic', icon: <Stethoscope size={24} />, title: 'Clinic & Healthcare', desc: 'Patient booking and secure portals.' },
    { id: 'local', icon: <Store size={24} />, title: 'Local Service Business', desc: 'Lead generation sites for trades & services.' },
  ];

  const handleSelect = (id: string) => {
    setSelectedType(id);
    setStep(2);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim()) {
      setStep(3);
    }
  };

  return (
    <section id="demos" className="py-24" style={{ background: 'var(--c-bg)', borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[10.5px] font-bold tracking-[2.5px] uppercase mb-4" style={{ color: 'var(--c-accent)' }}>Live Interactive Demos</div>
          <h2 className="font-black tracking-[-1.5px] mb-4 leading-[1.07]" style={{ color: 'var(--c-text)', fontSize: 'clamp(28px, 4vw, 44px)' }}>
            See your business<br className="hidden sm:block" /> in our software.
          </h2>
          <p className="text-[15.5px] leading-relaxed max-w-xl mx-auto font-normal" style={{ color: 'var(--c-text-2)' }}>
            Choose a business type, enter your name, and see a live preview of the kind of professional platform we can build for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[500px]">
          
          {/* STEP 1: Select Type */}
          <div className={`transition-all duration-500 absolute w-full ${step === 1 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {demoTypes.map(type => (
                <button key={type.id} onClick={() => handleSelect(type.id)}
                  className="text-left p-6 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                  style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-accent)'; e.currentTarget.style.boxShadow = '0 8px 24px var(--c-accent-glow)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ background: 'var(--c-accent-glow)', color: 'var(--c-accent)' }}>
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-[17px] mb-2" style={{ color: 'var(--c-text)' }}>{type.title}</h3>
                  <p className="text-[13.5px] m-0" style={{ color: 'var(--c-text-2)' }}>{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Enter Name */}
          <div className={`transition-all duration-500 absolute w-full flex justify-center ${step === 2 ? 'opacity-100 translate-x-0 z-10' : step < 2 ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
            <div className="w-full max-w-md p-8 rounded-2xl text-center" style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)' }}>
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: 'var(--c-accent-glow)', color: 'var(--c-accent)' }}>
                {demoTypes.find(t => t.id === selectedType)?.icon}
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--c-text)' }}>What is your business name?</h3>
              <p className="text-[13px] mb-6" style={{ color: 'var(--c-text-2)' }}>We'll generate a live mockup instantly.</p>
              
              <form onSubmit={handleNameSubmit} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="e.g. Apex Fitness"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
                  style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--c-accent)'; e.target.style.boxShadow = '0 0 0 3px var(--c-accent-glow)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--c-border)'; e.target.style.boxShadow = 'none' }}
                />
                <button type="submit" 
                  className="w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3.5 rounded-xl cursor-pointer border-none transition-all duration-200"
                  style={{ background: 'var(--c-accent)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent-h)'; e.currentTarget.style.boxShadow = '0 6px 20px var(--c-accent-ring)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-accent)'; e.currentTarget.style.boxShadow = 'none' }}>
                  Generate Mockup <ArrowRight size={15} />
                </button>
              </form>
              
              <button onClick={() => setStep(1)} className="mt-4 text-[12px] font-medium flex items-center justify-center gap-1 mx-auto cursor-pointer border-none bg-transparent" style={{ color: 'var(--c-text-3)' }}>
                <ChevronLeft size={12} /> Back
              </button>
            </div>
          </div>

          {/* STEP 3: View Mockup */}
          <div className={`transition-all duration-500 absolute w-full ${step === 3 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
            <div className="mb-6 flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-[13px] font-medium flex items-center gap-1 cursor-pointer border-none bg-transparent hover:opacity-70 transition-opacity" style={{ color: 'var(--c-text-2)' }}>
                <ChevronLeft size={14} /> Back to edit
              </button>
              <div className="text-[12px] px-3 py-1 rounded-full font-semibold" style={{ background: 'var(--c-accent-glow)', color: 'var(--c-accent)' }}>Live Preview</div>
            </div>
            
            <MockupFrame title={businessName || 'Preview'}>
              {selectedType === 'erp' && <ERPMockup businessName={businessName} />}
              {selectedType === 'gym' && <GymMockup businessName={businessName} />}
              {selectedType === 'clinic' && <ClinicMockup businessName={businessName} />}
              {selectedType === 'local' && <LocalMockup businessName={businessName} />}
            </MockupFrame>
          </div>

        </div>
      </div>
    </section>
  );
}
