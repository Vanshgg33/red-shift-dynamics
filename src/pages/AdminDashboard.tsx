import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  LogOut, Mail, User, CheckCheck, MailOpen, Search,
  ChevronDown, ChevronUp, Inbox, Trash2, Download,
  Shield, RefreshCw, Loader2, AlertCircle,
} from 'lucide-react';
import {
  fetchSubmissions, patchSubmissionStatus, removeSubmission,
  type Submission,
} from '@/lib/submissions';

type StatusFilter = 'all' | 'new' | 'read' | 'replied';

const STATUS = {
  new:     { label: 'New',     cls: 'bg-blue-100 text-blue-700 border border-blue-200',   dot: 'bg-blue-500' },
  read:    { label: 'Read',    cls: 'bg-yellow-100 text-yellow-700 border border-yellow-200', dot: 'bg-yellow-500' },
  replied: { label: 'Replied', cls: 'bg-green-100 text-green-700 border border-green-200',  dot: 'bg-green-500' },
} as const;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('rsd_admin_auth') !== 'true') {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const { data: submissions = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
    refetchInterval: 60_000,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Submission['status'] }) =>
      patchSubmissionStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissions'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: removeSubmission,
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['submissions'] });
      const prev = qc.getQueryData<Submission[]>(['submissions']);
      qc.setQueryData<Submission[]>(['submissions'], old => old?.filter(s => s.id !== id));
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      qc.setQueryData(['submissions'], ctx?.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['submissions'] }),
  });

  const handleLogout = () => {
    sessionStorage.removeItem('rsd_admin_auth');
    navigate('/admin', { replace: true });
  };

  const handleExpand = (s: Submission) => {
    const next = expandedId === s.id ? null : s.id;
    setExpandedId(next);
    if (next && s.status === 'new') statusMutation.mutate({ id: s.id, status: 'read' });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Permanently delete this submission?')) return;
    if (expandedId === id) setExpandedId(null);
    deleteMutation.mutate(id);
  };

  const handleExport = () => {
    const rows = [
      ['Name', 'Email', 'Message', 'Status', 'Submitted At'],
      ...submissions.map(s => [
        s.name, s.email,
        s.message.replace(/\n/g, ' '),
        s.status,
        new Date(s.createdAt).toLocaleString(),
      ]),
    ];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `submissions-${new Date().toISOString().split('T')[0]}.csv`,
    });
    a.click();
  };

  const filtered = submissions.filter(s => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) ||
           s.email.toLowerCase().includes(q) ||
           s.message.toLowerCase().includes(q);
  });

  const counts = {
    total:   submissions.length,
    new:     submissions.filter(s => s.status === 'new').length,
    read:    submissions.filter(s => s.status === 'read').length,
    replied: submissions.filter(s => s.status === 'replied').length,
  };

  const stats = [
    { key: 'total',   label: 'Total',   value: counts.total,   icon: Inbox,     color: 'text-foreground' },
    { key: 'new',     label: 'New',     value: counts.new,     icon: Mail,      color: 'text-blue-600' },
    { key: 'read',    label: 'Read',    value: counts.read,    icon: MailOpen,  color: 'text-yellow-600' },
    { key: 'replied', label: 'Replied', value: counts.replied, icon: CheckCheck, color: 'text-green-600' },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground font-heading leading-tight">Submissions</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Red Shift Dynamics — Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-secondary-foreground" />
            </button>
            <button
              onClick={handleExport}
              disabled={submissions.length === 0}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm bg-secondary hover:bg-secondary/70 text-secondary-foreground rounded-lg transition-colors disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ key, label, value, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-5 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setFilter(key === 'total' ? 'all' : key as StatusFilter)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-3xl font-bold font-heading ${color}`}>
                {isLoading ? '—' : value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or message…"
              className="w-full pl-12 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {(['all', 'new', 'read', 'replied'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap ${
                  filter === s
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                }`}
              >
                {s}
                {s !== 'all' && counts[s] > 0 && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === s ? 'bg-white/20' : 'bg-muted'}`}>
                    {counts[s]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {(search || filter !== 'all') && !isLoading && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* State: loading */}
        {isLoading && (
          <div className="glass-card p-16 text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading submissions…</p>
          </div>
        )}

        {/* State: error */}
        {isError && !isLoading && (
          <div className="glass-card p-16 text-center">
            <AlertCircle className="w-12 h-12 text-destructive/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Could not load submissions</p>
            <p className="text-sm text-muted-foreground/60 mt-1 mb-4">Make sure the Express server is running on port 3001.</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* State: empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-16 text-center">
            <Inbox className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">
              {submissions.length === 0 ? 'No form submissions yet' : 'No results match your filters'}
            </p>
            {submissions.length === 0 && (
              <p className="text-sm text-muted-foreground/60 mt-2">
                Submissions from the contact form will appear here in real-time.
              </p>
            )}
          </motion.div>
        )}

        {/* Submissions list */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.02 }}
                  className="glass-card overflow-hidden"
                >
                  {/* Row */}
                  <button
                    className="w-full text-left p-5 hover:bg-secondary/20 transition-colors"
                    onClick={() => handleExpand(s)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${STATUS[s.status].dot}`} />
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{s.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS[s.status].cls}`}>
                            {STATUS[s.status].label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{s.email}</p>
                        <p className="text-sm text-muted-foreground truncate mt-0.5">{s.message}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground hidden md:block">
                          {new Date(s.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </span>
                        {expandedId === s.id
                          ? <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          : <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        }
                      </div>
                    </div>
                  </button>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expandedId === s.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border/50 overflow-hidden"
                      >
                        <div className="px-5 py-5 bg-secondary/10">
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Name</p>
                              <p className="text-foreground font-medium">{s.name}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                              <a
                                href={`mailto:${s.email}?subject=Re: Your inquiry to Red Shift Dynamics`}
                                className="text-primary hover:underline font-medium"
                              >
                                {s.email}
                              </a>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Submitted</p>
                              <p className="text-foreground">
                                {new Date(s.createdAt).toLocaleString('en-US', {
                                  weekday: 'short', month: 'long', day: 'numeric',
                                  year: 'numeric', hour: '2-digit', minute: '2-digit',
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Status</p>
                              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS[s.status].cls}`}>
                                {STATUS[s.status].label}
                              </span>
                            </div>
                          </div>

                          <div className="mb-5">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Message</p>
                            <div className="bg-background rounded-xl p-4 border border-border/50 whitespace-pre-wrap text-foreground text-sm leading-relaxed">
                              {s.message}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <a
                              href={`mailto:${s.email}?subject=Re: Your inquiry to Red Shift Dynamics`}
                              onClick={() => statusMutation.mutate({ id: s.id, status: 'replied' })}
                              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
                            >
                              <Mail className="w-4 h-4" />
                              Reply via Email
                            </a>
                            <button
                              onClick={() => statusMutation.mutate({ id: s.id, status: 'replied' })}
                              disabled={s.status === 'replied' || statusMutation.isPending}
                              className="flex items-center gap-2 px-4 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors font-medium disabled:opacity-40"
                            >
                              <CheckCheck className="w-4 h-4" />
                              Mark Replied
                            </button>
                            <button
                              onClick={() => statusMutation.mutate({ id: s.id, status: 'new' })}
                              disabled={s.status === 'new' || statusMutation.isPending}
                              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors font-medium disabled:opacity-40"
                            >
                              <Mail className="w-4 h-4" />
                              Mark New
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              disabled={deleteMutation.isPending}
                              className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
