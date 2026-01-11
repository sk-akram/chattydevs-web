export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Welcome to ChattyDevs
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Manage your chatbot projects and API keys here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Projects</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Create and manage chatbot projects.
          </p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">API Keys</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Generate and rotate API keys.
          </p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Usage</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Track requests and limits.
          </p>
        </div>
      </div>
    </div>
  );
}
