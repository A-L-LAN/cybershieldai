"use client";

import { useState } from "react";
import {
  Globe,
  Shield,
  AlertTriangle,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface ScanResult {
  risk_score?: number;
  risk_level?: string;
  malicious_votes?: number;
  suspicious_votes?: number;
  harmless_votes?: number;
  status?: string;
  analysis_id?: string;
}

export default function URLScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  async function scan() {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    // Basic URL validation
    try {
      const urlToValidate = url.startsWith("http") ? url : "https://" + url;
      new URL(urlToValidate);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        "http://localhost:8000/scan-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to analyze URL"
        );
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      scan();
    }
  };

  const getRiskColor = (level?: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
        return "text-red-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "LOW":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  const getRiskBgColor = (level?: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
        return "bg-red-900/30 border-red-700";
      case "MEDIUM":
        return "bg-yellow-900/30 border-yellow-700";
      case "LOW":
        return "bg-green-900/30 border-green-700";
      default:
        return "bg-slate-800 border-slate-700";
    }
  };

  const getRiskIcon = (level?: string) => {
    switch (level?.toUpperCase()) {
      case "HIGH":
        return <XCircle className="text-red-500" size={20} />;
      case "MEDIUM":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "LOW":
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Shield className="text-blue-500" size={20} />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Globe size={32} />
            <div>
              <h1 className="text-3xl font-bold">
                URL Threat Scanner
              </h1>

              <p className="text-slate-400">
                Analyze websites for phishing,
                malware, and suspicious activity.
              </p>
            </div>
          </div>
        </div>

        {/* Scanner Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">

          <label className="block mb-2 font-medium">
            Website URL
          </label>

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={scan}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={18}
                />
                Scanning...
              </>
            ) : (
              <>
                <Shield size={18} />
                Analyze URL
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">Scan Failed</p>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Risk Summary */}
            <div className={"border rounded-xl p-6 flex items-start gap-4 " + getRiskBgColor(result.risk_level)}>
              <div>
                {getRiskIcon(result.risk_level)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">
                    Risk Level: <span className={getRiskColor(result.risk_level) + " "}>{result.risk_level || "UNKNOWN"}</span>
                  </h2>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Risk Score</p>
                    <p className="text-3xl font-bold">{result.risk_score || "N/A"}/100</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  {result.risk_level === "HIGH" && "This URL appears to be dangerous. Avoid visiting it."}
                  {result.risk_level === "MEDIUM" && "This URL has suspicious characteristics. Proceed with caution."}
                  {result.risk_level === "LOW" && "This URL appears to be safe based on threat intelligence."}
                </p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Detailed Analysis
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Malicious Votes</p>
                  <p className="text-2xl font-bold text-red-400 mt-2">{result.malicious_votes || 0}</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Suspicious Votes</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">{result.suspicious_votes || 0}</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">Harmless Votes</p>
                  <p className="text-2xl font-bold text-green-400 mt-2">{result.harmless_votes || 0}</p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Scanned URL</p>
                <p className="break-all font-mono text-sm mt-2">{url}</p>
              </div>
            </div>

            {/* Threat Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h2 className="text-xl font-bold">
                  What CyberShield Checks
                </h2>
              </div>

              <ul className="space-y-2 text-slate-300">
                <li>✓ Phishing indicators and spoofed domains</li>
                <li>✓ Malware distribution networks</li>
                <li>✓ Suspicious redirects and obfuscation</li>
                <li>✓ Known malicious domains from threat databases</li>
                <li>✓ SSL/TLS certificate validity</li>
                <li>✓ Domain age and registration patterns</li>
              </ul>
            </div>

            {/* Raw Data */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-400 text-sm mb-2">Full Analysis Data</p>
              <pre className="overflow-auto text-sm bg-slate-800 p-4 rounded-lg">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Demo Info */}
        {!result && !loading && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-blue-500" size={20} />
              <h2 className="font-bold">
                How It Works
              </h2>
            </div>

            <p className="text-slate-300 text-sm mb-4">
              CyberShield AI uses real-time threat intelligence and machine learning to analyze URLs for:
            </p>

            <ul className="space-y-2 text-slate-300 text-sm">
              <li>Phishing attacks and credential harvesting</li>
              <li>Malware hosting and distribution</li>
              <li>Suspicious redirects and hidden tracking</li>
              <li>Compromised websites and botnets</li>
              <li>Known threat patterns and IOCs</li>
            </ul>
          </div>
        )}

      </div>
    </main>
  );
}
