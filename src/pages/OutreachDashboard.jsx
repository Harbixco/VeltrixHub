import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  ChevronDown,
  ChevronUp,
  X,
  RefreshCw,
  MousePointerClick,
  Activity,
  Flame,
  Radio,
  Play,
  Zap,
  Loader2,
  AlertCircle,
  RotateCw,
  MessageSquare,
  Phone,
  Inbox,
  LogOut
} from "lucide-react";

// Fallback seed leads matching leads_veltrixhub.csv
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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

export const getDemoUrl = (lead) => {
  if (lead && typeof lead.demo_url === "string" && (lead.demo_url.startsWith("http://") || lead.demo_url.startsWith("https://"))) {
    return lead.demo_url.trim();
  }
  const cleanNiche = (lead?.niche || "painting").trim().toLowerCase();
  return `https://veltrixhub.ng/${cleanNiche}`;
};

export default function OutreachDashboard() {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [previewLead, setPreviewLead] = useState(null);
  const [copiedCmd, setCopiedCmd] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualCommands, setShowManualCommands] = useState(false);

  // Tracking metrics
  const [trackingSummary, setTrackingSummary] = useState({
    unique_opened: 0,
    total_opens: 0,
    unique_clicked: 0,
    total_clicks: 0,
    total_tracked_leads: 0,
  });
  const [trackingRecords, setTrackingRecords] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Lead Extraction State
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractCount, setExtractCount] = useState(10);
  const [extractNiche, setExtractNiche] = useState("all");
  const [extractStatus, setExtractStatus] = useState("");
  const [extractAlert, setExtractAlert] = useState(null);

  // Outreach Dispatch State
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchRunning, setDispatchRunning] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState([]);
  const [dispatchAlert, setDispatchAlert] = useState(null);
  const [dispatchProgress, setDispatchProgress] = useState({
    sent: 0,
    total: 0,
    pending: 0,
    percent: 0,
    followUpDue: 0,
    currentStep: "",
    currentSender: "",
    currentRecipient: "",
    statusDetail: "Engine Standby: 3 Zoho Mailboxes Ready",
    isDelaying: false,
    delaySeconds: 0,
    isCompleted: false,
  });
  const logTerminalRef = useRef(null);

  // Inbound Responses State
  const [responses, setResponses] = useState([]);
  const [responsesNotice, setResponsesNotice] = useState("");
  const [showLogReplyModal, setShowLogReplyModal] = useState(false);
  const [newReplyNote, setNewReplyNote] = useState({
    email: "",
    business_name: "",
    message: "",
    channel: "Email",
  });

  const [newLead, setNewLead] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    niche: "painting",
    city: "Lagos",
    demo_url: "https://veltrixhub.ng/painting"
  });

  // Base API URL helper
  const getApiUrl = (path) => {
    return path;
  };

  // 1. Fetch live leads from MongoDB / CSV
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch(getApiUrl("/api/extract?get_leads=true"));
      if (res.ok) {
        const rawText = await res.text();
        try {
          const data = JSON.parse(rawText);
          if (data.success && Array.isArray(data.leads) && data.leads.length > 0) {
            const sanitized = data.leads.map((l) => ({
              ...l,
              demo_url: getDemoUrl(l),
            }));
            setLeads(sanitized);
          }
        } catch (jsonErr) {
          console.warn("Notice parsing live leads:", jsonErr.message);
        }
      }
    } catch (err) {
      console.warn("Notice loading saved leads:", err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  // 2. Fetch email open & click tracking metrics
  const fetchTracking = async () => {
    setIsRefreshing(true);
    try {
      const endpoint = getApiUrl("/api/track?stats=true");
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTrackingSummary(data.summary || {});
          setTrackingRecords(data.records || []);
        }
      }
    } catch (err) {
      console.warn("Tracking API fetch notice:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 3. Fetch dispatch process status & logs
  const fetchDispatchStatus = async () => {
    try {
      const res = await fetch(getApiUrl("/api/dispatch?status=true"));
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setDispatchRunning(Boolean(data.isRunning));
          if (data.progress) {
            setDispatchProgress((prev) => ({
              ...prev,
              ...data.progress,
              isCompleted: Boolean(data.isCompleted),
            }));
          }
          if (Array.isArray(data.lastLogs) && data.lastLogs.length > 0) {
            setDispatchLogs(data.lastLogs);
          }
          if (data.isRunning) {
            fetchLeads();
          }
        }
      }
    } catch (err) {
      console.warn("Dispatch status notice:", err);
    }
  };

  // 4. Fetch Inbound Responses
  const fetchResponses = async () => {
    try {
      const res = await fetch(getApiUrl("/api/responses"));
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setResponses(data.replies || []);
          if (data.notice) setResponsesNotice(data.notice);
        }
      }
    } catch (err) {
      console.warn("Notice loading inbound responses:", err);
    }
  };

  const handleLogResponse = async (e) => {
    e?.preventDefault();
    if (!newReplyNote.email) return;
    try {
      const res = await fetch(getApiUrl("/api/responses"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReplyNote),
      });
      if (res.ok) {
        setShowLogReplyModal(false);
        setNewReplyNote({ email: "", business_name: "", message: "", channel: "Email" });
        await fetchResponses();
        await fetchLeads();
      }
    } catch (err) {
      console.warn("Notice recording reply:", err);
    }
  };

  // Auto-scroll log terminal on update
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [dispatchLogs]);

  // Initial load
  useEffect(() => {
    fetchLeads();
    fetchTracking();
    fetchDispatchStatus();
    fetchResponses();

    const trackInterval = setInterval(() => {
      fetchTracking();
      fetchResponses();
    }, 15000);
    return () => clearInterval(trackInterval);
  }, []);

  // Dispatch polling when active
  useEffect(() => {
    let dispatchInterval = null;
    if (dispatchRunning) {
      dispatchInterval = setInterval(fetchDispatchStatus, 2500);
    }
    return () => {
      if (dispatchInterval) clearInterval(dispatchInterval);
    };
  }, [dispatchRunning]);

  // Handle Automated Lead Extraction
  const handleExtractLeads = async () => {
    if (isExtracting) return;
    setIsExtracting(true);
    setExtractAlert(null);
    setExtractStatus("Connecting to Google Places API (New) for Lagos & Abuja...");

    try {
      setTimeout(() => {
        setExtractStatus("Crawling company websites for authentic business emails...");
      }, 2000);

      setTimeout(() => {
        setExtractStatus("Mapping verified prospects to dedicated industry demo URLs...");
      }, 5000);

      const payload = {
        count: extractCount,
        niche: extractNiche === "all" ? null : extractNiche,
      };

      const res = await fetch(getApiUrl("/api/extract"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (jsonErr) {
        throw new Error(
          res.status === 504 || res.status === 502
            ? `Gateway timeout (${res.status}). The website crawler exceeded the response threshold. Please extract in smaller batches (5-10 leads).`
            : `Server returned non-JSON response (${res.status}): ${rawText.slice(0, 100)}`
        );
      }

      if (data.success) {
        setExtractAlert({
          type: "success",
          message: `Successfully extracted ${data.added_count} verified businesses. Saved to MongoDB Atlas and leads_veltrixhub.csv.`,
        });
        await fetchLeads();
      } else {
        setExtractAlert({
          type: "error",
          message: data.error || "Failed to extract leads. Please check API key settings.",
        });
      }
    } catch (err) {
      setExtractAlert({
        type: "error",
        message: `Extraction encountered an error: ${err.message}`,
      });
    } finally {
      setIsExtracting(false);
      setExtractStatus("");
    }
  };

  // Handle Outreach Pitch Dispatch
  const handleStartDispatch = async (mode = "send") => {
    if (isDispatching) return;
    setIsDispatching(true);
    setDispatchAlert(null);

    try {
      const res = await fetch(getApiUrl("/api/dispatch"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });

      const data = await res.json();

      if (data.success) {
        setDispatchRunning(true);
        setDispatchAlert({
          type: "success",
          message: data.message || `Outreach engine active in ${mode} mode. Live progress streaming below.`,
        });
        await fetchDispatchStatus();
      } else {
        setDispatchAlert({
          type: "error",
          message: data.error || "Failed to launch outreach engine.",
        });
      }
    } catch (err) {
      setDispatchAlert({
        type: "error",
        message: `Dispatch error: ${err.message}`,
      });
    } finally {
      setIsDispatching(false);
    }
  };

  const niches = ["all", ...Array.from(new Set(leads.map((l) => l.niche)))];

  const getTrackingForLead = (email) => {
    if (!email || !trackingRecords.length) return null;
    return trackingRecords.find(
      (r) => r.email && r.email.toLowerCase() === email.toLowerCase()
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.business_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.contact_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase());
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
          `"${(l.business_name || "").replace(/"/g, '""')}","${(l.contact_name || "").replace(/"/g, '""')}","${l.email}","${l.niche}","${l.city}","${l.demo_url}","${l.status}","${l.sent_at || ""}","${l.sent_by || ""}"`
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
            Cold Outreach & Automated Lead Acquisition
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              fetchTracking();
              fetchLeads();
              fetchDispatchStatus();
            }}
            disabled={isRefreshing || isLoadingLeads}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/90 hover:bg-slate-700 px-2.5 py-1 rounded-md border border-slate-700 transition"
            title="Refresh database and tracking stats"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || isLoadingLeads ? "animate-spin text-blue-400" : ""}`} />
            <span className="hidden sm:inline">Sync All Data</span>
          </button>
          
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20" title="Automatic 7:00 AM daily scheduled task registered">
            <Clock className="w-3.5 h-3.5" />
            <span>7:00 AM Auto-Run Active</span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Signed in as</span> {user?.username || "agbajeabodunkay"}
          </span>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-rose-500/10 px-2 py-1 rounded-md border border-slate-700/80 transition"
            title="Sign Out"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
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
                Zero-budget automated prospecting engine querying Google Places in Lagos and Abuja, verified email extraction, and automated pitch rotation across 3 Zoho mailboxes.
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Lead Manually
              </button>
            </div>
          </div>

          {/* Key Metric & Tracking Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {/* Card 1: Pipeline Count */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Prospects in Queue</span>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {leads.length} Leads
              </div>
              <p className="text-xs text-slate-400 mt-1">Ready for automated outreach</p>
            </div>

            {/* Card 2: Active Senders */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Mailboxes</span>
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">3 Accounts</div>
              <p className="text-xs text-emerald-400/90 mt-1">Zoho SSL (Kayode, Christopher, William)</p>
              <p className="text-[10px] text-slate-400 mt-1">75 Daily Capacity &bull; Replies route to Kayode</p>
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

        {/* SECTION 1: ONE-CLICK AUTOMATED LEAD EXTRACTION ENGINE */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B172E] to-slate-900 border border-blue-900/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Automated Google Places Crawler
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                One-Click Lead Extraction
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Queries Google Places across Lagos and Abuja, crawls business sites for verified direct emails, matches with your live industry demo, and saves directly to MongoDB Atlas and CSV.
              </p>
            </div>

            {/* Extraction Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              {/* Batch Size Selector */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-semibold text-slate-400 px-1 mb-1">
                  Batch Size
                </label>
                <select
                  value={extractCount}
                  onChange={(e) => setExtractCount(Number(e.target.value))}
                  disabled={isExtracting}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value={5}>5 Verified Leads (Fastest)</option>
                  <option value={10}>10 Verified Leads (Recommended)</option>
                  <option value={15}>15 Verified Leads</option>
                  <option value={25}>25 Verified Leads</option>
                </select>
              </div>

              {/* Target Niche Selector */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-semibold text-slate-400 px-1 mb-1">
                  Target Industry
                </label>
                <select
                  value={extractNiche}
                  onChange={(e) => setExtractNiche(e.target.value)}
                  disabled={isExtracting}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer capitalize"
                >
                  <option value="all">All 11 Focus Industries</option>
                  <option value="contractor">Building Contractors</option>
                  <option value="painting">Painting Companies</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="auto-repair">Auto Repair</option>
                  <option value="dental-care">Dental Clinics</option>
                  <option value="personal-injury">Legal Practitioners</option>
                  <option value="electrical">Solar & Electrical</option>
                  <option value="pest-control">Pest Control</option>
                  <option value="fashion">Fashion & Boutique</option>
                  <option value="tech-gadgets">Tech & Phones</option>
                  <option value="perfumes">Luxury Perfumes</option>
                </select>
              </div>

              {/* Extraction Primary CTA */}
              <div className="flex flex-wrap items-center gap-2 sm:self-end">
                <button
                  onClick={handleExtractLeads}
                  disabled={isExtracting}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition shadow-lg ${
                    isExtracting
                      ? "bg-blue-600/60 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 active:scale-95"
                  }`}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting Leads...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-200" />
                      <span>Extract Fresh Leads</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleStartDispatch("daily")}
                  disabled={isDispatching || dispatchRunning}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border transition shadow-lg ${
                    dispatchRunning
                      ? "bg-slate-800/40 border-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-600/50 active:scale-95"
                  }`}
                  title="Sources 75 targeted businesses with No Website or Outdated Sites across top buying niches (Contractors, Painting, Cleaning, Auto, Dental, Law, Solar, Pest)"
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Run 7:00 AM Daily Prospecting (75 Leads)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Extraction Progress Banner */}
          {isExtracting && (
            <div className="mt-5 p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin shrink-0" />
              <div className="text-xs text-blue-200">
                <p className="font-semibold text-white">{extractStatus || "Running extraction engine..."}</p>
                <p className="text-blue-300/80 mt-0.5">
                  Filtering out duplicates against MongoDB and saving verified Nigerian prospects.
                </p>
              </div>
            </div>
          )}

          {/* Extraction Alert Notification */}
          {extractAlert && (
            <div
              className={`mt-5 p-4 rounded-xl border flex items-center justify-between text-xs ${
                extractAlert.type === "success"
                  ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800/60 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {extractAlert.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{extractAlert.message}</span>
              </div>
              <button
                onClick={() => setExtractAlert(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* SECTION 2: ONE-CLICK OUTREACH PITCHING DISPATCHER & LIVE LOG TERMINAL */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0D1525] to-slate-900 border border-emerald-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Live Dispatch Control Center
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                One-Click Pitch Dispatcher
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rotates outbound emails evenly across your 3 authenticated Zoho mailboxes (`kayode`, `christopher`, `william`). Embeds individual open tracking pixels and demo visit verification into each message.
              </p>
            </div>

            {/* Dispatch Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Follow-up Button */}
              {dispatchProgress.followUpDue > 0 && (
                <button
                  onClick={() => handleStartDispatch("followup")}
                  disabled={isDispatching || dispatchRunning}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/60 transition shadow-lg active:scale-95 animate-pulse"
                  title="Dispatch 7-day follow-up pitches to prospects who have not yet replied"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send 7-Day Follow-Ups ({dispatchProgress.followUpDue})</span>
                </button>
              )}

              {/* Simulation (Dry-Run) Button */}
              <button
                onClick={() => handleStartDispatch("dry-run")}
                disabled={isDispatching || dispatchRunning}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border transition ${
                  dispatchRunning
                    ? "bg-slate-800/40 border-slate-700/40 text-slate-500 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95"
                }`}
                title="Verify email generation without sending real emails"
              >
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Simulate Run (Dry-Run)</span>
              </button>

              {/* Live Send Button */}
              <button
                onClick={() => handleStartDispatch("send")}
                disabled={isDispatching || dispatchRunning}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition shadow-lg ${
                  dispatchRunning
                    ? "bg-emerald-600/60 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 active:scale-95"
                }`}
              >
                {dispatchRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Dispatch Engine Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-200 fill-emerald-200" />
                    <span>Start 75 Daily Pitching Batch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 7-DAY FOLLOW-UP REMINDER BANNER */}
          {dispatchProgress.followUpDue > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-200">
                    {dispatchProgress.followUpDue} Prospects Due for 7-Day Follow-Up
                  </h3>
                  <p className="text-xs text-amber-300/80 mt-0.5">
                    These businesses were pitched over 7 days ago and have not replied yet. High-converting 7-day gentle reminder ready.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleStartDispatch("followup")}
                disabled={isDispatching || dispatchRunning}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-md shadow-amber-600/30 whitespace-nowrap active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Follow-Ups Now ({dispatchProgress.followUpDue})</span>
              </button>
            </div>
          )}

          {/* REAL-TIME BATCH DISPATCH PROGRESS BAR */}
          <div className="mt-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    dispatchRunning
                      ? "bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50"
                      : dispatchProgress.isCompleted
                      ? "bg-blue-400"
                      : "bg-slate-500"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Batch Dispatch Progress
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        dispatchRunning
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse"
                          : dispatchProgress.isCompleted
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                          : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}
                    >
                      {dispatchRunning
                        ? "Active: Rotating Across Senders"
                        : dispatchProgress.isCompleted
                        ? "Completed"
                        : "Ready on Standby"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {dispatchProgress.statusDetail || "Ready to dispatch outreach queue"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-white font-mono">
                  {dispatchProgress.percent || (dispatchProgress.total > 0 ? Math.round((dispatchProgress.sent / dispatchProgress.total) * 100) : 0)}%
                </span>
                <span className="text-xs text-slate-400 ml-1.5 font-medium">
                  ({dispatchProgress.sent || 0} of {dispatchProgress.total || leads.length} sent)
                </span>
              </div>
            </div>

            {/* Visual Animated Progress Track */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                  dispatchRunning
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-md shadow-emerald-500/30"
                    : dispatchProgress.isCompleted
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-slate-700"
                }`}
                style={{
                  width: `${Math.max(
                    dispatchProgress.percent || (dispatchProgress.total > 0 ? Math.round((dispatchProgress.sent / dispatchProgress.total) * 100) : 0),
                    dispatchRunning ? 5 : 0
                  )}%`,
                }}
              >
                {dispatchRunning && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                )}
              </div>
            </div>

            {/* 4 Detail Metrics Under Progress Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-800/80 text-[11px]">
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span className="text-slate-500 block uppercase text-[9px] font-semibold">Dispatched</span>
                <span className="font-bold text-emerald-400 font-mono text-xs">
                  {dispatchProgress.sent || 0} Delivered
                </span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span className="text-slate-500 block uppercase text-[9px] font-semibold">Pending Queue</span>
                <span className="font-bold text-amber-400 font-mono text-xs">
                  {dispatchProgress.pending || Math.max(0, (dispatchProgress.total || leads.length) - (dispatchProgress.sent || 0))} Remaining
                </span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span className="text-slate-500 block uppercase text-[9px] font-semibold">Current Sender</span>
                <span className="font-bold text-slate-200 truncate block text-xs">
                  {dispatchProgress.currentSender || "3 Senders Ready"}
                </span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/50">
                <span className="text-slate-500 block uppercase text-[9px] font-semibold">Deliverability Pace</span>
                <span className="font-bold text-blue-400 text-xs">
                  {dispatchProgress.isDelaying ? `${dispatchProgress.delaySeconds}s Human Delay` : "120s - 300s Safe Interval"}
                </span>
              </div>
            </div>
          </div>

          {/* Engine Terminal Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Live Console Output
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchDispatchStatus}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-950 px-2.5 py-1 rounded border border-slate-800 transition"
              >
                <RotateCw className="w-3 h-3" />
                Refresh Logs
              </button>
              {dispatchLogs.length > 0 && (
                <button
                  onClick={() => setDispatchLogs([])}
                  className="text-[11px] text-slate-500 hover:text-slate-300 px-2 py-1 transition"
                >
                  Clear View
                </button>
              )}
            </div>
          </div>

          {/* Live Monospace Terminal Log Viewer */}
          <div className="mt-3 bg-black/90 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                outreach.log &bull; Live Execution Tail
              </span>
              <span>Python 3.14 + Zoho SMTP Engine</span>
            </div>

            <div
              ref={logTerminalRef}
              className="p-4 max-h-56 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 select-text"
            >
              {dispatchLogs.length > 0 ? (
                dispatchLogs.map((line, idx) => {
                  const isErr = line.includes("ERROR") || line.includes("FAIL");
                  const isSuccess = line.includes("SUCCESS") || line.includes("Sent pitch") || line.includes("DISPATCH FINISHED");
                  const isHeader = line.includes("===");

                  return (
                    <div
                      key={idx}
                      className={`${
                        isErr
                          ? "text-rose-400 font-bold"
                          : isSuccess
                          ? "text-emerald-400"
                          : isHeader
                          ? "text-amber-400 font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {line}
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 italic py-3 text-center">
                  Terminal standby. Click "Start 75 Daily Pitching Batch" or "Simulate Run" to launch the outreach sequence.
                </div>
              )}
            </div>
          </div>

          {/* Dispatch Alert Notification */}
          {dispatchAlert && (
            <div
              className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                dispatchAlert.type === "success"
                  ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                  : "bg-rose-950/40 border-rose-800/60 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {dispatchAlert.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{dispatchAlert.message}</span>
              </div>
              <button
                onClick={() => setDispatchAlert(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Optional CLI Commands Reference Toggle */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => setShowManualCommands(!showManualCommands)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
            >
              {showManualCommands ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showManualCommands ? "Hide CLI Commands Reference" : "Show Manual CLI Commands Reference"}</span>
            </button>

            {showManualCommands && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center justify-between bg-black/60 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono">
                  <span className="text-emerald-400 truncate mr-2">python send_outreach.py --dry-run</span>
                  <button
                    onClick={() => handleCopy("python send_outreach.py --dry-run", "dry-run")}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    {copiedCmd === "dry-run" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-black/60 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono">
                  <span className="text-blue-300 truncate mr-2">python send_outreach.py --send</span>
                  <button
                    onClick={() => handleCopy("python send_outreach.py --send", "send")}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    {copiedCmd === "send" ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2.5: UNIFIED INBOUND RESPONSE CENTER */}
        <div className="bg-slate-900/90 border border-blue-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                <Inbox className="w-3.5 h-3.5 text-blue-400" />
                Unified Inbound Response Center
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Prospect Inbound Replies
              </h2>
              <p className="text-xs text-slate-300">
                All replies automatically route to <span className="text-blue-300 font-mono">kayode@veltrixhub.ng</span>. You never need to log into or switch between 3 mailboxes.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchResponses}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Inbound</span>
              </button>
              <button
                onClick={() => setShowLogReplyModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Reply / Note</span>
              </button>
            </div>
          </div>

          {responses.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {responses.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-blue-700/60 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{rep.business_name}</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {rep.channel || "Email"}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 truncate">{rep.email}</p>
                  <p className="text-xs text-slate-300 line-clamp-3 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 italic">
                    "{rep.message}"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500">
                      {new Date(rep.received_at).toLocaleDateString()}
                    </span>
                    <a
                      href={`https://wa.me/?text=Hello%20${encodeURIComponent(rep.business_name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 p-6 rounded-xl bg-slate-950/40 border border-slate-800/60 text-center space-y-2">
              <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-300">No unread prospect replies currently logged</p>
              <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                {responsesNotice || "All prospect replies automatically land in kayode@veltrixhub.ng. When prospects reply to pitches, their messages or WhatsApp inquiries will stream directly into this dashboard."}
              </p>
            </div>
          )}
        </div>

        {/* LOG INBOUND REPLY MODAL */}
        {showLogReplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Log Prospect Inbound Response</h3>
                <button
                  onClick={() => setShowLogReplyModal(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleLogResponse} className="space-y-3.5">
                <div>
                  <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                    Prospect Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. director@company.ng"
                    value={newReplyNote.email}
                    onChange={(e) => setNewReplyNote({ ...newReplyNote, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Construction LTD"
                    value={newReplyNote.business_name}
                    onChange={(e) => setNewReplyNote({ ...newReplyNote, business_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                    Channel
                  </label>
                  <select
                    value={newReplyNote.channel}
                    onChange={(e) => setNewReplyNote({ ...newReplyNote, channel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Email">Email Reply</option>
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                    Message / Conversation Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Summary of prospect response, questions, or agreed call time..."
                    value={newReplyNote.message}
                    onChange={(e) => setNewReplyNote({ ...newReplyNote, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLogReplyModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
                  >
                    Save & Mark Replied
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SECTION 3: LIVE ENGAGEMENT ACTIVITY FEED (When Opens / Clicks Logged) */}
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

        {/* SECTION 4: 3 SENDER MAILBOXES */}
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

        {/* SECTION 5: PROSPECT DATABASE TABLE */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Prospects Pipeline ({filteredLeads.length})</h3>
                {isLoadingLeads && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted Nigerian businesses matched with dedicated industry demo websites.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Force Refresh Button */}
              <button
                onClick={fetchLeads}
                disabled={isLoadingLeads}
                className="p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition"
                title="Reload leads from database"
              >
                <RotateCw className={`w-4 h-4 ${isLoadingLeads ? "animate-spin text-blue-400" : ""}`} />
              </button>

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
                {filteredLeads.map((lead, index) => {
                  const tracking = getTrackingForLead(lead.email);
                  const isOpened = tracking && tracking.open_count > 0;
                  const isClicked = tracking && tracking.click_count > 0;

                  return (
                    <tr key={lead.id || lead.email || index} className="hover:bg-slate-800/40 transition">
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
                          {(lead.niche || "painting").replace("-", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={getDemoUrl(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 hover:underline font-mono"
                        >
                          {getDemoUrl(lead).replace("https://veltrixhub.ng", "")}
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
                <span className="text-blue-400 truncate">
                  https://www.veltrixhub.ng/api/track?email={encodeURIComponent(previewLead.email)}&action=open
                </span>
              </div>
            </div>

            {/* Email Body */}
            <div className="mt-6 p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-4">
              <p>Hello {previewLead.contact_name},</p>
              <p>
                I came across <strong>{previewLead.business_name}</strong> while researching top{" "}
                {(previewLead.niche || "services").replace("-", " ")} businesses in {previewLead.city}.
              </p>
              <p>
                In today's market, most clients in {previewLead.city} search for {(previewLead.niche || "services").replace("-", " ")}{" "}
                services on their phones before deciding who to trust. Without a fast, mobile-friendly website that
                connects directly to your WhatsApp, potential customers often end up booking with competitors.
              </p>
              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200">
                <p className="font-semibold mb-1">
                  We have built a live demonstration website tailored specifically for your industry:
                </p>
                <a
                  href={getDemoUrl(previewLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline font-mono text-xs inline-flex items-center gap-1"
                >
                  {getDemoUrl(previewLead)}
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

      {/* Modal: Add New Lead Manually */}
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
                    <option value="contractor">Contractor</option>
                    <option value="painting">Painting</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="auto-repair">Auto Repair</option>
                    <option value="dental-care">Dental Care</option>
                    <option value="personal-injury">Legal</option>
                    <option value="electrical">Solar & Electrical</option>
                    <option value="pest-control">Pest Control</option>
                    <option value="fashion">Fashion & Boutique</option>
                    <option value="tech-gadgets">Tech Gadgets</option>
                    <option value="perfumes">Luxury Perfumes</option>
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
