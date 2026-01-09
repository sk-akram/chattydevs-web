export default function ProjectDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">
          Demo Project
        </h1>
        <p className="text-gray-600">
          Trained on https://example.com
        </p>
      </div>

      {/* Status */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-medium mb-1">Training Status</h2>
        <p className="text-sm text-green-600">
          ✓ Content indexed successfully
        </p>
      </div>

      {/* Data sources */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-medium mb-3">Data Sources</h2>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Website crawl</li>
          <li>• Uploaded documents</li>
        </ul>
      </div>

      {/* Widget snippet */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">
          Embed Widget
        </h2>

        <pre className="bg-gray-100 text-xs p-3 rounded overflow-x-auto">
{`<script
  src="https://cdn.chattydevs.com/widget.js"
  data-project-id="demo-project"
  data-api-key="YOUR_API_KEY"
></script>`}
        </pre>

        <p className="text-xs text-gray-500 mt-2">
          Copy and paste this into your website
        </p>
      </div>
    </div>
  );
}
