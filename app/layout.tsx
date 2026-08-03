import type { Metadata } from 'next';
import './globals.css';
import FloatingCTA from './components/FloatingCTA';

export const metadata: Metadata = {
  title: 'منتجع ربى الورد — الشفا، الطائف',
  description:
    'منتجع وهمي في الشفا بالطائف، على مقربة من مزارع الورد الطائفي. موقع تجريبي لأغراض العرض التصميمي.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
