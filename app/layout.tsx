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
      <body className="min-h-full  flex justify-center">
        <div className="w-full max-w-2xl mx-auto min-h-screen bg-[#F9FAF8] flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}