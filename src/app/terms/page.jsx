import styles from './terms.module.css';

export default function TermsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>
      <p className={styles.lastUpdated}>Last Updated: March 2026</p>

      <section className={styles.section}>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing Gtech Solutions and purchasing our products, you agree to be bound by these terms. We provide professional-grade, second-hand supermarket supplies subject to the following conditions.</p>
      </section>

      <section className={styles.section}>
        <h2>2. Condition of Goods ("As-Is")</h2>
        <p>All equipment sold by Gtech Solutions is second-hand/used unless stated otherwise. While we perform rigorous inspections (The Gtech Standard), all goods are sold <strong>"As-Is"</strong> and <strong>"With All Faults."</strong> We make no express or implied warranties regarding merchantability or fitness for a particular purpose.</p>
      </section>

      <section className={styles.section}>
        <h2>3. Pricing and Payment</h2>
        <p>All quotes provided via our Contact Form are valid for 14 days. Full payment is required before equipment is released for delivery or pickup. We reserve the right to adjust prices due to market fluctuations in metal and material costs.</p>
      </section>

      <section className={styles.section}>
        <h2>4. Shipping and Liability</h2>
        <p>Gtech Solutions is not liable for damages occurring during third-party transit. Once the equipment leaves our facility, the risk of loss passes to the buyer. We recommend all clients inspect items upon arrival before signing delivery receipts.</p>
      </section>

      <section className={styles.section}>
        <h2>5. Returns and Refunds</h2>
        <p>Due to the nature of used industrial supplies, all sales are final. Returns are only accepted if the item received significantly differs from the description provided at the time of sale. Returns must be initiated within 48 hours of receipt.</p>
      </section>
    </main>
  );
}