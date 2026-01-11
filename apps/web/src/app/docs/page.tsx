export default function DocsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Documentation</h1>

      <p className="mt-2 text-gray-500 mb-8">
        Everything you need to integrate ChattyDevs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocItem
          title="1. Create an Account"
          description="Sign up and generate your API key and Project ID."
        />
        <DocItem
          title="2. Upload Your Content"
          description="Crawl your website or upload PDFs and docs."
        />
        <DocItem
          title="3. Add the Widget"
          description="Install the WordPress plugin or embed the widget."
        />
        <DocItem
          title="4. Go Live"
          description="Your AI chatbot is now live and trained on your data."
        />
      </div>
    </section>
  );
}

function DocItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
