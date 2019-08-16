import * as React from 'react'
import Modal from 'react-modal';
import Button from "@material-ui/core/Button";
import RoomForm from './RoomForm'
import './RoomList.css';
import { NavLink } from 'react-router-dom';
import logo from './../drawguesslogoo.png';

interface IProp {
  addPlayer: any
}

interface IState {
  publicRooms: any
  privateRooms: any
  formVisible: boolean
  player: any
  playerName: string
}

class RoomList extends React.Component<IProp, IState>{
  public _isMounted = false;

  public constructor(props:any) {
    super(props);
    this.state = {
      publicRooms: [],
      privateRooms: [],
      formVisible: false,
      player: null,
      playerName: ""
    }

    this.submitName = this.submitName.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
  }

  public createRoom = () => {
    this.setState({
      formVisible: true
    })
  }

  public closeForm = () => {
    this.setState({
      formVisible: false
    })
  }

  public handleChange(event: any) {
    const target = event.target;
    if (target.name === 'name') {
      this.setState({
        playerName: target.value
      })
    }
  }

  public submitName(event: any) {
    event.preventDefault();
    //https://drawguessapi.azurewebsites.net
    //https://localhost:44314
    
    fetch("https://drawguessapi.azurewebsites.net/api/Players", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        playerName: this.state.playerName
      })
    }).then((result: any) => {
      return result.json();
    }).then((result: any) => {
      this.setState({
        player: result
      })

      localStorage.setItem('playerId', this.state.player.playerId);
      localStorage.setItem('playerName', this.state.player.playerName);
      
      this.props.addPlayer(this.state.player);
    }).catch((error) => {
      alert("error: " + error);
    })
  }

  public updateRooms() {
    fetch("https://drawguessapi.azurewebsites.net/api/Rooms", {
      method: "get"
    }).then((result: any) => {
      return result.json();
    }).then((result: any) => {
     
      if (this._isMounted) {
        console.log("rooms fetched");
        console.log(result);
        const publicRooms = result.filter((r: any) => r.roomType === 'public');
        const privateRooms = result.filter((r: any) => r.roomType === 'private');
        
        this.setState({
          publicRooms: publicRooms,
          privateRooms: privateRooms
        })
      }      
    })
  }

  public componentDidMount() {
    this._isMounted = true;
    this.updateRooms();
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const visible = this.state.formVisible;
    const isPlayerNull = (this.state.player === null);
    const playerName = localStorage.getItem('playerName');
    const anyPublicRoom = (this.state.publicRooms.length > 0);
    const anyPrivateRoom = (this.state.privateRooms.length > 0);
    if (playerName || !isPlayerNull) {
      return (
        <div className={visible ? "main flex-center-all flex-column overflow-hidden" : "main flex-center-all flex-column"}>
          <img src={logo} alt="Draw & Guess" />
          {
            visible && <RoomForm 
              isFormOpen={this.state.formVisible} 
              closeForm={this.closeForm} />
          }
          <Button className="button" onClick={this.createRoom}>Create Room</Button>
          {
            anyPublicRoom && 
            <div className="rooms public flex-column">
              <div className="rooms-header">
                <p>PUBLIC ROOMS</p>
              </div>
              <div className="room-btn-desc room-list-desc flex">
                <span className="room-header-desc flex">ID</span> 
                <span className="room-header-desc flex">Name</span> 
              </div>
              {// each public room
                this.state.publicRooms.map((room: any) => (
                  <NavLink className="flex stretch link" key={room.roomId} to={`/room/${room.roomId}`}>
                    <button className="room-btn flex" key={room.roomId}>
                      <div className="room-btn-desc">
                        <span className="room-btn-id">{room.roomId}</span>{room.roomName}
                      </div>
                      <div className="room-btn-players">
                        0/{room.maxPlayers}
                      </div>
                    </button>
                  </NavLink>              
                ))
              }
            </div>
          }
          {
            anyPrivateRoom && 
            <div className="rooms private flex-column">
              <div className="rooms-header">
                <p>PRIVATE ROOMS</p>
              </div>
              <div className="room-btn-desc room-list-desc flex">
                <span className="room-header-desc flex">ID</span> 
                <span className="room-header-desc flex">Name</span> 
              </div>
              {// each private room
                this.state.privateRooms.map((room: any) => (
                  <NavLink className="flex stretch link" key={room.roomId} to={`/room/${room.roomId}`}>
                    <button className="room-btn flex" key={room.roomId}>
                      <div className="room-btn-desc">
                        <span className="room-btn-id">{room.roomId}</span>{room.roomName}
                      </div>
                      <div className="room-btn-players">
                        0/{room.maxPlayers}
                      </div>
                    </button>
                  </NavLink>              
                ))
              }
            </div>
          }          
        </div>
      );
    }

    return (
      <div className="form-window flex-center-all">>
        <Modal className="form-modal" isOpen={isPlayerNull}>
          <div className="form-header flex-center-all">
            <span>Welcome!</span>
          </div>
          <form className="room-form flex-column" onSubmit={this.submitName}>
            <div className="form-row flex-column">
              <label className="form-label">Name</label>
              <input className="form-input" type="text" name="name" placeholder="Pick a nickname" onChange={this.handleChange.bind(this)} />
            </div>
            <input className="form-submit-btn" type="submit" value="Create" />
          </form>
        </Modal>
        
      </div>
    )
  } 
}

export default RoomList;