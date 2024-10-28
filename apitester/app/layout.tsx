"use client"
import { store } from './store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme= "">
      <SessionProvider >
      <Provider store={store}>
      <body>{children}</body>
      </Provider>

      </SessionProvider>
      
      
        
      
    </html>
  );
}
