
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Login';
import Dashbord from './components/Dashbord';
import Messages from './components/Messages';
import Leaves from './components/Leaves';
import Tasks from './components/Tasks';
import TopNavigation from './components/TopNavigation';
import EditProfile from './components/EditProfile';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashbord' element={<Dashbord/>}></Route>
      <Route path='/message' element={<Messages/>}></Route>
      <Route path='/leaves' element={<Leaves/>}></Route>
      <Route path='/tasks' element={<Tasks/>}></Route>
      <Route path='/editProfile' element={<EditProfile/>}></Route>
      <Route path='/topNavigation' element={<TopNavigation/>}></Route>

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
