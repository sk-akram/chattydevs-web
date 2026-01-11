import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card } from '../components/UI';
import { Navbar } from '../components/Layout';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-500/10 blur-[160px] rounded-full -z-10 opacity-60"></div>
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <Container className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-indigo-400 text-xs font-bold uppercase tracking-widest mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Platform Updates: v2.0 Now Available
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-10 leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
            Automate Support <br />
            <span className="gradient-text">With Custom AI</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Transform your knowledge base into an intelligent chatbot in seconds. Ingest PDFs, crawl sites, and deploy custom models trained on your specific data.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Button size="lg" onClick={() => navigate('/signup')} className="h-14 px-10 text-lg">
              Launch Your Bot
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/docs')} className="h-14 px-10 text-lg">
              Explore Enterprise Docs
            </Button>
          </div>

          <div className="mt-28 relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative glass rounded-[2rem] p-4 border-slate-800 shadow-3xl overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none"></div>
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bbb85212423e?auto=format&fit=crop&q=80&w=2000" 
                 alt="Dashboard Interface" 
                 className="rounded-[1.5rem] w-full h-auto object-cover opacity-90 shadow-2xl"
               />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        <Container>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Built for scale. Designed for speed.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything you need to build, train, and deploy production-grade chatbots globally.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Instant Ingestion',
                desc: 'Upload documentation, internal wikis, or raw data files. We process and vectorize everything for sub-second retrieval.',
                icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              },
              {
                title: 'Neural Crawling',
                desc: 'Our proprietary crawler understands context, ignoring headers and footers to focus on the content that matters to your users.',
                icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
              },
              {
                title: 'Seamless SDK',
                desc: 'A robust React SDK and drop-in widget that handles the heavy lifting of state management and real-time streaming.',
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
              }
            ].map((f, i) => (
              <Card key={i} className="group p-10 hover:-translate-y-2 duration-500">
                <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-slate-900 bg-slate-900/10">
        <Container>
          <p className="text-center text-slate-600 font-bold uppercase tracking-[0.3em] text-xs mb-12">Trusted by modern engineering teams</p>
          <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 opacity-30 grayscale contrast-125">
             <div className="text-3xl font-black tracking-tighter text-white">VERCEL</div>
             <div className="text-3xl font-black tracking-tighter text-white">STRIPE</div>
             <div className="text-3xl font-black tracking-tighter text-white">LINEAR</div>
             <div className="text-3xl font-black tracking-tighter text-white">REPLICATE</div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-32">
        <Container>
          <div className="relative glass rounded-[3rem] p-16 md:p-24 text-center border-indigo-500/10 bg-indigo-500/[0.02] overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-500/10 transition-colors"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ship your first AI <br /> assistant today.</h2>
            <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg">Join 12,000+ developers building with ChattyDevs. Free forever for testing, pay only as you scale.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="lg" onClick={() => navigate('/signup')} className="px-12 py-5 text-xl rounded-2xl">Create Account</Button>
              <Button size="lg" variant="ghost" onClick={() => navigate('/pricing')} className="px-10 text-lg">See Pricing Plan</Button>
            </div>
          </div>
        </Container>
      </section>

      <footer className="py-20 border-t border-slate-900">
        <Container className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">C</div>
              <span className="font-bold text-2xl tracking-tighter">ChattyDevs</span>
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed">The professional standard for custom AI integrations and support automation.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter / X</a></li>
            </ul>
          </div>
        </Container>
        <Container className="mt-20 pt-8 border-t border-slate-900 flex justify-between items-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
           <span>© 2025 ChattyDevs Inc.</span>
           <div className="flex gap-8">
              <a href="#">Security</a>
              <a href="#">Compliance</a>
           </div>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;
