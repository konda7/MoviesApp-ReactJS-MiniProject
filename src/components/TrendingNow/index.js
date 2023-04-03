import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {GoAlert} from 'react-icons/go'

import Slider from 'react-slick'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    trendingNowMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'

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
        trendingNowMoviesList: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingNowSuccessView = () => {
    const {trendingNowMoviesList} = this.state
    console.log(trendingNowMoviesList)

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {trendingNowMoviesList.map(eachMovie => (
            <div className="slick-item" key={eachMovie.id}>
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="logo-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getOriginalMoviesList()
  }

  renderTrendingNowFailureView = () => (
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

  renderTrendingNowLoadingView = () => (
    <>
      <Header />
      <div className="random-movie-view">
        <div className="random-movie-container" data-testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  renderTrendingNowSlick = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingNowSuccessView()
      case apiStatusConstants.failure:
        return this.renderTrendingNowFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTrendingNowLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderTrendingNowSlick()}</>
  }
}

export default TrendingNow
