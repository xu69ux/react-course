import React, { Component } from "react";

import "../../styles/ErrorBoundaryButton.css";

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
    return (
      <button className="error-boundary__btn" onClick={this.handleClick}>
        error generator
      </button>
    );
  }
}
