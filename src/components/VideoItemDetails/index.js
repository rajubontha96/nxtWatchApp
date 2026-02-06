import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import ThemeContext from '../ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {ActionButton} from './styledComponents'

const VideoItemDetails = props => {
  const {id} = props.match.params
  const {addVideo, removeVideo, savedVideos, isDark} = useContext(ThemeContext)

  const [video, setVideo] = useState(null)
  const [status, setStatus] = useState('LOADING')
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)

  const isSaved = savedVideos.find(v => v.id === id)

  const fetchVideo = async () => {
    setStatus('LOADING')
    const token = Cookies.get('jwt_token')

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    })

    const data = await response.json()

    if (response.ok) {
      setVideo(data.video_details)
      setStatus('SUCCESS')
    } else {
      setStatus('FAILURE')
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [id])

  const toggleSave = () => {
    if (isSaved) {
      removeVideo(id)
    } else {
      addVideo(video)
    }
  }

  const bgColor = isDark ? '#0f0f0f' : '#f9f9f9'

  const renderContent = () => {
    if (status === 'LOADING') {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
          <button onClick={fetchVideo}>Retry</button>
        </div>
      )
    }

    return (
      <div>
        <ReactPlayer url={video.video_url} width="100%" />

        <p>{video.title}</p>
        <p>{video.view_count}</p>
        <p>{video.published_at}</p>

        <ActionButton
          type="button"
          active={like}
          onClick={() => {
            if (like) {
              setLike(false)
            } else {
              setLike(true)
              setDislike(false)
            }
          }}
        >
          Like
        </ActionButton>

        <ActionButton
          type="button"
          active={dislike}
          onClick={() => {
            if (dislike) {
              setDislike(false)
            } else {
              setDislike(true)
              setLike(false)
            }
          }}
        >
          Dislike
        </ActionButton>

        {/* Save Button */}
        <button
          type="button"
          style={{color: isSaved ? '#2563eb' : '#64748b'}}
          onClick={toggleSave}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>

        {/* Channel details */}
        <div>
          <img src={video.channel.profile_image_url} alt="channel logo" />
          <p>{video.channel.name}</p>
          <p>{video.channel.subscriber_count}</p>
        </div>

        <p>{video.description}</p>
      </div>
    )
  }

  return (
    <div
      data-testid="videoItemDetails"
      style={{backgroundColor: bgColor, minHeight: '100vh'}}
    >
      <Header />
      <Sidebar />
      {renderContent()}
    </div>
  )
}

export default VideoItemDetails
