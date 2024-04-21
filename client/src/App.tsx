import { Navigate, Route, Routes } from 'react-router-dom';
import AlertBox from './components/alert-box/AlertBox';
import ArrowBackToTop from './components/arrow-back-to-top/ArrowBackToTop';
import Authenticate from './components/auth/authenticate/Authenticate';
import ProtectedRoute from './components/auth/protected-route/ProtectedRoute';
import Footer from './components/footer/Footer';
import HttpProvider from './components/http-provider/HttpProvider';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import Admin from './pages/admin/Admin';
import AdminTableDefault from './pages/admin/admin-tables/AdminTableDefault';
import AdminTableSkills from './pages/admin/admin-tables/AdminTableSkills';
import AdminTableUsers from './pages/admin/admin-tables/AdminTableUsers';
import FinishRegister from './pages/auth/finish-register/FinishRegister';
import Login from './pages/auth/login/Login';
import Logout from './pages/auth/logout/Logout';
import Register from './pages/auth/register/Register';
import Chat from './pages/chat/Chat';
import ContactUs from './pages/contact-us/ContactUs';
import EventsCreate from './pages/events-create/EventsCreate';
import EventsDetails from './pages/events-details/EventsDetails';
import Events from './pages/events/Events';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';
import Profile from './pages/profile/Profile';
import './scss/styles.scss';
import { PageEnum, RoleEnum } from './types';
import { AdminPageEnum } from './types/enums/AdminPageEnum';

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
                <Route
                  path={PageEnum.EventsDetails}
                  element={<EventsDetails />}
                />

                {/* Only guests */}
                <Route element={<ProtectedRoute role={null} />}>
                  <Route path={PageEnum.Login} element={<Login />} />
                  <Route path={PageEnum.Register} element={<Register />} />
                </Route>

                {/* Only logged users */}
                <Route
                  element={
                    <ProtectedRoute role={RoleEnum.USER} onlyAuth={true} />
                  }>
                  <Route
                    path={PageEnum.FinishRegister}
                    element={<FinishRegister />}
                  />
                  <Route path={PageEnum.Chat} element={<Chat />} />
                  <Route path={PageEnum.Logout} element={<Logout />} />
                  <Route path={PageEnum.Profile} element={<Profile />} />
                </Route>

                {/* Only organisations */}
                <Route
                  element={<ProtectedRoute role={RoleEnum.ORGANISATION} />}>
                  <Route
                    path={PageEnum.EventsCreate}
                    element={<EventsCreate />}
                  />
                </Route>

                {/* Admin does it's own auth check on load */}
                <Route path={PageEnum.Admin} element={<Admin />}>
                  <Route index element={<AdminTableDefault />} />
                  <Route
                    path={AdminPageEnum.USERS}
                    element={<AdminTableUsers />}
                  />
                  <Route
                    path={AdminPageEnum.SKILLS}
                    element={<AdminTableSkills />}
                  />

                  <Route
                    path="*"
                    element={<Navigate to={PageEnum.NotFound} />}
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
