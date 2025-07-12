import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';

const user = {
  name: 'Sarah Johnson',
  avatar: '',
  bio: 'Passionate web developer with 5+ years of experience. Love teaching and learning new technologies.',
  location: 'San Francisco, CA',
  skillsOffered: ['JavaScript', 'React', 'Node.js'],
  skillsWanted: ['UI/UX Design', 'Machine Learning'],
};

const Profile: React.FC = () => {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Profile</h1>
      <Card className="flex flex-col items-center gap-4 max-w-xl mx-auto">
        <Avatar name={user.name} src={user.avatar} size={80} />
        <div className="text-xl font-semibold">{user.name}</div>
        <div className="text-muted-foreground">{user.location}</div>
        <div className="text-center text-sm max-w-md">{user.bio}</div>
        <div className="w-full flex flex-col gap-2 mt-4">
          <div>
            <span className="font-medium">Skills Offered:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.skillsOffered.map(skill => (
                <Badge key={skill} color="primary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium">Skills Wanted:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.skillsWanted.map(skill => (
                <Badge key={skill} color="gray">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile; 