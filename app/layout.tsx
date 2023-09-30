import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "付属品APP",
  description: "大丸白衣徳島工場 付属品APP",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="bg-zinc-50">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
