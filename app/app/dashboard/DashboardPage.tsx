"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  Globe,
  Mail,
  Bot,
  Activity,
  TrendingUp,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Threat {
  id: number;
  type: string;
  risk: "High" | "Medium" | "Low";
  time: string;
  description?: string;
}

export default function Dashboard() {
  const [threatScore, setThreatScore] = useState<number | null>(null);
  const [activeThreatCount, setActiveThreatCount] = useState<number | null>(null);
  const [emailsScanned, setEmailsScanned] = useState<number | null>(null);
  const [urlsChecked, setUrlsChecked] = useState<number | null>(null);
  const [recentThreats, setRecentThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch dashboard stats from backend
        const response = await fetch("http://localhost:8000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // If API not available, use demo data
          setThreatScore(72);
          setActiveThreatCount(12);
          setEmailsScanned(134);
          setUrlsChecked(89);
          setRecentThreats([
            {
              id: 1,
              type: "Phishing Email",
              risk: "High",
              time: "5 min ago",
              description: "Detected suspicious phishing attempt from financial institution impersonator",
            },
            {
              id: 2,
              type: "Malicious URL",
              risk: "Medium",
              time: "15 min ago",
              description: "URL flagged for potential malware distribution",
            },
            {
              id: 3,
              type: "Suspicious IP",
              risk: "High",
              time: "30 min ago",
              description: "IP address with history of brute force attacks",
            },
            {
              id: 4,
              type: "Credential Leak",
              risk: "Low",
              time: "1 hour ago",
              description: "Email found in HIBP database from past breach",
            },
          ]);
          return;
        }

        const data = await response.json();
        
        // Set data from API response
        setThreatScore(data.threat_score || 72);
        setActiveThreatCount(data.active_threats || 12);
        setEmailsScanned(data.emails_scanned || 134);
        setUrlsChecked(data.urls_checked || 89);
        setRecentThreats(data.recent_threats || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        // Use demo data on error
        setThreatScore(72);
        setActiveThreatCount(12);
        setEmailsScanned(134);
        setUrlsChecked(89);
        setRecentThreats([
          {
            id: 1,
            type: "Phishing Email",
            risk: "High",
            time: "5 min ago",
            description: "Detected suspicious phishing attempt from financial institution impersonator",
          },
          {
            id: 2,
            type: "Malicious URL",
            risk: "Medium",
            time: "15 min ago",
            description: "URL flagged for potential malware distribution",
          },
          {
            id: 3,
            type: "Suspicious IP",
            risk: "High",
            time: "30 min ago",
            description: "IP address with history of brute force attacks",
          },
          {
            id: 4,
            type: "Credential Leak",
            risk: "Low",
            time: "1 hour ago",
            description: "Email found in HIBP database from past breach",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      icon: AlertTriangle,
      label: "Threat Score",
      value: threatScore ?? "--",
      unit: "/100",
      color: "text-yellow-400",
      status: "Medium Risk",
    },
    {
      icon: Activity,
      label: "Active Threats",
      value: activeThreatCount ?? "--",
      unit: "today",
      color: "text-red-400",
      status: "Needs Attention",
    },
    {
      icon: Mail,
      label: "Emails Scanned",
      value: emailsScanned ?? "--",
      unit: "today",
      color: "text-green-400",
      status: "Protected",
    },
    {
      icon: Globe,
      label: "URLs Checked",
      value: urlsChecked ?? "--",
      unit: "today",
      color: "text-blue-400",
      status: "Safe",
    },
  ];

  const quickActions = [
    {
      icon: Mail,
      title: "Analyze Email",
      description: "Detect phishing attempts and email scams.",
      link: "/app/scan-email",
      color: "from-red-600 to-red-700",
    },
    {
      icon: Globe,
      title: "Scan URL",
      description: "Check websites for malware and phishing.",
      link: "/app/scan-url",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Bot,
      title: "Ask CyberShield AI",
      description: "Get AI-powered cybersecurity guidance.",
      link: "/app/chat",
      color: "from-blue-600 to-blue-700",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-900/10 hover:bg-red-900/20";
      case "Medium":
        return "bg-yellow-900/10 hover:bg-yellow-900/20";
      case "Low":
        return "bg-green-900/10 hover:bg-green-900/20";
      default:
        return "bg-slate-800";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield size={32} className="text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">
                CyberShield AI Dashboard
              </h1>
              <p className="text-slate-400 text-sm">
                Real-time threat monitoring and analysis
              </p>
            </div>
          </div>

          <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2">
            <Zap size={16} />
            Protected
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-400">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6">
            <p className="text-yellow-400">{error}</p>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && (
          <>
        {/* Metrics Grid */}
        <section className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                  <IconComponent size={20} className={stat.color} />
                </div>

                <div className="mb-2">
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-slate-500 text-sm">{stat.unit}</p>
                </div>

                <p className={`${stat.color} text-sm font-medium`}>
                  {stat.status}
                </p>
              </div>
            );
          })}
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap size={20} />
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} href={action.link}>
                  <div className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition h-full">
                    <div className={`bg-gradient-to-br ${action.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition`}>
                      <IconComponent className="text-white" size={24} />
                    </div>

                    <h3 className="font-semibold text-lg mb-2">
                      {action.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4">
                      {action.description}
                    </p>

                    <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
                      <span className="text-sm">Get Started</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Threat Activity */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 size={20} />
              Recent Threat Activity
            </h2>
            <Link href="/app/chat" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              View Analysis <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="text-left p-4">Threat Type</th>
                    <th className="text-left p-4">Risk Level</th>
                    <th className="text-left p-4">Detected</th>
                    <th className="text-center p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recentThreats.map((threat, idx) => (
                    <tr
                      key={threat.id}
                      className={`border-t border-slate-800 transition cursor-pointer ${getRiskBgColor(threat.risk)} ${idx === 0 ? "" : ""}`}
                      onClick={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
                    >
                      <td className="p-4 font-medium">{threat.type}</td>

                      <td className="p-4">
                        <span className={`${getRiskColor(threat.risk)} font-semibold`}>
                          {threat.risk}
                        </span>
                      </td>

                      <td className="p-4 text-slate-400">{threat.time}</td>

                      <td className="p-4 text-center">
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Security Recommendations */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Security Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-300 mb-2">Strengthen Authentication</h3>
              <p className="text-slate-300 text-sm">
                Enable two-factor authentication on all critical accounts to protect against unauthorized access.
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-green-300 mb-2">Update Software</h3>
              <p className="text-slate-300 text-sm">
                Keep your operating system and applications updated to patch known security vulnerabilities.
              </p>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-300 mb-2">Regular Backups</h3>
              <p className="text-slate-300 text-sm">
                Maintain offline backups of critical data to protect against ransomware and data loss incidents.
              </p>
            </div>

            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-red-300 mb-2">Check Breach Status</h3>
              <p className="text-slate-300 text-sm">
                Use our Email Analyzer to check if your credentials have appeared in known data breaches.
              </p>
            </div>
          </div>
        </section>

        {/* End of Dashboard Content */}
        </>
        )}

      </div>
    </main>
  );
}