import React from 'react';
import { ToastContainer } from 'react-toastify';
import UserList from './components/UserList';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <UserList />
      </div>
    );
  }
}

export default App;

