import { Route, Routes } from 'react-router-dom';
import AlertBox from './components/alert-box/AlertBox';
import ArrowBackToTop from './components/arrow-back-to-top/ArrowBackToTop';
import Authenticate from './components/auth/authenticate/Authenticate';
import ProtectedRoute from './components/auth/protected-route/ProtectedRoute';
import Footer from './components/footer/Footer';
import HttpProvider from './components/http-provider/HttpProvider';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import Login from './pages/auth/login/Login';
import Logout from './pages/auth/logout/Logout';
import Register from './pages/auth/register/Register';
import ContactUs from './pages/contact-us/ContactUs';
import EventsCreate from './pages/events-create/EventsCreate';
import Events from './pages/events/Events';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';
import './scss/styles.scss';
import { PageEnum, RoleEnum } from './types';

function App() {
  return (
    <>
      <ErrorProvider>
        <AuthProvider>
          <HttpProvider>
            <Authenticate>
              <AlertBox />
              <Navbar />
              <Routes>
                <Route path={PageEnum.Home} element={<Home />} />
                <Route path={PageEnum.Contact} element={<ContactUs />} />
                <Route path={PageEnum.Events} element={<Events />} />

                {/* Only guests */}
                <Route element={<ProtectedRoute role={null} />}>
                  <Route path={PageEnum.Login} element={<Login />} />
                  <Route path={PageEnum.Register} element={<Register />} />
                </Route>

                {/* Only users */}
                <Route element={<ProtectedRoute role={RoleEnum.USER} />}>
                  <Route path={PageEnum.Logout} element={<Logout />} />
                </Route>

                {/* Only organisations */}
                <Route
                  element={<ProtectedRoute role={RoleEnum.ORGANISATION} />}>
                  <Route
                    path={PageEnum.EventsCreate}
                    element={<EventsCreate />}
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />

              <ArrowBackToTop />
            </Authenticate>
          </HttpProvider>
        </AuthProvider>
      </ErrorProvider>
    </>
  );
}

export default App;
