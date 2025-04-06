import localFont from 'next/font/local';

export const degular = localFont({
  src: [
    {
      path: '../public/degular/Degular-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/degular/Degular-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/degular/Degular-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-degular',
  display: 'swap',
}); 