import './globals.css';
import { TicketIcon } from 'lucide-react';

export const metadata = {
  title: 'TicketApp',
  description: 'Stage2 Ticket App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen  text-white flex flex-col">
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-b">
          <div className="max-w-4xl mx-4 px-4 py-3 flex items-center gap-3 justify-start">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center  px-3">
              <TicketIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">TicketApp</h1>
          </div>
        </header>

        <main className="max-w-[1440px] mx-auto w-full">
          {children}
        </main>

        <footer className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full px-4 py-6 text-center text-xs text-white">
          &copy; TicketApp
        </footer>
      </body>
    </html>
  );
}
