import { Link } from 'react-router-dom'
import './global_pages.css'

const featureCards = [
  {
    title: 'AI Detection',
    description:
      'Flag sentence-level AI patterns so you can review generated text before you publish or submit.',
  },
  {
    title: 'Grammar & Style Analysis',
    description:
      'Spot passive voice, contractions, and stylistic habits that weaken clarity and consistency.',
  },
  {
    title: 'Tone & Readability Insights',
    description:
      'Track point of view and lexical variety over time to understand how your writing actually reads.',
  },
]

const audiences = ['Students', 'Content creators', 'Editors', 'Businesses', 'Authors']

const testimonials = [
  {
    quote:
      'Stylomind made it obvious where my draft felt robotic and where my style drifted.',
    author: 'Independent editor',
  },
  {
    quote:
      'The sentence-level feedback is much more useful than a generic AI score.',
    author: 'Content strategist',
  },
]

function Home() {
  return (
    <div className="pageContainer homePage">
      <section className="ContentOfTitle heroSection">
        <div className="heroInner">
          <div className="heroCopy">
            <p className="heroEyebrow">Writing analysis for real publishing work</p>
            <h1 className="title heroTitle">Elevate Your Writing with Stylomind</h1>
            <p className="text heroText">
              Advanced text analysis and AI detection for writers, editors, and teams
              who need stronger drafts and clearer signals.
            </p>
            <div className="heroActions">
              <Link className="PageButton" to="/upload">
                Analyze Your Text
              </Link>
              <Link className="SecondaryButton" to="/stats">
                See Example Stats
              </Link>
            </div>
            <p className="heroValue">Free to start. Review your text before you publish, grade, or submit.</p>
          </div>
          <div className="heroPreview">
            <div className="demoCard">
              <p className="demoLabel">Example Output</p>
              <div className="demoBlock">
                <p className="demoHeading">Draft check</p>
                <p className="demoText">
                  Your writing shows strong lexical variety, but several sentences lean
                  passive and the point of view shifts.
                </p>
              </div>
              <div className="demoStats">
                <div>
                  <span className="demoStatValue">7</span>
                  <span className="demoStatLabel">Passive sentences</span>
                </div>
                <div>
                  <span className="demoStatValue">3</span>
                  <span className="demoStatLabel">AI-flagged lines</span>
                </div>
                <div>
                  <span className="demoStatValue">82%</span>
                  <span className="demoStatLabel">Style Similarity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="homeSection">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Why it helps</p>
          <h2 className="sectionTitle">Quick clarity instead of vague feedback</h2>
        </div>
        <div className="featureGrid">
          {featureCards.map((feature) => (
            <article className="featureCard" key={feature.title}>
              <h3 className="featureTitle">{feature.title}</h3>
              <p className="featureText">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homeSection splitSection">
        <div className="infoCard">
          <p className="sectionEyebrow">Who it is for</p>
          <h2 className="sectionTitle">Built for people who need defensible writing feedback</h2>
          <div className="pillRow">
            {audiences.map((audience) => (
              <span className="audiencePill" key={audience}>
                {audience}
              </span>
            ))}
          </div>
        </div>
        <div className="infoCard">
          <p className="sectionEyebrow">Trust & transparency</p>
          <h2 className="sectionTitle">Keep control of the review process</h2>
          <p className="featureText">
            Stylomind is designed to support judgment, not replace it. Review AI flags,
            sentence patterns, and writing trends before you make a decision.
          </p>
          <p className="featureText">
            Privacy, data handling, and accuracy matter because writing tools should
            earn trust, not assume it.
          </p>
        </div>
      </section>

      <section className="homeSection">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Social proof</p>
          <h2 className="sectionTitle">Useful when the draft actually matters</h2>
        </div>
        <div className="featureGrid">
          {testimonials.map((testimonial) => (
            <article className="featureCard testimonialCard" key={testimonial.author}>
              <p className="testimonialQuote">"{testimonial.quote}"</p>
              <p className="testimonialAuthor">{testimonial.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homeSection finalCta">
        <div className="infoCard ctaCard">
          <p className="sectionEyebrow">Start now</p>
          <h2 className="sectionTitle">Upload a draft and get useful signals fast</h2>
          <p className="featureText">
            Move from raw text to analysis without leaving the app.
          </p>
          <div className="heroActions">
            <Link className="PageButton" to="/upload">
              Try It Now
            </Link>
            <Link className="SecondaryButton" to="/stats">
              Review Stored Stats
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
