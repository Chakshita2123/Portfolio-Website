import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  title: "Chakshita | Aspiring Full Stack Developer",
  description:
    "Portfolio of Chakshita — an aspiring Full Stack Developer who builds beautiful and functional web experiences. Explore projects, skills, and the story behind the code.",
  keywords: [
    "portfolio",
    "full stack developer",
    "web developer",
    "React",
    "Next.js",
    "frontend",
    "backend",
  ],
  authors: [{ name: "Chakshita" }],
  openGraph: {
    title: "Chakshita | Aspiring Full Stack Developer",
    description:
      "A cinematic portfolio showcasing projects, skills, and a growth journey.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
