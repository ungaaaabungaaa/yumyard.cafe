import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import { headers } from "next/headers";
import "./globals.css";
import { UserNavHeader } from "@/components/user-nav-header";
import { isStoreOpen } from "@/lib/store-hours";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Yumyard.Cafe",
  description: "Brigade El Dorado Rd, Gummanahalli, Bengaluru, Karnataka 562149",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPathname =
    (await headers()).get("x-yumyard-pathname") ?? "/";
  const storeOpen = isStoreOpen();

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full bg-white antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-white text-[#363A33]">
        
        <div className="mx-auto flex min-h-dvh w-full max-w-mobile flex-col overflow-x-hidden bg-white">
        <UserNavHeader initialPathname={initialPathname} storeOpen={storeOpen} />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
