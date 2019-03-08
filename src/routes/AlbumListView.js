import React from 'react'
import { connect } from 'react-redux'

import viewAlbumDetails from './../actions/viewAlbumDetails'
import getAlbumList from './../selectors/getAlbumList'
import Album from './../components/Album'

const AlbumListView = (props) => 
    <React.Fragment>
        {
            props.albums.map(function(album, idx) {
                // return <div>{JSON.stringify(album)}</div>
                return <Album
                    artwork={album.artwork}
                    title={album.title}
                    price={album.price}
                    category={album.category}
                    releaseDate={album.releaseDate}
                    artist={album.artist}
                    id={album.id}
                    rights={album.rights}
                    link={album.link}

                    index={idx}

                    activeAlbumId={props.activeAlbumId}
                    gridSize={props.gridSize}
                    onClick={props.viewAlbumDetails}
                    key={idx} 
                />
            })
        }
    </React.Fragment>

const mapStateToProps = (state) => ({
    gridSize: state.gridSize,
    activeAlbumId: state.activeAlbumId,
    albums: getAlbumList(state)
})

const mapDispatchToProps = (dispatch) => {
    return {
        viewAlbumDetails: (id) => {
            dispatch(viewAlbumDetails(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListView)