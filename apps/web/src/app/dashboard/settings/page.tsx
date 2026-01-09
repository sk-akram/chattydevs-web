export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Settings</h1>

      <div className="bg-white border rounded p-4 max-w-xl">
        <h2 className="font-medium mb-2">API Key</h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value="chattydevs_live_xxxxxxxxxxxxx"
            className="flex-1 border rounded px-3 py-2 text-sm bg-gray-50"
          />
          <button className="border rounded px-3 py-2 text-sm hover:bg-gray-100">
            Copy
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          This is a placeholder. Real keys will be generated later.
        </p>
      </div>
    </div>
  );
}
