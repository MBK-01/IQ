import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  QrCode,
  CheckCircle,
  Download,
  Share2,
  Image as ImageIcon,
  Sparkles,
  Ticket
} from 'lucide-react';

export const EventModule = () => {
  const { events, myEventRegistrations, registerEvent, user } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);
  const [ticketQrUrl, setTicketQrUrl] = useState('');

  const handleRegister = async (evt) => {
    registerEvent(evt.id);
    try {
      const code = `IQ-TICKET-${evt.id}-${Math.floor(1000 + Math.random() * 9000)}`;
      const url = await QRCode.toDataURL(code, { width: 220, margin: 2 });
      setTicketQrUrl(url);
      setActiveTicket({ ...evt, ticketCode: code });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" /> Event & Workshop Management System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Register for technical workshops, hackathons, seminars, CSS/IELTS sessions, and download QR admission tickets.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt) => {
          const isRegistered = myEventRegistrations.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="glass-panel-interactive rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-purple-500/20 backdrop-blur-md border border-purple-500/40 text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {evt.category}
                </span>
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                  {evt.isFree ? 'FREE' : `PKR ${evt.price}`}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{evt.description}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <p className="flex items-center gap-2">📅 {evt.date} • ⏰ {evt.time}</p>
                  <p className="flex items-center gap-2">📍 {evt.venue}</p>
                  <p className="flex items-center gap-2 text-cyan-400">
                    <Users className="w-3.5 h-3.5" /> Registered: {evt.registeredCount} / {evt.capacity} Slots
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleRegister(evt)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isRegistered
                        ? 'bg-slate-800 text-purple-300 border border-purple-500/40'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <QrCode className="w-4 h-4" /> View QR Ticket
                      </>
                    ) : (
                      <>
                        <Ticket className="w-4 h-4" /> Register & Get QR Ticket
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EVENT GALLERY SHOWCASE SECTION (FR-05-040) */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" /> Society Event Highlights Gallery
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Moments from recent workshops, CSS guidance sessions, and industrial tours.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80'
          ].map((url, idx) => (
            <div key={idx} className="h-36 rounded-2xl overflow-hidden border border-slate-800 group relative">
              <img src={url} alt="Gallery highlight" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] font-bold text-white bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                  View Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR TICKET MODAL */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl border border-purple-500/50 text-center space-y-4 relative">
            <div className="space-y-1">
              <span className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest bg-purple-500/20 px-3 py-0.5 rounded-full border border-purple-500/30">
                Official Admission Ticket
              </span>
              <h3 className="text-lg font-bold text-white mt-2">{activeTicket.title}</h3>
              <p className="text-xs text-slate-400">Venue: {activeTicket.venue}</p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl inline-block shadow-2xl">
              {ticketQrUrl && <img src={ticketQrUrl} alt="QR Code Ticket" className="w-44 h-44 mx-auto" />}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <p><strong>Ticket ID:</strong> {activeTicket.ticketCode}</p>
              <p><strong>Attendee:</strong> {user.name} ({user.department})</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert('QR Ticket saved to device!')}
                className="flex-1 gradient-button py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Save Ticket
              </button>
              <button
                onClick={() => setActiveTicket(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
