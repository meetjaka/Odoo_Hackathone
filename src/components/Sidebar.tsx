import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Repeat, User, Settings, Flame } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
  { to: '/browse', label: 'Browse', icon: <Users size={20} /> },
  { to: '/requests', label: 'Requests', icon: <Repeat size={20} /> },
  { to: '/profile', label: 'Profile', icon: <User size={20} /> },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={clsx(
      'h-full flex flex-col bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] transition-all duration-200',
      collapsed ? 'w-16' : 'w-60'
    )}>
      <div className="flex items-center gap-2 px-4 py-5">
        <Flame className="text-primary" size={28} />
        {!collapsed && <span className="font-heading text-xl font-bold tracking-tight">SkillBridge</span>}
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-[hsl(var(--foreground))] hover:bg-accent hover:text-primary'
              )
            }
            end={link.to === '/'}
          >
            {link.icon}
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-2 pb-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow'
                : 'text-[hsl(var(--foreground))] hover:bg-accent hover:text-primary'
            )
          }
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button
          className="mt-4 flex items-center justify-center w-full text-xs text-muted-foreground hover:text-primary"
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 