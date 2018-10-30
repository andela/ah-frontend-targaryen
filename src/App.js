import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Routes from './components/routes';
import store from './store';
import './assets/App.scss';
import './assets/App.css';
import Navbar from './components/landingPage/Navbar';
import Footer from './components/landingPage/Footer';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <div className="content">
          <ToastContainer />
          <Routes />
        </div>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
