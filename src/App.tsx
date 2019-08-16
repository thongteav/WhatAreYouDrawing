import React from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Room from './Components/Room';
import Header from './Components/Header';

class App extends React.Component<{}>{
  public signalR = require("@aspnet/signalr");

  state = {
    hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://drawguessapi.azurewebsites.net/hub").build(),
    player: {
      playerId: 0,
      playerName: ""
    }
  }

  setPlayer = (player: any) => {
    this.setState({player: player})

    console.log("player set from the room list")
    console.log(this.state.player)
  }

  public componentDidMount = () => {
    this.state.hubConnection.on("Connected", ()  => {
      console.log('A new user has connected to the hub.');
    });



    this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
  }

  // componentWillUnmount() {
  //   console.log("unmounting app");
  //   const player = this.state.player;
  //   if (player) {
  //     console.log("deleting player")
  //     fetch("https://localhost:44314/api/Players/"+player.playerId, {
  //       method:'DELETE'
  //     }).catch((error) => {
  //       alert("error: " + error);
  //     })
  //   }
  // }

  sendName() {
    const name = localStorage.getItem('playerName');
    const id = localStorage.getItem('playerId');
    if (name) {
      this.setState({
        playerId: id,
        playerName: name
      })
    }
  }

  public render() {
    return (
      <div id='app' className='app'>
        <Switch>
          <Header />
          <Route exact path="/" render={() => (<RoomList addPlayer={this.setPlayer} />)} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>        
      </div>
    )
  }
}

export default App;