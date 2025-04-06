'use client';

import Header from '@/layout/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
     <div className="w-full grid place-items-center">
     <Header />
     </div>
     <div className="max-w-7xl mx-auto py-6 mt-10 lg:mt-20">
     {children}
     </div>
      </div>
    </QueryClientProvider>
  );
}
