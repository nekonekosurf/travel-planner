import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DayDetail from './pages/DayDetail'
import Info from './pages/Info'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/day/:id" element={<DayDetail />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
