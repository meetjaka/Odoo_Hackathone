import React from 'react';
import { Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
      <div className="flex-1 flex items-center">
        <input
          type="text"
          placeholder="Search skills or users..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 rounded-full hover:bg-accent focus:outline-none">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header; 