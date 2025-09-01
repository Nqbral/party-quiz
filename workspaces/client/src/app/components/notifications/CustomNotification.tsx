'use client';

import { Montserrat } from 'next/font/google';
import { ToastContentProps } from 'react-toastify';

const montserrat = Montserrat({
  subsets: ['latin'],
});

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export default function CustomNotification({ data }: CustomNotificationProps) {
  return (
    <div className={`${montserrat.className}`}>
      <div className="flex w-full flex-col items-center gap-4">
        <h3 className="text-primary text-base sm:text-lg">{data.title}</h3>
        <p className="text-center text-sm text-white sm:text-base">
          {data.content}
        </p>
      </div>
    </div>
  );
}
