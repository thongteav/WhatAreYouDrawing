import * as React from 'react';
import CanvasDraw from 'react-canvas-draw';
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
  canvas: {
    color: string,
    width: number,
    height: number,
    brushRadius: number,
    lazyRadius: number,
    showPalette: boolean,
  }
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
      canvas: {
        color: "#000",
        width: 800,
        height: 800,
        brushRadius: 10,
        lazyRadius: 12,
        showPalette: false
      },
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
          {/* canvas */}
          <div className="canvas flex-column">
            <div className="canvas-header no-select"></div>
            <div className="canvas-controls flex-center-all no-select">
              <div className="canvas-overlay">
                <div className="canvas-timer flex-center-all">90</div>
              </div>
              <div className="canvas-controls-group controls-group-left flex">
                <div className="canvas-controls-option flex-column flex-center-all">
                  <div className="canvas-controls-btn flex-center-all"></div>
                  <span className="canvs-controls-label">Size</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all">
                  <div className="canvas-controls-btn flex-center-all"></div>
                  <span className="canvs-controls-label">Color</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all">
                  <div className="canvas-controls-btn flex-center-all"></div>
                  <span className="canvs-controls-label">Clear</span>
                </div>
              </div>
            </div>
            <div style={{cursor: 'auto'}} className="canvas-cursor" >
              <div className="canvas-cursor no-select canvas-cursor-black display-none"></div>
              <CanvasDraw className="canvas no-select" 
                // ref={(canvasDraw: any) => (this.saveableCanvas = canvasDraw)}
                canvasWidth={this.state.canvas.width} 
                canvasHeight={this.state.canvas.height}
                brushColor={this.state.canvas.color}
                lazyRadius={this.state.canvas.lazyRadius}
                brushRadius={this.state.canvas.brushRadius} />
            </div>
          </div>
          {/* chat box */}
          <div className="sidebar flex-column">
            <div className="users flex-column">
              <div className="users-header">
                <span className="users-header-title">PLAYERS </span>
                <span className="users-header-player-count">5/5</span>
              </div>
              <div className="users-list flex-columns"></div>
            </div>
            <div className="chat flex-column">
              <div className="chat-threads flex-column"></div>
              <form className="chat-box">
                <input className="chat-input" placeholder="Say something" maxLength={150} autoComplete="off" type="text"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}