import * as React from 'react';
import Modal from 'react-modal';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Close from '@material-ui/icons/Close';
import './RoomForm.css';

Modal.setAppElement('#root');

interface IProp {
  closeForm: any
  isFormOpen: boolean
  createRoom: any
}

interface IState {
  name: string,
  type: string,
  maxPlayers: number | number[],
  visible: boolean,
  pin: number
}

export default class RoomForm extends React.Component<IProp, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      name: '',
      type: 'public',
      maxPlayers: 1,
      visible: false,
      pin: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  public handleSubmit(event: any) {
    const newRoom = {
      roomId: 5,
      roomName: this.state.name,
      maxPlayers: this.state.maxPlayers,
      type: this.state.type,
      totalPlayers: 1,
      ownerId: 3,
      players: [],
      pin: this.state.pin
    }

    if (newRoom.roomName === '') {
      newRoom.roomName = event.target.name.value;
    }

    //validate form inputs

    //add room to list
    this.props.createRoom(newRoom);

    event.preventDefault();
    console.log(newRoom);

    this.closeForm();
  }

  public handleNameChange(event: any) {
    this.setState({
      name: event.target.value
    })
  }

  public handleChange(event: any) {
    const eventName = event.target.name;
    const value = event.target.value;

    switch (eventName) {
      case 'name': {
        this.setState({
          name: value
        })
        break;
      }
      case 'type': {
        this.setState({
          type: value
        })
        break;
      }
      case 'pin': {
        this.setState({
          pin: value
        })
        break;
      }
      default: {
        console.log(`Handling required for event name: ${eventName}`);
      }
    }
    
  }

  public handleSliderChange = (event: any, newValue: number | number[]) => {
    this.setState({
      maxPlayers: newValue
    })

    console.log(this.state.maxPlayers);
  }

  public closeForm() {
    this.props.closeForm();
  }

  public getLabels(min: number, max: number) {
    let jsonArr = [];

    for (let i = min; i <= max; ++i) {
      jsonArr.push({
        value: i,
        label: i
      })
    }

    return jsonArr;
  }

  public render() {
    const isPrivate = this.state.type === 'private';
    return (
      //should be a modal window
      <div className="form-window flex-center-all">
        <Modal className="form-modal" isOpen={this.props.isFormOpen}>
          <div className="form-header flex">
            <span>Create Room</span>
            <span className="closeIcon" onClick={this.closeForm}><Close/></span>
          </div>
          <form className="room-form flex-column" onSubmit={this.handleSubmit}>
            <div className="form-row flex-column">
              <label className="form-label">Name</label>
              <input className="form-input" type="text" name="name" placeholder="Room {number}"  onChange={this.handleChange}/>
            </div>
            <div className="form-row flex-column">
              <label className="form-label">Type</label>
              <Select className="form-select" name="type" value={this.state.type} onChange={this.handleChange}>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </div>
            {
              isPrivate &&
              <div className="form-row flex-column">
                <label className="form-label">Pin</label>
                <input className="form-input" type="text" name="pin" placeholder="Enter a pin number" onChange={this.handleChange}/>
              </div>
            }
            <div className="form-row flex-column">
              <label className="form-label">Max Players</label>
              <Slider
                defaultValue={1}
                value={this.state.maxPlayers}
                valueLabelDisplay="auto"
                min={1}
                max={20}
                marks={this.getLabels(1, 20)}
                onChange={this.handleSliderChange}
              />
            </div>
            <input className="form-submit-btn" type="submit" value="Create" />
          </form>
        </Modal>
      </div>
      
    )
  }
}