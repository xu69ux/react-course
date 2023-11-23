import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { AppProps } from 'next/app';

import '@styles/globals.css';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="fallback">oops, the application crashed, we promise to fix it x_X</div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (  
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="app">
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </React.StrictMode>
  )
}