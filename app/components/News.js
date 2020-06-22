import React from 'react'
import PropTypes from 'prop-types'

import { getNews, getItems } from '../utils/api'

import Loading from './Loading'
import PostListItems from './PostListItems'

class News extends React.Component {
    state = {
        news: null,
        loading: {
            "Top" : true,
            "New" : true
        },
        error: null
    }

    static propTypes = {
        type: PropTypes.oneOf(['Top', 'New'])
    }

    componentDidMount() {
        getNews(this.props.type).then((newsArray) => {
            getItems(newsArray).then(news => {
                const loading = {...this.state.loading}
                loading[this.props.type] = false
                this.setState({ news , loading })
            }).catch(error => this.setState({ error: error.message }))
        }).catch(error => {
            console.error(error.message)
            this.setState({ error: error.message })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            getNews(this.props.type).then((newsArray) => {
                getItems(newsArray).then(news => {
                    const loading = {...this.state.loading}
                    loading[this.props.type] = false
                    this.setState({ news , loading })
                }).catch(error => this.setState({ error: error.message }))
            }).catch(error => {
                console.error(error.message)
                this.setState({ error: error.message })
            })           
        }
            
    }

    render() {
        const { loading, error, news } = this.state
        if (error) return <p className= "error">ERROR : {error}</p>
        if (loading[this.props.type]) return <Loading text= "Loading" speed= {300} />

        return (
           news && (
               news.map(item => (
                    <PostListItems key= {item.id} item= {item} />
               ))
           )
        )
    }
}

export default News;