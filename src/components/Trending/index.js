import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'

const Trending = () => {
  const [status, setStatus] = useState('LOADING')
  const [videos, setVideos] = useState([])

  const fetchVideos = async () => {
    const token = Cookies.get('jwt_token')
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
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

  if (status === 'LOADING') {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" />
      </div>
    )
  }

  return (
    <div data-testid="trending">
      <Header />
      <Sidebar />
      <ul>
        {videos.map(v => (
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
  )
}

export default Trending
