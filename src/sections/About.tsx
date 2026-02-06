import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Heart, Users, Award, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Activity, value: 4, suffix: '+', label: 'Years Experience', color: 'text-primary' },
  { icon: Users, value: 2000, suffix: '+', label: 'Therapy Sessions', color: 'text-accent' },
  { icon: Heart, value: 300, suffix: '+', label: 'Patients Treated', color: 'text-primary' },
  { icon: Award, value: 95, suffix: '%', label: 'Patient Satisfaction', color: 'text-accent' },
];

const highlights = [
  { 
    icon: Target, 
    title: 'Trauma Rehabilitation', 
    desc: 'Specialized in treating complex war injuries, amputations, and neurological conditions with advanced rehabilitation protocols' 
  },
  { 
    icon: Activity, 
    title: 'Sports Medicine', 
    desc: 'Expert in sports injury recovery, therapeutic exercise, and performance optimization for athletes at all levels' 
  },
  { 
    icon: Zap, 
    title: 'Manual Therapy', 
    desc: 'Advanced skills in manual therapy, joint mobilization, and soft tissue techniques for pain management and recovery' 
  },
];


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [countedStats, setCountedStats] = useState(stats.map(() => 0));

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

      // Highlight cards
      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 50, rotateX: 10 },
                  { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15 }
                );
              },
              once: true
            })
          );
        }
      });

      // Stats with counter animation
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: stat,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  stat,
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: i * 0.1 }
                );

                // Counter animation
                const targetValue = stats[i].value;
                gsap.to({}, {
                  duration: 1.5,
                  ease: 'power2.out',
                  delay: i * 0.1,
                  onUpdate: function() {
                    const progress = this.progress();
                    setCountedStats(prev => {
                      const newStats = [...prev];
                      newStats[i] = Math.floor(targetValue * progress);
                      return newStats;
                    });
                  },
                  onComplete: () => {
                    setCountedStats(prev => {
                      const newStats = [...prev];
                      newStats[i] = targetValue;
                      return newStats;
                    });
                  }
                });
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
  }, []);


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary/50 dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Diagonal stripes pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary)) 35px, hsl(var(--primary)) 36px)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="relative p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                
                {/* Value */}
                <div className="text-3xl font-serif font-bold text-foreground mb-1">
                  {countedStats[i]}{stat.suffix}
                </div>
                
                {/* Label */}
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bio Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-8 bg-card border border-border rounded-2xl shadow-card">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I'm a dedicated Physical Therapist with <span className="text-primary font-semibold">4+ years of experience</span> delivering 
              high-quality, patient-centered care and rehabilitation programs. With over 2,000 therapy sessions completed, I specialize in 
              trauma rehabilitation, sports injury recovery, and comprehensive patient care.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise encompasses <span className="text-accent font-semibold">manual therapy, therapeutic exercise</span>, and injury prevention. 
              Currently working at Al Jaleel Rehabilitation Center with Humanity & Inclusion, I'm committed to improving patient outcomes and 
              enhancing quality of life through evidence-based practice and compassionate care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
