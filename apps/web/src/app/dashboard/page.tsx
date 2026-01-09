export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        Welcome to ChattyDevs
      </h1>

      <p className="text-gray-600 mb-6">
        Manage your chatbot projects and API keys here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4 bg-white">
          <h3 className="font-medium">Projects</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage chatbot projects.
          </p>
        </div>

        <div className="border rounded p-4 bg-white">
          <h3 className="font-medium">API Keys</h3>
          <p className="text-sm text-gray-600 mt-1">
            Generate and rotate API keys.
          </p>
        </div>

        <div className="border rounded p-4 bg-white">
          <h3 className="font-medium">Usage</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track requests and limits.
          </p>
        </div>
      </div>
    </div>
  );
}
