
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, LogOut, Plus, X, Trash2, Edit2 } from "lucide-react";


type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: string;
 status: "open" | "in_progress" | "closed";
};


const Toast = ({ message, type }: { message: string; type: "success" | "error" }) => (
  <div
    className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white shadow-lg transition-opacity ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`}
  >
    {message}
  </div>
);


interface TicketFormProps {
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
  existing?: Ticket | null;
}

const TicketForm = ({ onClose, onSave, existing }: TicketFormProps) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [priority, setPriority] = useState(existing?.priority || "Low");
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">(existing?.status || "open");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const newTicket: Ticket = {
      id: existing ? existing.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    };

    onSave(newTicket);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">
          {existing ? "Edit Ticket" : "Create New Ticket"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ticket Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
          />
          <textarea
            placeholder="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
          />
          <div className="flex justify-between gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-1/2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            status: "open" | "in_progress" | "closed";
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
          >
            {existing ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default function TicketManagement() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("ticketapp_session");
    if (!currentUser) {
      window.location.href = "/Login";
      return;
    }
    setUser(JSON.parse(currentUser));

    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) setTickets(JSON.parse(storedTickets));
  }, []);

  const saveTickets = (newTickets: Ticket[]) => {
    setTickets(newTickets);
    localStorage.setItem("tickets", JSON.stringify(newTickets));
  };

  const handleSave = (ticket: Ticket) => {
    const updated = editing
      ? tickets.map((t) => (t.id === ticket.id ? ticket : t))
      : [...tickets, ticket];
    saveTickets(updated);
    setShowForm(false);
    setEditing(null);
    showToast(editing ? "Ticket updated!" : "Ticket created!", "success");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      saveTickets(updated);
      showToast("Ticket deleted!", "success");
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const filteredTickets = tickets.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/Dashboard")}
              className="text-slate-400 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-md flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-white">Ticket Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Signed in as{" "}
              <span className="text-slate-200 font-medium">{user?.username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("ticketapp_session");
                window.location.href = "/";
              }}
              className="border border-slate-600 text-slate-200 hover:bg-slate-700 px-3 py-2 rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-4 py-2 rounded-md flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </button>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-5 bg-slate-800 border border-slate-700 rounded-lg shadow-md text-white space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === "open"
                        ? "bg-green-600/30 text-green-400"
                        : "bg-red-600/30 text-red-400"
                    }`}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{ticket.description}</p>
                <div className="text-xs text-slate-500">
                  Priority: {ticket.priority}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditing(ticket);
                      setShowForm(true);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-12">
              {searchTerm ? "No tickets match your search." : "No tickets yet. Create one to get started!"}
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <TicketForm
          existing={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
