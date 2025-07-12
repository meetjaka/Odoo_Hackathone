import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Table from '../components/Table';

const stats = [
  { label: 'Skills Offered', value: 12, change: '+2 this week', icon: '🧑‍🏫' },
  { label: 'Skills Wanted', value: 8, change: '-1 this week', icon: '🎯' },
  { label: 'Pending Swaps', value: 3, change: '+1 today', icon: '🔄' },
  { label: 'Completed', value: 27, change: '5 this month', icon: '✅' },
];

const activity = [
  {
    user: { name: 'Elena Rodriguez', avatar: '', },
    activity: 'accepted your swap request for',
    skill: 'Advanced Photoshop',
    time: '2 hours ago',
    status: 'Accepted',
  },
  {
    user: { name: 'Ben Carter', avatar: '', },
    activity: 'sent you a swap request for',
    skill: 'Public Speaking',
    time: '1 day ago',
    status: 'Pending',
  },
  {
    user: { name: 'Aisha Khan', avatar: '', },
    activity: 'you completed a swap for',
    skill: 'Creative Writing',
    time: '2 days ago',
    status: 'Completed',
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Accepted': return 'success';
    case 'Pending': return 'warning';
    case 'Completed': return 'primary';
    case 'Declined': return 'danger';
    default: return 'gray';
  }
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{stat.label}</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <div className="text-xs text-muted-foreground">{stat.change}</div>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="font-heading text-xl font-bold mb-4">Recent Activity</h2>
        <Table>
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="font-medium py-2 px-4">User</th>
              <th className="font-medium py-2 px-4">Activity</th>
              <th className="font-medium py-2 px-4">Skill</th>
              <th className="font-medium py-2 px-4">Time</th>
              <th className="font-medium py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((item, i) => (
              <tr key={i} className="border-t border-[hsl(var(--border))]">
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={item.user.name} size={40} />
                    <span>{item.user.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4">{item.activity}</td>
                <td className="py-2 px-4">
                  <Badge color="primary">{item.skill}</Badge>
                </td>
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">
                  <Badge color={statusColor(item.status)}>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard; 