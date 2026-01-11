import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { SectionHeading } from "../components/ui/SectionHeading";

export default function DashboardPage() {
  return (
    <Container className="py-16">
      <SectionHeading>Welcome to ChattyDevs</SectionHeading>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Manage your chatbot projects and API keys here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card>
          <h3 className="font-semibold text-lg text-white mb-2">Projects</h3>
          <p className="text-sm text-gray-300 mt-2">
            Create and manage chatbot projects.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg text-white mb-2">API Keys</h3>
          <p className="text-sm text-gray-300 mt-2">
            Generate and rotate API keys.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg text-white mb-2">Usage</h3>
          <p className="text-sm text-gray-300 mt-2">
            Track requests and limits.
          </p>
        </Card>
      </div>
    </Container>
  );
}
