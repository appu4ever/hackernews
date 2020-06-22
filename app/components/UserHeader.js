import React from 'react'
import PropTypes from 'prop-types'

import {  formatTime } from '../utils/format'
import { ThemeConsumer } from '../context/theme'

const UserHeader = ({ id, created, karma, about }) => {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div>
                    <span className= {`${theme}-username`}>{id}</span>
                    <div className= {`${theme}-user-details`}>
                        <span>joined on</span><strong> {formatTime(created)} </strong>
                        <span>has</span><strong> {karma} </strong> 
                        <span>karma</span>
                    </div>
                    { about && 
                    ( <p dangerouslySetInnerHTML= {{__html: about}} /> )}            
                </div>
            )}
        </ThemeConsumer>
    )
}

UserHeader.propTypes = {
    id: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    karma: PropTypes.number.isRequired,
    about: PropTypes.string
}

export default UserHeader
