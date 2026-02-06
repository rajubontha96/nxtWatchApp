import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import ThemeContext from '../ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const Home = () => {
  const {isDark} = useContext(ThemeContext)
  const [status, setStatus] = useState('LOADING')
  const [videos, setVideos] = useState([])
  const [search, setSearch] = useState('')
  const [showBanner, setShowBanner] = useState(true)

  const fetchVideos = async () => {
    setStatus('LOADING')
    const token = Cookies.get('jwt_token')
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${search}`,
      {headers: {Authorization: `Bearer ${token}`}},
    )
    const data = await response.json()

    if (response.ok) {
      setVideos(data.videos)
      setStatus('SUCCESS')
    } else {
      setStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const renderVideos = () => {
    if (status === 'LOADING') {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" />
        </div>
      )
    }

    if (status === 'FAILURE') {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble</p>
          <button onClick={fetchVideos}>Retry</button>
        </div>
      )
    }

    if (videos.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            role="img"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button onClick={fetchVideos}>Retry</button>
        </div>
      )
    }

    return (
      <ul>
        {videos.map(v => (
          <li key={v.id}>
            <Link to={`/videos/${v.id}`}>
              <img src={v.thumbnail_url} alt="video thumbnail" />
              <p>{v.title}</p>
              <img src={v.channel.profile_image_url} alt="channel logo" />
              <p>{v.channel.name}</p>
              <p>{v.view_count}</p>
              <p>{v.published_at}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      data-testid="home"
      style={{backgroundColor: isDark ? '#181818' : '#f9f9f9'}}
    >
      <Header />
      <Sidebar />

      {showBanner && (
        <div
          data-testid="banner"
          style={{
            backgroundImage:
              'url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png)',
          }}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p>Buy Nxt Watch Premium</p>
          <button>GET IT NOW</button>
          <button data-testid="close" onClick={() => setShowBanner(false)}>
            X
          </button>
        </div>
      )}

      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button data-testid="searchButton" type="button" onClick={fetchVideos}>
        Search
      </button>

      {renderVideos()}
    </div>
  )
}

export default Home
