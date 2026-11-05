import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers & Bundles",
  description:
    "Save on Japanese skincare with Kawaii Mart bundles, promo codes, and limited-time offers.",
  alternates: {
    canonical: "/offers",
  },
  openGraph: {
    title: "Offers & Bundles | Kawaii Mart",
    description:
      "Limited-time skincare bundles and promo codes on premium Japanese beauty products.",
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
