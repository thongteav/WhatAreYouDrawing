import * as React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Close from '@material-ui/icons/Close';
import Undo from '@material-ui/icons/Undo';

interface IState {
  color: string
  width: number
  height: number
  brushRadius: number
  lazyRadius: number
  showPalette: boolean
  showSizeMenu: boolean
  canvasRef: any
  timer: number
  answer: string
}

export default class Canvas extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      color: "#000",
      width: 800,
      height: 800,
      brushRadius: 10,
      lazyRadius: 0,
      showPalette: false,
      showSizeMenu: false,
      canvasRef: null,
      timer: 99,
      answer: ""
    }

    this.getNewWord = this.getNewWord.bind(this);
    this.toggleSizeMenu = this.toggleSizeMenu.bind(this);
    this.togglePalette = this.togglePalette.bind(this);
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.undoLastDraw = this.undoLastDraw.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  public getRandomWord() {
    const words = [
      "joint", "shirt", "stairs", "rocket", "basketball", "sea turtle", "book", "train", "rain",
      "leaf", "key", "angel", "camera", "garden", "watch", "wave", "boat", "deck", "seaweed", "phone",
      "princess", "dog", "pig", "kiwi", "pants"
    ]

    const index = Math.floor(Math.random() * (words.length - 1));
    return words[index];
  }

  public getNewWord() {
    this.setState({
      answer: this.getRandomWord()
    })
  }

  public componentDidMount() {
    this.startTimer();
    this.getNewWord();
  }

  public startTimer() {
    setInterval(this.countDown, 1000);
  }

  public countDown() {
    this.setState((prevState: any) => ({
      timer: prevState.timer - 1
    }))

    if (this.state.timer <= 0) {
      this.setState((prevState: any) => ({
        timer: 99
      }))

      this.getNewWord();
    }
  }

  public toggleSizeMenu(event: any) {
    this.setState((prevState) => ({
      showSizeMenu: !prevState.showSizeMenu
    }))

    if (this.state.showSizeMenu) {
      this.setState({
        showPalette: false
      })

      const colorBtn = document.querySelector('.canvas-color-btn') as HTMLElement;
      colorBtn.classList.remove('canvas-controls-btn-active');
    }

    const sizeBtn = document.querySelector('.canvas-size-btn') as HTMLElement;
    sizeBtn.classList.toggle('canvas-controls-btn-active');
  }

  public togglePalette(event: any) {
    this.setState((prevState) => ({
      showPalette: !prevState.showPalette
    }))

    if (this.state.showPalette) {
      this.setState({
        showSizeMenu: false
      })

      const sizeBtn = document.querySelector('.canvas-size-btn') as HTMLElement;
      sizeBtn.classList.remove('canvas-controls-btn-active');
    }

    event.target.classList.toggle('canvas-controls-btn-active');
  }

  public pickColor(event: any) {
    const newColor = event.target.getAttribute('data-color-value');
    this.setState((prevState) => ({
      color: newColor,
      showPalette: !prevState.showPalette
    }))

    const colorBtn = document.querySelector('.canvas-color-btn') as HTMLElement;
    colorBtn.classList.toggle('canvas-controls-btn-active');
  }

  public pickSize(event: any) {
    const newSize = +event.target.getAttribute('data-size');
    this.setState((prevState) => ({
      brushRadius: newSize,
      showSizeMenu: !prevState.showSizeMenu
    }))

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
      <div className="canvas flex-column">
        <div className="canvas-header no-select">You're drawing {this.state.answer}</div>
        <div style={{cursor: 'auto'}} className="canvas-cursor" >
          <CanvasDraw className="canvas-cursor no-select display-none" 
            ref={this.setCanvasRef}
            canvasWidth={this.state.width} 
            canvasHeight={this.state.height}
            brushColor={this.state.color}
            LazyRadius={this.state.lazyRadius}
            brushRadius={this.state.brushRadius} />
        </div>
        <div className="canvas-controls flex-center-all no-select">
          <div className="canvas-overlay flex-center-all">
            <div className="canvas-timer flex-center-all">{this.state.timer}</div>
            {// colour palette
              this.state.showPalette && 
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
              this.state.showSizeMenu &&
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
                <div className={`size-btn size-btn-${this.state.brushRadius}`}>
                </div>
              </div>
              <span className="canvs-controls-label">Size</span>
            </div>
            <div className="canvas-controls-option flex-column flex-center-all" onClick={this.togglePalette}>
              <div className="canvas-controls-btn flex-center-all canvas-color-btn" style={{backgroundColor: this.state.color}} ></div>
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
    )
  }
}