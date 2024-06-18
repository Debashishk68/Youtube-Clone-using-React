import Video from './Components/Video'
import { Route,Routes } from 'react-router-dom'
import Search from './Components/Search'
// import Shorts from './Components/Shorts'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Music from './Components/Music'
import Otherpages from './Components/Otherpages'
const App = () => {
  return (
    <>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video/>} />
          {/* <Route path="/shorts" element={<Shorts/>} /> */}
          <Route path="/trending" element={<Trending/>} />
          <Route path="/music" element={<Music/>} />
          <Route path="/:otherpages" element={<Otherpages/>} />
          <Route path="/search/:query" element={<Search/>} />
        </Routes>
    </>
  )
}

export default App
