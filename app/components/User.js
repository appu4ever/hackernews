import React from 'react'
import queryString from 'query-string'

import { getUser, getItems } from '../utils/api'
import { ThemeConsumer } from '../context/theme'

import Loading from './Loading'
import UserHeader from './UserHeader'
import PostListItems from './PostListItems'

class User extends React.Component {

    state = {
        userInfo : null,
        userPosts: null,
        loading: true,
        error: null
    }

    componentDidMount() {
        const user = queryString.parse(this.props.location.search)
        getUser(user.id)
            .then(userData => {
                getItems(userData.submitted.slice(0,30))
                .then(results => {
                    this.setState({ userInfo: userData, userPosts: results, loading: false })
                }).catch(error => this.setState({ error: error.message }))
            })
            .catch(error => {
                console.error(error)
                this.setState({ error : error.message})
            })
    }

    render() {
        const { userInfo, userPosts, loading, error } = this.state

        if (error) return <p className= "error">ERROR : {error}</p>
        if (loading) return <Loading text= "Fetching user data" />

        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <div className= "user-container">
                        <UserHeader {...userInfo} />
                        <h2 className= {`${theme}-user-post-heading`}>Posts</h2>
                        {
                            userPosts && userPosts.map(post => (
                                <PostListItems key = {post.id} item = {post} />
                            ))
                        }               
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}

export default User

                {/* {
                    about !== null && (
                        <ul className= "about-list">
                            {
                                about.length > 1 ? (
                                    about.map((item,index) => <li key = {index} className= "about-list-item">{item}</li>)
                                ) : (
                                    <li 
                                        key= {index}
                                        className= "about-list-item"
                                        dangerouslySetInnerHTML= {{_html: about}}
                                    />
                                )
                            }                           
                        </ul>
                    )
                } */}