import React from "react";
import {Nunito} from "next/font/google";
import type { Metadata } from "next";
import '@/styles/index.scss';
import {ReduxProvider} from "@/store/ReduxProvider";

const nunitoFont = Nunito({subsets: ["cyrillic"]})

export const metadata: Metadata = {
  title: "Cool pizza",
  description: "Pet-project \"cool pizza\" grate example of ASP.NET Core Web and NextJs web-application ",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <ReduxProvider>
          {children}
          {modal}
        </ReduxProvider>
      </body>
    </html>
  );
}
