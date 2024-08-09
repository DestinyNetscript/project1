import './App.css';
import {BrowserRouter } from "react-router-dom";
import Home from "./components/Home.js";
import Form from "./components/Form.js";
import ScrollToTop from './components/ScrollToTop';
import Footer from "./components/Footer.js"; 
import Navbar from "./components/Navbar.js";
import { Routes, Route  } from "react-router-dom"; 

 
function App() {
  return ( 
    <BrowserRouter> 
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Form" element={<Form/>} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
