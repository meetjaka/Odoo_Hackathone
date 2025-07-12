import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { usersAPI } from '../services/api';

interface User {
  _id: string;
  name: string;
  avatar?: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  availability?: string;
}

const Browse: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = {
        limit: 20,
        search: search || undefined
      };

      const response = await usersAPI.getAll(params);
      setUsers(response.data.data.users);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleSearch = () => {
    fetchUsers();
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold mb-6">Browse Users</h1>
        
        <div className="flex gap-4 mb-6">
          <Input 
            placeholder="Search users or skills..." 
            className="max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))/90] transition-colors"
          >
            Search
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user._id} className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-lg">{user.name}</div>
                  {user.location && (
                    <div className="text-sm text-muted-foreground">{user.location}</div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    Rating: {user.rating}/5
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Skills Offered:</div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {user.skillsOffered.map(skill => (
                    <Badge key={skill} color="primary">{skill}</Badge>
                  ))}
                </div>
                
                <div className="text-sm font-medium mb-2">Skills Wanted:</div>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.map(skill => (
                    <Badge key={skill} color="gray">{skill}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">No users found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse; 