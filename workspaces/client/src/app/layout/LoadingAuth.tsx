'use client';

import { useAuth } from '@contexts/AuthContext';
import { MagnifyingGlass } from 'react-loader-spinner';

export default function LoadingAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          glassColor="#ffffff00"
          color="oklch(87.9% 0.169 91.605)"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return <>{children}</>;
}
