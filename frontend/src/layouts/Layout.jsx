import { Outlet } from "react-router-dom";
import Nav from "../partials/Nav";
import Footer from "../partials/Footer";

export default function Layout({ checkName }) {
  return (
    <>
      <nav>
        <Nav checkName={checkName} />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
