import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {themeSettings} from './theme'
import {Toaster} from 'react-hot-toast'
import Summary from './pages/Summary';
import Paragraph from './pages/Paragraph';
import ScifiImage from './pages/ScifiImage';
import JsConverter from './pages/JsConverter';
import ChatBot from './pages/ChatBot';
function App() {
  const theme=useMemo(()=> createTheme(themeSettings(),[]))
  return (
   <> 
   <ThemeProvider theme={theme}>
   <CssBaseline/>
   <Toaster />
    <NavBar />
    <Routes>
    <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
    </Routes>
    </ThemeProvider>
   </>
  );
} 

export default App;
