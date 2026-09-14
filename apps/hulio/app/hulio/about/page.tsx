import { asset } from '@/lib/assets';
import { hulioMetadata } from '@/lib/metadata';
import { BuildCTA, Counter, PageIntro, Reveal, SectionLabel, TeamGrid, VideoBlock } from '@/components/shared';
import styles from '@/components/inner/inner.module.css';

export const metadata = hulioMetadata('About Us', '/hulio/about');

const facts = [
  { title: 'Clients', value: 250, suffix: '+', text: 'With over a decade of experience, Shape is an energetic, fresh and vibrant team offering creative talent and industry knowledge.' },
  { title: 'Referals', value: 55, suffix: '%', text: 'Over 55% of our projects are referrals from clients already with us. Our clients love to spread the love far and wide.' },
  { title: 'Winning Awards', value: 80, suffix: '+', text: 'Recognizing extraordinary accomplishments, honoring remarkable milestones, celebrating exceptional excellence.' },
];

export default function AboutPage() {
  return <div className={styles.about}>
    <PageIntro title={'Where Creativity Meets\nDigital Success'} description="Unlock your creative potential with tools built for digital excellence & empowering your ideas to thrive in the modern digital world." />
    <section className="container" aria-label="Our story">
      <div className={styles.aboutImages}>
        <img src={asset('l77fsXukITrkiiAhSxBf7Cx1M.png')} alt="Colleagues playing table football in the studio" width="3270" height="2180" />
        <img src={asset('Xf0LiXSc9GQ6LOoXs0nZhtq6VU.png')} alt="The team working together on a laptop" width="1332" height="1080" />
        <img src={asset('nBBbhYApMpDsr1BKAkPBhPBCc.png')} alt="A creative team meeting" width="1080" height="1200" />
      </div>
      <div className={styles.story}>
        <Reveal><div className={styles.storyHeading}><SectionLabel>Our Story</SectionLabel><h2>We provide brilliant idea to grow the startup — agency with your sharp brand.</h2></div></Reveal>
        <div className={styles.storyCopy}>
          <p>We were tasked to reimagine all aspects of the Gary Neville brand, from his personal brand identity through to carefully architectured site structure, design, and build.</p>
          <p>The website acts as an overview of all things Gary Neville, from business to broadcasting, to charity and public speaking.</p>
        </div>
        <div className={styles.awards} aria-label="Agency awards">
          <img src="/hulio/award-google.svg" alt="5.0 star rated on Google" width="90" height="80" loading="lazy" />
          <img src="/hulio/award-awwwards-honors.svg" alt="38 Awwwards honors" width="96" height="80" loading="lazy" />
          <img src="/hulio/award-awwwards-mobile.svg" alt="27 Awwwards Mobile Excellence awards" width="96" height="80" loading="lazy" />
          <img src="/hulio/award-css-design.svg" alt="19 CSS Design Awards Special Kudos" width="93" height="80" loading="lazy" />
        </div>
      </div>
      <div className={styles.aboutVideo}><VideoBlock /></div>
      <div className={styles.facts}>{facts.map(fact => <article key={fact.title}>
        <h3>{fact.title}</h3><div className={styles.factNumber}><Counter value={fact.value} suffix={fact.suffix} /></div><p>{fact.text}</p>
      </article>)}</div>
    </section>
    <section className={`container ${styles.aboutTeam}`} aria-labelledby="about-team-heading">
      <div className={styles.teamHeading}><div><SectionLabel>Our Awesome Team</SectionLabel><h2 id="about-team-heading">Bringing passion and our<br className={styles.desktopBreak} /> expertise together!</h2></div><p>We bet on brands that shift categories and add value to people’s lives; and on founders who are motivated to shape.</p></div>
      <TeamGrid />
    </section>
    <BuildCTA />
  </div>;
}
