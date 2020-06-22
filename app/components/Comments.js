import React from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'

import { getItem, getComments } from '../utils/api'

import PostListItems from './PostListItems'
import Loading from './Loading'
import CommentsItems from './CommentsItems'

class PostList extends React.Component {

    state = {
        loadingComments: true,
        comments: null,
        error: null,
        userInfo: null
    }

    static propTypes = {
        list: PropTypes.array,
        comments: PropTypes.bool
    }

    componentDidMount() {
        const post = queryString.parse(this.props.location.search)
        getItem(post.id)
            .then(postData => {
                if (postData.kids) {
                    getComments(postData.kids.slice(0,30))
                    .then(results => {
                        this.setState({ userInfo: postData, comments: results, loadingComments: false })
                    }).catch(error => this.setState({ error: error.message }))
                } else {
                    this.setState({ userInfo: postData, loadingComments: false }) 
                }
            })
            .catch(error => {
                console.error(error)
                this.setState({ error : error.message})
            })                  
    }

    render() {
        const { loadingComments, userInfo, comments, error } = this.state

        if (error) return <p className= "error">ERROR : {error}</p>
        if (loadingComments) return <Loading text= "Fetching comments" />


        return (
            <ul className= "flex-column">
                <PostListItems item = {userInfo} comments />
                {
                    comments ? comments.map(item => {
                        return (
                            <CommentsItems key = {item.id} item= {item} />
                        )
                    }) : (
                        <p className= "info">This post has no comments</p>
                    )
                }  
            </ul>            
        );
    }
}

export default PostList
