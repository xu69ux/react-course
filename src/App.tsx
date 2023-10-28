import { SearchWrap } from "./components/search/SearchWrap";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <SearchWrap />
      </ErrorBoundary>
    </div>
  );
}

export default App;
