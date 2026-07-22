import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd/JsonLd";
import { brands, products } from "../../../data/products";
import { getSiteUrl, SITE_NAME } from "../../../lib/site";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const brand = brands.find((item) => item.id === id);

  if (!brand) {
    return {
      title: "Brand Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = brand.name;
  const description = brand.description;
  const image = `${getSiteUrl()}${brand.heroBanner}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/brands/${brand.id}`,
    },
    openGraph: {
      title: `${brand.name} | ${SITE_NAME}`,
      description,
      url: `/brands/${brand.id}`,
      type: "website",
      images: [{ url: image, alt: `${brand.name} banner` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export function generateStaticParams() {
  return brands.map((brand) => ({ id: brand.id }));
}

export default async function BrandDetailLayout({ params, children }: Props) {
  const { id } = await params;
  const brand = brands.find((item) => item.id === id);
  const siteUrl = getSiteUrl();

  if (!brand) {
    return children;
  }

  const brandProducts = products.filter((product) => product.brandId === brand.id);

  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description,
    url: `${siteUrl}/brands/${brand.id}`,
    logo: `${siteUrl}${brand.logo}`,
    image: `${siteUrl}${brand.heroBanner}`,
    slogan: brand.tagline,
    makesOffer: brandProducts.map((product) => ({
      "@type": "Offer",
      name: product.name,
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      url: `${siteUrl}/brands/${brand.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={brandJsonLd} />
      {children}
    </>
  );
}
