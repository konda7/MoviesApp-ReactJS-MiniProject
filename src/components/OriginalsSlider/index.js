import './index.css'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import {GoAlert} from 'react-icons/go'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Originals = props => {
  const renderOriginalsSliderSuccessView = () => {
    const {originalMoviesList} = props

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
          breakpoint: 785,
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
          {originalMoviesList.map(eachMovie => (
            <div className="slick-item" key={eachMovie.id}>
              <Link to={`/movies/${eachMovie.id}`}>
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="logo-image"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  const onClickOriginalsSliderTryAgainBtn = () => {
    const {onClickTryAgainBtn} = props
    onClickTryAgainBtn()
  }

  const renderOriginalsSliderFailureView = () => (
    <div className="movie-slick-view">
      <GoAlert className="error-triangle-icon" />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={onClickOriginalsSliderTryAgainBtn}
      >
        Try Again
      </button>
    </div>
  )

  const renderOriginalsSliderLoadingView = () => (
    <div className="movie-slick-view" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderOriginalMoviesSlider = () => {
    const {apiStatus} = props

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderOriginalsSliderSuccessView()
      case apiStatusConstants.failure:
        return renderOriginalsSliderFailureView()
      case apiStatusConstants.inProgress:
        return renderOriginalsSliderLoadingView()
      default:
        return null
    }
  }

  return <>{renderOriginalMoviesSlider()}</>
}

export default Originals
