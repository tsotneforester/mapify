import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Context } from './Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
    <App />
  </Context>
);
