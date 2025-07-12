import React from 'react';
import Input from '../components/Input';
import Card from '../components/Card';
import Badge from '../components/Badge';

const users = [
  {
    name: 'Sarah Johnson',
    avatar: '',
    location: 'San Francisco, CA',
    skillsOffered: ['JavaScript', 'React'],
    skillsWanted: ['UI/UX Design'],
  },
  {
    name: 'Mike Chen',
    avatar: '',
    location: 'New York, NY',
    skillsOffered: ['UI/UX Design', 'Figma'],
    skillsWanted: ['JavaScript'],
  },
];

const Browse: React.FC = () => {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Browse</h1>
      <div className="flex gap-4 mb-6">
        <Input placeholder="Search users or skills..." className="max-w-xs" />
        {/* Add filter dropdowns here */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, i) => (
          <Card key={i} className="flex flex-col gap-2">
            <div className="font-semibold text-lg">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.location}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {user.skillsOffered.map(skill => (
                <Badge key={skill} color="primary">{skill}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.skillsWanted.map(skill => (
                <Badge key={skill} color="gray">{skill}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Browse; 