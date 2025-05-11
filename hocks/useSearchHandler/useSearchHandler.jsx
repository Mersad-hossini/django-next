import { useEffect, useState } from "react";

function useSearchHandler(query) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.mander.ir/product/products/?search=${query}`
        );
        if (!res.ok) throw new Error("Search failed");
        
        
        const filteredProducts = await res.json();                

        setSearchResults(filteredProducts);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { searchResults, loading, error };
}

export default useSearchHandler;