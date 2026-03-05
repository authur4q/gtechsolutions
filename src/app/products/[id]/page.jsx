"use client"
import React, { useState } from 'react'
import styles from "./productid.module.css"
import Image from 'next/image'
import { useParams } from 'next/navigation';
import { useEffect } from 'react';


function ProductId() {


const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [stockLevel, setStockLevel] = useState(0);
const { id } = useParams(); 

useEffect(() => {
    const fetchData = async() =>{
        const res = await fetch(`/api/books/${id}`);
        if(res.ok){
            const data = await res.json();
            setProduct(data);
            setStockLevel(data.stockLevel);
        } else {
            console.error("Failed to fetch product data");
        }
    }
    fetchData()
},[id])


const pricePerUnit = product ? product.price : 0;
const produtTitle = product ? product.name: "Product Title";
const stock =product ? product.stockLevel : 0;  


const [quantity, setQuantity] = useState(0);

const totalPrice = quantity * pricePerUnit;
const message = `Hello, I am interested in your product :${produtTitle}. Is it still available?`;
const number = 254797003848;
const encodedMessage = encodeURIComponent(message);
const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;


const handleAdd = () => {
    
    if (stockLevel > 0) {
        setQuantity(prev => prev + 1);
        setStockLevel(prev => prev - 1);
    } else {
        alert("Out of stock!");
    }
};

const handleMinus = () => {
    
    if (quantity > 1) {
        setQuantity(prev => prev - 1);
        setStockLevel(prev => prev + 1);
    }
};
  return (
    <div className={styles.ProductId}>
        
      <div className={styles.wrapper}>
            <div className={styles.productImage}>
            
               {product?.imageUrl && product.imageUrl[0] && 
               (
                 <Image className={styles.productImagemain} style={{ objectFit: 'cover' }}  sizes="(max-width: 768px) 100vw, 200px" src={product.imageUrl[0]} alt="Product Image" width={950} height={400} />
               )}
               
                    <div className={styles.imageangles}>
                        {product?.imageUrl?.map((image, index)=>(
                             <div key={index} >
                              <Image style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 200px"   src={image} alt={`Product Image ${index}`} width={200} height={200} />
                             </div>
                        ))}
                    </div>
            </div>
            <div className={styles.productDetails}>
                <h2>Ksh {pricePerUnit.toLocaleString()}</h2>
                <p>Negotiable</p>
                <div className={styles.buttons}>
                    <button className={styles.minus} onClick={handleMinus}>-</button>
                    <h2>{quantity}</h2>
                    <button className={styles.add} onClick={handleAdd}>+</button>
                </div>
                <h2>Total Price : Ksh {totalPrice.toLocaleString()}</h2>
                <button className={styles.whatsappButton} onClick={() => window.open(whatsappLink, '_blank')}>
                    Message GtechSolutions
                </button>
            </div>
      </div>
      <div className={styles.productDescription}>
        
        <h1 >{produtTitle} </h1>
        <h2>Items Available: </h2>
        <h3>{stockLevel}</h3>
        <h2>Condition:</h2>
        <h3>{product?.condition || "Good"}</h3>
        <h2>Product Description:</h2>
        <p>{product?.description || "No description available."}</p>

        
      </div>
    </div>
  )
}

export default ProductId
