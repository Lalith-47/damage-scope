import React, { useState, useEffect } from 'react';
import { Shield, Activity, RefreshCw, AlertTriangle, Layers, BarChart3, History, Cpu, ArrowLeft } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import OverlayViewer from './components/OverlayViewer';
import DamageCharts from './components/DamageCharts';
import RecommendationsCard from './components/RecommendationsCard';
import AssessmentHistory from './components/AssessmentHistory';
import { uploadAssessment, triggerSampleAssessment, getAssessmentStatus } from './api';

// Landing Page Components
import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import LogoMarquee from './components/landing/LogoMarquee';
import FeatureGrid from './components/landing/FeatureGrid';
import HowItWorks from './components/landing/HowItWorks';
import LiveDashboardPreview from './components/landing/LiveDashboardPreview';
import SocialProofStats from './components/landing/SocialProofStats';
import CTABanner from './components/landing/CTABanner';
import Footer from './components/landing/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'console'
  const [activeTab, setActiveTab] = useState('console');   // 'console' | 'analytics' | 'history'
  
  const [activeJobId, setActiveJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);       // 'processing' | 'completed' | 'failed'
  const [assessmentData, setAssessmentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [polling, setPolling] = useState(false);

  // Polling hook for active job ID
  useEffect(() => {
    if (!activeJobId || jobStatus === 'completed' || jobStatus === 'failed') {
      return;
    }

    setPolling(true);
    const interval = setInterval(async () => {
      try {
        const res = await getAssessmentStatus(activeJobId);
        if (res.status === 'completed') {
          setJobStatus('completed');
          setAssessmentData(res.data);
          setPolling(false);
          clearInterval(interval);
        } else if (res.status === 'failed') {
          setJobStatus('failed');
          setErrorMessage(res.message || 'Assessment processing failed.');
          setPolling(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [activeJobId, jobStatus]);

  const handleLaunchConsole = () => {
    setActiveView('console');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAssessment = async (preFile, postFile) => {
    setErrorMessage('');
    setAssessmentData(null);
    setJobStatus('processing');
    setActiveView('console');
    setActiveTab('console');
    try {
      const res = await uploadAssessment(preFile, postFile);
      setActiveJobId(res.job_id);
    } catch (err) {
      setJobStatus('failed');
      setErrorMessage(err.message || 'Failed to start assessment.');
    }
  };

  const handleStartSample = async () => {
    setErrorMessage('');
    setAssessmentData(null);
    setJobStatus('processing');
    setActiveView('console');
    setActiveTab('console');
    try {
      const res = await triggerSampleAssessment();
      setActiveJobId(res.job_id);
    } catch (err) {
      setJobStatus('failed');
      setErrorMessage(err.message || 'Failed to start demo test pair.');
    }
  };

  const handleLoadHistoricalAssessment = async (jobId) => {
    setErrorMessage('');
    setJobStatus('processing');
    setActiveJobId(jobId);
    setActiveView('console');
    setActiveTab('console');
    try {
      const res = await getAssessmentStatus(jobId);
      if (res.status === 'completed') {
        setJobStatus('completed');
        setAssessmentData(res.data);
      } else {
        setJobStatus(res.status);
      }
    } catch (err) {
      setJobStatus('failed');
      setErrorMessage('Failed to load historical assessment details.');
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Sticky SaaS Navbar */}
      <Navbar
        onLaunchConsole={handleLaunchConsole}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* VIEW A: LANDING PAGE EXPERIENCE */}
      {activeView === 'landing' && (
        <div className="flex-1">
          <HeroSection
            onLaunchConsole={handleLaunchConsole}
            onRunSample={handleStartSample}
          />
          <LogoMarquee />
          <FeatureGrid />
          <HowItWorks />
          <LiveDashboardPreview onLaunchConsole={handleLaunchConsole} />
          <SocialProofStats />
          <CTABanner onLaunchConsole={handleLaunchConsole} />
          <Footer onLaunchConsole={handleLaunchConsole} />
        </div>
      )}

      {/* VIEW B: LIVE TACTICAL AI ASSESSMENT CONSOLE */}
      {activeView === 'console' && (
        <div className="flex-1 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView('landing')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono text-xs flex items-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK TO LANDING</span>
                </button>
                <div className="h-4 w-[1px] bg-slate-800" />
                <span className="font-mono text-xs text-slate-400">TACTICAL INFERENCE CONSOLE</span>
              </div>

              {/* Console Sub-Navigation Tabs */}
              <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('console')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                    activeTab === 'console'
                      ? 'bg-cyan-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>CONSOLE</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-cyan-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>ANALYTICS & REPORTS</span>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${
                    activeTab === 'history'
                      ? 'bg-cyan-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>HISTORY LOGS</span>
                </button>
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Processing Banner */}
            {jobStatus === 'processing' && (
              <div className="tactical-card mb-8 rounded-xl p-5 border border-cyan-500/50 bg-cyan-950/20 relative overflow-hidden font-mono shadow-glow-cyan">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent radar-scanner" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                    <div>
                      <h3 className="text-sm font-bold text-cyan-300">
                        ONNX INFERENCE ENGINE EXECUTING...
                      </h3>
                      <p className="text-xs text-slate-400">
                        Processing 1024x1024 satellite tensors & dual-stage UNet damage classification [Job #{activeJobId?.slice(0, 8)}]
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded border border-cyan-800">
                    POLLING STATUS
                  </span>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {jobStatus === 'failed' && (
              <div className="mb-8 rounded-xl p-4 bg-red-950/70 border border-red-800 text-red-300 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Assessment Error: {errorMessage}</span>
                </div>
                <button
                  onClick={() => setJobStatus(null)}
                  className="px-2 py-1 bg-red-900 text-red-200 rounded hover:bg-red-850"
                >
                  DISMISS
                </button>
              </div>
            )}

            {/* Tab 1: Assessment Console */}
            {activeTab === 'console' && (
              <>
                <ImageUploader
                  onStartAssessment={handleStartAssessment}
                  onStartSample={handleStartSample}
                  isProcessing={jobStatus === 'processing'}
                />

                {assessmentData && (
                  <>
                    <RecommendationsCard
                      recommendations={assessmentData.recommendations}
                      jobId={assessmentData.job_id}
                      riskLevel={assessmentData.risk_level}
                    />

                    <OverlayViewer
                      preImageUrl={assessmentData.pre_image_url}
                      postImageUrl={assessmentData.post_image_url}
                      buildings={assessmentData.buildings}
                      summary={assessmentData.summary}
                    />
                  </>
                )}
              </>
            )}

            {/* Tab 2: Analytics */}
            {activeTab === 'analytics' && (
              <>
                {assessmentData ? (
                  <>
                    <DamageCharts
                      summary={assessmentData.summary}
                      riskLevel={assessmentData.risk_level}
                    />

                    <RecommendationsCard
                      recommendations={assessmentData.recommendations}
                      jobId={assessmentData.job_id}
                      riskLevel={assessmentData.risk_level}
                    />
                  </>
                ) : (
                  <div className="tactical-card p-12 rounded-xl border border-slate-800 text-center font-mono">
                    <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-300 mb-1">NO ACTIVE ASSESSMENT LOADED</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Run an assessment from the console or select a historical assessment from logs to view analytics.
                    </p>
                    <button
                      onClick={() => setActiveTab('console')}
                      className="px-4 py-2 bg-cyan-600 text-white font-bold text-xs rounded-lg hover:bg-cyan-500 transition-all"
                    >
                      GO TO CONSOLE
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Tab 3: History */}
            {activeTab === 'history' && (
              <AssessmentHistory onLoadAssessment={handleLoadHistoricalAssessment} />
            )}
          </main>
          
          <Footer onLaunchConsole={handleLaunchConsole} />
        </div>
      )}
    </div>
  );
}
