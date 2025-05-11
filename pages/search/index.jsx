import SearchLayOut from "@/components/templates/Search/SearchLayOut";
import Head from "next/head";
import React from "react";

function Search() {
  return (
    <>
      <Head>
        <title>Django Shopping</title>
      </Head>
      <SearchLayOut />
    </>
  );
}

export default Search;