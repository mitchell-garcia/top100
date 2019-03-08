import React from 'react'
import { connect } from 'react-redux'

import Song from './../components/Song'
import getAlbumList from '../selectors/getAlbumList'
import getSongList from '../selectors/getSongList'
import Album from '../components/Album'
import dismissAlbumDetails from './../actions/dismissAlbumDetails'
import viewAlbumDetails from './../actions/viewAlbumDetails'
import faveAlbum from './../actions/faveAlbum'

function SearchResultsView(props) {
    const searchQuery = props.location.search.replace('?value=', '')
    const songResults = props.songs.filter(item => JSON.stringify(item).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    const albumResults = props.albums.filter(item => JSON.stringify(item).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)

    return (
        <div className="container" style={{ backgroundColor: 'transparent', paddingTop: 60, paddingBottom: 60 }}>
            <div className="level">
                <div className="level-left">
                    <div onClick={() => props.history.goBack()} className="pure-button level-item">&lt; Go Back</div>
                    <h1 className="title level-item">
                        Results for "{searchQuery}"
                    </h1>
                </div>
            </div>
            <h2 className="subtitle">Albums <small>({albumResults.length})</small></h2>

            <div className="is-clearfix">
                {
                    albumResults.map((album, index) => {
                        return (
                            <Album 
                                artwork={album.artwork}
                                title={album.title}
                                price={album.price}
                                category={album.category}
                                releaseDate={album.releaseDate}
                                artist={album.artist}
                                id={album.id}
                                rights={album.rights}
                                link={album.link}
            
                                index={index}
            
                                activeAlbumId={props.activeAlbumId}
                                gridSize={props.gridSize}
                                onClick={props.viewAlbumDetails}
                                key={index} 
                            />
                        )
                    })
                }
            </div>
            <hr />
            <h2 className="subtitle">Songs <small>({songResults.length})</small></h2>
            {
                songResults.map((item, index) => {
                    return (
                        <Song cover={item.artwork} title={item.title} artist={item.artist} link={item.link} number={null} key={index} />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    albums: getAlbumList(state),
    songs: getSongList(state),
    gridSize: state.gridSize,
    faves: state.faves,
    activeAlbumId: state.activeAlbumId
})

const mapDispatchToProps = (dispatch) => {
    return {
        dismissAlbumDetails: () => {
            dispatch(dismissAlbumDetails());
        },
        faveAlbum: (id) => {
            dispatch(faveAlbum(id));
        },
        viewAlbumDetails: (id) => {
            dispatch(viewAlbumDetails(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)