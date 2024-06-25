"use client"
import SideNavbar from './components/nav-bar/Side/SideNavbar';
import TopNavbar from './components/nav-bar/Top/TopNavbar';
import "./globals.css";

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>hbd yerin</title>
      </head>
      <body>
        <div className="block md:hidden">
          <SideNavbar/> 
        </div>
        <div className="hidden md:block">
          <TopNavbar/>
        </div>
          {children}
      </body>
    </html>
  );
}
