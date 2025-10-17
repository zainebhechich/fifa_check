import { Suspense } from "react";
import WallahWeCanNavbar from "../../../navbar";
import { Footer } from "../../../components/footer";
import { ShopHero } from "../../../components/shop-hero";
import { ProductGrid } from "../../../components/product-grid";
import { ShopFilters } from "../../../components/shop-filters";
import { CartButton } from "../../../components/cart-button";
import { ShoppingCartSidebar } from "../../../components/shopping-cart-sidebar";
import { TeamBuildingHero } from "../../../components/team-building-hero";
import { TeamBuildingServices } from "../../../components/team-building-services";
import { TeamBuildingProcess } from "../../../components/team-building-process";
import { TeamBuildingContact } from "../../../components/team-building-contact";
import { getSupabaseAdmin } from "../../../lib/supabase/admin";

export const dynamic = "force-dynamic";

interface SearchParams {
  category?: string;
  search?: string;
  sort?: string;
}

export default async function ShopPage({
  params: _params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { category, search, sort } = await searchParams;

  // Query products directly on the server using the admin client (bypasses RLS reliably)
  const supabase = getSupabaseAdmin();

  let query = supabase.from("products").select("*").eq("is_active", true);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "name":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  let products: any[] = [];
  try {
    const { data, error } = await query;
    if (error) {
      console.error("/shop products query error:", error);
    } else {
      products = data ?? [];
    }
  } catch (e) {
    console.error("/shop products query exception:", e);
  }

  // Derive categories from the fetched result so filters always render
  const categoriesToShow = Array.from(
    new Set((products || []).map((p: { category?: string | null }) => p.category).filter(Boolean))
  ) as string[];

  const productsToShow = products || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fffff2' }}>
      <WallahWeCanNavbar />

      <div className="fixed bottom-6 right-6 z-50">
        <CartButton />
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar />

      {/* Hero Section - full-bleed, no negative margins */}
      <section className="relative">
        <ShopHero />
      </section>

      {/* Main Content with site grainy background (continuous until footer) */}
      <div className="relative">
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#fffff2' }} />
        <div className="relative z-10">
          {/* Filters and Products */}
          <section id="products-section" className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <ShopFilters
                categories={categoriesToShow}
                currentCategory={category}
                currentSearch={search}
                currentSort={sort}
              />

              <div className="pr-0 md:pr-20">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                  }
                >
                  <ProductGrid products={productsToShow} />
                </Suspense>
              </div>
            </div>
          </section>

          {/* Team Building */}
          <section className="container mx-auto px-4 py-16">
            <div className="space-y-12">
              <TeamBuildingHero />
              <TeamBuildingServices />
              <TeamBuildingProcess />
              <TeamBuildingContact />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
