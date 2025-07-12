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
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> SMS Notifications
          </label>
          <Button type="submit" variant="secondary" className="mt-2">Save Preferences</Button>
        </form>
      </Card>
    </div>
  );
};

export default Settings; 