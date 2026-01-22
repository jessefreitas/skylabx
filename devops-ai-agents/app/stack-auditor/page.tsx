'use client';

import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { BsCheckCircle, BsClock, BsExclamationCircle, BsXCircle } from 'react-icons/bs';

interface ValidationIssue {
  severity: string;
  category: string;
  message: string;
}

interface ValidationSuggestion {
  category: string;
  message: string;
}

interface ValidationResult {
  mega_score: number;
  security_score: number;
  classification: string;
  stack_type: string;
  issues: ValidationIssue[];
  suggestions: ValidationSuggestion[];
  corrected_stack?: string;
}

interface AuditHistory {
  id: string;
  stackType: string;
  score: number;
  valid: boolean;
  createdAt: string;
}

export default function StackAuditorPage() {
  const [yaml, setYaml] = useState('');
  const [analysis, setAnalysis] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<AuditHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/audits');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  };

  const validateStack = async () => {
    if (!yaml.trim()) {
      setError('Cole uma stack YAML primeiro');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/validate-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stack_yaml: yaml })
      });

      if (!response.ok) {
        throw new Error('Erro na validação');
      }

      const result = await response.json();

      // Adapt API response to Frontend Interface
      const megaScore = result.mega_score || result.score || 0;
      const securityScore = result.security_score || result.score || 0;
      const avgScore = Math.round((megaScore + securityScore) / 2);

      const adaptedResult: ValidationResult = {
        mega_score: megaScore,
        security_score: securityScore,
        classification: avgScore >= 80 ? 'Aprovado' : avgScore >= 60 ? 'Atenção' : 'Crítico',
        stack_type: result.stack_type || 'Custom Stack',
        issues: Array.isArray(result.issues) ? result.issues : [],
        suggestions: Array.isArray(result.recommendations)
          ? result.recommendations.map((msg: string) => ({ category: 'Optimization', message: msg }))
          : (Array.isArray(result.suggestions) ? result.suggestions : []),
        corrected_stack: result.corrected_stack || ''
      };

      setAnalysis(adaptedResult);
      fetchHistory(); // Refresh history after new audit
    } catch (err: any) {
      console.error('Validation error:', err);
      setError(err.message || 'Erro ao validar stack');
    } finally {
      setLoading(false);
    }
  };

  const downloadCorrected = () => {
    const content = analysis?.corrected_stack || yaml;
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stack-corrigida.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="min-h-screen bg-mega-main p-4 md:p-8 pt-40 text-mega-text-primary bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-mega-main [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>


      {/* Navbar is provided by layout.tsx */}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-2 mt-8">
              Auditor de Stack
            </h1>
            <p className="text-slate-400 max-w-md">
              Validação inteligente de Docker Swarm powered by SkyLabX AI.
            </p>
          </div>
          {analysis && (
            <div className="flex gap-4">
              <div className="text-right p-4 rounded-2xl bg-mega-surface/50 border border-white/10 backdrop-blur-sm">
                <div className={`text-5xl font-bold ${getScoreColor(analysis.mega_score)} drop-shadow-lg`}>
                  {analysis.mega_score}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">MEGA Score</div>
              </div>
              <div className="text-right p-4 rounded-2xl bg-mega-surface/50 border border-white/10 backdrop-blur-sm">
                <div className={`text-5xl font-bold ${getScoreColor(analysis.security_score)} drop-shadow-lg`}>
                  {analysis.security_score}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Segurança</div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="p-4 rounded-2xl bg-mega-surface/50 border border-white/10 backdrop-blur-sm hover:border-blue-500/30 transition-all flex items-center gap-2"
        >
          <BsClock size={20} className="text-blue-400" />
          <span className="text-sm font-semibold">Histórico</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Editor */}
          <div className="bg-mega-surface/50 border border-white/10 rounded-3xl p-1 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <div className="bg-black/40 p-4 border-b border-white/5 flex justify-between items-center">
              <span className="text-sm font-mono text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                compose.yml
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".yml,.yaml"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (e) => setYaml(e.target?.result as string || '');
                    reader.readAsText(file);
                  }}
                />
                <label
                  htmlFor="file-upload"
                  className="text-xs bg-white/5 hover:bg-white/10 text-neutral-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>📂</span> Upload
                </label>

                <button
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      if (text) {
                        setYaml(text);
                      } else {
                        throw new Error('Empty');
                      }
                    } catch (e) {
                      const text = prompt('Cole o conteúdo do seu YAML aqui:');
                      if (text) setYaml(text);
                    }
                  }}
                  className="text-xs bg-white/5 hover:bg-white/10 text-neutral-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>📋</span> Colar
                </button>
                <span className="text-xs text-neutral-600">YAML Editor</span>
              </div>
            </div>
            <div className="p-0">
              <Editor
                height="500px"
                defaultLanguage="yaml"
                theme="vs-dark"
                value={yaml}
                onChange={(value) => setYaml(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  padding: { top: 16 },
                  fontFamily: "'Fira Code', monospace",
                  renderLineHighlight: 'none',
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  automaticLayout: true,
                }}
                className="bg-transparent"
              />
            </div>
            <div className="p-4 border-t border-white/5 bg-black/20">
              <button
                onClick={validateStack}
                disabled={loading || !yaml}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1"
              >
                {loading ? 'Processando...' : 'Validar Stack'}
              </button>
            </div>
          </div>


          {/* Real-time Analysis */}
          <div className="bg-mega-surface/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-2 relative z-10">
              <span className="text-2xl">📊</span> Análise
            </h2>

            {analysis ? (
              <div className="space-y-6 relative z-10 h-full overflow-y-auto custom-scrollbar pr-2 pb-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <span className="text-xs text-neutral-500 block mb-1">Stack Type</span>
                    <span className="text-blue-400 font-mono font-bold text-lg">{analysis.stack_type}</span>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <span className="text-xs text-neutral-500 block mb-1">Status</span>
                    <span className="text-emerald-400 font-mono font-bold text-lg">{analysis.classification}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {analysis.issues.map((issue, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 hover:border-rose-500/30 transition-all">
                      <span className="mt-1 text-rose-500 shrink-0">
                        <BsXCircle size={20} />
                      </span>
                      <div>
                        <h4 className="text-rose-200 font-medium text-sm">Problema Crítico</h4>
                        <p className="text-neutral-400 text-sm mt-1">{issue.message}</p>
                      </div>
                    </div>
                  ))}

                  {analysis.suggestions.map((sug, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                      <span className="mt-1 text-emerald-500 shrink-0">
                        <BsCheckCircle size={20} />
                      </span>
                      <div>
                        <h4 className="text-emerald-200 font-medium text-sm uppercase tracking-wider">{sug.category}</h4>
                        <p className="text-neutral-400 text-sm mt-1">{sug.message}</p>
                      </div>
                    </div>
                  ))}

                  {analysis.issues.length === 0 && analysis.suggestions.length === 0 && (
                    <div className="text-center py-10">
                      <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-4">
                        <BsCheckCircle size={40} className="text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Stack Perfeita!</h3>
                      <p className="text-neutral-400">Nenhum problema encontrado nos padrões Mega.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-neutral-600 py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl relative z-10">
                <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                  <span className="text-4xl opacity-50">⚡</span>
                </div>
                <p className="text-lg font-medium text-neutral-400 mb-2">Aguardando Input</p>
                <p className="text-sm max-w-xs mx-auto">Cole o YAML ao lado para iniciar a auditoria de inteligência artificial.</p>
              </div>
            )}

            {error && (
              <div className="absolute bottom-6 left-6 right-6 bg-red-900/90 border border-red-500 text-white p-4 rounded-xl flex items-center gap-3 backdrop-blur-xl z-50 animate-in slide-in-from-bottom-5">
                <BsExclamationCircle size={24} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Sidebar */}
      {showHistory && (
        <div className="fixed right-0 top-0 h-screen w-96 bg-mega-surface/95 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto z-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Histórico de Auditorias</h2>
            <button onClick={() => setShowHistory(false)} className="text-neutral-400 hover:text-white">
              ✕
            </button>
          </div>
          <div className="space-y-3">
            {history.map((audit) => (
              <div
                key={audit.id}
                className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-blue-400">{audit.stackType}</span>
                  <span className={`text-lg font-bold ${audit.score >= 80 ? 'text-emerald-400' : audit.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {audit.score}
                  </span>
                </div>
                <div className="text-xs text-neutral-500">
                  {new Date(audit.createdAt).toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center text-neutral-500 py-10">
                Nenhuma auditoria ainda
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
