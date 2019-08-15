import * as React from 'react'
import Modal from 'react-modal';
import Button from "@material-ui/core/Button";
import RoomForm from './RoomForm'
import './RoomList.css';
import { NavLink } from 'react-router-dom';
import logo from './../drawguesslogoo.png';

interface IProp {
  addName: any
}

interface IState {
  roomList: any
  formVisible: boolean
  player: any
  playerName: string
}

class RoomList extends React.Component<IProp, IState>{
  public constructor(props:any) {
    super(props);
    this.state = {
      roomList: [
        {
          roomId: 1,
          roomName: "Hello World",
          maxPlayers: 10,
          type: "public",
          totalPlayers: 5,
          ownerId: 2,
          players: [],
          pin: 0
        },
        {
          roomId: 2,
          roomName: "Have Fun",
          maxPlayers: 15,
          type: "public",
          totalPlayers: 7,
          ownerId: 1,
          players: [],
          pin: 0
        },
        {
          roomId: 3,
          roomName: "Room 3",
          maxPlayers: 20,
          type: "private",
          totalPlayers: 20,
          ownerId: 5,
          players: [],
          pin: 1234
        },
      ],
      formVisible: false,
      player: null,
      playerName: ""
    }

    this.submitName = this.submitName.bind(this);
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

  public addRoom = (room: any) => {
    this.state.roomList.push(room);
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
    const player = {
      playerName: this.state.playerName
    }
    this.setState({
      player: player
    })

    // fetch("https://drawguessapi.azurewebsites.net/api/Players", {
    //   method: "post",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'mode': 'no-cors'
    //   },
    //   body: JSON.stringify({
    //     playerName: this.state.playerName
    //   })
    // }).then((result: any) => {
    //   alert(result);
    //   console.log(result);
    //   return result.json();
    // }).then((result: any) => {
    //   // this.setState({
    //   //   player: result
    //   // })

    //   // this.props.addName(result.playerName);

    //   console.log(result);
    //   if (this.state.player === null) {
    //     console.log("player is still null");
    //   }
    // })
    // .catch((error) => {
    //   alert("error: " + error);
    // })
  }

  public render() {
    const visible = this.state.formVisible;
    const isPlayerNull = (this.state.player === null);
    if (!isPlayerNull) {
      return (
        <div className={visible ? "main flex-center-all flex-column overflow-hidden" : "main flex-center-all flex-column"}>
          <img src={logo} alt="Draw & Guess" />
          {
            visible && <RoomForm 
              isFormOpen={this.state.formVisible} 
              closeForm={this.closeForm} 
              createRoom={this.addRoom}/>
          }
          <Button className="button" onClick={this.createRoom}>Create Room</Button>
          <div className="rooms public flex-column">
            <div className="rooms-header">
              <p>PUBLIC ROOMS</p>
            </div>
            {// each room
              this.state.roomList.map((room: any) => (
                <NavLink className="flex stretch link" key={room.roomId} to={`/room/${room.roomId}`}>
                  <button className="room-btn flex" key={room.roomId}>
                    <div className="room-btn-desc">
                      {room.roomName}
                    </div>
                    <div className="room-btn-players">
                      {room.totalPlayers}/{room.maxPlayers}
                    </div>
                  </button>
                </NavLink>              
              ))
            }
          </div>
          <div className="rooms private">
  
          </div>
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