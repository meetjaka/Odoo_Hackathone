import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--background))]">
      <Card className="w-full max-w-sm mx-auto p-8 flex flex-col gap-6">
        <h1 className="font-heading text-2xl font-bold mb-2">Create your SkillBridge account</h1>
        <form className="flex flex-col gap-4">
          <Input label="Name" autoComplete="name" required />
          <Input label="Email" type="email" autoComplete="email" required />
          <Input label="Password" type="password" autoComplete="new-password" required />
          <Button type="submit" className="mt-2">Sign Up</Button>
        </form>
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register; 