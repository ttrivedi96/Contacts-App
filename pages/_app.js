import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
// import '../css/style.css'

import { useEffect } from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp