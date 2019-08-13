import * as React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Close from '@material-ui/icons/Close';
import Undo from '@material-ui/icons/Undo';
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
  canvasRef: any
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
      role: "owner",
      canvasRef: null
    }

    this.togglePalette = this.togglePalette.bind(this);
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.undoLastDraw = this.undoLastDraw.bind(this);
  }

  public togglePalette(event: any) {
    let canvasCopy = JSON.parse(JSON.stringify(this.state.canvas))
    canvasCopy.showPalette = !canvasCopy.showPalette;
    this.setState({
      canvas: canvasCopy
    })

    event.target.classList.toggle('canvas-controls-btn-active');
  }

  public setCanvasRef(element: any) {
    this.setState({
      canvasRef: element
    })
  }

  public clearCanvas = () => {
    if (this.state.canvasRef) this.state.canvasRef.clear();
  }

  public undoLastDraw = () => {
    if (this.state.canvasRef) this.state.canvasRef.undo();
  }

  public render() {
    const colors = [
      ['black', '#000'],        
      ['grey', '#969696'],     
      ['brown', '#814A19'],    
      ['red', '#ED1C24'],      
      ['orange', '#FF7F27'],   
      ['yellow', '#FFF200'],  
      ['green', '#22B14C'],     
      ['blue', '#00A2E8'],     
      ['purple', '#A349A4'],    
      ['white', '#FFF']        
    ]

    return (
      <div className="room flex">
        <h1>Room {this.props.match.params.id}</h1>
        <div className="board flex">
          {/* canvas */}
          <div className="canvas flex-column">
            <div className="canvas-header no-select"></div>
            <div style={{cursor: 'auto'}} className="canvas-cursor" >
              <CanvasDraw className="canvas-cursor no-select display-none" 
                ref={this.setCanvasRef}
                canvasWidth={this.state.canvas.width} 
                canvasHeight={this.state.canvas.height}
                brushColor={this.state.canvas.color}
                lazyRadius={this.state.canvas.lazyRadius}
                brushRadius={this.state.canvas.brushRadius} />
            </div>
            <div className="canvas-controls flex-center-all no-select">
              <div className="canvas-overlay flex-center-all">
                <div className="canvas-timer flex-center-all">90</div>
                {
                  this.state.canvas.showPalette && 
                  <div className="canvas-controls-group controls-group-left controls-group-above canvas-palette flex">
                  {
                    colors.map(([color, value]: any) => (
                      <div className="canvas-controls-btn controls-btn-picker flex-center-all" 
                        key={color}
                        style={{backgroundColor: value}}>
                      </div>
                    ))
                  }
                  </div>
                }
                
              </div>
              <div className="canvas-controls-group controls-group-left flex">
                <div className="canvas-controls-option flex-column flex-center-all">
                  <div className="canvas-controls-btn flex-center-all"></div>
                  <span className="canvs-controls-label">Size</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all" onClick={this.togglePalette}>
                  <div className="canvas-controls-btn flex-center-all"></div>
                  <span className="canvs-controls-label">Color</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all" onClick={this.undoLastDraw}>
                  <div className="canvas-controls-btn flex-center-all">
                    <Undo />
                  </div>
                  <span className="canvs-controls-label">Undo</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all" onClick={this.clearCanvas}>
                  <div className="canvas-controls-btn flex-center-all">
                    <Close />
                  </div>
                  <span className="canvs-controls-label">Clear</span>
                </div>
              </div>
            </div>
            
          </div>
          {/* chat box */}
          <div className="sidebar flex-column">
            <div className="users flex-column">
              <div className="users-header flex">
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