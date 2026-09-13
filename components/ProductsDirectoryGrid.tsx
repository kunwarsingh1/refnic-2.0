import Link from "next/link";
import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductCategory } from "@/lib/content/productCategories";
import type { ProductCatalogItem } from "@/lib/content/productCatalog";

function ProductCard({ item }: { item: ProductCatalogItem }) {
  return (
    <div className="relative h-full">
      <div
        style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
        className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
        aria-hidden
      />
      <div className="relative flex h-full flex-col p-5">
        <h3 className="font-sans font-bold text-lg leading-snug text-[#EBEBEB] md:text-xl">
          {item.title}
        </h3>

        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="mt-4 aspect-[4/3] w-full rounded-xl object-contain" />
        ) : (
          <CmsImagePlaceholder className="mt-4 aspect-[4/3] w-full rounded-xl" />
        )}

        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
          {item.excerpt}
        </p>

        <div className="mt-6">
          <Link
            href={`/products/${item.slug}`}
            className="inline-flex rounded-md bg-accent-blue px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsDirectoryGrid({
  categories,
  items,
}: {
  categories: ProductCategory[];
  items: ProductCatalogItem[];
}) {
  if (categories.length === 0) {
    return (
      <section className="relative overflow-hidden bg-black px-6 pb-20 text-center md:pb-28">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <p className="relative text-sm text-white/40">No product categories set up yet.</p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category.name);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className="mt-20 first:mt-0">
              {(() => {
                const hasImageRow = Boolean(category.imageUrl) || category.invertLayout;
                return (
                  <div
                    className={`flex flex-col items-start justify-between gap-8 md:flex-row ${
                      hasImageRow ? "md:min-h-[420px] md:items-stretch" : "md:items-center"
                    } ${category.invertLayout ? "md:flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex flex-col justify-center ${
                        category.invertLayout ? "md:flex-1 md:items-end md:text-right" : ""
                      }`}
                    >
                      <h2
                        className={`font-sans font-bold text-2xl leading-tight text-[#EBEBEB] md:max-w-[431px] md:text-5xl ${
                          category.invertLayout ? "md:text-right" : ""
                        }`}
                      >
                        {category.name}
                      </h2>
                      {category.tagline && (
                        <p
                          className={`mt-3 max-w-md text-sm font-normal leading-relaxed text-white md:max-w-[342px] md:text-[21.64px] md:leading-[32.46px] ${
                            category.invertLayout ? "md:text-right" : ""
                          }`}
                        >
                          {category.tagline}
                        </p>
                      )}
                    </div>
                    {hasImageRow &&
                      (category.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={category.imageUrl}
                          alt=""
                          className="h-72 w-full self-stretch object-contain md:w-[45%]"
                        />
                      ) : (
                        <CmsImagePlaceholder className="h-72 w-full self-stretch md:w-[45%]" />
                      ))}
                  </div>
                );
              })()}

              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {categoryItems.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
