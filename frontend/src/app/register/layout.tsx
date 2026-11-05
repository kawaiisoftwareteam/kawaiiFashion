import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account",
  description: "Join Kawaii Mart as a member for curated Japanese beauty.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
