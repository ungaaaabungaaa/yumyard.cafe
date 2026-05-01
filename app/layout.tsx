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
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex justify-center bg-white">
        <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
