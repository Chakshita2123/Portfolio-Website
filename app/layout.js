import "./globals.css";
import CustomCursor from "../components/CustomCursor";

export const metadata = {
  title: "Chakshita.ai | AI-Powered Portfolio",
  description: "An AI-first digital identity. Not just a resume — a modern, intelligent portfolio showcasing projects, skills, and vision.",
  keywords: ["portfolio", "AI", "web developer", "frontend", "React", "Next.js"],
  authors: [{ name: "Chakshita" }],
  openGraph: {
    title: "Chakshita.ai | AI-Powered Portfolio",
    description: "An AI-first digital identity designed like a real product.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
