import React from 'react'

import './Song.css'

function Song(props) {
    const { cover, title, artist, thumbnail, number, isSearching } = props
    const displayNumber = number + 1

    const conditionalStyles = {
        backgroundImage: 'url(' + cover + ')',
        backgroundSize: 'cover'
    }

    const isTopTen = displayNumber <= 10

    const layout = isTopTen ? "song song-featured song-featured-" + displayNumber : "song song-list"

    return (
        <div className={layout}>
            {
                (() => {
                    if (!isSearching && number !== null) {
                        return (
                            <div className="song-number">
                                {displayNumber}
                            </div>
                        )
                    }
                })()}
            <div className="song-thumbnail-container" style={conditionalStyles}>
            </div>
            <div className="song-information-container">
                <div className="song-name">{title}</div>
                <div className="song-artist">{artist}</div>
            </div>
        </div>
    )
}

export default Song