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
          `/api/search?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error("Search failed");

        const data = await res.json();
        
        setSearchResults(data.filteredProducts); 
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