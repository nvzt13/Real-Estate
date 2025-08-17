import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from "@/components/layout/Header";
import 'leaflet/dist/leaflet.css';
import StoreProvider from "./StoreProvider";
import FillReduxStore from "@/components/FillReduxStore";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const metadata = {
  title: "Villa Agency",
  description: "Real Estate App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <StoreProvider>
      <Header />
        {children}
      <FillReduxStore />
            <ToastContainer position="top-right" autoClose={3000} />
        </StoreProvider>
        {/* Bootstrap JS - sadece client-side */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}


