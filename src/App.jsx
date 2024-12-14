

import './App.css'
import { Route ,Routes} from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Profile from './pages/Profile'
import Allusers from './pages/Allusers'
import Reuiest from './pages/Reuiest'
import Frendslist from './pages/Frendslist'

function App() {
  

  








  return (
    <>
    <Routes>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/login' element={<Loginpage/>}></Route>
      <Route path='/register' element={<Registerpage/>}></Route>
      <Route path='/user' element={<Profile/>}></Route>
      <Route path='/allusers' element={<Allusers/>}></Route>
      <Route path='/req' element={<Reuiest/>}></Route>
      <Route path='/frend' element={<Frendslist/>}></Route>


    </Routes>
    
    </>
  )
 
}

export default App
