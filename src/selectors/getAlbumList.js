import { createSelector } from 'reselect'

export default createSelector(
    state => state.albums,
    function(albums) {
        return albums.map(
            (album) => ({
                id: album['id']['attributes']['im:id'],
                title: album['im:name']['label'],
                artist: album['im:artist']['label'],
                artwork: album['im:image'][2]['label'],
                price: album['im:price']['label'],
                rights: album['rights']['label'],
                link: album['link']['attributes']['href'],
                category: album['category']['attributes']['term'],
                releaseDate: album['im:releaseDate']['attributes']['label']
            })
        )
    }
)