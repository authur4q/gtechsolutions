"use client";
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import styles from "./adm.module.css"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function AddProduct() {
  const router = useRouter()

  const {data:session} = useSession()
  const activeUser = session?.user
  const role = session?.user?.role
  console.log(activeUser)

  useEffect(() => {
      if(!activeUser || role == "user"){
    router.push("/")
  }
  },[activeUser,router,role])


  
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    category: 'Shelves', 
    description: '',
    condition: 'New',
    stockLevel: 0,
    imageUrl: [], 
  });

  const handleUploadSuccess = (result) => {

    setFormData((prev) => ({
      ...prev,
      imageUrl: [...prev.imageUrl, result.info.secure_url],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      
      alert("Product saved!");
     
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Add New Product</h2>
      
      <input type="text" placeholder="Product Name" className={styles.input} required
        onChange={(e) => setFormData({...formData, name: e.target.value})} />
      
      <div className={styles.priceStockContainer}>
        <input type="number" placeholder="Price" className={styles.input} required
          onChange={(e) => setFormData({...formData, price: e.target.value})} />
        
        <input type="number" placeholder="Stock Level" className={styles.input}
          onChange={(e) => setFormData({...formData, stockLevel: e.target.value})} />
      </div>

      <textarea placeholder="Description" className={styles.textarea} required
        onChange={(e) => setFormData({...formData, description: e.target.value})} />

      <select className={styles.select} 
        onChange={(e) => setFormData({...formData, condition: e.target.value})}>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Refurbished">Refurbished</option>
      </select>
      
      <select className={styles.select} 
        onChange={(e) => setFormData({...formData, category: e.target.value})}>
        <option value="Shelves">Shelves</option>
        <option value="Baskets">Baskets</option>
        <option value="Trolleys">Trolleys</option>
        <option value="Pricetags">Pricetags</option>
        <option value="Chillers">Chillers</option>
        <option value="Fridges">Fridges</option>
        <option value="Counters">Counters</option>
        <option value="POS">POS</option>
        <option value="Generators">Generators</option>
        
      </select>
      
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => (
          <button type="button" className={styles.uploadButton} onClick={() => open()}>
            Upload Images ({formData.imageUrl.length})
          </button>
        )}
      </CldUploadWidget>

      <div className={styles.imagePreviewContainer}>
        {formData.imageUrl.map((url, i) => (
          <img key={i} src={url} className={styles.imagePreview} alt="prev" />
        ))}
      </div>

      <button type="submit" className={styles.submitButton}>
        Save Product
      </button>
    </form>
  );
}
