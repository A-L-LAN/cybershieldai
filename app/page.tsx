import Link from "next/link";
import { Shield, MessageSquare, Mail, Globe, BarChart3, ArrowRight } from "lucide-react";

export const metadata = {
  title: "CyberShield AI - Your AI Security Expert",
  description: "AI-Powered Threat Intelligence for Everyone",
};

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Security Chat",
      description: "Ask questions about cybersecurity threats, phishing, malware, and security best practices.",
      link: "/app/chat",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: Mail,
      title: "Email Analyzer",
      description: "Check if your email has been compromised in data breaches and analyze phishing risks.",
      link: "/app/scan-email",
      color: "from-red-600 to-red-700"
    },
    {
      icon: Globe,
      title: "URL Scanner",
      description: "Scan websites for phishing, malware, and suspicious activity in real-time.",
      link: "/app/scan-url",
      color: "from-green-600 to-green-700"
    },
    {
      icon: BarChart3,
      title: "Threat Dashboard",
      description: "Visualize your threat history and security trends at a glance.",
      link: "/app/dashboard",
      color: "from-purple-600 to-purple-700"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={32} className="text-blue-500" />
            <h1 className="text-xl font-bold">CyberShield AI</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/app/chat" className="text-slate-300 hover:text-white transition">Chat</Link>
            <Link href="/app/scan-email" className="text-slate-300 hover:text-white transition">Email</Link>
            <Link href="/app/scan-url" className="text-slate-300 hover:text-white transition">URL</Link>
            <Link href="/app/dashboard" className="text-slate-300 hover:text-white transition">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          AI-Powered Threat Intelligence for Everyone
        </h1>
        <p className="text-xl text-slate-400 mb-8">
          Your intelligent cybersecurity assistant powered by Google Gemini. Analyze URLs, check emails, and get expert threat guidance in seconds.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link key={index} href={feature.link} className="group">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full hover:border-slate-700 transition transform hover:scale-105">
                  <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 border border-slate-800 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Digital Life?</h2>
          <p className="text-slate-300 mb-6">Start with our AI Security Chat or analyze threats directly.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/app/chat" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition">
              Start Chat
            </Link>
            <Link href="/app/scan-url" className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-lg font-medium transition">
              Scan URL
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-500 text-sm">
          <p>CyberShield AI - Your Intelligent Cybersecurity Assistant</p>
          <p className="mt-2">Powered by Google Gemini AI</p>
        </div>
      </footer>
    </main>
  );
}
