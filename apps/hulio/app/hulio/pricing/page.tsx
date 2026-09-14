import { Button, PageIntro } from '@/components/shared';
import { hulioMetadata } from '@/lib/metadata';
import styles from '@/components/inner/inner.module.css';

export const metadata = hulioMetadata('Pricing', '/hulio/pricing');

const plans = [
  { name: 'Silver', price: '$90.00', description: 'An affordable plan with essential features to get you started.', features: ['5 website', '500 MB Storage', 'Unlimited Sub-Domain', '3 Custom Domain', 'Lifetime Free Support'] },
  { name: 'Gold', price: '$199.00', description: 'A balanced plan offering advanced features at great value.', features: ['10 website', '20 GB Storage', 'Unlimited Sub-Domain', '10 Custom Domain', 'Lifetime Free Support'] },
  { name: 'Platinum', price: '$899.00', description: 'The ultimate plan with all premium features for power users.', features: ['20 website', '50 GB Storage', 'Unlimited Sub-Domain', 'Unlimited Custom Domain', 'Lifetime Free Support'] },
];

export default function PricingPage() {
  return <div className={styles.pricingPage}>
    <PageIntro title="Some Affordable Pricing Plans for you!" description="Explore our budget-friendly pricing plans designed to suit your needs. Enjoy access to premium features, top-notch support, and powerful tools." />
    <section className={`container ${styles.pricingGrid}`} aria-label="Pricing plans">
      {plans.map(plan => <article key={plan.name} className={styles.priceCard}>
        <p className={styles.planName}>{plan.name} pack</p>
        <div className={styles.price}><h2>{plan.price}</h2><p>Per month</p></div>
        <p className={styles.planDescription}>{plan.description}</p>
        <ul>{plan.features.map(feature => <li key={feature}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{feature}</li>)}</ul>
        <Button href="/hulio/contact" variant={plan.name === 'Gold' ? 'blue' : 'dark'} className={styles.priceButton}>Get {plan.name} Now</Button>
      </article>)}
    </section>
  </div>;
}
