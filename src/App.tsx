import { SearchWrap } from "./components/search/SearchWrap";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import { ErrorBoundaryButton } from "./components/error-boundary/ErrorBoundaryButton";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <SearchWrap />
        <ErrorBoundaryButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
