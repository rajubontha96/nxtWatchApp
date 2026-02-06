import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default ThemeContext
