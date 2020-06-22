import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeConsumer, ThemeProvider } from './context/theme'

import './index.css'

import NavBar from './components/NavBar'
import Loading from './components/Loading'

const News = React.lazy(() => import('./components/News'))
const User = React.lazy(() => import('./components/User'))
const Comments = React.lazy(() => import('./components/Comments'))

class App extends React.Component {

    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <ThemeProvider value= {this.state}>
                <div className= {this.state.theme}>
                    <div className= "container">
                        <NavBar />
                        <React.Suspense fallback= {<Loading/>}>
                            <Switch>
                                <Route exact path= "/comments" component= {Comments} />
                                <Route exact path= "/user" component= {User} />
                                <Route exact path= "/latest" render= {() => <News type= "New" />} />
                                <Route exact path= "/" render= {() => <News type= "Top" />} />
                                <Route render= {() => <h3>404</h3>} />                   
                            </Switch>
                        </React.Suspense>
                    </div> 
                </div>
            </ThemeProvider>          
        )
    }
}

ReactDOM.render(
   <Router><App /></Router> ,
    document.getElementById('app')
)
