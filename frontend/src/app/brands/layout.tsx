import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Japanese Brands",
  description:
    "Explore Kome Rituals, Tsubaki Labs, Uji Matcha Co., and Momo Glow — premium Japanese beauty brands at Kawaii Beauty.",
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    title: "Shop Japanese Brands | Kawaii Beauty",
    description:
      "Discover traditional and modern Japanese skincare brands curated for deep moisture and radiant skin.",
  },
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
