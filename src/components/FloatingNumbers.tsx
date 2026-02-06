import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingNumbersProps {
  className?: string;
}

export default function FloatingNumbers({ className = '' }: FloatingNumbersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const icons = [
      // Physiotherapy & Medical
      '🏥', '⚕️', '🩺', '💊', '🩹', '💉',
      // Sports & Fitness
      '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏋️', '🤸', '🏃', '🚴',
      // Body & Movement
      '🦴', '🦵', '🦶', '👐', '💪', '🤲',
      // Therapy Tools
      '🎯', '📋', '📊', '✅', '❤️‍🩹', '♥️',
      // Recovery & Wellness
      '🌟', '✨', '💫', '⭐', '🎖️'
    ];

    const createFloatingIcon = () => {
      if (!containerRef.current) return;

      const icon = icons[Math.floor(Math.random() * icons.length)];
      const element = document.createElement('div');
      element.textContent = icon;
      element.className = 'floating-icon absolute text-primary/20 dark:text-primary/10 pointer-events-none';
      element.style.fontSize = `${Math.random() * 35 + 25}px`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      containerRef.current.appendChild(element);

      gsap.to(element, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        rotation: Math.random() * 360 - 180,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 3 + 4,
        ease: 'power1.out',
        onComplete: () => {
          element.remove();
        }
      });
    };

    const interval = setInterval(createFloatingIcon, 400);

    // Create initial burst
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingIcon, i * 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
