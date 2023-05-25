import './App.css'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import Graph from './components/Graph'
import MicroservicesPage from './components/MicroservicesPage'
import MicroservicesInfo from './components/MicroservicesInfo'
import Rank from './components/Rank'
import Setting from './components/Setting'
import StaticTopo from './components/StaticTopo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RankList from './components/RankList'

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
          <Route path="staticTopo" element={<StaticTopo />} />
          <Route path="ranklist" element={<RankList />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
