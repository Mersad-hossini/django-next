import DualSpinner from "@/components/modules/DualSpinner/DualSpinner";
import Footer from "@/components/modules/Footer/Footer";
import HomeSidebar from "@/components/modules/HomeSidebar/HomeSidebar";
import ProductSection from "@/components/modules/ProductSection/ProductSection";
import PublicNavbar from "@/components/modules/PublicNavbar/PublicNavbar";
import useSearchHandler from "@/hocks/useSearchHandler/useSearchHandler";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SearchLayOut() {
  const router = useRouter();
  const { query } = router.query;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const { searchResults, loading, error } = useSearchHandler(
    (query ?? "").trim()
  );
  return (
    <div className="flex flex-col min-h-screen">
        <PublicNavbar setIsOpen={setIsSidebarOpen} />
        <HomeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="grow">
        {loading && <DualSpinner />}
        {error && (
          <p className="text-red-500 text-center mt-4">
            Error receiving data...
          </p>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <ProductSection
            key={`search-${query}`}
            title={`Search results for "${query}"`}
            category={"search"}
            products={searchResults}
          />
        )}

        {!loading && !error && searchResults.length === 0 && (
          <div
            className="bg-red-100 border text-center border-orange-400 mt-10 text-orange-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">No product found!</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SearchLayOut;