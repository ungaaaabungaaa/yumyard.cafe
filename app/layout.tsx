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
      <body className="min-h-full bg-[#e5e5e5] flex justify-center">
        <div className="w-full max-w-[390px] min-h-screen bg-white flex flex-col shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}