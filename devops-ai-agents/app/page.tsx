"use client";

import { cn, vortexGradientText, vortexTypography } from "@/lib/vortex-design";
import Link from "next/link";
import {
  BsArrowRight,
  BsCodeSlash,
  BsExclamationTriangle,
  BsGraphUp,
  BsHddNetwork,
  BsShieldCheck,
  BsSpeedometer2
} from 'react-icons/bs';

export default function Home() {
  const features = [
    {
      title: "Auditor de Stack",
      description: "Validação automática de Docker Swarm contra padrões de infraestrutura.",
      link: "/stack-auditor",
      icon: <BsShieldCheck className="w-8 h-8" />,
      status: "Ativo"
    },
    {
      title: "Análise de Código",
      description: "Revisão estática e dinâmica de segurança para suas aplicações.",
      link: "/code-analysis",
      icon: <BsCodeSlash className="w-8 h-8" />,
      status: "Ativo"
    },
    {
      title: "Infraestrutura Cloud",
      description: "Gerenciamento inteligente de recursos e custos cloud.",
      link: "/cloud-infrastructure",
      icon: <BsHddNetwork className="w-8 h-8" />,
      status: "Em Breve"
    },
    {
      title: "Monitoramento",
      description: "Dashboards em tempo real de performance e saúde dos serviços.",
      link: "/performance-monitoring",
      icon: <BsGraphUp className="w-8 h-8" />,
      status: "Em Breve"
    },
    {
      title: "Teste de Carga",
      description: "Simulação de alto tráfego para testar resiliência.",
      link: "/load-testing",
      icon: <BsSpeedometer2 className="w-8 h-8" />,
      status: "Em Breve"
    },
    {
      title: "Gestão de Incidentes",
      description: "Rastreamento e resolução ágil de problemas em produção.",
      link: "/incident-management",
      icon: <BsExclamationTriangle className="w-8 h-8" />,
      status: "Em Breve"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 pt-32">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            v2.0 is now live: Deploy 3x faster
          </div>

          {/* Main Title */}
          <h1 className={cn(vortexTypography.display, "mb-6")}>
            <span className={vortexGradientText()}>
              Your Unified<br />
              DevOps Pipeline
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
            Simplify infrastructure, automate CI/CD, and monitor application health with
            enterprise-grade tools built for every scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 flex items-center gap-2">
              Get Started Now
              <BsArrowRight />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-lg font-medium">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className={cn(vortexTypography.h1, vortexGradientText(), "mb-4")}>
            Platform Completa
          </h2>
          <p className="text-slate-400">
            Ferramentas integradas para toda sua stack DevOps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="group bg-[rgba(17,17,17,0.8)] backdrop-blur-xl border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-white/80 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold",
                  feature.status === "Ativo"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-slate-500/10 text-slate-500"
                )}>
                  {feature.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-[14px] font-bold">S</span>
            </div>
            <span className="font-bold tracking-tight">SkyLabX</span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>

          <p className="text-xs text-slate-500">© 2024 SkyLabX by OmniForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
