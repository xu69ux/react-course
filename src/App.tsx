import { Component } from "react";
import { SearchWrap } from "./components/search/SearchWrap";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <SearchWrap />
        </ErrorBoundary>
      </div>
    );
  }
}
