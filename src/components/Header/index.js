import './index.css'

import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {FaSearch} from 'react-icons/fa'

class Header extends Component {
  state = {
    showDropDown: false,
    headerSearchInput: '',
  }

  renderSearchBar = () => {
    const {searchInputBtn} = this.props
    const {headerSearchInput} = this.state

    const onClickSearchResultBtn = () => {
      searchInputBtn(headerSearchInput)
    }

    const onChangeSearchInputValue = event => {
      this.setState({headerSearchInput: event.target.value})
    }

    return (
      <div className="searchbar-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search Movie"
          onChange={onChangeSearchInputValue}
          value={headerSearchInput}
        />
        <button
          type="button"
          className="search-icon-btn"
          onClick={onClickSearchResultBtn}
          data-testid="searchButton"
        >
          <FaSearch className="search-bar-icon" />
        </button>
      </div>
    )
  }

  onClickCancelDropdown = () => {
    this.setState({showDropDown: false})
  }

  renderDropDown = () => (
    <div className="drop-drown-container">
      <ul className="dropdown-list-items">
        <Link to="/" className="route-link">
          Home
        </Link>
        <Link to="/popular" className="route-link">
          <li className="header-list-item">Popular</li>
        </Link>
        <Link to="/account" className="route-link">
          Account
        </Link>
      </ul>
      <button
        type="button"
        onClick={this.onClickCancelDropdown}
        className="cancel-dropdown-btn"
      >
        <img
          src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680434914/Shape_rulobc.png"
          alt="Close drop down"
          className="cancel-dropdown-img"
        />
      </button>
    </div>
  )

  onClickDropDrown = () => {
    this.setState(prevState => ({
      showDropDown: !prevState.showDropDown,
    }))
  }

  render() {
    const {showDropDown} = this.state

    const {searchBar} = this.props

    return (
      <>
        <nav className="movie-header">
          <div className="header-container-1">
            <Link to="/" className="route-link">
              <img
                src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680325755/Group_7399_n3xfyf.png"
                alt="website logo"
                className="headers-movies-img-logo"
              />
            </Link>
            <ul className="header-items-list">
              <li className="header-list-item">
                <Link to="/" className="route-link">
                  Home
                </Link>
              </li>
              <Link to="/popular" className="route-link">
                <li className="header-list-item">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="header-container-2">
            {searchBar ? (
              this.renderSearchBar()
            ) : (
              <Link to="/search" className="route-link">
                <HiOutlineSearch className="search-icon" />
              </Link>
            )}
            <Link to="/account" className="route-link">
              <img
                src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680433616/Avatar_uvv18m.png"
                alt="profile"
                className="avatar"
              />
            </Link>
            <button
              type="button"
              onClick={this.onClickDropDrown}
              className="dropdown-btn"
            >
              <img
                src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680433860/add-to-queue_1_icjkio.png"
                alt="Menu Drop drown"
                className="menu-drop-drown"
              />
            </button>
          </div>
        </nav>
        {showDropDown && this.renderDropDown()}
      </>
    )
  }
}

export default withRouter(Header)
