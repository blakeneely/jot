import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Noteslist from './components/Noteslist';
import NoteModal from './components/NoteModal';
import { Container } from 'reactstrap';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DarkTheme from 'react-dark-theme'

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
        <div className="App">
        <DarkTheme className="theme" light={lightTheme} dark={darkTheme} />
        <AppNavbar />
        <Container className="main-container">
          <NoteModal />
          <Noteslist />
        </Container>
        <Footer className="footer"/>
        </div>
      </Provider>
    )
  }
}

export default App;


