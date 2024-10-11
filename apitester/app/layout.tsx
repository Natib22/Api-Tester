"use client"
import { store } from './store'
import { Provider } from 'react-redux'
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme= "black">
      <Provider store={store}>
      <body>{children}</body>
      </Provider>
      
        
      
    </html>
  );
}
