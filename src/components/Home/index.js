import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {GoAlert} from 'react-icons/go'

import Header from '../Header'
import Footer from '../Footer'
import TrendingNow from '../TrendingNowSlider'
import Originals from '../OriginalsSlider'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    originalMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalMoviesList()
  }

  getOriginalMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'

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
      const modifiedData = data.results.map(eachResult => ({
        id: eachResult.id,
        title: eachResult.title,
        overview: eachResult.overview,
        backdropPath: eachResult.backdrop_path,
        posterPath: eachResult.poster_path,
      }))
      this.setState({
        originalMoviesList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   Random Movie Preview

  renderRandomMovieSuccessView = () => {
    const {originalMoviesList} = this.state

    const randomMovie =
      originalMoviesList[Math.floor(Math.random() * originalMoviesList.length)]

    const {title, posterPath, overview} = randomMovie

    const mystyle = {
      paddingTop: '1px',
      backgroundImage: `url(${posterPath})`,
      backgroundSize: '100% 100%',
    }

    return (
      <div style={mystyle}>
        <Header />
        <div className="random-movie-description-container">
          <h1 className="random-movie-title">{title}</h1>
          <p className="random-movie-description">{overview}</p>
          <button type="button" className="random-movie-play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getOriginalMoviesList()
  }

  renderRandomMovieFailureView = () => (
    <>
      <Header />
      <div className="random-movie-view">
        <div className="random-movie-container">
          <GoAlert className="error-triangle-icon" />
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
      </div>
    </>
  )

  renderRandomMovieLoadingView = () => (
    <>
      <Header />
      <div className="random-movie-view">
        <div className="random-movie-container" data-testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  renderRandomMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRandomMovieSuccessView()
      case apiStatusConstants.failure:
        return this.renderRandomMovieFailureView()
      case apiStatusConstants.inProgress:
        return this.renderRandomMovieLoadingView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, originalMoviesList} = this.state

    return (
      <div className="app-home-container">
        {this.renderRandomMovieDetails()}
        <div className="home-slick-container">
          <h1 className="home-heading">Trending Now</h1>
          <TrendingNow />
          <h1 className="home-heading">Originals</h1>
          <Originals
            apiStatus={apiStatus}
            originalMoviesList={originalMoviesList}
            onClickTryAgainBtn={this.onClickTryAgainBtn}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
