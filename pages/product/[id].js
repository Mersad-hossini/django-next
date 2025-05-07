import ProductLayOut from "@/components/templates/ProductLayOut/ProductLayOut";
import React from "react";

function ProductDetails({ product }) {
  return (
    <>
      <ProductLayOut product={product.data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/product/${id}`);

  if (!res.ok) {
    return {
      redirect: {
        destination: "/NotFound",
        permanent: false,
      },
    };
  }

  const product = await res.json();

  if (!product?.data) {
    return {
      redirect: {
        destination: "/NotFound",
        permanent: false,
      },
    };
  }

  return {
    props: { product },
  };
}

export default ProductDetails;
