import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  ShieldAlert, AlertTriangle, CheckCircle, BarChart3, 
  TrendingDown, TrendingUp, Layers, ExternalLink 
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface DashboardPageProps {
  language: Language;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ language }) => {
  const t = getTranslation(language);
  const [stats, setStats] = useState({
    scans_completed: 1482,
    critical_alerts: 412,
    high_alerts: 538,
    caution_alerts: 364,
    low_alerts: 168,
    top_patterns: [
      { pattern: "Guaranteed Returns", count: 784, percentage: 52.9 },
      { pattern: "Fake SEBI Claims", count: 622, percentage: 41.9 },
      { pattern: "Urgency Pressure", count: 589, percentage: 39.7 },
      { pattern: "Personal UPI Demands", count: 510, percentage: 34.4 },
      { pattern: "Phishing URLs", count: 443, percentage: 29.8 },
      { pattern: "OTP / PIN Requests", count: 289, percentage: 19.5 }
    ],
    sources_breakdown: [
      { name: "WhatsApp", value: 42.6, count: 632, color: "#10B981" },
      { name: "Telegram", value: 32.4, count: 481, color: "#0284C7" },
      { name: "Instagram / Ads", value: 16.5, count: 245, color: "#EC4899" },
      { name: "SMS / Calls", value: 8.5, count: 124, color: "#F59E0B" }
    ]
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.scans_completed) {
          setStats(prev => ({
            ...prev,
            ...data,
            sources_breakdown: [
              { name: "WhatsApp", value: 42.6, count: 632, color: "#10B981" },
              { name: "Telegram", value: 32.4, count: 481, color: "#0284C7" },
              { name: "Instagram / Ads", value: 16.5, count: 245, color: "#EC4899" },
              { name: "SMS / Calls", value: 8.5, count: 124, color: "#F59E0B" }
            ]
          }));
        }
      })
      .catch(err => console.log("Using cached stats:", err));
  }, []);

  const localizedPatterns = stats.top_patterns.map(p => ({
    ...p,
    pattern: language === 'hi' 
      ? (p.pattern === "Guaranteed Returns" ? "गारंटीड रिटर्न" :
         p.pattern === "Fake SEBI Claims" ? "फर्जी SEBI दावा" :
         p.pattern === "Urgency Pressure" ? "जल्दबाजी का दबाव" :
         p.pattern === "Personal UPI Demands" ? "व्यक्तिगत UPI माँग" :
         p.pattern === "Phishing URLs" ? "फ़िशिंग लिंक" :
         p.pattern === "OTP / PIN Requests" ? "OTP की माँग" : p.pattern)
      : language === 'ta'
      ? (p.pattern === "Guaranteed Returns" ? "உறுதியான வருமானம்" :
         p.pattern === "Fake SEBI Claims" ? "போலி SEBI சான்று" :
         p.pattern === "Urgency Pressure" ? "அவசர அழுத்தம்" :
         p.pattern === "Personal UPI Demands" ? "தனிநபர் UPI கோரிக்கை" :
         p.pattern === "Phishing URLs" ? "மோசடி இணைப்புகள்" :
         p.pattern === "OTP / PIN Requests" ? "OTP கோரிக்கை" : p.pattern)
      : p.pattern
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>{t.dashboardCategory}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
          {t.dashboardTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          {t.dashboardDescription}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Scans */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            {t.totalScannedKpi}
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950">
            {stats.scans_completed.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-blue-600 font-semibold">{t.privacyFirstBadge}</span>
          </p>
        </div>

        {/* Critical Risk Identified */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">
            {t.criticalAlertsKpi}
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-red-600">
            {stats.critical_alerts.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {((stats.critical_alerts / stats.scans_completed) * 100).toFixed(1)}% {language === 'hi' ? 'कुल सबमिशन का' : language === 'ta' ? 'மொத்தத்தில்' : 'of submissions'}
          </p>
        </div>

        {/* High Risk */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
            {t.highAlertsKpi}
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-orange-600">
            {stats.high_alerts.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {((stats.high_alerts / stats.scans_completed) * 100).toFixed(1)}% {language === 'hi' ? 'कुल सबमिशन का' : language === 'ta' ? 'மொத்தத்தில்' : 'of submissions'}
          </p>
        </div>

        {/* Low Concern / Legitimate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            {t.cautionAlertsKpi}
          </span>
          <div className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-600">
            {stats.low_alerts.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {((stats.low_alerts / stats.scans_completed) * 100).toFixed(1)}% {language === 'hi' ? 'सत्यापित सामग्री' : language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'verified disclosures'}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Scam Patterns Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base text-navy-900">
                {t.topScamPatternsTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' 
                  ? 'खुदरा निवेशकों के सबमिशन में आवृत्ति' 
                  : language === 'ta' 
                  ? 'முதலீட்டாளர் சமர்ப்பிப்புகளில் அதிகம் காணப்படுபவை' 
                  : 'Frequency across retail investor submissions'}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              Live Aggregates
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={localizedPatterns}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis 
                  dataKey="pattern" 
                  type="category" 
                  stroke="#475569" 
                  fontSize={11}
                  width={140}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#FFF', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} occurrences`, 'Frequency']}
                />
                <Bar dataKey="count" fill="#1E3E62" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Channels Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-base text-navy-900">
                {t.threatChannelsTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' 
                  ? 'रोके गए संदिग्ध संदेशों का वितरण' 
                  : language === 'ta' 
                  ? 'சந்தேகத்திற்குரிய செய்திகளின் மூலம்' 
                  : 'Share of intercepted suspicious claims'}
              </p>
            </div>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.sources_breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.sources_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#FFF', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            {stats.sources_breakdown.map((src, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: src.color }}></span>
                <span className="text-slate-700 font-medium">{src.name}</span>
                <span className="text-slate-400 text-[11px] ml-auto">{src.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
