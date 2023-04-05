import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetailsList: {},
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const modifiedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(eachMovie => ({
          id: eachMovie.id,
          backdropPath: eachMovie.backdrop_path,
          title: eachMovie.title,
          posterPath: eachMovie.poster_path,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(
          eachLanguage => ({
            id: eachLanguage.id,
            englishName: eachLanguage.english_name,
          }),
        ),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetailsList: modifiedData,
      })
      console.log(modifiedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMovieDetailsSuccessView = () => {
    const {movieDetailsList} = this.state
    const {
      adult,
      budget,
      genres,
      overview,
      posterPath,
      releaseDate,
      runtime,
      similarMovies,

      title,
      spokenLanguages,
      voteAverage,
      voteCount,
    } = movieDetailsList

    const mystyle = {
      backgroundImage: `url(${posterPath})`,
      backgroundSize: '100% 100%',
    }

    const movieRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`

    const movieRestriction = adult ? 'A' : 'U/A'

    const releaseYear = releaseDate.slice(0, 4)

    return (
      <>
        <div style={mystyle}>
          <Header />
          <div className="movie-details-description-container">
            <h1 className="movie-details-heading">{title}</h1>
            <div className="movie-details-specific-description">
              <p className="movie-details-specific-detail">{movieRuntime}</p>
              <p className="movie-details-specific-detail adult">
                {movieRestriction}
              </p>
              <p className="movie-details-specific-detail">{releaseYear}</p>
            </div>
            <p className="movie-details-overview">{overview}</p>
            <button type="button" className="movie-details-play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="movie-extra-details">
          <div className="extra-details-container">
            <h1 className="movie-details-sub-heading">Genres</h1>
            <ul className="movie-details-sub-items-list">
              {genres.map(eachGenre => (
                <li key={eachGenre.id} className="movie-details-sub-item">
                  {eachGenre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="extra-details-container">
            <h1 className="movie-details-sub-heading">Audio Available</h1>
            <ul className="movie-details-sub-items-list">
              {spokenLanguages.map(eachLanguage => (
                <li key={eachLanguage.id} className="movie-details-sub-item">
                  {eachLanguage.englishName}
                </li>
              ))}
            </ul>
          </div>
          <div className="extra-details-container">
            <h1 className="movie-details-sub-heading">Rating Count</h1>
            <p className="movie-details-sub-item">{voteCount}</p>
            <h1 className="movie-details-sub-heading">Rating Average</h1>
            <p className="movie-details-sub-item">{voteAverage}</p>
          </div>
          <div className="extra-details-container">
            <h1 className="movie-details-sub-heading">Budget</h1>
            <p className="movie-details-sub-item">{budget}</p>
            <h1 className="movie-details-sub-heading">Release Date</h1>
            <p className="movie-details-sub-item">{releaseDate}</p>
          </div>
        </div>
        <div className="similar-movie-details">
          <h1 className="similar-movies-heading">More like this</h1>
          <ul className="similar-movies-list">
            {similarMovies.slice(0, 6).map(eachMovie => (
              <li key={eachMovie.id} className="similar-movies-item">
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="similar-movie-img"
                />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  onClickTryAgainBtn = () => {
    this.getMovieDetails()
  }

  renderMovieDetailsFailureView = () => (
    <div className="movies-details-view">
      <Header />
      <div className="movies-details-loader-container">
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
    </div>
  )

  renderMovieDetailsLoadingView = () => (
    <>
      <div className="movies-details-view">
        <Header />
        <div className="movies-details-loader-container" data-testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </>
  )

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderMovieDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderMovieDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovieDetails()}</>
  }
}

export default MovieDetails
