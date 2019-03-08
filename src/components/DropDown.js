import React from 'react'
import { withState } from 'recompose'
import { Link } from 'react-router-dom'

const enhance = withState('active', 'setActive', false)

function DropDown({ active, setActive, history }) {
    const isSongs = (window.location.pathname.indexOf('songs') !== -1)

    return (
        <div className={`dropdown ${active ? 'is-active' : ''}`}>
            <div className="dropdown-trigger" onClick={(e) => setActive(true)}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" style={{ border: 0}}>
                    <span>{isSongs ? 'Songs' : 'Albums'}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <Link className="dropdown-item" to="/" onClick={() => setActive(false)}>
                        Albums
                    </Link>
                    <Link className="dropdown-item" to="songs" onClick={() => setActive(false)}>
                        Songs
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default enhance(DropDown)