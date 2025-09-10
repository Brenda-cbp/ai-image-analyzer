import Hero from "./components/Hero";
import UploadSection from "./components/UploadSection";

export default function App() {
  return (
    <>
      <header className="shadow-sm bg-white">
        <nav className="container d-flex align-items-center justify-content-between py-3">
          <a className="navbar-brand fw-semibold m-0" href="#">AI Image Analyzer</a>
          <ul className="nav d-none d-md-flex">
            <li className="nav-item"><a className="nav-link text-secondary" href="#">Home</a></li>
            <li className="nav-item"><a className="btn btn-warning ms-2" href="https://www.kushkipagos.com/">Kushki Pagos</a></li>
          </ul>
        </nav>
      </header>

      <Hero />
      <UploadSection />
    </>
  );
}
