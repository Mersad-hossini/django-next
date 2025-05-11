import HomePage from "@/components/templates/HomePage/HomePage";
import Head from "next/head";
import React from "react";

function Index() {
  return (
    <>
      <Head>
        <title>Django Shopping</title>
      </Head>
      <HomePage />
    </>
  );
}

export default Index;