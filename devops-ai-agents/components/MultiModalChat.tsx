'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BsChatDots, BsImage, BsMic, BsRobot, BsSend, BsX } from 'react-icons/bs';

export default function MultiModalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-mega-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-mega-main/50 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-mega-highlight/20 flex items-center justify-center">
                  <BsRobot className="text-mega-highlight" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">DevOps Agent</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-neutral-400">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
              >
                <BsX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-mega-highlight/10 border border-mega-highlight/20 p-3 rounded-2xl rounded-tl-none max-w-[85%] self-start">
                <p className="text-sm text-neutral-200">
                  Olá! Sou seu assistente DevOps SkyLabX. Como posso ajudar com sua infraestrutura hoje?
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-mega-main/50 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre sua stack..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 pr-24 text-sm text-white focus:outline-none focus:border-mega-highlight transition-colors placeholder-neutral-500"
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <button className="p-1.5 text-neutral-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                    <BsMic size={16} />
                  </button>
                  <button className="p-1.5 text-neutral-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                    <BsImage size={16} />
                  </button>
                  <button className="p-1.5 text-mega-highlight hover:text-blue-400 transition-colors hover:bg-mega-highlight/10 rounded-lg">
                    <BsSend size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-mega-highlight hover:bg-blue-600 text-white shadow-lg shadow-blue-900/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <BsX size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <BsChatDots size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
