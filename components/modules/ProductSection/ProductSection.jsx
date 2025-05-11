import CategoryTitle from "../CategoryTitle/CategoryTitle";
import ProductBox from "../ProductBox/ProductBox";

const ProductSection = ({ title, category, products }) => {
  // فیلتر کردن محصولات بر اساس دسته‌بندی
  const filteredProducts =
    category === "search"
      ? products
      : products.filter((item) => item.categories[0]?.title === category);

  return (
    <>
      {/* عنوان دسته‌بندی */}
      <CategoryTitle title={title} />

      {/* نمایش محصولات در قالب شبکه‌ای */}
      <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mx-3 mt-2">
        {filteredProducts.map((product) => (
          <ProductBox key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default ProductSection;
