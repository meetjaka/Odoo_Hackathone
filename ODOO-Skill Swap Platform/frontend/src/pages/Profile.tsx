import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'React', 'Node.js', 'UI/UX Design', 'Figma',
  'Photoshop', 'Video Editing', 'Graphic Design', 'Project Management', 'Public Speaking', 'Machine Learning',
  'Data Analysis', 'SQL', 'HTML', 'CSS', 'Marketing', 'Copywriting', 'SEO', 'Social Media', 'Photography',
  'Illustrator', 'After Effects', 'Excel', 'Customer Service', 'Sales', 'Leadership', 'Manager', 'Django',
  'Flask', 'Angular', 'Vue.js', 'Ruby on Rails', 'Swift', 'Kotlin', 'Go', 'Rust', 'Cloud Computing',
];

const LOCATION_SUGGESTIONS = [
  'New York', 'San Francisco', 'London', 'Berlin', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Singapore', 'Dubai',
  'Los Angeles', 'Chicago', 'Boston', 'Austin', 'Seattle', 'Vancouver', 'Amsterdam', 'Dublin', 'Zurich', 'Hong Kong',
  'Barcelona', 'Madrid', 'Rome', 'Milan', 'Munich', 'Frankfurt', 'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki',
  'Bangalore', 'Delhi', 'Mumbai', 'Beijing', 'Shanghai', 'Seoul', 'Cape Town', 'Johannesburg', 'Mexico City', 'São Paulo',
];

const AVAILABILITY_SUGGESTIONS = [
  'weekdays_morning',
  'weekdays_evening',
  'weekends_morning',
  'weekends_evening',
  'anytime',
];

const Profile: React.FC = () => {
  const { user: currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [avatar, setAvatar] = useState('');
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('anytime');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [offeredInput, setOfferedInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [availabilityInput, setAvailabilityInput] = useState('');

  // Load current user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setLocation(currentUser.location || '');
      setLocationInput(currentUser.location || '');
      setSkillsOffered(currentUser.skillsOffered || []);
      setSkillsWanted(currentUser.skillsWanted || []);
      setAvailability(currentUser.availability || 'anytime');
      setAvailabilityInput(currentUser.availability || 'anytime');
      setAvatar(currentUser.avatar || '');
      setBio(currentUser.bio || '');
    }
  }, [currentUser]);

  const handleRemoveSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setSkillsOffered(skillsOffered.filter(s => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter(s => s !== skill));
    }
  };

  const handleAddSkill = (type: 'offered' | 'wanted', value: string) => {
    const skills = value
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    if (type === 'offered') {
      setSkillsOffered(prev => [
        ...prev,
        ...skills.filter(skill => !prev.includes(skill)),
      ]);
    } else {
      setSkillsWanted(prev => [
        ...prev,
        ...skills.filter(skill => !prev.includes(skill)),
      ]);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  const handleRemoveAvatar = () => setAvatar('');

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const updatedData = {
        name,
        location,
        skillsOffered,
        skillsWanted,
        availability,
        bio,
        avatar
      };

      await updateProfile(updatedData);
      setSuccess('Profile saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (currentUser) {
      setName(currentUser.name || '');
      setLocation(currentUser.location || '');
      setLocationInput(currentUser.location || '');
      setSkillsOffered(currentUser.skillsOffered || []);
      setSkillsWanted(currentUser.skillsWanted || []);
      setAvailability(currentUser.availability || 'anytime');
      setAvailabilityInput(currentUser.availability || 'anytime');
      setAvatar(currentUser.avatar || '');
      setBio(currentUser.bio || '');
    }
    setError('');
    setSuccess('');
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

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans px-2 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <Card className="flex items-center justify-between px-8 py-4 mb-2 border-b-2 border-[hsl(var(--border))] rounded-b-none">
          <div className="flex gap-6 items-center">
            <Button 
              variant="ghost" 
              className="text-green-600 text-lg" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button 
              variant="ghost" 
              className="text-red-500 text-lg" 
              onClick={handleDiscard}
              disabled={saving}
            >
              Discard
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" className="text-lg">Swap request</Button>
            <Button variant="outline" onClick={() => { navigate('/login'); }}>Logout</Button>
          </div>
        </Card>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Main Card */}
        <Card className="p-8 rounded-t-none">
          <h1 className="text-3xl mb-6 text-center font-bold">User Profile</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="text-2xl font-medium">Full Name</label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter full name" 
                  className="mt-1 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-xl px-0" 
                />
              </div>

              <div>
                <label className="text-2xl font-medium">Bio</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="mt-1 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-xl px-0 w-full resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-2xl font-medium">Location</label>
                <div className="relative">
                  <Input
                    value={locationInput}
                    onChange={e => {
                      setLocationInput(e.target.value);
                      setLocation(e.target.value);
                    }}
                    placeholder="Enter location..."
                    className="mt-1 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-xl px-0"
                  />
                  {/* Suggestions for Location */}
                  {locationInput && (
                    <div className="absolute z-10 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                      {LOCATION_SUGGESTIONS.filter(loc =>
                        loc.toLowerCase().includes(locationInput.toLowerCase()) &&
                        loc !== location
                      ).slice(0, 8).map(loc => (
                        <div
                          key={loc}
                          className="px-3 py-2 cursor-pointer hover:bg-[hsl(var(--accent))]"
                          onMouseDown={() => {
                            setLocation(loc);
                            setLocationInput(loc);
                          }}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-1">
                  <label className="text-2xl font-medium">Skills Offered</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsOffered.map(skill => (
                      <span key={skill} className="flex items-center gap-1 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-full px-3 py-1 text-lg">
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill, 'offered')} className="ml-1 text-red-500 text-lg">×</button>
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add skill..."
                    value={offeredInput}
                    onChange={e => setOfferedInput(e.target.value)}
                    className="mt-2 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-lg px-0"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ',') {
                        handleAddSkill('offered', offeredInput);
                        setOfferedInput('');
                        e.preventDefault();
                      }
                    }}
                  />
                  {/* Suggestions for Skills Offered */}
                  {offeredInput && (
                    <div className="absolute z-10 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                      {SKILL_SUGGESTIONS.filter(skill =>
                        skill.toLowerCase().includes(offeredInput.toLowerCase()) &&
                        !skillsOffered.includes(skill)
                      ).slice(0, 8).map(skill => (
                        <div
                          key={skill}
                          className="px-3 py-2 cursor-pointer hover:bg-[hsl(var(--accent))]"
                          onMouseDown={() => {
                            handleAddSkill('offered', skill);
                            setOfferedInput('');
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-2xl font-medium">Skills Wanted</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsWanted.map(skill => (
                      <span key={skill} className="flex items-center gap-1 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-full px-3 py-1 text-lg">
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill, 'wanted')} className="ml-1 text-red-500 text-lg">×</button>
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add skill..."
                    value={wantedInput}
                    onChange={e => setWantedInput(e.target.value)}
                    className="mt-2 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-lg px-0"
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ',') {
                        handleAddSkill('wanted', wantedInput);
                        setWantedInput('');
                        e.preventDefault();
                      }
                    }}
                  />
                  {/* Suggestions for Skills Wanted */}
                  {wantedInput && (
                    <div className="absolute z-10 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                      {SKILL_SUGGESTIONS.filter(skill =>
                        skill.toLowerCase().includes(wantedInput.toLowerCase()) &&
                        !skillsWanted.includes(skill)
                      ).slice(0, 8).map(skill => (
                        <div
                          key={skill}
                          className="px-3 py-2 cursor-pointer hover:bg-[hsl(var(--accent))]"
                          onMouseDown={() => {
                            handleAddSkill('wanted', skill);
                            setWantedInput('');
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-2xl font-medium">Availability</label>
                <div className="relative">
                  <Input
                    value={availabilityInput}
                    onChange={e => {
                      setAvailabilityInput(e.target.value);
                      setAvailability(e.target.value);
                    }}
                    placeholder="Enter availability..."
                    className="mt-1 bg-transparent border-b-2 border-[hsl(var(--border))] rounded-none text-xl px-0"
                  />
                  {/* Suggestions for Availability */}
                  {availabilityInput && (
                    <div className="absolute z-10 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
                      {AVAILABILITY_SUGGESTIONS.filter(opt =>
                        opt.toLowerCase().includes(availabilityInput.toLowerCase()) &&
                        opt !== availability
                      ).slice(0, 8).map(opt => (
                        <div
                          key={opt}
                          className="px-3 py-2 cursor-pointer hover:bg-[hsl(var(--accent))]"
                          onMouseDown={() => {
                            setAvailability(opt);
                            setAvailabilityInput(opt);
                          }}
                        >
                          {opt.replace(/_/g, ' ')}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Profile Photo */}
            <div className="flex flex-col items-center justify-start min-w-[220px]">
              <div className="border-2 border-[hsl(var(--border))] rounded-full w-48 h-48 flex flex-col items-center justify-center mb-2 relative bg-[hsl(var(--card))]">
                <Avatar name={name} src={avatar} size={160} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <button
                    className="text-primary underline text-lg hover:text-green-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Add/Edit
                  </button>
                  {avatar && (
                    <button className="text-red-500 underline text-lg mt-1" onClick={handleRemoveAvatar}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="text-xl mt-2 font-medium">Profile Photo</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 