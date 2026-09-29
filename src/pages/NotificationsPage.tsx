import React, { useState } from 'react';
import { Bell, CheckCheck, Video, MessageSquare, Flame, Award, ChevronRight } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { InAppNotification } from '../types';

interface NotificationsPageProps {
  onNavigate: (path: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<InAppNotification[]>(shatranjStore.getNotifications());

  const handleMarkAllRead = () => {
    shatranjStore.markAllNotificationsAsRead();
    setNotifications(shatranjStore.getNotifications());
  };

  const handleNotificationClick = (n: InAppNotification) => {
    shatranjStore.markNotificationAsRead(n.id);
    setNotifications(shatranjStore.getNotifications());
    if (n.actionUrl) {
      onNavigate(n.actionUrl);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Academy Inbox
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Notifications
          </h1>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => handleNotificationClick(n)}
            className={`
              p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-4
              ${!n.isRead
                ? 'border-amber-500/40 bg-slate-900/90 shadow-sm'
                : 'border-slate-800 bg-slate-900/40 opacity-75 hover:opacity-100'
              }
            `}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-slate-800 shrink-0 text-amber-400 mt-0.5">
                {n.type === 'class' && <Video className="w-4 h-4" />}
                {n.type === 'coach' && <MessageSquare className="w-4 h-4" />}
                {n.type === 'streak' && <Flame className="w-4 h-4 text-orange-400" />}
                {n.type === 'payment' && <Award className="w-4 h-4 text-emerald-400" />}
                {n.type === 'puzzle' && <Bell className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{n.title}</h3>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-slate-500 font-mono block pt-1">{n.timestamp}</span>
              </div>
            </div>

            {n.actionUrl && (
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 self-center" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
