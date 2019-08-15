import React from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Room from './Components/Room';
import Header from './Components/Header';

class App extends React.Component<{}>{
  public render() {
    return (
      <div id='app' className='app'>
        <Switch>
          <Header />
          <Route exact path="/" component={RoomList} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>        
      </div>
    )
  }
}

export default App;