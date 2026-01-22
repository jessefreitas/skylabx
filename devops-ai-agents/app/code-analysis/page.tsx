'use client';

import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { BsClock, BsCodeSlash, BsExclamationCircle, BsLightbulbFill, BsUpload, BsXCircle } from 'react-icons/bs';

interface CodeIssue {
  severity: string;
  type: string;
  line: number;
  message: string;
}

interface AnalysisResult {
  codeContent?: string;
  quality_score: number;
  security_score: number;
  performance_score: number;
  avg_score: number;
  issues: CodeIssue[];
  recommendations: string[];
  language?: string;
}

interface AuditHistory {
  id: string;
  filename: string;
  avgScore: number;
  qualityScore: number;
  securityScore: number;
  createdAt: string;
}

export default function CodeAnalysisPage() {
  const [code, setCode] = useState('');
  const [filename, setFilename] = useState('script.py');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<AuditHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'issues'>('overview');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/code-audits');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  };

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Cole ou faça upload do código primeiro');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          filename,
          language: filename.split('.').pop()
        })
      });

      if (!response.ok) {
        throw new Error('Erro na análise');
      }

      const result = await response.json();
      setAnalysis(result);
      fetchHistory(); // Refresh history
      setActiveTab('overview');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Erro ao analisar código');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getSeverityColor = (severity: string) => {
    const s = severity.toLowerCase();
    if (s === 'critical') return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (s === 'major') return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  };

  return (
    <div className="min-h-screen bg-mega-main p-4 md:p-8 pt-40 text-mega-text-primary bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-mega-main [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>


      {/* Navbar is provided by layout.tsx */}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-2 mt-8">
              Code Quality AI
            </h1>
            <p className="text-slate-400 max-w-md">
              Auditoria profunda de código: Qualidade, Segurança e Performance.
            </p>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <BsClock size={18} className="text-white/80" />
            <span className="text-sm font-semibold">Histórico</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">

          {/* Left: Input */}
          <div className="lg:col-span-5 bg-mega-surface/50 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-black/40 p-3 border-b border-white/5 flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-purple-400"><BsCodeSlash /></span>
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="bg-transparent border-none text-neutral-300 focus:outline-none w-32 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <label className="cursor-pointer hover:text-white text-neutral-400 flex items-center gap-1 transition-colors">
                  <BsUpload size={14} /> Upload
                  <input type="file" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFilename(file.name);
                      const reader = new FileReader();
                      reader.onload = (e) => setCode(e.target?.result as string);
                      reader.readAsText(file);
                    }
                  }} />
                </label>
              </div>
            </div>
            <div className="flex-1 min-h-[400px]">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{ minimap: { enabled: false }, fontSize: 13, automaticLayout: true }}
              />
            </div>
            <div className="p-4 border-t border-white/5 bg-black/20">
              <button
                onClick={analyzeCode}
                disabled={loading || !code}
                className="w-full bg-white text-black hover:bg-white/90 font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analisando via IA...' : '🚀 Analisar Código'}
              </button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 bg-mega-surface/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md relative flex flex-col overflow-hidden">

            {analysis ? (
              <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-2">
                {/* Score Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5 text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(analysis.quality_score)}`}>{analysis.quality_score}</div>
                    <div className="text-xs text-neutral-500 uppercase mt-1">Qualidade</div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5 text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(analysis.security_score)}`}>{analysis.security_score}</div>
                    <div className="text-xs text-neutral-500 uppercase mt-1">Segurança</div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5 text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(analysis.performance_score)}`}>{analysis.performance_score}</div>
                    <div className="text-xs text-neutral-500 uppercase mt-1">Perform.</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/10 mb-4 pb-2">
                  <button onClick={() => setActiveTab('overview')} className={`text-sm font-medium pb-2 ${activeTab === 'overview' ? 'text-white border-b-2 border-purple-500' : 'text-neutral-500'}`}>Visão Geral</button>
                  <button onClick={() => setActiveTab('issues')} className={`text-sm font-medium pb-2 ${activeTab === 'issues' ? 'text-white border-b-2 border-purple-500' : 'text-neutral-500'}`}>Problemas ({analysis.issues.length})</button>
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                      <h3 className="text-emerald-400 font-medium mb-2 flex items-center gap-2"><BsLightbulbFill /> Recomendações Principais</h3>
                      <ul className="space-y-2">
                        {(analysis.recommendations || []).map((rec, i) => (
                          <li key={i} className="text-neutral-300 text-sm flex gap-2">
                            <span className="text-emerald-500">•</span> {rec}
                          </li>
                        ))}
                        {(!analysis.recommendations || analysis.recommendations.length === 0) && (
                          <li className="text-neutral-400 text-sm italic">Nenhuma recomendação específica.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'issues' && (
                  <div className="space-y-3">
                    {analysis.issues.map((issue, i) => (
                      <div key={i} className={`p-3 rounded-lg border flex gap-3 ${getSeverityColor(issue.severity || 'minor')}`}>
                        <div className="mt-1"><BsExclamationCircle /></div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-bold opacity-90">
                            <span className="uppercase text-xs tracking-wider">{issue.severity}</span>
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span>{issue.type}</span>
                            {issue.line > 0 && <span className="text-xs opacity-70 ml-auto font-mono">Linha {issue.line}</span>}
                          </div>
                          <p className="text-sm mt-1 opacity-80">{issue.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-600">
                <div className="w-20 h-20 mb-4 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                  <BsCodeSlash size={32} className="opacity-50" />
                </div>
                <p className="text-lg font-medium">Aguardando Código</p>
                <p className="text-sm">Selecione um arquivo ou cole ao lado.</p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-white text-sm flex gap-2 items-center animate-in slide-in-from-bottom-2">
                <BsXCircle /> {error}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* History Sidebar */}
      {showHistory && (
        <div className="fixed right-0 top-0 h-screen w-80 bg-mega-surface/95 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto z-50 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Histórico</h2>
            <button onClick={() => setShowHistory(false)} className="text-neutral-400 hover:text-white">✕</button>
          </div>
          <div className="space-y-3">
            {history.map(item => (
              <div key={item.id} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-white/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-blue-400 truncate max-w-[150px]">{item.filename}</span>
                  <span className={`text-sm font-bold ${getScoreColor(item.avgScore)}`}>{item.avgScore}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>Qlty: {item.qualityScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
