// app/page.tsx

import Link from "next/link";

export default function Home() {
  
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white overflow-hidden flex items-center justify-center">

      <div className="max-w-[1200px] mx-auto text-center relative z-10 px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to TicketApp </h1>
        <p className="text-lg mb-8">
          Manage your support tickets seamlessly — track, update, and resolve issues faster.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/SignUp" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            SignUp
          </Link>
          <Link href="/Login" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
};

// app/Management/page.tsx

"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, LogOut, Plus } from "lucide-react"

export default function TicketManagement() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Redirect to login if no user is found
      window.location.href = '/Login';
      return;
    }
    setUser(JSON.parse(currentUser));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/Dashboard'}
              className="text-slate-400 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-md flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-white">Ticket Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Signed in as <span className="text-slate-200 font-medium">{user?.username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('currentUser');
                window.location.href = '/Login';
              }}
              className="border border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent px-3 py-2 rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Controls */}
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
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-4 py-2 rounded-md flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </button>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <div className="py-12 text-center">
                <p className="text-slate-400">
                  {searchTerm ? "No tickets match your search" : "No tickets yet. Create one to get started!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
// app/Login/page.tsx

"use client";

import { useState } from "react";

type ContactFormData = {
  username: string;
  password: string;
}

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({    
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError("");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching username and password
    const user = users.find(
      (u: any) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      console.log("Login successful!", user);
      setError("");
      // Store the current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Clear form
      setFormData({
        username: "",
        password: "",
      });
      // Redirect to dashboard
      window.location.href = '/Dashboard';
    } else {
      setError("Invalid username or password");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg shadow-md border border-slate-700">
        <h2 className="text-center text-3xl font-bold text-white">Login</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <a href="/SignUp" className="text-sm text-slate-400 hover:text-slate-300">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

// app/SignUp/page.tsx

'use client'
import React, { useState } from "react";

type ContactFormData = {
  id?: string;
  username: string;
  password: string;
  confirm_password: string;
}

  

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    username: "",
    password: "",
    confirm_password: "",
  });


  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({    
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError("");
  }
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    // Generate unique ID using timestamp and random number
    const newUser = {
      ...formData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Add new user
    existingUsers.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Clear form
    setFormData({
      username: "",
      password: "",
      confirm_password: "",
    });

    console.log("User registered successfully:", newUser);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-lg shadow-md border border-slate-700">
        <h2 className="text-center text-3xl font-bold text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400">Confirm Password:</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <a href="/Login" className="text-sm text-slate-400 hover:text-slate-300">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
// Dashboard/page.tsx

"use client"
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
    const currentUser = localStorage.getItem('currentUser');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TicketIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Ticket System</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Signed in as <span className="text-slate-200 font-medium">{user?.username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('currentUser');
                window.location.href = '/Login';
              }}
              className="border border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent px-4 py-2 rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-slate-400">Welcome back! Here's an overview of your ticket system.</p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <div className="flex flex-col space-y-1.5 pb-3">
                <h2 className="text-sm font-medium text-slate-400">Total Tickets</h2>
              </div>
              <div className="pt-0">
                <div className="text-3xl font-bold text-white">0</div>
                <p className="text-xs text-slate-500 mt-1">All tickets in system</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <div className="flex flex-col space-y-1.5 pb-3">
                <h2 className="text-sm font-medium text-slate-400">Open Tickets</h2>
              </div>
              <div className="pt-0">
                <div className="text-3xl font-bold text-yellow-400">0</div>
                <p className="text-xs text-slate-500 mt-1">Awaiting resolution</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <div className="flex flex-col space-y-1.5 pb-3">
                <h2 className="text-sm font-medium text-slate-400">Resolved Tickets</h2>
              </div>
              <div className="pt-0">
                <div className="text-3xl font-bold text-green-400">0</div>
                <p className="text-xs text-slate-500 mt-1">Completed tickets</p>
              </div>
            </div>
          </div>

          {/* Action Section */}
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
