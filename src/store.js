import { createStore, applyMiddleware } from 'redux'

const logger = store => next => action => {
    console.log('dispatching', action)
    const result = next(action)
    return result
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALBUMS_FETCHED':
            return {
                ...state,
                albums: action.payload
            }
        case 'UPDATE_GRID_SIZE':
            return {
                ...state,
                gridSize: action.payload
            }
        case 'SONGS_FETCHED':
            return {
                ...state,
                songs: action.payload
            }
        case 'SEARCH_UPDATED':
            return {
                ...state,
                searchQuery: action.payload
            }
        case 'FILTER_UPDATED':
            return {
                ...state,
                searchFilter: action.payload
            }
        case 'VIEW_ALBUM_DETAILS':
            return {
                ...state,
                activeAlbumId: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

const initialState = {
    gridSize: 2,
    albums: [],
    songs: [],
    
    searchQuery: '',
    searchFilter: '',
    activeAlbumId: null
}

export default createStore(reducer, initialState, applyMiddleware(logger))