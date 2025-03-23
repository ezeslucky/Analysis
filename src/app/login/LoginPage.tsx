'use client';
import LoginForm from './LoginForm';

export function LoginPage() {
  if (process.env.disableLogin) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-base75">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
