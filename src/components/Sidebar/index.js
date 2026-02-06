import {Link} from 'react-router-dom'

const Sidebar = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/trending">Trending</Link>
      </li>
      <li>
        <Link to="/gaming">Gaming</Link>
      </li>
      <li>
        <Link to="/saved-videos">Saved videos</Link>
      </li>
    </ul>

    <p>CONTACT US</p>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
      alt="facebook logo"
    />
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
      alt="twitter logo"
    />
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
      alt="linked in logo"
    />
    <p>Enjoy! Now to see your channels and recommendations!</p>
  </div>
)

export default Sidebar
