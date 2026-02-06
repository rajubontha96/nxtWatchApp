import {Switch, Route, Redirect} from 'react-router-dom'
import {useState} from 'react'
import ThemeContext from './components/ThemeContext'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [isDark, setIsDark] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => setIsDark(prev => !prev)

  const addVideo = video => {
    setSavedVideos(prev => {
      const exists = prev.find(v => v.id === video.id)
      if (exists) return prev
      return [...prev, video]
    })
  }

  const removeVideo = id => {
    setSavedVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <ThemeContext.Provider
      value={{isDark, toggleTheme, savedVideos, addVideo, removeVideo}}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </ThemeContext.Provider>
  )
}

export default App
