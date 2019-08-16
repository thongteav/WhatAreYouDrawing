import * as React from 'react';
import Canvas from './Canvas';
import ChatRoom from './ChatRoom';
import './Room.css';

interface IProp {
  match: any
  id: number
  name: string
  ownerId: number
  type: string  
  pin: number
}

interface IState {
  users: any[]
  score: number
  canDraw: boolean
  totalPlayers: number
  role: string
  hubConnection: any
  room: any
  player: any
}

export default class Room extends React.Component<IProp, IState>{
  public _isMounted = false;

  public signalR = require("@aspnet/signalr");
  public constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      score: 0,
      canDraw: true,
      totalPlayers: 1,
      role: "",
      room: null,
      player: null,
      hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://drawguessapi.azurewebsites.net/hub").build(),
    }
  }

  public componentDidMount = () => {
    this._isMounted = true;
    const playerId = localStorage.getItem('playerId');
    const roomId = this.props.match.params.id;
    console.log("Entering a room, userId: " + playerId);

    if (this._isMounted) {
      console.log("updating player list");
      this.updatePlayerList();
    }

    fetch("https://drawguessapi.azurewebsites.net/api/PlayerRooms", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        roomId: roomId,
        playerId: playerId,
        playerRole: "guest",
        playerScore: 0,
        canDraw: true
      })
    }).catch((error) => {
      alert("error: " + error);
    })    

    fetch("https://drawguessapi.azurewebsites.net/api/Rooms/"+roomId, {
      method: "GET"
    }).then((result: any) => {
      return result.json();
    }).then((result: any) => {
      if (this._isMounted) {
        this.setState({
          room: result
        })
      }
      console.log("room fetched and set to state: ");
      console.log(this.state.room)
    })

    fetch("https://drawguessapi.azurewebsites.net/api/Players/"+playerId, {
      method: "GET"
    }).then((result: any) => {
      return result.json();
    }).then((result: any) => {
      if (this._isMounted) {
        this.setState({
          player: result
        })
      }
      console.log("player fetched and set to state: ");
      console.log(this.state.player)
    })   
  }

  public componentWillUnmount = () => {
    console.log("Exiting a room, userId: " + localStorage.getItem('playerId'));

    this._isMounted = false;
  }

  public updatePlayerList() {
    fetch("https://drawguessapi.azurewebsites.net/api/PlayerRooms/", {
      method: "GET"
    }).then((result: any) => {
      return result.json();
    }).then((result: any) => {
      const id = this.props.match.params.id;
      const users = result.filter((r: any) => r.roomId == id);

      if(users.length > 0) {
        console.log("users in the room are:");
        const usersWithName:any[] = []
        users.forEach((player: any) => {
          console.log(player.playerId)
          fetch("https://drawguessapi.azurewebsites.net/api/Players/"+player.playerId, {
            method: "GET"
          }).then((result: any) => {
            return result.json();
          }).then((result: any) => {
            console.log(result);
            usersWithName.push(result);
          })
        });
        this.setState({users:usersWithName})
        console.log(this.state.users);
      }      
    })
  }
  
  public render() {
    const room = this.state.room;
    const users = (this.state.users.length > 0);

    console.log(this.state.users);

    return (
      <div className="room flex">
        {/* <h1>Room {this.props.match.params.id}</h1> */}
        <div className="board flex">
          <Canvas />
          <div className="sidebar flex-column">
            <div className="users flex-column">
              <div className="users-header flex">
                <span className="users-header-title">PLAYERS </span>
                <span className="users-header-player-count">{users && this.state.users.length}/{room && room.maxPlayers}</span>
              </div>
              {
                users && 
                <div className="users-list flex-columns">
                  {
                    this.state.users.map((player: any) => (
                      <div className="users-user flex" key={player.playerId}>
                        <span className="users-name truncate" key={player.playerId}>{player.playerName}</span>
                      </div>
                    ))
                  }
                  {/* <div className="users-user flex users-user-me users-user-drawing">
                      span users-name u-truncate title
                  </div> */}
                </div>
              }
              
            </div>
            <ChatRoom player={this.state.player} room={room}/>
          </div>
        </div>
      </div>
    )
  }
}