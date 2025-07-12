import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const incoming = [
  {
    user: { name: 'Ben Carter' },
    skill: 'Public Speaking',
    offered: 'JavaScript',
    status: 'Pending',
  },
];
const outgoing = [
  {
    user: { name: 'Elena Rodriguez' },
    skill: 'Advanced Photoshop',
    offered: 'UI/UX Design',
    status: 'Accepted',
  },
];

const Requests: React.FC = () => {
  const [tab, setTab] = useState<'incoming' | 'outgoing'>('incoming');
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Requests</h1>
      <div className="flex gap-2 mb-4">
        <Button variant={tab === 'incoming' ? 'primary' : 'secondary'} onClick={() => setTab('incoming')}>Incoming</Button>
        <Button variant={tab === 'outgoing' ? 'primary' : 'secondary'} onClick={() => setTab('outgoing')}>Outgoing</Button>
      </div>
      <div>
        {tab === 'incoming' && incoming.map((req, i) => (
          <Card key={i} className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">{req.user.name}</div>
              <div className="text-sm">Wants: <Badge color="primary">{req.skill}</Badge> | Offers: <Badge color="gray">{req.offered}</Badge></div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary">Accept</Button>
              <Button variant="outline">Decline</Button>
            </div>
          </Card>
        ))}
        {tab === 'outgoing' && outgoing.map((req, i) => (
          <Card key={i} className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">{req.user.name}</div>
              <div className="text-sm">Wants: <Badge color="primary">{req.skill}</Badge> | Offers: <Badge color="gray">{req.offered}</Badge></div>
            </div>
            <Badge color={req.status === 'Accepted' ? 'success' : req.status === 'Pending' ? 'warning' : 'danger'}>{req.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Requests; 