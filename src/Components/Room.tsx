import * as React from 'react';
import Canvas from './Canvas';
import ChatRoom from './ChatRoom';
import './Room.css';

interface IProp {
  match: any
  id: number
  name: string
  ownerId: number
  maxPlayers: number
  type: string  
  pin: number
}

interface IState {
  users: []
  score: number
  canDraw: boolean
  totalPlayers: number
  role: string
}

export default class Room extends React.Component<IProp, IState>{
  public constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      score: 0,
      canDraw: true,
      totalPlayers: 1,
      role: "owner"      
    }
  }
  
  public render() {
    return (
      <div className="room flex">
        <h1>Room {this.props.match.params.id}</h1>
        <div className="board flex">
          <Canvas />
          <div className="sidebar flex-column">
            <div className="users flex-column">
              <div className="users-header flex">
                <span className="users-header-title">PLAYERS </span>
                <span className="users-header-player-count">5/5</span>
              </div>
              <div className="users-list flex-columns"></div>
            </div>
            <ChatRoom />
          </div>
        </div>
      </div>
    )
  }
}