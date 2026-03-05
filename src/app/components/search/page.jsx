'use client';
import React, { useState, useEffect } from 'react';
import styles from "./search.module.css";
import Link from 'next/link';

function Search() {
    const [searchData, setSearchData] = useState(null);
    // Renamed 'title' to 'searchQuery'
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); 

    // 1. Update the debounce timer to watch 'searchQuery'
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); 

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    // 2. Fetch data based on the 'debouncedQuery'
    useEffect(() => {
        if (debouncedQuery.trim() === "") {
            setSearchData(null); 
            return;
        }

        const getData = async () => {
            try {
                // Using 'q' as the parameter to match your previous API route
                const res = await fetch(`/api/search?q=${debouncedQuery}`, { cache: 'no-store' });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await res.json();
                setSearchData(result);
            } catch (error) {
                console.error("Search fetch error:", error);
            }
        }

        getData();
    }, [debouncedQuery]); 

  return (
  <div className={styles.searchComponent}>
    <h1>What are you looking for?</h1>
    <div className={styles.search}>
      <input 
        type="text" 
        placeholder='Search here...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 1. Check if searchData exists */}
      {searchData && (
        searchData.length > 0 ? (
          <div className={styles.searchResults}>
            {/* 2. Map through items */}
            {searchData.map((item) => (
              <Link href={`/products/${item._id}`} key={item._id} className={styles.resultItem}>
                <h2>{item.name}</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{item.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          /* 3. Show "No results" only if the user has actually typed something */
          debouncedQuery.trim() !== "" && (
            <p className={styles.noResults}>No results found for "{debouncedQuery}"</p>
          )
        )
      )}
    </div>
  </div>
);
}

export default Search;