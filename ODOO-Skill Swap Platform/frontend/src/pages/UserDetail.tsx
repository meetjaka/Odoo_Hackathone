import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Input from '../components/Input';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { usersAPI, requestsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface User {
  _id: string;
  name: string;
  avatar?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  totalRatings: number;
  bio?: string;
  location?: string;
  availability?: string;
  createdAt?: string;
}

const UserDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!name) return;
      
      try {
        setLoading(true);
        setError('');
        
        const response = await usersAPI.getByName(decodeURIComponent(name));
        setUser(response.data.data.user);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!user) return;

    try {
      setSubmitting(true);
      
      await requestsAPI.create({
        toUserId: user._id,
        skillsOffered: [offeredSkill],
        skillsWanted: [wantedSkill],
        message: message
      });

      setShowModal(false);
      setOfferedSkill('');
      setWantedSkill('');
      setMessage('');
      alert('Request sent successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            {error || 'User not found'}
          </div>
        </div>
      </div>
    );
  }

  // Don't show request button if viewing own profile
  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
      {/* Main Card */}
      <Card className="flex flex-col md:flex-row gap-8 rounded-2xl border-2 border-[hsl(var(--border))] p-8 max-w-5xl mx-auto mt-8">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-6 justify-start">
          {!isOwnProfile && (
            <Button 
              variant="primary" 
              className="w-32 mb-4 bg-cyan-700 hover:bg-cyan-800" 
              onClick={() => setShowModal(true)}
            >
              Request
            </Button>
          )}
          
          <div className="text-2xl font-bold mb-2">{user.name}</div>
          
          {user.location && (
            <div className="text-sm text-muted-foreground mb-2">
              📍 {user.location}
            </div>
          )}
          
          {user.bio && (
            <div className="text-sm text-muted-foreground mb-4 italic">
              "{user.bio}"
            </div>
          )}
          
          <div>
            <div className="text-lg font-semibold mb-1">Skills Offered</div>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map(skill => (
                <Badge key={skill} color="primary">{skill}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold mb-1">Skills Wanted</div>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map(skill => (
                <Badge key={skill} color="gray">{skill}</Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <div className="text-lg font-semibold mb-1">Rating and Feedback</div>
            <div className="text-base">
              Rating: <span className="font-bold">{user.rating}/5</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({user.totalRatings} reviews)
              </span>
            </div>
            {user.availability && (
              <div className="text-sm text-muted-foreground mt-1">
                Availability: {user.availability.replace(/_/g, ' ')}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section: Profile Photo */}
        <div className="flex flex-col items-center justify-center min-w-[260px]">
          <div className="border-2 border-[hsl(var(--border))] rounded-full w-60 h-60 flex items-center justify-center mb-2 bg-[hsl(var(--card))]">
            <Avatar name={user.name} src={user.avatar} size={220} />
          </div>
          <div className="text-xl mt-2 font-medium">Profile Photo</div>
        </div>
      </Card>

      {/* Modal for swap request */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-[hsl(var(--background))] border-2 border-[hsl(var(--border))] rounded-2xl p-8 w-full max-w-md shadow-xl relative">
            <button 
              className="absolute top-2 right-4 text-2xl" 
              onClick={() => setShowModal(false)}
              disabled={submitting}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="font-medium">Choose one of your offered skills</label>
              <select
                value={offeredSkill}
                onChange={e => setOfferedSkill(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={submitting}
              >
                <option value="">Select a skill</option>
                {currentUser?.skillsOffered?.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                )) || []}
              </select>
              
              <label className="font-medium">Choose one of their wanted skills</label>
              <select
                value={wantedSkill}
                onChange={e => setWantedSkill(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={submitting}
              >
                <option value="">Select a skill</option>
                {user.skillsWanted.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              
              <label className="font-medium">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your message..."
                required
                disabled={submitting}
              />
              
              <Button 
                type="submit" 
                className="w-32 mx-auto mt-2 bg-cyan-700 hover:bg-cyan-800"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail; 