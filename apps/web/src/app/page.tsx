import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-4xl mx-auto">
      <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
        AI Chatbot for Your Website —
        <span className="block text-gray-500">
          Trained on Your Content
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-600">
        ChattyDevs lets you add an AI-powered chatbot to your website using
        your own docs, FAQs, or knowledge base. No hallucinations. No setup pain.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="rounded-md bg-black px-6 py-3 text-white text-lg"
        >
          Get API Key
        </Link>

        <Link
          href="/docs"
          className="rounded-md border px-6 py-3 text-lg"
        >
          View Docs
        </Link>
      </div>

      <div className="mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 text-left">
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
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
