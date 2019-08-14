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
    showSizeMenu: boolean,
  }
  users: []
  score: number
  canDraw: boolean
  totalPlayers: number
  role: string
  canvasRef: any
  messageList: any[]
  message: string
}

export default class Room extends React.Component<IProp, IState>{
  public constructor(props: any) {
    super(props);

    this.state = {
      canvas: {
        color: "#000",
        width: 500,
        height: 500,
        brushRadius: 10,
        lazyRadius: 0,
        showPalette: false,
        showSizeMenu: false
      },
      users: [],
      score: 0,
      canDraw: true,
      totalPlayers: 1,
      role: "owner",
      canvasRef: null,
      messageList: [],
      message: ""
    }

    this.addMessage = this.addMessage.bind(this);
    this.toggleSizeMenu = this.toggleSizeMenu.bind(this);
    this.togglePalette = this.togglePalette.bind(this);
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.undoLastDraw = this.undoLastDraw.bind(this);
  }

  public sendMessage(event: any) {
    this.addMessage(this.state.message);
    event.preventDefault();
    event.target.reset();
  }

  public updateMessage(event: any) {
    this.setState({ message: event.target.value })
  }

  public addMessage(message: any) {
    let messages = JSON.parse(JSON.stringify(this.state.messageList))
    messages.push(message);

    this.setState({
      messageList: messages
    })
  }

  public toggleSizeMenu(event: any) {
    let canvasCopy = JSON.parse(JSON.stringify(this.state.canvas))
    canvasCopy.showSizeMenu = !canvasCopy.showSizeMenu;

    if (canvasCopy.showSizeMenu) {
      canvasCopy.showPalette = false;

      const colorBtn = document.querySelector('.canvas-color-btn') as HTMLElement;
      colorBtn.classList.remove('canvas-controls-btn-active');
    }

    this.setState({
      canvas: canvasCopy
    })

    const sizeBtn = document.querySelector('.canvas-size-btn') as HTMLElement;
    sizeBtn.classList.toggle('canvas-controls-btn-active');
  }

  public togglePalette(event: any) {
    let canvasCopy = JSON.parse(JSON.stringify(this.state.canvas))
    canvasCopy.showPalette = !canvasCopy.showPalette;

    if (canvasCopy.showPalette) {
      canvasCopy.showSizeMenu = false;

      const sizeBtn = document.querySelector('.canvas-size-btn') as HTMLElement;
      sizeBtn.classList.remove('canvas-controls-btn-active');
    }

    this.setState({
      canvas: canvasCopy
    })

    event.target.classList.toggle('canvas-controls-btn-active');
  }

  public pickColor(event: any) {
    let canvasCopy = JSON.parse(JSON.stringify(this.state.canvas))
    canvasCopy.color = event.target.getAttribute('data-color-value');
    canvasCopy.showPalette = !canvasCopy.showPalette;
    this.setState({
      canvas: canvasCopy
    })

    const colorBtn = document.querySelector('.canvas-color-btn') as HTMLElement;
    colorBtn.classList.toggle('canvas-controls-btn-active');
  }

  public pickSize(event: any) {
    let canvasCopy = JSON.parse(JSON.stringify(this.state.canvas))
    const size = event.target.getAttribute('data-size');
    canvasCopy.brushRadius = +size;
    canvasCopy.showSizeMenu = !canvasCopy.showSizeMenu;
    this.setState({
      canvas: canvasCopy
    })

    const sizeBtn = document.querySelector('.canvas-size-btn') as HTMLElement;
    sizeBtn.classList.toggle('canvas-controls-btn-active');
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
    const sizes = [2, 5, 8, 10, 12, 15];

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
                LazyRadius={this.state.canvas.lazyRadius}
                brushRadius={this.state.canvas.brushRadius} />
            </div>
            <div className="canvas-controls flex-center-all no-select">
              <div className="canvas-overlay flex-center-all">
                <div className="canvas-timer flex-center-all">99</div>
                {// colour palette
                  this.state.canvas.showPalette && 
                  <div className="canvas-controls-group controls-group-left controls-group-above canvas-palette flex">
                  {
                    colors.map(([color, value]: any) => (
                      <div className="canvas-controls-btn controls-btn-picker flex-center-all" 
                            key={color}
                            style={{backgroundColor: value}}
                            onClick={this.pickColor.bind(this)} 
                            data-color-value={value} >
                      </div>
                    ))
                  }
                  </div>
                }
                {// size menu
                  this.state.canvas.showSizeMenu &&
                  <div className="canvas-controls-group controls-group-left controls-group-above flex">
                  {
                    sizes.map((size: any) => (
                      <div className={`canvas-controls-btn controls-btn-size flex-center-all`}
                            key={size}
                            onClick={this.pickSize.bind(this)}
                            data-size={size} >
                        <div className={`size-btn size-btn-${size}`}
                              key={size}
                              data-size={size} >
                        </div>
                      </div>
                    ))
                  }
                  </div>
                }
              </div>
              <div className="canvas-controls-group controls-group-left flex">
                <div className="canvas-controls-option flex-column flex-center-all" onClick={this.toggleSizeMenu}>
                  <div className="canvas-controls-btn flex-center-all canvas-size-btn">
                    <div className={`size-btn size-btn-${this.state.canvas.brushRadius}`}>
                    </div>
                  </div>
                  <span className="canvs-controls-label">Size</span>
                </div>
                <div className="canvas-controls-option flex-column flex-center-all" onClick={this.togglePalette}>
                  <div className="canvas-controls-btn flex-center-all canvas-color-btn" style={{backgroundColor: this.state.canvas.color}} ></div>
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
              <div className="chat-threads flex-column">
                {//messages
                  this.state.messageList.map((message: any, index: number) => (
                    <div className="chat-message" key={index} >
                      <span className="chat-message-text" key={index}>{message}</span>
                    </div>
                  ))
                }
              </div>
              <form className="chat-box" onSubmit={this.sendMessage.bind(this)}>
                <input className="chat-input" placeholder="Say something" maxLength={150} autoComplete="off" type="text" onChange={this.updateMessage.bind(this)}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}