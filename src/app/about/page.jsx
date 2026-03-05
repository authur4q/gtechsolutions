import styles from './about.module.css';

export default function AboutPage() {
  return (
    <main className={styles.mainContainer}>

      <section className={styles.hero}>
        <h1>Powering the Next Generation of Retail</h1>
        <p className={styles.heroSubtitle}>
          Gtech Solutions provides affordable, sustainable, and reliable second-hand 
          supermarket supplies to help you build your business.
        </p>
      </section>

     
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3>Cost Efficiency</h3>
          <p>Save up to 40% compared to new equipment and reinvest those savings into your inventory.</p>
        </div>
        <div className={styles.card}>
          <h3>Sustainability</h3>
          <p>We drive the circular economy by refurbishing industrial gear, diverting tons of waste from landfills.</p>
        </div>
        <div className={styles.card}>
          <h3>Verified Quality</h3>
          <p>Every item undergoes a rigorous 20-point inspection to ensure it meets safety standards.</p>
        </div>
      </div>

    
      <section className={styles.processSection}>
        <h2 className={styles.processTitle}>The Gtech Standard</h2>
        <div className={styles.processGrid}>
          <div className={styles.processStep}>
            <span className={styles.stepNumber}>01</span>
            <h4>Strategic Sourcing</h4>
            <p>We acquire equipment from major retailers undergoing upgrades or closures.</p>
          </div>
          <div className={styles.processStep}>
            <span className={styles.stepNumber}>02</span>
            <h4>Rigorous Refurbishing</h4>
            <p>Our team cleans, repairs, and tests every component to ensure peak performance.</p>
          </div>
          <div className={styles.processStep}>
            <span className={styles.stepNumber}>03</span>
            <h4>Delivery & Support</h4>
            <p>We handle the logistics to get your supplies to your doorstep, ready for installation.</p>
          </div>
        </div>
      </section>
    </main>
  );
}