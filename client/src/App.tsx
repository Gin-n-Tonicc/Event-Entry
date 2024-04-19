import { Route, Routes } from 'react-router-dom';
import ArrowBackToTop from './components/arrow-back-to-top/ArrowBackToTop';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import ContactUs from './pages/contact-us/ContactUs';
import Home from './pages/home/Home';
import './scss/bootstrap.scss';
import { PageEnum } from './types/enums';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={PageEnum.Home} element={<Home />} />
        <Route path={PageEnum.Contact} element={<ContactUs />} />
      </Routes>
      <Footer />

      <ArrowBackToTop />
    </>
  );
}

export default App;
