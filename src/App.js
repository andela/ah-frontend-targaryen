import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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
        <Routes />
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
