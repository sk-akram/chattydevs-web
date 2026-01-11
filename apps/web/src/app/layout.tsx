
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container } from "./components/ui/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Container className="min-h-screen flex flex-col justify-between">
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
