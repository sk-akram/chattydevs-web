import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-3xl mx-auto">
      <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-4">
        AI Chatbot for Your Website
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mt-2">
          Trained on Your Content
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        ChattyDevs lets you add an AI-powered chatbot to your website using your own docs, FAQs, or knowledge base. No hallucinations. No setup pain.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="btn-primary text-lg"
        >
          Get API Key
        </Link>

        <Link
          href="/docs"
          className="btn-secondary text-lg"
        >
          View Docs
        </Link>
      </div>

      <div className="mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3 text-left">
        <Feature
          title="Your Data Only"
          description="Train the chatbot on your own website content, PDFs, or docs."
        />
        <Feature
          title="Easy Integration"
          description="Drop-in widget or API. Works with any frontend."
        />
        <Feature
          title="Developer Friendly"
          description="Clear APIs, predictable behavior, no magic black box."
        />
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
