import React from 'react'
import styles from "./shelves.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function Counters() {
    const [products, setProducts] = useState([]);

      useEffect(() => {
        const productsData = async () => {
          try {
            const res = await fetch("http://localhost:3000/api/category?category=Counters");
            const data = await res.json();
            const formattedData = Array.isArray(data) ? data : (data.products || []);
            setProducts(formattedData);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        productsData();
      }, []);
  return (
    
          <div className={styles.wrapper}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link key={product._id} href={`/products/${product._id}`} className={styles.productCard}>
                  <div className={styles.pcard}>
                    {product.imageUrl && product.imageUrl[0] ? (
                      <Image 
                        src={product.imageUrl[0]} 
                        width={220} height={200} 
                        alt={product.name || "Product image"}
                        style={{ objectFit: 'cover' }} 
                        className={styles.productImage}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                    <h2 className={styles.price}>Ksh{Number(product.price).toLocaleString()}</h2>
                    <h2 className={styles.name}>{product.name?.substring(0, 50)}...</h2>
                    <p>{product.description?.substring(0, 100)}...</p>
                    {product.condition && <p className={styles.condition}>Condition: {product.condition}</p>}
                  </div>
                </Link>
              ))
            ) : (
              <p className={styles.loading}>Loading products...</p>
            )}
          </div>
  )
}

export default Counters;
