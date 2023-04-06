import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    searchInput: '',
    searchResultsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchResults = async input => {
    this.setState({
      searchInput: input,
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${input}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const modifiedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResultsList: modifiedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searchInputBtn = input => {
    this.getSearchResults(input)
  }

  renderNoResultsView = () => {
    const {searchInput} = this.state

    return (
      <div className="search-result-view">
        <img
          src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680759849/Illustration_bxenkh.png"
          alt="failure view"
          className="search-result-failure-img"
        />
        <p className="search-result-failure-description">{`Your search for ${searchInput} did not find any matches.`}</p>
      </div>
    )
  }

  renderSearchResultsSuccessView = () => {
    const {searchResultsList} = this.state

    return (
      <>
        {searchResultsList.length ? (
          <ul className="search-results-list-items">
            {searchResultsList.map(eachMovie => (
              <li key={eachMovie.id} className="search-result-list-item">
                <Link to={`/movies/${eachMovie.id}`}>
                  <img
                    src={eachMovie.backdropPath}
                    alt={eachMovie.title}
                    className="search-result-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          this.renderNoResultsView()
        )}
      </>
    )
  }

  onClickTryAgainBtn = () => {
    this.getSearchResults()
  }

  renderSearchResultsFailureView = () => (
    <div className="popular-movies-view">
      <img
        src="https://res.cloudinary.com/dvhrrtgpt/image/upload/v1680582680/Group_quim55.png"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickTryAgainBtn}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchResultsLoadingView = () => (
    <div className="search-result-view">
      <div className="popular-movies-view">
        <div className="popular-movies-container" data-testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderSearchResult = () => {
    const {apiStatus} = this.state
    console.log('api Status triggered!')

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchResultsSuccessView()
      case apiStatusConstants.failure:
        return this.renderSearchResultsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderSearchResultsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-app-container">
        <Header searchBar searchInputBtn={this.searchInputBtn} />
        {this.renderSearchResult()}
      </div>
    )
  }
}

export default Search
