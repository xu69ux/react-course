import { Component } from "react";
import { SearchWrap } from "./components/search/SearchWrap";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import { FallBack } from "./components/fallback/FallBack";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary fallback={<FallBack />}>
          <SearchWrap />
        </ErrorBoundary>
      </div>
    );
  }
}
