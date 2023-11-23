import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.css'
import MainLayout from '../components/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </div>

  )
}

