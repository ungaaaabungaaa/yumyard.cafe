import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Yumyard.Cafe",
  description: "Brigade El Dorado Rd, Gummanahalli, Bengaluru, Karnataka 562149",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full bg-white antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-white text-neutral-950">
        <div className="mx-auto flex min-h-dvh w-full max-w-mobile flex-col overflow-x-hidden bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
