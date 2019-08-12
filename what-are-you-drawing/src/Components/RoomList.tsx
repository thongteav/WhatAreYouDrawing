import * as React from 'react'
import Button from "@material-ui/core/Button";
import RoomForm from './RoomForm'
import Room from './Room'
import './RoomList.css';
import App from '../App';
import { Link } from 'react-router-dom';

interface IState {
  roomList: any
  formVisible: boolean
}

class RoomList extends React.Component<{}, IState>{
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
    }
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

  public render() {
    const visible = this.state.formVisible;
    return (
      <div className={visible ? "rooms flex-column overflow-hidden" : "rooms flex-column"}>
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
              <Link className="flex stretch" to={`/${room.roomId}`}>
                <button className="room-btn flex" key={room.roomId}>
                  <div className="room-btn-desc">
                    {room.roomName}
                  </div>
                  <div className="room-btn-players">
                    {room.totalPlayers}/{room.maxPlayers}
                  </div>
                </button>
              </Link>              
            ))
          }
        </div>
        <div className="rooms private">

        </div>
      </div>
    );
  } 
}

export default RoomList;