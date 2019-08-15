import * as React from 'react';

interface IState {
  messageList: any[]
  message: string
}

export default class ChatRoom extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      messageList: [],
      message: ""
    }

    this.addMessage = this.addMessage.bind(this);
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

  public render() {
    return (
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
    )
  }
}