import 'bootstrap-4-grid/css/grid.min.css';
import DarkTheme from 'react-dark-theme'
import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Noteslist from './components/Noteslist';
import NoteModal from './components/NoteModal';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const darkTheme = {
  background: "black",
  text: '#b3b3b3',
}

const lightTheme = {
  background: '#355487',
  text: '#b3b3b3',
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
      <div className="bootstrap-wrapper">
        <AppNavbar />
        <div className="app-container container">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h1>Jot Note Management</h1>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-8 col-lg-12 col-xl-12">
            <DarkTheme className="theme" light={lightTheme} dark={darkTheme} />
            <NoteModal />
            <Noteslist />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  </div>
                </div>
              </div>
                </div>
          <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          <Footer />
      </Provider>
    );
  }
}

export default App;


