import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--background))]">
      <Card className="w-full max-w-sm mx-auto p-8 flex flex-col gap-6">
        <h1 className="font-heading text-2xl font-bold mb-2">Sign in to SkillBridge</h1>
        <form className="flex flex-col gap-4">
          <Input label="Email" type="email" autoComplete="email" required />
          <Input label="Password" type="password" autoComplete="current-password" required />
          <Button type="submit" className="mt-2">Sign In</Button>
        </form>
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login; 