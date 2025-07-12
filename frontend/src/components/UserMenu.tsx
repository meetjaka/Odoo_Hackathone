import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
      >
        <Avatar src={user?.avatar} name={user?.name || 'User'} size={40} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 font-semibold">My Account</div>
          <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-accent">
            <User size={16} /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-accent">
            <Settings size={16} /> Settings
          </Link>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-accent"
            onClick={logout}
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 