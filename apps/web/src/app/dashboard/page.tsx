
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { SectionHeading } from "../components/ui/SectionHeading";

export default function DashboardPage() {
  return (
    <Container className="py-12">
      <SectionHeading>Welcome to ChattyDevs</SectionHeading>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Manage your chatbot projects and API keys here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">Projects</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage chatbot projects.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">API Keys</h3>
          <p className="text-sm text-gray-600 mt-1">
            Generate and rotate API keys.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">Usage</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track requests and limits.
          </p>
        </Card>
      </div>
    </Container>
  );
}
