import React from "react";
import Button from "@material-ui/core/Button";
import './MyButton.css';

class MyButton extends React.Component<{name: string}> {
  public render() {
    return (
      <div>
        <Button className="button">{this.props.name}</Button>
      </div>
    );
  } 
}

export default MyButton;
