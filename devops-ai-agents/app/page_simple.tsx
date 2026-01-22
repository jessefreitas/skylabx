"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">SkyLabX DevOps Platform</h1>
      <p className="mb-8 text-slate-400">Choose a tool to begin:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link href="/stack-auditor" className="p-6 bg-slate-800 rounded-xl border border-purple-500/20 hover:border-purple-500 transition-colors">
          <h2 className="text-xl font-bold text-purple-400 mb-2">Stack Auditor</h2>
          <p className="text-sm text-slate-400">Validate Docker Swarm stacks against Mega standards.</p>
        </Link>

        <Link href="/ci-cd" className="p-6 bg-slate-800 rounded-xl border border-blue-500/20 hover:border-blue-500 transition-colors">
          <h2 className="text-xl font-bold text-blue-400 mb-2">CI/CD Pipeline</h2>
          <p className="text-sm text-slate-400">Manage automated deployment workflows.</p>
        </Link>
      </div>
    </div>
  );
}
