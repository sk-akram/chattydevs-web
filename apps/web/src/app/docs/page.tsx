export default function DocsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">Documentation</h1>

      <p className="mt-4 text-gray-600">
        Everything you need to integrate ChattyDevs.
      </p>

      <div className="mt-10 space-y-6">
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
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
