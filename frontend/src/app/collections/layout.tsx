import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skincare Collections",
  description:
    "Browse curated Japanese skincare routines for glass skin, pore detox, hydration, men's care, ladies' care, and baby-safe formulas.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: "Skincare Collections | Kawaii Beauty",
    description:
      "Curated Japanese skincare routines designed for specific skin goals and family needs.",
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
