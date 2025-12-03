"use client";

import React from "react";
import { Phone, Mail, Linkedin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Types
interface SocialBoxProps {
  href?: string;
  icon: React.ReactNode;
  className: string;
  delay?: string;
  onClick?: () => void;
  hoverColor?: string;
}

interface SocialCardProps {
  title?: string;
  socialLinks?: Array<SocialBoxProps>;
}

// Components
const SocialBox = ({ href, icon, className, delay, onClick, hoverColor }: SocialBoxProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      // Only prevent default if it's not a link or if we want to override link behavior
      // But for mailto, we want both copy and open.
      onClick();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const Content = (
    <div
      className={`box ${className} group h-20 w-20 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white shadow-lg cursor-pointer relative`}
      style={{ transitionDelay: delay }}
      onClick={!href ? handleClick : undefined}
    >
      <motion.span
        className={`icon transition-colors duration-300 ${hoverColor}`}
        animate={isCopied ? { scale: [1, 0.5, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {icon}
      </motion.span>

      {/* Copied! Tooltip/Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={isCopied ? { opacity: 1, scale: 1, y: -40 } : { opacity: 0, scale: 0.5, y: 10 }}
        className="absolute bg-white text-black text-xs font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap"
      >
        Copied!
      </motion.div>

      {/* Success Ring Animation */}
      {isCopied && (
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-3xl border-2 border-green-400 pointer-events-none"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick ? handleClick : undefined}>
        {Content}
      </a>
    );
  }

  return Content;
};

export const SocialCard = ({
  title = "SOCIALS",
  socialLinks = [
    {
      onClick: () => {
        navigator.clipboard.writeText("0684470970");
        // Removed alert to rely on visual feedback
      },
      icon: <Phone className="w-8 h-8" />,
      className: "box1",
      hoverColor: "group-hover:text-green-500"
    },
    {
      href: "https://mail.google.com/mail/u/0/#inbox",
      onClick: () => {
        navigator.clipboard.writeText("eparoissien@eugeniaschool.com");
      },
      icon: <Mail className="w-8 h-8" />,
      className: "box2",
      delay: "0.2s",
      hoverColor: "group-hover:text-red-500"
    },
    {
      href: "https://www.linkedin.com/in/enzo-paroissien/",
      icon: <Linkedin className="w-8 h-8" />,
      className: "box3",
      delay: "0.4s",
      hoverColor: "group-hover:text-blue-700"
    },
  ],
}: SocialCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div
      className="card relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-600 via-indigo-900 to-blue-500 p-8 flex flex-col justify-between min-h-[300px]"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_50%)]" />

      <div className="relative z-10 flex w-full items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <h2 className="text-4xl font-black tracking-[0.2em] text-white uppercase drop-shadow-lg">
          {title}
        </h2>

        {/* Decorative empty boxes from the reference image */}
        <div className="flex gap-4 opacity-50">
          <div className="h-16 w-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm" />
          <div className="h-16 w-16 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm" />
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-6 mt-auto" style={{ transform: "translateZ(40px)" }}>
        {socialLinks.map((link, index) => (
          <SocialBox
            key={index}
            {...link}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Component = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <SocialCard />
    </div>
  );
};
