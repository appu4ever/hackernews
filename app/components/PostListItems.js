import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import  { ThemeConsumer } from '../context/theme'
import { formatTime } from '../utils/format'

const PostListItems = (props) => {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <li className= {`${theme}-post-item flex-column justify-space-evenly`} key= {props.item.id}>
                    <div>
                        <a 
                            href= {props.item.url} 
                            className= {`a-link-${theme} ${props.comments && 'comment-title'}`}>
                            {props.item.title || props.item.text}
                        </a>
                    </div>
                    <div className= "post-details">
                        <span>by </span>
                        <Link 
                            className= {`${theme}-link`}
                            to= {{
                                pathname: '/user',
                                search : `?id=${props.item.by}`
                            }}>
                            {props.item.by}
                        </Link>
                        <span> on </span>{formatTime(props.item.time)}
                        {
                            !props.comments && (
                                <React.Fragment>
                                    <span> with </span>
                                    <Link 
                                        className= {`${theme}-link`}
                                        to= {{
                                            pathname: "/comments",
                                            search: `?id=${props.item.id}`
                                        }}>
                                        {
                                            props.item.descendants === 0
                                            ? '0' : props.item.descendants
                                        } 
                                    </Link>
                                    <span> comments</span>                         
                                </React.Fragment>                  
                            )
                        }
                    </div>
                </li>
            )}
        </ThemeConsumer>
    )
}

PostListItems.propTypes = {
    item: PropTypes.object.isRequired
}

export default PostListItems
