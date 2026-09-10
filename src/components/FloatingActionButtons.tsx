"use client";

import { useState } from 'react';

const WHATSAPP_NUMBER = "254723388905";

export default function FloatingActionButtons() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Embedded WhatsApp Chat Widget */}
      {isChatOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col origin-bottom-right">
          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">support_agent</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">HuntersVille Support</h4>
                <p className="text-[11px] text-white/80">Chat with us on WhatsApp</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          
          {/* WhatsApp Web Iframe */}
          <div className="flex-1 relative">
            <iframe
              src={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="w-full h-full border-0"
              title="Chat with HuntersVille Tours on WhatsApp"
              allow="clipboard-write"
            />
          </div>
        </div>
      )}

      {/* FABs Container */}
      <div className="flex flex-col gap-3">
        {/* Call FAB */}
        <a 
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-auto"
          aria-label="Call Support"
          title="Call Support"
        >
          <span className="material-symbols-outlined text-[24px]">call</span>
        </a>

        {/* WhatsApp Chat FAB */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-auto ${isChatOpen ? 'bg-gray-800 text-white' : 'bg-[#25D366] text-white'}`}
          aria-label="Chat on WhatsApp"
        >
          {isChatOpen ? (
            <span className="material-symbols-outlined text-[28px]">close</span>
          ) : (
            <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.01 2.01A14.01 14.01 0 0 0 2.21 23.36l-1.9 6.94 7.09-1.86a14 14 0 1 0 8.61-26.43zm0 25.63a11.66 11.66 0 0 1-5.96-1.63l-.43-.25-4.43 1.16 1.18-4.32-.28-.44a11.69 11.69 0 1 1 9.92 5.48zm6.4-8.08c-.35-.18-2.07-1.02-2.39-1.14-.32-.11-.56-.18-.79.18-.23.35-.9 1.14-1.11 1.38-.2.22-.41.25-.76.08-.35-.18-1.48-.54-2.81-1.73-1.04-.93-1.74-2.07-1.94-2.43-.2-.35-.02-.55.16-.73.16-.16.35-.41.52-.61.18-.21.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.79-1.91-1.08-2.61-.29-.69-.58-.6-.79-.61h-.68c-.24 0-.61.09-.94.44s-1.25 1.22-1.25 2.97 1.28 3.44 1.46 3.68c.18.23 2.51 3.83 6.08 5.37.85.37 1.51.59 2.03.75.85.27 1.63.23 2.25.14.69-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.16-.32-.24-.67-.41z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
