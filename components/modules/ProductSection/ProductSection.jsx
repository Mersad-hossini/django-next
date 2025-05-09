const { default: CategoryTitle } = require("../CategoryTitle/CategoryTitle");
const { default: ProductBox } = require("../ProductBox/ProductBox");

const ProductSection = ({ title, category, products }) => (
  <>
    <CategoryTitle title={title} />
    <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mx-3 mt-2">
      {(category === "search"
        ? products
        : products.filter((item) => item.category === category)
      ).map((product) => (
        <ProductBox key={product.id} {...product} />
      ))}
    </div>
  </>
);

export default ProductSection;
