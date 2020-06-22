import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../context/theme'

class Loading extends React.Component {

    state = {
        content: this.props.text
    }

    static propTypes = {
        text : PropTypes.string.isRequired,
        speed : PropTypes.number.isRequired
    }

    static defaultProps = {
        text: 'Loading',
        speed: 300
    }

    componentDidMount() {
        const { text, speed } = this.props

        this.interval = window.setInterval(() => {
            this.state.content === text + '...' 
            ? this.setState({ content: text })
            : this.setState(({ content }) => ({
                content: content + '.'
            }))
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render () {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <div className = {`${theme}-loading-text`}>
                        {this.state.content}
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}

export default Loading