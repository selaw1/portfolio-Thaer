import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, CheckCircle, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 'al-jaleel',
    company: 'Al Jaleel Rehabilitation Center',
    role: 'Physical Therapist',
    location: 'Jenin, Palestine',
    period: 'February 2024 - Present',
    description: [
      'Spearheaded advanced rehabilitation protocols for 300+ patients with severe war injuries, amputations, blast trauma, burns, and complex neurological cases',
      'Achieved 40% improvement in functional independence within 6 months for high-acuity trauma cases through evidence-based interventions',
      'Pioneered multidisciplinary trauma care model, collaborating with surgeons, prosthetists, and psychologists to provide holistic recovery',
      'Developed adaptive mobility solutions including prosthetic gait training and custom wheelchair systems, enabling 85% community ambulation success',
      'Implemented advanced pain management strategies combining manual therapy and graded motor imagery, reducing chronic pain in 70% of patients',
      'Mentored team of 6 junior physiotherapists, conducting weekly case reviews and skill-building workshops',
      'Authored 2 evidence-based clinical guidelines for early intervention in war-related injuries, adopted across 5 partner centers',
    ],
    achievements: [
      '300+ patients with complex trauma',
      '40% improvement in functional outcomes',
      '85% prosthetic ambulation success',
      '95% patient satisfaction rate',
    ],
  },
  {
    id: 'al-hayat',
    company: 'Al-Hayat Center',
    role: 'Physical Therapist',
    location: 'Jenin, Palestine',
    period: 'February 2022 - February 2024',
    description: [
      'Designed and implemented personalized treatment plans for 200+ patients with diverse orthopedic and neurological conditions',
      'Achieved 95% improvement in functional mobility and pain reduction through evidence-based therapeutic interventions',
      'Reduced average patient recovery time by 30% through proactive progress monitoring and optimized treatment protocols',
      'Collaborated with interdisciplinary healthcare teams to deliver holistic care, improving patient satisfaction scores by 40%',
      'Streamlined documentation workflows using Electronic Medical Records (EMR), reducing administrative time by 25%',
      'Developed tailored home exercise programs (HEPs) for 500+ patients, ensuring continuity of care and treatment adherence',
      'Utilized advanced modalities including ultrasound, electrical stimulation, and manual therapy to resolve chronic pain in 80% of cases',
    ],
    achievements: [
      '200+ successful treatment plans',
      '30% faster recovery times',
      '40% increased satisfaction scores',
      '500+ home exercise programs created',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(experiences[0].id);

  const activeExperience = experiences.find(exp => exp.id === activeTab) || experiences[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              headlineRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-light-bg/30 to-background dark:from-brand-dark-gray dark:to-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            Professional <span className="text-primary">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Delivering compassionate care through evidence-based rehabilitation
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(exp.id)}
              className={`flex-1 relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-left ${
                activeTab === exp.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-card border-2 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className={`w-5 h-5 ${activeTab === exp.id ? 'text-primary-foreground' : 'text-primary'}`} />
                <div>
                  <div className="text-sm font-bold">{exp.company}</div>
                  <div className={`text-xs ${activeTab === exp.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {exp.period.split(' - ')[0]}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div className="bg-card border-2 border-border rounded-2xl p-8 lg:p-10 shadow-xl">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                <Calendar className="w-4 h-4" />
                {activeExperience.period}
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
                {activeExperience.role}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <Briefcase className="w-5 h-5" />
                  {activeExperience.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {activeExperience.location}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

            {/* Responsibilities */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">◆</span> Key Responsibilities
              </h4>
              <ul className="space-y-3">
                {activeExperience.description.map((item, i) => (
                  <li 
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="pt-6 border-t border-border">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">★</span> Key Achievements
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {activeExperience.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
