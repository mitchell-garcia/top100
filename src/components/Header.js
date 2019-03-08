import React from 'react'
import { NavLink } from 'react-router-dom'
import DropDown from './DropDown'
import Logo from './../assets/logo.svg'

import './Header.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props)

        const initialSearchValue = props.history.location.search.replace('?value=', '')

        this.state = {
            searchValue: initialSearchValue
        }

        props.history.listen((location, action) => {
            if (location.pathname.indexOf('search') === -1) {
                this.setState({ searchValue: '' })
            }
        })
    }

    setSearchValue(searchValue) {
        this.setState({
            searchValue
        })
        
        if (this.props.onSearchValueUpdated) {
            this.props.onSearchValueUpdated(searchValue)
        }
    }

    render() {
        return (
            <div className="AppHeader">
                <div className="container">
                    <div className="columns is-mobile">
                        <div className="column is-narrow is-one-half-mobile AppHeader__LogoMark">
                            <img src={Logo} aria-hidden alt="" />
                            <NavLink to="/">
                                <h1>Top 100</h1>
                            </NavLink>
                        </div>
                        <div className="column is-narrow is-one-half-mobile">
                            <DropDown history={this.props.history} />
                        </div>
                        <div className="column is-hidden-mobile"></div>
                        <div className="column is-hidden-mobile is-3 AppHeader__SearchContainer">
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="Search" value={this.state.searchValue} onChange={(e) => this.setSearchValue(e.target.value)}  />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}