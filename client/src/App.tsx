import { Route, Routes } from 'react-router-dom';
import AlertBox from './components/alert-box/AlertBox';
import ArrowBackToTop from './components/arrow-back-to-top/ArrowBackToTop';
import Footer from './components/footer/Footer';
import HttpProvider from './components/http-provider/HttpProvider';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ContactUs from './pages/contact-us/ContactUs';
import Events from './pages/events/Events';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';
import './scss/styles.scss';
import { PageEnum } from './types';

function App() {
  return (
    <>
      <ErrorProvider>
        <AuthProvider>
          <HttpProvider>
            <AlertBox />
            <Navbar />
            <Routes>
              <Route path={PageEnum.Home} element={<Home />} />
              <Route path={PageEnum.Contact} element={<ContactUs />} />
              <Route path={PageEnum.Events} element={<Events />} />
              <Route path={PageEnum.Login} element={<Login />} />
              <Route path={PageEnum.Register} element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />

            <ArrowBackToTop />
          </HttpProvider>
        </AuthProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
