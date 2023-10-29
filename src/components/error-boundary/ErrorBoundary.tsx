import { Component, ErrorInfo } from "react";
import { FallBack } from "../fallback/FallBack";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  Readonly<ErrorBoundaryState>
> {
  state: Readonly<ErrorBoundaryState> = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <FallBack />;
    }
    return this.props.children;
  }
}
