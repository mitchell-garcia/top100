import React from 'react'
import { Route } from "react-router-dom"

import AlbumListView from './AlbumListView'
import SearchResultsView from './SearchResultsView'
import SongListView from './SongListView'

class RouteResolver extends React.Component {
    render() {
            return (
                <div className="main-window">
                    <Route exact path="/" component={AlbumListView} />
                    <Route path="/search" component={SearchResultsView} />
                    <Route path="/songs" component={SongListView} />
                </div>
        )
    }
}

export default RouteResolver