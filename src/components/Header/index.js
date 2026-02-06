import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import ThemeContext from '../ThemeContext'

const Header = props => (
  <ThemeContext.Consumer>
    {({isDark, toggleTheme}) => {
      const logo = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onLogout = () => {
        Cookies.remove('jwt_token')
        props.history.replace('/login')
      }

      return (
        <div>
          <Link to="/">
            <img src={logo} alt="website logo" />
          </Link>

          <button data-testid="theme" onClick={toggleTheme}>
            Theme
          </button>

          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />

          <Popup
            modal
            trigger={<button>Logout</button>}
            className="popup-content"
          >
            {close => (
              <div>
                <p>Are you sure, you want to logout</p>
                <button onClick={close}>Cancel</button>
                <button onClick={onLogout}>Confirm</button>
              </div>
            )}
          </Popup>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
