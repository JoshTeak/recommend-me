import React from "react";
import LoadingPage from './LoadingPage';
import Card from './Card';
import { history } from '../routers/AppRouter';

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initializedFirst: false,
      movieObject: {},
      cardArray: [{position: 0}, {position: 1}, {position: 2}],
      movieArray: [{}, {}, {}]
    }

    this.moviesAvailable = false;
  }

  componentDidMount() {
    this.initializePage();
  }

  initializePage = () => {
    const myMovieObject = this.getMovieArray();
    let firstMovie;
    let secondMovie;
    let thirdMovie;

    if([Object.keys(myMovieObject)[0]][0] !== undefined)
    {
      firstMovie = {[Object.keys(myMovieObject)[0]]: myMovieObject[Object.keys(myMovieObject)[0]]};
    } else 
    {
      firstMovie = null;
    }
    if([Object.keys(myMovieObject)[1]][0] !== undefined)
    {
      secondMovie = {[Object.keys(myMovieObject)[1]]: myMovieObject[Object.keys(myMovieObject)[1]]};
    } else 
    {
      secondMovie = null;
    }
    if([Object.keys(myMovieObject)[2]][0] !== undefined)
    {
      thirdMovie = {[Object.keys(myMovieObject)[2]]: myMovieObject[Object.keys(myMovieObject)[2]]};
    } else 
    {
      thirdMovie = null;
    }

    const newMovieArray = [firstMovie, secondMovie, thirdMovie]

    this.setState({ 
      movieObject: myMovieObject,
      initializedFirst: true,
      movieArray: newMovieArray
    }); 
  }

  getMovieArray = () => {
    return (this.props.findNewMovie(this.state.movieObject))
  }

  positiveClicked = (movie) => {
    this.props.positiveClicked(movie);
  }

  negativeClicked = (movie) => {
    this.props.negativeClicked(movie);
  }

  changeCards = (movie, cardNumber) => {
    let newCardArary;
     switch(this.state.cardArray[0].position) {
      case 0:
        newCardArary = [{position: 2}, {position: 0}, {position: 1}];
        break;
      case 1:
        newCardArary = [{position: 0}, {position: 1}, {position: 2}];
        break;
      case 2:
        newCardArary = [{position: 1}, {position: 2}, {position: 0}];
        break;
    }

    let myMovieObject = this.state.movieObject;
    delete myMovieObject[movie.id];
    myMovieObject = this.props.findNewMovie(myMovieObject);

    let newMovieId;
    let newArray = this.state.movieArray;

    if(Object.keys(myMovieObject).length === 3)
    {
      newMovieId = Object.keys(myMovieObject)[2]
      newArray[cardNumber] = {[newMovieId]: myMovieObject[newMovieId]};
    } else {
      newArray[cardNumber] = null;
    }

    this.setState({movieObject: myMovieObject, cardArray: newCardArary})
  }

  determineIfEmpty = () => {
    let i;
    for(i = 0; i < this.state.movieArray.length; i++)
    {
      if(this.state.movieArray[i] !== null)
      {
        this.moviesAvailable = true;
        break;
      } 
      else
      {
        this.moviesAvailable = false;
      }
    }
  }

  render() {
    return (
      <div className="swipe-view-container">
        {
          this.state.initializedFirst ? 
          <div className="swipe-view-container-initialized">
            {this.determineIfEmpty()}
            {
              this.moviesAvailable ? 
              <div>
                {
                  this.state.movieArray.map((movie, index) => {
                    if(!!movie)
                    {
                      const movieId = Object.keys(this.state.movieArray[index])[0]
                      const movieToCard = movie[Object.keys(this.state.movieArray[index])[0]];
                      return (
                        <Card
                          movie={{...movieToCard, id: movieId}}
                          cardNumber={index}
                          positionArray={this.state.cardArray}
                          changeCardPositions={this.changeCards}
                          positiveClicked={this.positiveClicked}
                          negativeClicked={this.negativeClicked}
                        />
                      )
                    }
                  })
                }
              </div> : 
              <div className="error-box-layout">
                <div className="error-message">
                  <h1 className="error-title">Need more movies</h1>
                  <p className="error-body">{this.props.noMoviesError}</p>
                  {
                    history.location.pathname !== "/seen" ?
                    <button className="button" onClick={() => {
                      history.push({
                        pathname: "/seen",
                        state: { previousPath: history.location}
                      });
                    }}>Find more movies
                    </button> : ''
                  }
                </div>
              </div>
            }
          </div>
          : <LoadingPage />
        }
      </div>
    );
  };
};



export default Swipe;