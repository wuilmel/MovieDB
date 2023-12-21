import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Files/MainPage";
import LoginPage from "./Files/LoginPage";
import SignupPage from "./Files/SignupPage";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './Files/ProfilePage';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <ToastContainer/>
          <BrowserRouter>
                <Routes>
                  <Route path = '/' element={<MainPage/>}/>
                  <Route path = '/user/login' element={<LoginPage/>}/>
                  <Route path = '/user/signup' element={<SignupPage/>}/>
                  <Route path ='' element={<PrivateRoute/>}>
                    <Route path = '/user/profile' element={<ProfilePage/>}/>
                  </Route>
                </Routes>
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
