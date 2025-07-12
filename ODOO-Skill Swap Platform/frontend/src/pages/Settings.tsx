import React from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Settings: React.FC = () => {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-6">Settings</h1>
      <Card className="max-w-xl mx-auto">
        <form className="flex flex-col gap-4">
          <Input label="Name" defaultValue="Sarah Johnson" />
          <Input label="Email" defaultValue="sarah@example.com" type="email" />
          <Input label="Location" defaultValue="San Francisco, CA" />
          <Input label="Availability" defaultValue="Weekends and evenings" />
          <Button type="submit" className="mt-2">Update Account</Button>
        </form>
        <hr className="my-6" />
        <form className="flex flex-col gap-4">
          <div className="font-medium">Notification Preferences</div>
          <label className="flex items-center gap-3 py-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary border-2 border-[hsl(var(--border))] rounded focus:ring-2 focus:ring-primary" />
            <span className="text-base">Email Notifications</span>
          </label>
          <label className="flex items-center gap-3 py-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-primary border-2 border-[hsl(var(--border))] rounded focus:ring-2 focus:ring-primary" />
            <span className="text-base">SMS Notifications</span>
          </label>
          <Button type="submit" variant="secondary" className="mt-2">Save Preferences</Button>
        </form>
      </Card>
    </div>
  );
};

export default Settings; 