import './index.css'

import Cookies from 'js-cookie'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'

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
        title: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
        posterPath: eachMovie.poster_path,
      }))

      this.setState({
        popularMoviesList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPopularMovieSuccessView = () => {
    const {popularMoviesList} = this.state

    return (
      <>
        <ul className="popular-movies-list">
          {popularMoviesList.map(eachMovie => (
            <li className="popular-movie-item" key={eachMovie.id}>
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="popular-movie-img"
              />
            </li>
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderPopularMovieLoadingView = () => (
    <>
      <div className="popular-movies-view">
        <div className="popular-movies-container" data-testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onClickTryAgainBtn = () => {
    this.getPopularMoviesList()
  }

  renderPopularMovieFailureView = () => (
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

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMovieSuccessView()
      case apiStatusConstants.failure:
        return this.renderPopularMovieFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPopularMovieLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-popular-container">
        <Header />
        <div className="popular-movies-content-container">
          {this.renderPopularMovies()}
        </div>
      </div>
    )
  }
}

export default Popular
