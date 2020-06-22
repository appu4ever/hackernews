import React from 'react'
import{ Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { formatTime } from '../utils/format'
import { ThemeConsumer } from '../context/theme'

const CommentsItems = ({ item }) => {
    return (
        <ThemeConsumer>
            {({ theme }) => (
            <div className= {`${theme}-comments-container flex-column`}>
                <div className= "post-details">
                    <span>by </span>
                    <Link 
                        className= {`${theme}-link`}
                        to= {{
                            pathname: '/user',
                            search : `?id=${item.by}`
                        }}
                    >
                        {item.by}
                    </Link>
                    <span> on </span>
                    <span>{formatTime(item.time)}</span>
                    <p dangerouslySetInnerHTML= {{__html: item.text}} /> 
                </div>           
            </div>
            )}
        </ThemeConsumer>
    )
}

CommentsItems.propTypes = {
    item : PropTypes.object.isRequired
}

export default CommentsItems
