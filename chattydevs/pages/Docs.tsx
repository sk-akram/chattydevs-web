
import React from 'react';
import { Navbar } from '../components/Layout';
import { Container, Card } from '../components/UI';

export const Docs: React.FC = () => {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', description: 'Learn about ChattyDevs core concepts.' },
        { name: 'Quickstart Guide', description: 'Create your first chatbot in under 2 minutes.' },
        { name: 'Training Basics', description: 'How to prepare your data for the best results.' },
      ]
    },
    {
      title: 'Data Sources',
      items: [
        { name: 'Document Uploads', description: 'Formatting PDFs and CSVs for ingestion.' },
        { name: 'Website Crawling', description: 'Optimizing your site for our crawler.' },
        { name: 'Content Moderation', description: 'How we handle sensitive data.' },
      ]
    },
    {
      title: 'Integration',
      items: [
        { name: 'Widget Embedding', description: 'Adding the chat widget to your frontend.' },
        { name: 'REST API Reference', description: 'Full API documentation for custom integrations.' },
        { name: 'Webhooks', description: 'Real-time notifications for chat events.' },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Container className="py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-slate-400 mb-16">Master the tools and APIs to build powerful AI experiences with ChattyDevs.</p>

          <div className="flex flex-col gap-16">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                  {section.title}
                </h2>
                <div className="grid md:grid-cols-1 gap-4">
                  {section.items.map((item) => (
                    <Card key={item.name} className="p-6 hover:border-indigo-500/50 group transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                          <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-24 p-8 glass rounded-2xl border-indigo-500/20 bg-indigo-500/5">
             <h3 className="text-xl font-bold mb-4">Need more help?</h3>
             <p className="text-slate-400 mb-6">Our team is available to help you with custom integrations and large-scale deployments.</p>
             <a href="mailto:support@chattydevs.com" className="text-indigo-400 font-bold hover:underline underline-offset-4">Contact Support &rarr;</a>
          </div>
        </div>
      </Container>
    </div>
  );
};
