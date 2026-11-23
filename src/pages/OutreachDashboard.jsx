import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  Server,
  CheckCircle2,
  Clock,
  Users,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Plus,
  Search,
  ShieldCheck,
  Terminal,
  Download,
  Building,
  MapPin,
  Sparkles,
  ChevronRight,
  X,
  RefreshCw,
  MousePointerClick,
  Activity,
  Flame,
  Radio
} from "lucide-react";

// Pre-seeded Nigerian Business Leads matching leads_veltrixhub.csv
const INITIAL_LEADS = [
  {
    id: 1,
    business_name: "Apex Painting Services",
    contact_name: "Mr. Adebayo",
    email: "adebayo@apexpaint.ng",
    niche: "painting",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/painting",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 2,
    business_name: "Sparkle Cleaning Pro",
    contact_name: "Mrs. Fatima",
    email: "fatima@sparklepro.ng",
    niche: "cleaning",
    city: "Abuja",
    demo_url: "https://veltrixhub.ng/cleaning",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 3,
    business_name: "Prime Flow Plumbers",
    contact_name: "Mr. Emeka",
    email: "emeka@primeflow.ng",
    niche: "plumbing-services",
    city: "Port Harcourt",
    demo_url: "https://veltrixhub.ng/plumbing-services",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 4,
    business_name: "Crown Auto Specialists",
    contact_name: "Mr. Tunde",
    email: "tunde@crownauto.ng",
    niche: "auto-repair",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/auto-repair",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 5,
    business_name: "Solid Rock Construction",
    contact_name: "Engr. Kola",
    email: "kola@solidrockconst.ng",
    niche: "contractor",
    city: "Ibadan",
    demo_url: "https://veltrixhub.ng/contractor",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 6,
    business_name: "Pearl Smiles Dental",
    contact_name: "Dr. Funke",
    email: "funke@pearlsmiles.ng",
    niche: "dental-care",
    city: "Abuja",
    demo_url: "https://veltrixhub.ng/dental-care",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 7,
    business_name: "Heritage Legal Partners",
    contact_name: "Barr. Nnamdi",
    email: "nnamdi@heritagelegal.ng",
    niche: "personal-injury",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/personal-injury",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 8,
    business_name: "Swift Rescue Towing",
    contact_name: "Mr. Musa",
    email: "musa@swiftrescuetow.ng",
    niche: "towing-company",
    city: "Kano",
    demo_url: "https://veltrixhub.ng/towing-company",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 9,
    business_name: "Green Canopy Tree Care",
    contact_name: "Mr. Biodun",
    email: "biodun@greencanopy.ng",
    niche: "tree-removal",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/tree-removal",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 10,
    business_name: "Volt Electrical Solutions",
    contact_name: "Engr. Uche",
    email: "uche@voltelectrical.ng",
    niche: "electrical",
    city: "Port Harcourt",
    demo_url: "https://veltrixhub.ng/electrical",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 11,
    business_name: "Prestige Floorings",
    contact_name: "Mr. Segun",
    email: "segun@prestigefloor.ng",
    niche: "flooring",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/flooring",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 12,
    business_name: "Verdant Landscapes",
    contact_name: "Mrs. Halima",
    email: "halima@verdantland.ng",
    niche: "landscaping",
    city: "Abuja",
    demo_url: "https://veltrixhub.ng/landscaping",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 13,
    business_name: "KeyMaster Locksmiths",
    contact_name: "Mr. Jide",
    email: "jide@keymaster.ng",
    niche: "locksmith",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/locksmith",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 14,
    business_name: "Shield Pest Control",
    contact_name: "Mr. Hassan",
    email: "hassan@shieldpest.ng",
    niche: "pest-control",
    city: "Abuja",
    demo_url: "https://veltrixhub.ng/pest-control",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 15,
    business_name: "Crystal Pressure Washing",
    contact_name: "Mr. Femi",
    email: "femi@crystalpressure.ng",
    niche: "pressure-demo",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/pressure-demo",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 16,
    business_name: "Zarah Luxury Boutique",
    contact_name: "Zarah",
    email: "zarah@zarahboutique.ng",
    niche: "fashion",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/fashion",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 17,
    business_name: "Aroma Royale Parfums",
    contact_name: "Aisha",
    email: "aisha@aromaroyale.ng",
    niche: "perfumes",
    city: "Abuja",
    demo_url: "https://veltrixhub.ng/perfumes",
    status: "pending",
    sent_at: "",
    sent_by: ""
  },
  {
    id: 18,
    business_name: "TechNexus Gadgets",
    contact_name: "Mr. Dayo",
    email: "dayo@technexus.ng",
    niche: "tech-gadgets",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/tech-gadgets",
    status: "pending",
    sent_at: "",
    sent_by: ""
  }
];

const SENDERS = [
  {
    id: "kayode",
    name: "Kayode | Veltrix Hub",
    email: "kayode@veltrixhub.ng",
    daily_limit: 25,
    status: "Ready",
    role: "Senior Sales Partner"
  },
  {
    id: "christopher",
    name: "Christopher | Veltrix Hub",
    email: "christopher@veltrixhub.ng",
    daily_limit: 25,
    status: "Ready",
    role: "Client Outreach Strategist"
  },
  {
    id: "william",
    name: "William | Veltrix Hub",
    email: "william@veltrixhub.ng",
    daily_limit: 25,
    status: "Ready",
    role: "Agency Director"
  }
];

export default function OutreachDashboard() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [previewLead, setPreviewLead] = useState(null);
  const [copiedCmd, setCopiedCmd] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [trackingSummary, setTrackingSummary] = useState({
    unique_opened: 0,
    total_opens: 0,
    unique_clicked: 0,
    total_clicks: 0,
    total_tracked_leads: 0,
  });
  const [trackingRecords, setTrackingRecords] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [newLead, setNewLead] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    niche: "painting",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/painting"
  });

  const fetchTracking = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/track?stats=true");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTrackingSummary(data.summary || {});
          setTrackingRecords(data.records || []);
        }
      }
    } catch (err) {
      console.warn("Tracking API not reachable in local dev without live serverless execution:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    const interval = setInterval(fetchTracking, 20000); // 20s polling
    return () => clearInterval(interval);
  }, []);

  const niches = ["all", ...Array.from(new Set(leads.map((l) => l.niche)))];

  const getTrackingForLead = (email) => {
    if (!email || !trackingRecords.length) return null;
    return trackingRecords.find(
      (r) => r.email && r.email.toLowerCase() === email.toLowerCase()
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === "all" || lead.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(""), 2000);
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLead.business_name || !newLead.email) return;
    const created = {
      id: Date.now(),
      ...newLead,
      status: "pending",
      sent_at: "",
      sent_by: ""
    };
    setLeads([created, ...leads]);
    setShowAddModal(false);
    setNewLead({
      business_name: "",
      contact_name: "",
      email: "",
      niche: "painting",
      city: "Lagos",
      demo_url: "https://veltrixhub.ng/painting"
    });
  };

  const handleDownloadCSV = () => {
    const header = "business_name,contact_name,email,niche,city,demo_url,status,sent_at,sent_by\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.business_name}","${l.contact_name}","${l.email}","${l.niche}","${l.city}","${l.demo_url}","${l.status}","${l.sent_at}","${l.sent_by}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "leads_veltrixhub.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sentCount = leads.filter((l) => l.status === "sent").length;
  const openRate =
    sentCount > 0
      ? ((trackingSummary.unique_opened / sentCount) * 100).toFixed(1)
      : trackingSummary.unique_opened > 0
      ? "100.0"
      : "0.0";

  const clickRate =
    sentCount > 0
      ? ((trackingSummary.unique_clicked / sentCount) * 100).toFixed(1)
      : trackingSummary.unique_clicked > 0
      ? "100.0"
      : "0.0";

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 font-sans pb-24">
      {/* Minimal Dashboard Top Navigation */}
      <header className="border-b border-slate-800/80 bg-[#070D18]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700/60 transition"
          >
            &larr; Back to Veltrix Hub
          </Link>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Cold Outreach & Tracking Control Suite
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchTracking}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/90 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 transition"
            title="Refresh tracking data from server"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
            <span className="hidden sm:inline">Refresh Stats</span>
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Tracker Active
          </span>
        </div>
      </header>

      {/* Top Banner / Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0B1527] to-[#070D18]">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">
                <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                Real-Time Open & Click Pixel Active
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Automated Pitching Command Center
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Zero-budget outreach engine delivering 75 personalized website pitches daily with real-time email open tracking and demo click verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition"
              >
                <Plus className="w-4 h-4" />
                Add New Lead
              </button>
            </div>
          </div>

          {/* Key Metric & Tracking Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {/* Card 1: Daily Capacity */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Daily Outreach Cap</span>
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">75 Emails / Day</div>
              <p className="text-xs text-slate-400 mt-1">25 emails per mailbox limit</p>
            </div>

            {/* Card 2: Active Senders */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Mailboxes</span>
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">3 Accounts</div>
              <p className="text-xs text-emerald-400/90 mt-1">Zoho SSL (Kayode, Chris, William)</p>
            </div>

            {/* Card 3: Email Opens */}
            <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Unique Opens (View Rate)
                </span>
                <Eye className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-300">
                {trackingSummary.unique_opened} Opened{" "}
                <span className="text-sm font-normal text-emerald-400/80">({openRate}%)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {trackingSummary.total_opens} total views logged
              </p>
            </div>

            {/* Card 4: Demo Link Clicks */}
            <div className="bg-slate-900/80 border border-blue-900/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Demo Website Clicks
                </span>
                <MousePointerClick className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-300">
                {trackingSummary.unique_clicked} Clicks{" "}
                <span className="text-sm font-normal text-blue-400/80">({clickRate}%)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {trackingSummary.total_clicks} total demo visits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* Section 1: Live Engagement Activity Feed (if any opens exist) */}
        {trackingRecords.length > 0 && (
          <div className="bg-slate-900/80 border border-emerald-900/30 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Live Prospect Engagement Stream</h3>
              </div>
              <span className="text-xs text-slate-400">Showing last {trackingRecords.length} activities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {trackingRecords.slice(0, 6).map((rec, i) => (
                <div
                  key={i}
                  className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white truncate max-w-[200px]">{rec.business_name}</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">{rec.email}</p>
                    <div className="flex items-center gap-2 pt-1">
                      {rec.open_count > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <Eye className="w-3 h-3" />
                          Opened {rec.open_count}x
                        </span>
                      )}
                      {rec.click_count > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          <MousePointerClick className="w-3 h-3" />
                          Clicked Demo
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {rec.last_opened_at ? new Date(rec.last_opened_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: 3 Sender Mailboxes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Authenticated Zoho Sender Mailboxes</h2>
              <p className="text-sm text-slate-400">
                Outreach emails rotate through these 3 accounts to keep domain spam scores zero and guarantee high deliverability.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              SPF, DKIM, DMARC Verified
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SENDERS.map((sender) => (
              <div
                key={sender.id}
                className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white text-base">{sender.name}</h3>
                    <p className="text-xs text-blue-400 font-mono mt-0.5">{sender.email}</p>
                    <p className="text-xs text-slate-400 mt-1">{sender.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {sender.status}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Daily Allocation:</span>
                  <span className="font-semibold text-slate-200">{sender.daily_limit} emails / day</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>SMTP Host:</span>
                  <span className="font-mono text-slate-300">smtp.zoho.com:465</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Terminal Runner Command Box */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1527] to-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">
                <Terminal className="w-4 h-4" />
                Backend Engine Runner
              </div>
              <h3 className="text-lg font-bold text-white">How to Execute Live Pitches</h3>
              <p className="text-sm text-slate-400 max-w-xl">
                The automation script embeds the 1x1 open tracking pixel and tracked demo links automatically into every email.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {/* Dry Run Command */}
              <div className="flex items-center bg-black/60 border border-slate-800 rounded-lg px-3 py-2">
                <code className="text-xs font-mono text-emerald-400 select-all mr-3">
                  python send_outreach.py --dry-run
                </code>
                <button
                  onClick={() => handleCopy("python send_outreach.py --dry-run", "dry-run")}
                  className="text-slate-400 hover:text-white transition p-1"
                  title="Copy command"
                >
                  {copiedCmd === "dry-run" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Live Send Command */}
              <div className="flex items-center bg-black/60 border border-blue-900/40 rounded-lg px-3 py-2">
                <code className="text-xs font-mono text-blue-300 select-all mr-3">
                  python send_outreach.py --send
                </code>
                <button
                  onClick={() => handleCopy("python send_outreach.py --send", "send")}
                  className="text-slate-400 hover:text-white transition p-1"
                  title="Copy command"
                >
                  {copiedCmd === "send" ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Prospect Database Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Prospects Pipeline ({filteredLeads.length})</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted Nigerian businesses matched with dedicated industry demo websites.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search business, contact, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                />
              </div>

              {/* Niche Selector */}
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="py-1.5 px-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-blue-500 capitalize"
              >
                {niches.map((n) => (
                  <option key={n} value={n}>
                    {n === "all" ? "All Niches" : n.replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Business & Contact</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Niche</th>
                  <th className="py-3 px-4 font-semibold">Live Demo Link</th>
                  <th className="py-3 px-4 font-semibold">Engagement Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => {
                  const tracking = getTrackingForLead(lead.email);
                  const isOpened = tracking && tracking.open_count > 0;
                  const isClicked = tracking && tracking.click_count > 0;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{lead.business_name}</div>
                        <div className="text-xs text-slate-400">
                          {lead.contact_name} &bull;{" "}
                          <span className="font-mono text-slate-400">{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {lead.city}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                          {lead.niche.replace("-", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={lead.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 hover:underline font-mono"
                        >
                          {lead.demo_url.replace("https://veltrixhub.ng", "")}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        {isClicked ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            <MousePointerClick className="w-3 h-3 text-blue-400" />
                            Demo Viewed ({tracking.click_count}x)
                          </span>
                        ) : isOpened ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <Eye className="w-3 h-3 text-emerald-400" />
                            Opened ({tracking.open_count}x)
                          </span>
                        ) : lead.status === "sent" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-slate-400" />
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setPreviewLead(lead)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview Pitch
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Preview Pitch */}
      {previewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                  Outreach Pitch Preview (with Tracker Embedded)
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{previewLead.business_name}</h3>
              </div>
              <button
                onClick={() => setPreviewLead(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Metadata */}
            <div className="mt-5 space-y-2 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex">
                <span className="w-20 text-slate-500">From:</span>
                <span className="text-emerald-400">Kayode | Veltrix Hub &lt;kayode@veltrixhub.ng&gt;</span>
              </div>
              <div className="flex">
                <span className="w-20 text-slate-500">To:</span>
                <span className="text-slate-200">
                  {previewLead.contact_name} &lt;{previewLead.email}&gt;
                </span>
              </div>
              <div className="flex">
                <span className="w-20 text-slate-500">Subject:</span>
                <span className="text-white font-semibold">
                  Quick question regarding {previewLead.business_name}'s website
                </span>
              </div>
              <div className="flex">
                <span className="w-20 text-slate-500">Tracker:</span>
                <span className="text-blue-400">
                  https://veltrixhub.ng/api/track?email={encodeURIComponent(previewLead.email)}&action=open
                </span>
              </div>
            </div>

            {/* Email Body */}
            <div className="mt-6 p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-4">
              <p>Hello {previewLead.contact_name},</p>
              <p>
                I came across <strong>{previewLead.business_name}</strong> while researching top{" "}
                {previewLead.niche.replace("-", " ")} businesses in {previewLead.city}.
              </p>
              <p>
                In today's market, most clients in {previewLead.city} search for {previewLead.niche.replace("-", " ")}{" "}
                services on their phones before deciding who to trust. Without a fast, mobile-friendly website that
                connects directly to your WhatsApp, potential customers often end up booking with competitors.
              </p>
              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200">
                <p className="font-semibold mb-1">
                  We have built a live demonstration website tailored specifically for your industry:
                </p>
                <a
                  href={previewLead.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline font-mono text-xs inline-flex items-center gap-1"
                >
                  {previewLead.demo_url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <p className="font-medium text-white mb-1.5">What this brings to {previewLead.business_name}:</p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-xs">
                  <li>
                    <strong>Direct WhatsApp Ordering:</strong> Customers click one button and chat directly with your sales
                    team.
                  </li>
                  <li>
                    <strong>Verified Credibility:</strong> Prominent CAC registration and trust badges that reassure
                    first-time buyers.
                  </li>
                  <li>
                    <strong>Mobile-Optimized Speed:</strong> Loads in under 1 second on MTN, Airtel, and Glo networks.
                  </li>
                  <li>
                    <strong>Ready within 48 to 72 Hours:</strong> Zero long development cycles or complicated setups.
                  </li>
                </ol>
              </div>
              <p>
                Would you be open to a quick 5-minute chat on WhatsApp to see how we can customize this for{" "}
                {previewLead.business_name}?
              </p>
              <p>
                You can reach our team directly at{" "}
                <a href="https://wa.me/2348087098270" className="text-emerald-400 font-semibold underline">
                  +234 808 709 8270
                </a>{" "}
                or reply directly to this email.
              </p>
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <p className="font-semibold text-slate-200">Best regards,</p>
                <p>Kayode | Client Outreach Specialist</p>
                <p>Veltrix Hub &bull; https://veltrixhub.ng</p>
                <p>Direct WhatsApp: +234 808 709 8270</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setPreviewLead(null)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Add New Outreach Prospect</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Logistics Ltd"
                  value={newLead.business_name}
                  onChange={(e) => setNewLead({ ...newLead, business_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Salami"
                    value={newLead.contact_name}
                    onChange={(e) => setNewLead({ ...newLead, contact_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos"
                    value={newLead.city}
                    onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. info@skylinelogistics.ng"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Industry / Niche
                  </label>
                  <select
                    value={newLead.niche}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewLead({
                        ...newLead,
                        niche: val,
                        demo_url: `https://veltrixhub.ng/${val}`
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 capitalize"
                  >
                    <option value="painting">Painting</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="plumbing-services">Plumbing</option>
                    <option value="auto-repair">Auto Repair</option>
                    <option value="contractor">Contractor</option>
                    <option value="dental-care">Dental Care</option>
                    <option value="personal-injury">Legal</option>
                    <option value="towing-company">Towing</option>
                    <option value="tree-removal">Tree Removal</option>
                    <option value="electrical">Electrical</option>
                    <option value="flooring">Flooring</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="locksmith">Locksmith</option>
                    <option value="pest-control">Pest Control</option>
                    <option value="pressure-demo">Pressure Washing</option>
                    <option value="fashion">Fashion & Boutique</option>
                    <option value="perfumes">Perfumes</option>
                    <option value="tech-gadgets">Tech Gadgets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Demo URL
                  </label>
                  <input
                    type="text"
                    value={newLead.demo_url}
                    onChange={(e) => setNewLead({ ...newLead, demo_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition"
                >
                  Add to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
