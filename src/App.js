import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import store from './store'

import RouteResolver from './routes/RouteResolver'
import Header from './components/Header'

import apiClient from './util/apiClient'
import updateGridSize from './actions/updateGridSize'

import './App.css'

export default class App extends Component {
    _store = store
    _history = createBrowserHistory()

    _updateWindowSize() {
        let gridSize = 2

        if (window.innerWidth >= 640) {
            gridSize = 3
        }

        if (window.innerWidth >= 960) {
            gridSize = 5
        }

        this._store.dispatch(updateGridSize(gridSize))
    }

    _onSearchValueUpdated(searchValue) {
        const isSearch = (this._history.location.pathname.indexOf('search') !== -1)

        if (isSearch && searchValue !== '') {
            this._history.replace({
                pathname: 'search',
                search: `?value=${searchValue}`
            })
        }

        if (isSearch && searchValue === '') {
            this._history.goBack()
        }

        if (!isSearch && searchValue !== '') {
            this._history.push({
                pathname: 'search',
                search: `?value=${searchValue}`
            })
        }
    }

    componentWillMount() {
        this._updateWindowSize()
        window.addEventListener('resize', this._updateWindowSize.bind(this))
        
        apiClient.fetchAlbums()
            .then((data) => {
                this._store.dispatch({
                    type: 'ALBUMS_FETCHED',
                    payload: JSON.parse(data).feed.entry
                })
            })

        apiClient.fetchSongs()
            .then((data) => {
                this._store.dispatch({
                    type: 'SONGS_FETCHED',
                    payload: JSON.parse(data).feed.entry
                })
            })
    }

    render() {
        return (
            <Provider store={this._store}>
                <Router history={this._history}>
                    <div>
                        <Header history={this._history} onSearchValueUpdated={(value) => this._onSearchValueUpdated(value)}/>
                        <RouteResolver />
                    </div>
                </Router>
            </Provider>
        );
    }
}