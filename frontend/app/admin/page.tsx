"use client";
// pages/index.js
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import Footer from "@/components/admin/Footer";
import Cards from "@/components/admin/Cards";
import Charts from "@/components/admin/Charts";
import Projects from "@/components/admin/Projects";
import ColorSystem from "@/components/admin/ClolorSystem";

import { useEffect } from 'react';

export default function Home() {
  
    useEffect(() => {
      // jQuery ve sb-admin'ı tarayıcıda yükle
      const loadScripts = async () => {
        const $ = (await import('jquery')).default;
        (window as any).$ = $;
        (window as any).jQuery = $;
  
        // sb-admin-2 JS yükle
        const script = document.createElement('script');
        script.src = '/js/sb-admin-2.min.js';
        script.async = true;
        document.body.appendChild(script);
      };
  
      loadScripts();
    }, []);
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
          <Topbar />
          <div className="container-fluid">
            <Cards />
            <Charts />
            <div className="row">
            </div>
          </div>
        <Footer />
      </div>
    </div>
  );
}
