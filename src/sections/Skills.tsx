import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Core Techniques (Featured)
  { name: 'Manual Therapy', category: 'Treatment', level: 98, featured: true },
  { name: 'Therapeutic Exercise', category: 'Treatment', level: 96, featured: true },
  { name: 'Joint Mobilization', category: 'Treatment', level: 95 },
  { name: 'Soft Tissue Mobilization', category: 'Treatment', level: 94 },
  { name: 'Neuromuscular Re-education', category: 'Treatment', level: 92 },
  { name: 'Gait Training', category: 'Treatment', level: 93 },
  
  // Rehabilitation Specializations
  { name: 'Orthopedic Rehabilitation', category: 'Specialization', level: 96 },
  { name: 'Sports Injury Recovery', category: 'Specialization', level: 94 },
  { name: 'Post-Surgical Rehabilitation', category: 'Specialization', level: 92 },
  { name: 'Trauma Care', category: 'Specialization', level: 98 },
  { name: 'Chronic Pain Management', category: 'Specialization', level: 90 },
  { name: 'Neurological Rehabilitation', category: 'Specialization', level: 95 },
  { name: 'Pediatric Therapy', category: 'Specialization', level: 88 },
  { name: 'Geriatric Care', category: 'Specialization', level: 87 },
  
  // Modalities & Equipment
  { name: 'Ultrasound Therapy', category: 'Modalities', level: 93 },
  { name: 'Electrical Stimulation', category: 'Modalities', level: 92 },
  { name: 'TENS Therapy', category: 'Modalities', level: 90 },
  { name: 'Heat/Cold Therapy', category: 'Modalities', level: 94 },
  { name: 'Iontophoresis', category: 'Modalities', level: 88 },
  { name: 'Prosthetic Gait Training', category: 'Modalities', level: 96 },
  
  // Assessment & Documentation
  { name: 'Functional Movement Screening', category: 'Assessment', level: 95 },
  { name: 'Range of Motion Testing', category: 'Assessment', level: 97 },
  { name: 'Strength Testing', category: 'Assessment', level: 96 },
  { name: 'Balance Assessment', category: 'Assessment', level: 94 },
  { name: 'EMR Documentation', category: 'Assessment', level: 92 },
  { name: 'SOAP Notes', category: 'Assessment', level: 95 },
  { name: 'Treatment Planning', category: 'Assessment', level: 96 },
];

const categories = Array.from(new Set(skills.map(s => s.category)));

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Headline
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

      // Skills with stagger
      skillsRef.current.forEach((skill, i) => {
        if (skill) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: skill,
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  skill,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.05 }
                );
              },
              once: true
            })
          );
        }
      });

      // Progress bars animation
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: bar,
              start: 'top 90%',
              onEnter: () => {
                const level = filteredSkills[i].level;
                gsap.fromTo(
                  bar,
                  { width: '0%' },
                  { width: `${level}%`, duration: 1.2, ease: 'power2.out', delay: i * 0.05 }
                );
              },
              once: true
            })
          );
        }
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredSkills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            Professional <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise in therapeutic techniques and rehabilitation specializations
          </p>
        </div>

        {/* Featured QuickBooks Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-brand-mint/20 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Activity className="w-10 h-10 text-primary" />
              <h3 className="text-3xl font-serif font-bold text-foreground">
                Core <span className="text-primary">Competencies</span>
              </h3>
            </div>
            <p className="text-center text-muted-foreground text-lg mb-8">
              Advanced proficiency in manual therapy techniques and therapeutic exercise programs, 
              with proven success in treating over 2,000 patients across diverse conditions.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.filter(s => s.featured).map((skill, i) => (
                <div key={`${i} - ${skill.name}-${skill.category}`} className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            All
          </button>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredSkills.filter(s => !s.featured).map((skill, i) => (
            <div
              key={`${skill.name}-${skill.category}`}
              ref={(el) => { skillsRef.current[i] = el; }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {skill.category}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  ref={(el) => { barsRef.current[i] = el; }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
