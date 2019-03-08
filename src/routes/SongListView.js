import React from 'react'
import { connect } from 'react-redux'

import getSongList from './../selectors/getSongList'
import Song from './../components/Song'

const SongListView = (props) => 
    <div className="container" style={{backgroundColor: 'transparent', paddingTop: 60 }}>
    {   
        props.songs.map((song, index) => {
            return (
                <Song
                    key={index}
                    cover={song.artwork}
                    title={song.title}
                    artist={song.artist}
                    number={index}
                    isSearching={false}
                />
            )
        })
    }
    </div>

const mapStateToProps = (state) => ({
    songs: getSongList(state)
})

export default connect(mapStateToProps)(SongListView)