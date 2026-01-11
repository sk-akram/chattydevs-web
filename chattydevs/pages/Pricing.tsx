
import React from 'react';
import { Navbar } from '../components/Layout';
import { Container, Button, Card, Badge } from '../components/UI';

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for small side projects and testing.',
      features: ['1 Project', '100 Crawler Pages', '50MB Storage', 'Community Support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'The standard for growing developers and startups.',
      features: ['10 Projects', '1,000 Crawler Pages', '1GB Storage', 'Priority Support', 'Custom Branding'],
      cta: 'Choose Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated resources for large-scale operations.',
      features: ['Unlimited Projects', 'Custom Crawler Config', 'White-labeling', 'SLA Guarantee', 'Dedicated Account Manager'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, predictable pricing</h1>
            <p className="text-xl text-slate-400">Choose the plan that fits your growth. Scale as your chatbots become more intelligent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`flex flex-col gap-8 p-8 ${tier.popular ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : ''}`}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    {tier.popular && <Badge color="indigo">Most Popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-slate-500">/mo</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{tier.description}</p>
                </div>
                
                <ul className="flex flex-col gap-4 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={tier.popular ? 'primary' : 'outline'} className="w-full">
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold mb-12">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h4 className="font-bold mb-2">Can I cancel anytime?</h4>
                <p className="text-slate-400 text-sm">Yes, you can cancel your subscription at any time from your settings panel. You'll maintain access until the end of your billing cycle.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">How does the crawler work?</h4>
                <p className="text-slate-400 text-sm">Our bot simulates a browser to navigate your site, extraction relevant text while ignoring navigation and footers to ensure high-quality training data.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
