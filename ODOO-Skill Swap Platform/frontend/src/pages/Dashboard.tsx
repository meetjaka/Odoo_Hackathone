import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI, requestsAPI } from '../services/api';

interface User {
  _id: string;
  name: string;
  avatar?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  location?: string;
  availability?: string;
}

const AVAILABILITY_OPTIONS = [
  'weekdays_morning',
  'weekdays_evening',
  'weekends_morning',
  'weekends_evening',
  'anytime',
];

const Dashboard: React.FC = () => {
  const [availability, setAvailability] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = {
        page,
        limit: 10,
        search: search || undefined,
        availability: availability || undefined
      };

      const response = await usersAPI.getAll(params);
      setUsers(response.data.data.users);
      setTotalPages(response.data.data.pagination.pages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, availability]);

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const handleRequest = async (targetUserId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const targetUser = users.find(u => u._id === targetUserId);
      if (!targetUser) {
        alert('User not found');
        return;
      }

      // Check if current user has skills to offer
      if (!user.skillsOffered || user.skillsOffered.length === 0) {
        alert('Please add skills to your profile before sending requests');
        navigate('/profile');
        return;
      }

      // Check if target user has skills to offer
      if (!targetUser.skillsOffered || targetUser.skillsOffered.length === 0) {
        alert('This user has no skills to offer');
        return;
      }

      await requestsAPI.create({
        toUserId: targetUserId,
        skillsOffered: user.skillsOffered,
        skillsWanted: targetUser.skillsOffered.slice(0, 1),
        message: `Hi! I'd like to swap skills with you.`
      });

      alert('Request sent successfully!');
    } catch (err: any) {
      console.error('Request error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to send request';
      alert(errorMessage);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen text-[hsl(var(--foreground))] font-sans px-2 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[hsl(var(--foreground))] font-sans px-2 py-8">
      {/* Filters */}
      <div className="flex flex-row items-center gap-4 mb-8 px-8 justify-end">
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Availability</option>
          {AVAILABILITY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <div className="w-full max-w-md">
          <Input
            placeholder="Search users or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
            className="w-full"
          />
        </div>
        <Button variant="primary" className="px-8" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 mx-4">
          {error}
        </div>
      )}

      {/* User Cards */}
      <div className="flex flex-col gap-8 px-4">
        {users.map((user) => (
          <Card key={user._id} className="flex flex-col md:flex-row items-center gap-6 rounded-2xl border-2 border-[hsl(var(--accent))] p-6 relative">
            <div className="flex flex-col items-center min-w-[120px]">
              <Link to={`/user/${encodeURIComponent(user.name)}`} className="border-2 border-[hsl(var(--border))] rounded-full w-28 h-28 flex items-center justify-center mb-2 bg-[hsl(var(--card))] hover:shadow-lg transition-shadow">
                <Avatar name={user.name} src={user.avatar} size={96} />
              </Link>
              <div className="text-xs text-muted-foreground">Profile Photo</div>
            </div>
            <div className="flex-1 w-full">
              <div className="text-xl font-bold mb-2">{user.name}</div>
              {user.location && (
                <div className="text-sm text-muted-foreground mb-2">{user.location}</div>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-green-600 font-medium">Skills Offered =&gt;</span>
                {user.skillsOffered.map(skill => (
                  <Badge key={skill} color="primary">{skill}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sky-600 font-medium">Skills Wanted =&gt;</span>
                {user.skillsWanted.map(skill => (
                  <Badge key={skill} color="gray">{skill}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-4 min-w-[120px]">
              <Button
                variant="primary"
                className="px-6 py-2 text-lg"
                onClick={() => handleRequest(user._id)}
              >
                Request
              </Button>
              <div className="text-sm text-muted-foreground">
                Rating <span className="font-bold text-lg">{user.rating}/5</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 mb-4">
          <Button 
            variant="ghost" 
            className="px-2" 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </Button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? 'primary' : 'ghost'}
                className={`px-3 ${page === pageNum ? 'font-bold' : ''}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          <Button 
            variant="ghost" 
            className="px-2" 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 