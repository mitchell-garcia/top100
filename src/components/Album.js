import React from 'react'

import AlbumDetails from './AlbumDetails'

import './Album.css'

function renderAlbumDetails(isActiveAlbum, align, props) {
    if (!isActiveAlbum) return null
    return <AlbumDetails align={align} {...props} />
}

const Album = (props) => {
    const { artwork, title, id, onClick, gridSize, index, activeAlbumId, artist } = props
    const isViewingAlbumDetails = (activeAlbumId !== null && activeAlbumId !== undefined)
    const isActiveAlbum = (activeAlbumId === id)

    console.log(isActiveAlbum)
    console.log(isViewingAlbumDetails)

    const conditionalStyles = {
        zIndex: isActiveAlbum ? 99 : 1,
        backgroundColor: isActiveAlbum ? "#fff" : "transparent",
        opacity: (!isActiveAlbum && isViewingAlbumDetails) ? ".3" : "1",
        width: calculateAlbumArtSize(gridSize)
    }

    const albumArt = {
        backgroundImage: 'url(' + artwork + ')',
    }

    const albumDetailsContainerZIndexFix = {
        zIndex: isActiveAlbum ? 99 : 1,
        backgroundColor: isActiveAlbum ? "#fff" : "transparent",
        position: "relative"
    };

    // Check if album's position in array = gridSize.
    // If so, it's on the far right and the details div 
    // should be aligned to the left of the div
    const remainder = (index + 1) % gridSize;

    const isRightAlignedElement = remainder === 0;
    const isRightBesideFarRight = remainder === (gridSize - 1);
    let albumDetailsPosition = isRightAlignedElement || isRightBesideFarRight ? "right" : "left";

    // For 2x2 grid, we ignore the element directly beside the far
    // right element because.. that's the leftmost element.
    if (gridSize <= 2 && isRightBesideFarRight) {
        albumDetailsPosition = "left";
    }

    return (
        <div 
            className="album-container" 
            onClick={(e) => {
                onClick(id);
            }} 
            style={conditionalStyles}
        >
            <div className="album-simple-details-container" style={albumDetailsContainerZIndexFix}>
                <div className="album-art" style={albumArt}>
                </div>
                <div className="album-content">
                    <h3 className="album-name">{title}</h3>
                    <span className="album-artist">{artist}</span>
                </div>
            </div>
            {renderAlbumDetails(isActiveAlbum, albumDetailsPosition, props)}
        </div>
    )
}

function calculateAlbumArtSize(gridSize) {
    switch (gridSize) {
        case 5:
            return "20%"
        case 4:
            return "25%"
        case 3:
            return "33.33%"
        case 2:
            return "50%"
        case 1:
            return "100%"
        default:
            return "20%"
    }
}

export default Album