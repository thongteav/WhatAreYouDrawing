import React from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import { BrowserRouter as Router } from 'react-router-dom';


class App extends React.Component<{}>{
  public render() {
    return (
      <Router>
        <div id='app' className='app'>
          <h1>What Are You Drawing?</h1>
          <RoomList />
        </div>
      </Router>
    )
  }
}

export default App;