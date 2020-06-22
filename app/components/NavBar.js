import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../context/theme'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

class NavBar extends React.Component {

    render() {
        return (
            <ThemeConsumer>
                {({ theme, toggleTheme }) => (
                    <div className= "nav-container flex-row justify-space-between">
                        <ul className= "nav-links-container flex-row justify-left">
                            <li>
                                <NavLink 
                                    exact
                                    className= {`nav-link-${theme}`}
                                    activeStyle= {activeStyle}
                                    to= "/"
                                >
                                        Top
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    exact
                                    className= {`nav-link-${theme}`} 
                                    activeStyle= {activeStyle}
                                    to= "/latest"
                                >
                                        New
                                </NavLink>
                            </li>
                        </ul>
                        <button 
                            className= "btn"
                            onClick= {toggleTheme}
                        >{theme === 'light' ? '🔦' : '💡'}</button>
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}

export default NavBar