import React from 'react';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-[hsl(var(--card))]/80 backdrop-blur-md shadow-md border-b border-[hsl(var(--accent))]">
      <div className="text-2xl font-extrabold tracking-tight transition-colors duration-200 hover:text-[hsl(var(--accent))] cursor-pointer select-none">
        Skill Swap Platform
      </div>
      <div className="flex items-center gap-4 ml-4">
        {!user ? (
          <Link to="/login">
            <Button variant="outline" className="text-base px-4 py-1">Login</Button>
          </Link>
        ) : (
          <>
            <Button as={Link} to="/requests" variant="ghost" className="text-lg">Swap request</Button>
            <Button as={Link} to="/" variant="ghost" className="text-lg">Home</Button>
            <button onClick={() => navigate('/profile')} className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <Avatar src={user.avatar} name={user.name || 'User'} size={40} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 