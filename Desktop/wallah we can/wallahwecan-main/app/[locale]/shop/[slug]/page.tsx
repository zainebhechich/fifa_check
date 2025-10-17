import { getSupabaseAdmin } from "../../../../lib/supabase/admin";
import Link from "next/link";
import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "../../../../components/footer";
import { ProductDetail } from "../../../../components/product-detail";
import { ShoppingCartSidebar } from "../../../../components/shopping-cart-sidebar";
import { CartButton } from "../../../../components/cart-button";
import { getTranslations } from "next-intl/server"; // PHASE 1 i18n fix

interface ProductPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = getSupabaseAdmin();
  const p = await params;
  const { locale } = p as { locale: string; slug: string };
  const t = await getTranslations({ locale }); // PHASE 1 i18n fix

  const slugToName = p.slug.replace(/-/g, " ");

  type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    is_active: boolean;
    created_at: string;
    // Removed index signature to avoid 'any' usage
  };

  let product: Product | null = null;

  // Try by slug first
  const bySlug = await supabase.from("products").select("*").eq("slug", p.slug).single();
  if (!bySlug.error && bySlug.data) {
    product = bySlug.data;
  } else {
    // Try by name (from slug) using wildcard for flexible matching
    const byName = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${slugToName}%`)
      .limit(1)
      .single();

    if (!byName.error && byName.data) {
      product = byName.data;
    }
  }

  // Fallback to local catalog to ensure the page renders
  if (!product) {
    const fallbackProducts = [
      {
        id: "p-10",
        name: "Essence Vitale",
        description: "5 flacons d’huiles essentielles de 10ml chacun",
        price: 179.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-09",
        name: "La Savonnière Artisanale",
        description: "Assortiment de 4 savons naturels parfumés",
        price: 82.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-08",
        name: "Jardin Floral",
        description: "4 bougies parfumées",
        price: 115.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-07",
        name: "L’Or des Fleurs",
        description: "4 pots de miels de 30 g chacun",
        price: 48.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-06",
        name: "Nature Gourmande",
        description:
          "2 bouteilles d’huile d’olive 100 ml\n4 pots de miel variés de 30 g chacun\n1 sachet d’herbes aromatiques sèchées",
        price: 70.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-05",
        name: "Évasion Bio",
        description:
          "1 pot de miel 30 g\n1 sachet d’herbes aromatiques séchées\n2 bouteilles d’hydrolat 100 ml\n1 flacon d’huile essentielle de 10 ml",
        price: 86.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-04",
        name: "Ambiance Nature",
        description:
          "2 bouteilles d’hydrolat 100 ml\n2 savons naturellement parfumés\n1 bougie parfumée \n1 flacon d’huile essentielle 10 ml\n1 sachet d’herbes aromatiques séchées",
        price: 137.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-03",
        name: "Découverte des Senteurs",
        description:
          "3 flacons d’huiles essentielles\n1 sachet d’herbes aromatiques séchées\n1 bougie parfumée",
        price: 141.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-02",
        name: "L’artisan",
        description:
          "1 savon naturellement parfumé\n1 bougie parfumée\n1 sachet d’herbes aromatiques séchées\n1 flacon d’huile essentielle de 10 ml",
        price: 92.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "p-01",
        name: "Évasion Méditerranéenne",
        description:
          "2 bouteilles d’huile d’olive 100 ml\n1 flacon d’huile essentielle 10 ml\n1 pot de miel 30 g\n1 sachet d’herbes aromatiques séchées",
        price: 82.0,
  image_url: "/placeholder.svg",
        category: "Coffrets",
        stock: 20,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ];

    const findBySlug = (name: string) =>
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    product = fallbackProducts.find((fp) => findBySlug(fp.name) === p.slug) || null;
  }

  if (!product) {
    // PHASE 1 i18n fix: Localized not-found UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Shop.Product.notFoundTitle")}</h1>
          <Link href={`/${locale}/shop`} className="text-blue-500 hover:underline">
            {t("Shop.Product.backToShop")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at 44% 50%, rgba(252,132,19,1), rgba(6,43,124,0.91)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          filter: "contrast(100%) brightness(100%)",
        }}
      />
      <div className="relative z-10">
        <WallahWeCanNavbar />

        {/* Fixed Cart Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <CartButton />
        </div>

        {/* Shopping Cart Sidebar */}
        <ShoppingCartSidebar />

        <main className="pt-20">
          <ProductDetail product={product} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
