import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import './scss/bootstrap.scss';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />

      {/* Arrow Back To Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}

export default App;
