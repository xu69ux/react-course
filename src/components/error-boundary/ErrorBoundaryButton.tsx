import React, { Component } from "react";

interface ErrorBoundaryButtonProps {}

export class ErrorBoundaryButton extends Component<
  ErrorBoundaryButtonProps,
  { counter: number }
> {
  constructor(props: ErrorBoundaryButtonProps) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 1) {
      throw new Error("app crashed!");
    }
    return <button onClick={this.handleClick}>Generate Error</button>;
  }
}
