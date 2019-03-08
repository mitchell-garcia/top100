import makeRequest from './../util/makeRequest'

export default {
    fetchSongs: function() {
        return makeRequest('GET', 'https://itunes.apple.com/us/rss/topsongs/limit=100/json')
    },
    fetchAlbums: function() {
        return makeRequest('GET', 'https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    }
}