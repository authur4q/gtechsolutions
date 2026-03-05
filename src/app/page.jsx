"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Search from "./components/search/page";
import Link from "next/link";
import Footer from "./components/footer/page";
import Generators from "./components/gens/page";
import { useState, useEffect } from "react";
import Shelves from "./components/shelves/page";
import Trolleys from "./components/trolleys/page";
import Baskets from "./components/baskets/page";
import POS from "./components/pos/page";
import Pricetags from "./components/pricetags/page";
import Chillers from "./components/chillers/page";
import Fridges from "./components/fridges/page";
import Counters from "./components/counters/page";  

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { name: "All Products", id: "all" }, 
    { name: "Shelves", id: "shelves" },
    { name: "Trolleys", id: "trolleys" },
    { name: "Baskets", id: "baskets" },
    { name: "POS", id: "pos" },
    { name: "Pricetags", id: "pricetags" },
    { name: "Chillers", id: "chillers" },
    { name: "Fridges", id: "fridges" },
    { name: "Counters", id: "counters" },
    { name: "Generators", id: "generators" },
  ];


  const renderMainContent = () => {
    switch (activeTab) {
      case "all":
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
        );

      case "shelves":
        return <Shelves />; 
      case "generators":
        return <Generators />; 

      case "trolleys":
        return <Trolleys />;
      case "baskets":
        return <Baskets />;
      case "pos":
        return <POS />; 
      case "pricetags":
        return <Pricetags />;
      case "chillers":
        return <Chillers />; 
      case "fridges":
        return <Fridges />; 
      case "counters":
        return <Counters />; 
      default:
        return <div className={styles.customComponent}><h2>{activeTab} Section</h2><p>Coming soon...</p></div>;
    }
  };

  useEffect(() => {
    const productsData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/books");
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
    <div className={styles.page}>
      <div className={styles.search}>
        <Search />
      </div>

      <div className={styles.container}>
        <div className={styles.categories}>
          <h1>Categories</h1>
        
          {categories.map((category) => (
            <button 
              className={`${styles.category} ${activeTab === category.id ? styles.active : ""}`} 
              key={category.name} 
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

     
        <div className={styles.mainDisplay}>
            {renderMainContent()}
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}