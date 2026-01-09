export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="mt-4 text-center text-gray-600">
        Simple, transparent pricing. No surprises.
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <Plan
          title="Starter"
          price="$0"
          features={[
            "1 project",
            "Up to 100 pages",
            "Community support",
          ]}
        />

        <Plan
          title="Pro"
          price="$10 / month"
          highlight
          features={[
            "5 projects",
            "Up to 10k pages",
            "PDF & Docs upload",
            "Priority support",
          ]}
        />

        <Plan
          title="Business"
          price="Custom"
          features={[
            "Unlimited projects",
            "Custom crawling",
            "Dedicated support",
          ]}
        />
      </div>
    </section>
  );
}

function Plan({
  title,
  price,
  features,
  highlight,
}: {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        highlight ? "border-black" : ""
      }`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-2xl font-bold">{price}</p>

      <ul className="mt-4 space-y-2 text-gray-600">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
    </div>
  );
}
