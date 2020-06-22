const newsArticleCount = 30
const api_url = 'https://hacker-news.firebaseio.com/v0/'

const filterDead = (posts) => {
    return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

const filterStories = (posts) => {
    return posts.filter(post => post && post.type === "story")
}

const filterDeleted = (posts) => {
    return posts.filter(({ deleted }) => deleted !== true)
}

export const getNews = (type) => {
    return fetch(`${api_url}${type.toLowerCase()}stories.json?orderBy="$key"&limitToFirst=${newsArticleCount}`)
    .then((res) => res.json())
    .catch(err => {
        throw new Error(err.message)
    })   
}

export const getUser = (username) => {
    return fetch(`${api_url}/user/${username}.json?print=pretty`)
            .then((res) => res.json())
            .catch(error => {
                throw new Error(error.message)
            })
}

export const getItem = (item) => {
        return fetch(`${api_url}item/${item}.json?print=pretty`)
               .then(res => res.json())
               .catch(error => {
                   return error.message
               })
}

export const getItems = (itemArray) => {
    return Promise.all(itemArray.map(item => {
        return fetch(`${api_url}item/${item}.json?print=pretty`)
               .then(res => res.json())
               .catch(error => {
                   return error.message
               })
    })).then(posts => filterDeleted(filterDead(filterStories(posts))))
}

export const getComments = (itemArray) => {
    return Promise.all(itemArray.map(item => {
        return fetch(`${api_url}item/${item}.json?print=pretty`)
               .then(res => res.json())
               .catch(error => {
                   return error.message
               })
    })).then(posts => filterDeleted(filterDead(posts)))
}