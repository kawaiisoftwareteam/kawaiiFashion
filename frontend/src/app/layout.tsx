import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import StoreLayout from "../components/StoreLayout/StoreLayout";
import JsonLd from "../components/JsonLd/JsonLd";
import { brands, collections, products } from "../data/products";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "../lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-YRK0FDWV78";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Japanese skincare",
    "Kawaii Beauty",
    "glass skin",
    "camellia oil",
    "rice ferment serum",
    "matcha cleanser",
    "baby gentle skincare",
    "men skincare",
    "hydrating moisturizer",
    "online beauty shop",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/kawaii_beauty_hero.png",
        width: 1200,
        height: 630,
        alt: "Kawaii Beauty Japanese skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/kawaii_beauty_hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/Icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
  },
  category: "shopping",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl,
  logo: `${siteUrl}/Icon-512.png`,
  description: SITE_DESCRIPTION,
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  image: `${siteUrl}/kawaii_beauty_hero.png`,
  brand: brands.map((brand) => ({
    "@type": "Brand",
    name: brand.name,
    url: `${siteUrl}/brands/${brand.id}`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Skincare Collections",
    itemListElement: collections.map((collection, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/collections/${collection.id}`,
      name: collection.name,
    })),
  },
};

const productListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE_NAME} Products`,
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `${siteUrl}${product.image}`,
      brand: {
        "@type": "Brand",
        name: brands.find((brand) => brand.id === product.brandId)?.name || SITE_NAME,
      },
      sku: product.id,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price.toFixed(2),
        availability: product.isPreorder
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        url: `${siteUrl}/collections/${product.collections[0] || "glass-skin-routine"}`,
      },
      aggregateRating:
        product.reviewsCount > 0
          ? {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewsCount,
            }
          : undefined,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={storeJsonLd} />
        <JsonLd data={productListJsonLd} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <CartProvider>
          <StoreLayout>{children}</StoreLayout>
        </CartProvider>
      </body>
    </html>
  );
}
