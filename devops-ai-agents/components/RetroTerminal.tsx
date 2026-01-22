"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BsTerminal, BsX } from 'react-icons/bs';
import { getCommandHelp, parseCommand } from '../app/utils/commandParser';
// import { useDevOps } from '../app/contexts/DevOpsContext'; // Uncomment when fully integrated

interface RetroTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RetroTerminal: React.FC<RetroTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([
    'SKYLABX AGENT SYSTEM v1.0',
    'CONNECTION ESTABLISHED...',
    'Type HELP for command list.'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [history, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand();
    }
  };

  const handleCommand = async () => {
    if (!input.trim()) return;

    const newHistory = [...history, `root@skylabx:~# ${input}`];

    const { command, subCommand } = parseCommand(input);

    // Simulate processing delay
    // In real implementation, this would call the Python API
    if (command === 'CLEAR') {
      setHistory(['Screen cleared.']);
      setInput('');
      return;
    }

    if (command === 'EXIT') {
      setHistory([...newHistory, 'Closing session...']);
      setTimeout(onClose, 800);
      setInput('');
      return;
    }

    // Default response for now
    let response = [`Unknown command: ${command}`];

    if (['HELP', 'EC2', 'DEPLOY'].includes(command)) {
      response = getCommandHelp(command);
    } else if (command === 'VERSION') {
      response = ['SkyLabX Core v2.0', 'Agent Protocol: ACTIVE'];
    }

    setHistory([...newHistory, ...response]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl h-[600px] bg-black border-2 border-green-500 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] flex flex-col font-mono text-green-500 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-green-500/50 bg-green-900/20">
          <div className="flex items-center gap-2 text-sm">
            <BsTerminal />
            <span>TERMINAL.EXE</span>
          </div>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <BsX size={24} />
          </button>
        </div>

        {/* Console Area */}
        <div className="flex-1 p-4 overflow-y-auto font-bold text-sm md:text-base space-y-1 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className="break-words">{line}</div>
          ))}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500">root@skylabx:~#</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-1 bg-green-900/20 border-t border-green-500/50 text-xs flex justify-between uppercase">
          <span>Status: ONLINE</span>
          <span>Mem: 24GB / CPU: 12%</span>
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
