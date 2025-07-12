import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Input from '../components/Input';
import { requestsAPI } from '../services/api';

interface Request {
  _id: string;
  fromUser: {
    _id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  toUser: {
    _id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  skillsOffered: string[];
  skillsWanted: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
  responseMessage?: string;
  createdAt: string;
  completedAt?: string;
  rating?: number;
  review?: string;
}

const STATUS_OPTIONS = ['pending', 'accepted', 'rejected', 'completed'];

const Requests: React.FC = () => {
  const [status, setStatus] = useState('pending');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = {
        page,
        limit: 10,
        status: status || undefined
      };

      const response = await requestsAPI.getAll(params);
      setRequests(response.data.data.requests);
      setTotalPages(response.data.data.pagination.pages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, status]);

  const handleSearch = () => {
    setPage(1);
    fetchRequests();
  };

  const handleStatusUpdate = async (requestId: string, newStatus: 'accepted' | 'rejected') => {
    try {
      await requestsAPI.updateStatus(requestId, {
        status: newStatus,
        responseMessage: `Request ${newStatus}`
      });
      
      // Refresh the requests list
      fetchRequests();
      alert(`Request ${newStatus} successfully!`);
    } catch (err: any) {
      alert(err.response?.data?.message || `Failed to ${newStatus} request`);
    }
  };

  const handleComplete = async (requestId: string) => {
    const rating = prompt('Rate this user (1-5):');
    if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      alert('Please enter a valid rating between 1 and 5');
      return;
    }

    const review = prompt('Leave a review (optional):');

    try {
      await requestsAPI.complete(requestId, {
        rating: Number(rating),
        review: review || undefined
      });
      
      fetchRequests();
      alert('Request completed successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to complete request');
    }
  };

  if (loading && requests.length === 0) {
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
      {/* Filter Bar */}
      <div className="flex flex-row items-center gap-4 mb-8 px-8 justify-end">
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
        <div className="w-full max-w-md">
          <Input
            placeholder="Search requests..."
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

      {/* Request Cards */}
      <div className="flex flex-col gap-8 px-4">
        {requests.map((req) => (
          <Card key={req._id} className="flex flex-col md:flex-row items-center gap-6 rounded-2xl border-2 border-[hsl(var(--border))] p-6 relative">
            <div className="flex flex-col items-center min-w-[120px]">
              <div className="border-2 border-[hsl(var(--border))] rounded-full w-28 h-28 flex items-center justify-center mb-2 bg-[hsl(var(--card))]">
                <Avatar name={req.fromUser.name} src={req.fromUser.avatar} size={96} />
              </div>
              <div className="text-xs text-muted-foreground">Profile Photo</div>
              <div className="text-xs mt-1">
                Rating <span className="font-bold text-base">{req.fromUser.rating}/5</span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="text-xl font-bold mb-2">{req.fromUser.name}</div>
              {req.message && (
                <div className="text-sm text-muted-foreground mb-2 italic">"{req.message}"</div>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-green-600 font-medium">Skills Offered =&gt;</span>
                {req.skillsOffered.map(skill => (
                  <Badge key={skill} color="primary">{skill}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sky-600 font-medium">Skills Wanted =&gt;</span>
                {req.skillsWanted.map(skill => (
                  <Badge key={skill} color="gray">{skill}</Badge>
                ))}
              </div>
              {req.responseMessage && (
                <div className="text-sm text-muted-foreground italic">Response: "{req.responseMessage}"</div>
              )}
            </div>
            <div className="flex flex-col items-end gap-4 min-w-[160px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold">Status</span>
                <span className={`ml-2 text-base font-bold ${
                  req.status === 'pending' ? 'text-yellow-600' : 
                  req.status === 'accepted' ? 'text-green-600' : 
                  req.status === 'completed' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              
              {req.status === 'pending' && (
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    className="text-green-600 font-bold"
                    onClick={() => handleStatusUpdate(req._id, 'accepted')}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-red-600 font-bold"
                    onClick={() => handleStatusUpdate(req._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              )}

              {req.status === 'accepted' && (
                <Button 
                  variant="primary"
                  onClick={() => handleComplete(req._id)}
                >
                  Complete
                </Button>
              )}

              {req.status === 'completed' && req.rating && (
                <div className="text-sm text-muted-foreground">
                  Rated: {req.rating}/5
                </div>
              )}
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

export default Requests; 