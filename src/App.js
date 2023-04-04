import './App.css'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import Graph from './components/Graph'
import MicroservicesPage from './components/MicroservicesPage'
import MicroservicesInfo from './components/MicroservicesInfo'
import Rank from './components/Rank'
import Setting from './components/Setting'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} >
          <Route path="graph" element={<Graph />} />
          <Route path="microservicesPage" element={<MicroservicesPage />} />
          <Route path="microservicesInfo" element={<MicroservicesInfo />} />
          <Route path="rank" element={<Rank />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
