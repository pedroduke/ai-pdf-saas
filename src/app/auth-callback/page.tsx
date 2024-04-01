'use client';

import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

// import { Suspense } from 'react';

const Page = () => {
  const retry = useRef(0);
  const maxRetryCount = 10;

  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { refetch } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      console.log(success);
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
    onError: (err) => {
      console.log(err);
      if (err.data?.code === 'UNAUTHORIZED') {
        retry.current = retry.current + 1;
        if (retry.current <= maxRetryCount) {
          // Retry up to maxRetryCount
          setTimeout(() => {
            refetch();
          }, 500);
        } else {
          router.push('/sign-in');
        }
      }
    },
    retry: false,
    retryDelay: 500,
  });

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        {/* <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-zinc-800" />}> */}
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default Page;
