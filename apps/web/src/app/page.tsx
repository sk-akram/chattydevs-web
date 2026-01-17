"use client";

import { useRouter } from "next/navigation";

import { Navbar } from "./components/layout";
import { Button, Card, Container } from "./components/ui";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-500/10 blur-[160px] rounded-full -z-10 opacity-60" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />

        <Container className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-indigo-400 text-xs font-bold uppercase tracking-widest mb-10 shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Platform Updates: v2.0 Now Available
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-10 leading-[0.9] text-white">
            Axion Chat <br />
            <span className="gradient-text">by ChattyDevs</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed">
            Axion Chat by ChattyDevs AI chatbot trained on your content.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="lg" onClick={() => router.push("/signup")} className="h-14 px-10 text-lg">
              Launch Your Bot
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/docs")}
              className="h-14 px-10 text-lg"
            >
              Explore Enterprise Docs
            </Button>
          </div>

          <div className="mt-28 relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000" />
            <div className="relative glass rounded-[2rem] p-4 border-slate-800 shadow-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-[1.5rem] w-full h-[420px] bg-slate-900/40 border border-slate-800/60" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />
        <Container>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Built for scale. Designed for speed.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Everything you need to build, train, and deploy production-grade chatbots globally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Instant Ingestion",
                desc: "Upload documentation, internal wikis, or raw data files. We process and vectorize everything for sub-second retrieval.",
              },
              {
                title: "Neural Crawling",
                desc: "Our crawler understands context and focuses on the content that matters to your users.",
              },
              {
                title: "Seamless SDK",
                desc: "A drop-in widget for WordPress or any site. Get your Project ID + API key and go live.",
              },
            ].map((f) => (
              <Card key={f.title} className="group p-10 hover:-translate-y-2 duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <footer className="py-20 border-t border-slate-900">
        <Container className="flex items-center justify-between text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          <span>© ChattyDevs Technologies Pvt Ltd</span>
          <div className="flex gap-8">
            <a href="#">Security</a>
            <a href="#">Compliance</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
