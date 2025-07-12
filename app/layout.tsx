// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";

// import { cn } from "../lib/utills";
// import { ThemeProvider } from "@/components/ui/theme-provider";

// const fontSans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "CarePlus",
//   description: "A healthcare management system",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           "min-h-screen bg-[#131619] font-sans antialiased",
//           fontSans.variable
//         )}
//       >
//         <ThemeProvider attribute="class" defaultTheme="dark">
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "../lib/utills";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Font tanımı
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

// Metadata
export const metadata: Metadata = {
  title: "CarePlus",
  description: "A healthcare management system",
};

// Layout bileşeni
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-[#131619] font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* ThemeProvider'ı body içine alıyoruz ve suppressHydrationWarning ile uyarıyı bastırıyoruz */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
