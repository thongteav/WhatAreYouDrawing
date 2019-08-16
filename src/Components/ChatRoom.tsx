import * as React from 'react';

interface IState {
  messageList: any[]
  message: string
}

export default class ChatRoom extends React.Component<{player: any, room: any}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      messageList: [],
      message: ""
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.addMessageToList = this.addMessageToList.bind(this);
    this.updateMessageList = this.updateMessageList.bind(this);
  }

  public sendMessage(event: any) {
    this.addMessageToList(this.state.message);
    event.preventDefault();
    event.target.reset();
  }

  public updateMessage(event: any) {
    this.setState({ message: event.target.value })
  }

  public addMessageToList(message: any) {
    let messages = JSON.parse(JSON.stringify(this.state.messageList))
    messages.push(message);

    // fetch("https://drawguessapi.azurewebsites.net/api/Messages", {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     roomId: this.props.room.roomId,
    //     playerId: this.props.player.playerId,
    //     content: message
    //   })
    // }).catch((error) => {
    //   alert("error: " + error);
    // })    

    // this.updateMessageList();

    this.setState({
      messageList: messages
    })
  }

  public componentDidMount() {
    // this.updateMessageList();
  }

  public updateMessageList() {
    fetch("https://drawguessapi.azurewebsites.net/api/Messages", {
      method: "GET"
    }).then((response: any) => {
      return response.json();
    }).then((response: any) => {
      this.setState({
        messageList: response
      })
    })
  }

  public render() {
    return (
      <div className="chat flex-column">
        <div className="chat-threads flex-column">
          {//messages
            this.state.messageList.map((message: any, index: number) => (
              <div className="chat-message" key={index} >
                <span></span>
                <span className="chat-message-text" key={index}>{message}</span>
              </div>
            ))
          }
        </div>
        <form className="chat-box" onSubmit={this.sendMessage}>
          <input className="chat-input" placeholder="Say something" maxLength={150} autoComplete="off" type="text" onChange={this.updateMessage.bind(this)}/>
        </form>
      </div>
    )
  }
}