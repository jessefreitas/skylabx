'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export const FeatureCard = ({ title, description, icon, link }: FeatureCardProps) => {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-800 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500 transition-colors cursor-pointer h-full"
      >
        <div className="text-purple-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-purple-400 font-semibold group">
          Explore <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
};
