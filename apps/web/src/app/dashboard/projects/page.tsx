import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Projects</h1>
          <p className="text-gray-600">
            Manage your chatbot projects
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          + New Project
        </Link>
      </div>

      <div className="border border-dashed rounded p-10 text-center bg-white">
        <p className="text-gray-500">
          No projects created yet
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Create a project to train ChattyDevs on your content
        </p>
      </div>
    </div>
  );
}
