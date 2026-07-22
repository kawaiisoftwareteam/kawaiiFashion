import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd/JsonLd";
import { collections, products } from "../../../data/products";
import { getSiteUrl, SITE_NAME } from "../../../lib/site";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const collection = collections.find((item) => item.id === id);

  if (!collection) {
    return {
      title: "Collection Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = collection.name;
  const description = collection.description;
  const image = collection.image
    ? `${getSiteUrl()}${collection.image}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/collections/${collection.id}`,
    },
    openGraph: {
      title: `${collection.name} | ${SITE_NAME}`,
      description,
      url: `/collections/${collection.id}`,
      type: "website",
      images: image
        ? [{ url: image, alt: `${collection.name} banner` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.name} | ${SITE_NAME}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function generateStaticParams() {
  return collections.map((collection) => ({ id: collection.id }));
}

export default async function CollectionDetailLayout({ params, children }: Props) {
  const { id } = await params;
  const collection = collections.find((item) => item.id === id);
  const siteUrl = getSiteUrl();

  if (!collection) {
    return children;
  }

  const collectionProducts = products.filter((product) =>
    product.collections.includes(collection.id)
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: `${siteUrl}/collections/${collection.id}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: collectionProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${siteUrl}/collections/${collection.id}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      {children}
    </>
  );
}
