export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Projects</h1>
      <p className="text-gray-600 mb-6">
        Your chatbot projects will appear here.
      </p>

      <div className="border border-dashed rounded p-8 text-center bg-white">
        <p className="text-gray-500">
          No projects yet.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Create your first project to get started.
        </p>
      </div>
    </div>
  );
}
