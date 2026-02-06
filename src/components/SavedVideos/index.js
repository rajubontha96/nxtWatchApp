import {useContext} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const SavedVideos = () => {
  const {savedVideos, isDark} = useContext(ThemeContext)

  return (
    <div
      data-testid="savedVideos"
      style={{backgroundColor: isDark ? '#0f0f0f' : '#f9f9f9'}}
    >
      <Header />
      <Sidebar />

      {savedVideos.length === 0 ? (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>You can save your videos while watching them</p>
        </div>
      ) : (
        <div>
          <h1>Saved Videos</h1>
          <ul>
            {savedVideos.map(v => (
              <li key={v.id}>
                <Link to={`/videos/${v.id}`}>
                  <img src={v.thumbnail_url} alt="video thumbnail" />
                  <p>{v.title}</p>
                  <p>{v.channel.name}</p>
                  <p>{v.view_count}</p>
                  <p>{v.published_at}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SavedVideos
