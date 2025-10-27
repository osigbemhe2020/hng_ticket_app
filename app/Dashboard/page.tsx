"use client";

import { useMemo, useState, useEffect } from "react"
import { LogOut, TicketIcon } from "lucide-react"

type DashboardProps = {
  user: { username: string }
  onNavigate: (page: "dashboard" | "tickets") => void
  onLogout: () => void
}

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = localStorage.getItem('ticketapp_session');
    if (!currentUser) {
      // Redirect to login if no user is found
      window.location.href = '/Login';
      return;
    }
    setUser(JSON.parse(currentUser));
  }, []);

  useEffect(() => {
    // Get tickets from localStorage
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
  }, []);

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;

    return { total, open, resolved };
  }, [tickets]);

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Signed in as <span className="text-slate-200 font-medium">{user?.username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('ticketapp_session');
                window.location.href = '/';
              }}
              className="border border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent px-4 py-2 rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
         
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-slate-400">Welcome back! Here's an overview of your ticket system.</p>
          </div>

     
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
    <div className="flex flex-col space-y-1.5 pb-3">
      <h2 className="text-sm font-medium text-slate-400">Total Tickets</h2>
    </div>
    <div className="pt-0">
      <div className="text-3xl font-bold text-white">{stats.total}</div>
      <p className="text-xs text-slate-500 mt-1">All tickets in system</p>
    </div>
  </div>

  <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
    <div className="flex flex-col space-y-1.5 pb-3">
      <h2 className="text-sm font-medium text-slate-400">Open Tickets</h2>
    </div>
    <div className="pt-0">
      <div className="text-3xl font-bold text-yellow-400">{stats.open}</div>
      <p className="text-xs text-slate-500 mt-1">Awaiting resolution</p>
    </div>
  </div>

  <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
    <div className="flex flex-col space-y-1.5 pb-3">
      <h2 className="text-sm font-medium text-slate-400">Resolved Tickets</h2>
    </div>
    <div className="pt-0">
      <div className="text-3xl font-bold text-green-400">{stats.resolved}</div>
      <p className="text-xs text-slate-500 mt-1">Completed tickets</p>
    </div>
  </div>
</div>

          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <button
              onClick={() => window.location.href = '/Management'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <TicketIcon className="w-5 h-5 mr-2" />
              Manage Tickets
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}





