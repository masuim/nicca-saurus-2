import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type ConfettiProps = {
  isAnimating: boolean;
  className?: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  vx: number;
  vy: number;
  vr: number;
};

const colors = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7', '#FF69B4', '#00FF00'];

export const Confetti = ({ isAnimating, className }: ConfettiProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setParticles((prev) => {
          const newParticle = {
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: -20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            rotation: Math.random() * 360,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 1,
            vr: (Math.random() - 0.5) * 2,
          };
          return [...prev, newParticle].slice(-100);
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isAnimating]);

  return (
    <div
      className={className}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: particle.y, x: particle.x, rotate: particle.rotation }}
          animate={{
            y: window.innerHeight + 20,
            x: particle.x + particle.vx * 100,
            rotate: particle.rotation + particle.vr * 360,
          }}
          transition={{ duration: 4, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};
