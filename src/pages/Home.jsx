import HeroCarousel from "../components/HeroCarousel";
import Collections from "../components/Collections";
import ProductsSection from "../components/ProductsSection";

export default function Home({ products, categories, handleAddToCart }) {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Collections */}
      <Collections
        categories={categories}
        onCategoryClick={(cat) => {
          window.location.href = `/products?category=${cat}`;
        }}
      />

      {/* Products Section */}
      <ProductsSection
        products={products}
        categories={categories}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
