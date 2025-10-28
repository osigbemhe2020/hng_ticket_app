
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
    window.location.href = '/Login';

    console.log("User registered successfully:", newUser);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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


