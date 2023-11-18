import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Modifybook from './pages/Modifybook';
import Addbook from './pages/Addbook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/Homepage" element={<Homepage />}/>
        <Route path="/Modifybook/:id" element={<Modifybook />}/>
        <Route path="/Addbook" element={<Addbook />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
