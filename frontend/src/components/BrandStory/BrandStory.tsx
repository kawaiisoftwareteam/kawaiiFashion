import Image from "next/image";
import Link from "next/link";
import styles from "./BrandStory.module.css";

const features = [
  {
    title: "Glass Skin & Daily Hydration",
    body: "Our Glass Skin Routine pairs a gentle cleanser, rice ferment brightening serum, and barrier-supporting moisturizer. These steps help soft texture look smoother while locking in deep moisture morning and night.",
    href: "/collections/glass-skin-routine",
    cta: "Explore Glass Skin Routine",
    image: "/product_serum.png",
    imageAlt: "Rice ferment brightening serum for glass skin hydration",
  },
  {
    title: "Pore Care & Matcha Detox",
    body: "Congested skin needs clarity without harsh stripping. The Pore Detox Ritual uses antioxidant-rich Uji matcha cleansers and refining treatments to balance oil, soothe irritation, and keep pores looking cleaner.",
    href: "/collections/pore-detox-ritual",
    cta: "Explore Pore Detox Ritual",
    image: "/product_cleanser.png",
    imageAlt: "Uji matcha charcoal cleanser for pore detox",
  },
  {
    title: "Family Collections for Every Age",
    body: "Ladies' Luxury focuses on sakura and camellia radiance. Men's Care targets excess sebum and razor comfort. Baby & Kids Gentle Care uses fragrance-free oatmeal and milk lipid formulas for delicate skin.",
    href: "/collections",
    cta: "Browse All Collections",
    image: "/collection_ladies.png",
    imageAlt: "Ladies luxury sakura and camellia skincare collection",
  },
  {
    title: "Pure Waters & Ionized Alkalinity",
    body: "Hydration begins from within. We source pristine Mt. Fuji volcanic spring water and ionized alkaline mineral water (pH 9.5+) micro-clustered with bio-active electrolytes for optimal cellular vitality and balance.",
    href: "/category/alkaline-water",
    cta: "Explore Waters",
    image: "/product_alkaline_water.png",
    imageAlt: "Mt. Fuji Ionized Alkaline Water and pure mountain spring water",
  },
  {
    title: "Artisanal Japanese Chocolates",
    body: "Indulge in handcrafted melt-in-mouth Nama ganache made with fresh Hokkaido double cream, stone-ground ceremonial Uji matcha, and single-origin dark cacao with flaked sea salt.",
    href: "/category/chocolate",
    cta: "Explore Chocolates",
    image: "/product_chocolate.png",
    imageAlt: "Artisanal Japanese Nama Chocolate and matcha ganache",
  },
  {
    title: "Precision Smart Beauty Gadgets",
    body: "Elevate your self-care rituals with cutting-edge Tokyo tech. Experience nano-ionic steam atomization, 24kHz ultrasonic EMS facial contouring wands, and portable hydrogen water generators.",
    href: "/category/gadgets",
    cta: "Explore Smart Gadgets",
    image: "/product_gadget_steamer.png",
    imageAlt: "Mirai Nano-Ionic Facial Hydration Steamer and smart beauty gadgets",
  },
  {
    title: "Trusted Japanese Lifestyle Brands",
    body: "Discover Kome Rituals, Tsubaki Labs, Uji Matcha Co., Momo Glow, Fuji Pure Springs, Hokkaido Cacao, and Mirai Tokyo Tech. Every brand is selected for ingredient integrity, sensorial luxury, and authentic Japanese craft.",
    href: "/brands",
    cta: "Shop Japanese Brands",
    image: "/collection_men.png",
    imageAlt: "Premium Japanese skincare and lifestyle brands curated by Kawaii Beauty",
  },
];

export default function BrandStory() {
  return (
    <section className={styles.section} aria-labelledby="brand-story-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>Japanese Skincare Expertise</span>
            <h2 id="brand-story-heading" className={styles.title}>
              Why Kawaii Beauty Skincare Works
            </h2>
            <p className={styles.lead}>
              Kawaii Beauty is an online Japanese skincare shop built around moisture-first
              routines. We curate fermented rice, camellia oil, Uji matcha, and peach blossom
              formulas that help dry, sensitive, and congested skin feel calm, hydrated, and
              luminous.
            </p>
          </div>
          <div className={styles.headerVisual}>
            <Image
              src="/kawaii_beauty_hero.png"
              alt="Kawaii Beauty Japanese skincare products"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className={styles.headerImage}
            />
          </div>
        </header>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <article
              key={feature.href}
              className={`${styles.feature} ${index % 2 === 1 ? styles.featureReverse : ""}`}
            >
              <Link href={feature.href} className={styles.featureMedia}>
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.featureImage}
                />
              </Link>
              <div className={styles.featureCopy}>
                <span className={styles.featureIndex}>0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <Link href={feature.href} className={styles.featureLink}>
                  {feature.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.closing}>
          <div className={styles.closingVisual}>
            <Image
              src="/collection_baby.png"
              alt="Gentle baby and kids skincare from Kawaii Beauty"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.closingImage}
            />
          </div>
          <div className={styles.closingCopy}>
            <p>
              Whether you need a brightening serum, camellia facial oil, charcoal cleanser,
              hydrating mask, or a tear-free baby lotion, Kawaii Beauty makes it simple to shop
              curated Japanese skincare online. Pair products into a kit, save with seasonal
              offers, and build a routine that supports healthy moisture every day.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/offers" className={styles.primaryLink}>
                View Current Offers
              </Link>
              <Link href="/collections/double-hydration-kit" className={styles.secondaryLink}>
                Shop Double Hydration Kit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
