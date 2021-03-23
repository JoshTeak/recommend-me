import React from "react";
import LoadingPage from './LoadingPage';
import Card from './Card';

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initializedFirst: false,
      movieObject: {},
      cardArray: [{position: 0}, {position: 1}, {position: 2}],
      movieArray: [{}, {}, {}]
    }
  }

  componentDidMount() {
    this.initializePage();
  }

  initializePage = () => {
    const myMovieArray = this.getMovieArray();

    const firstMovie = {[Object.keys(myMovieArray)[0]]: myMovieArray[Object.keys(myMovieArray)[0]]};
    const secondMovie = {[Object.keys(myMovieArray)[1]]: myMovieArray[Object.keys(myMovieArray)[1]]};
    const thirdMovie = {[Object.keys(myMovieArray)[2]]: myMovieArray[Object.keys(myMovieArray)[2]]};

    const newMovieArray = [firstMovie, secondMovie, thirdMovie]

    this.setState({ 
      movieObject: myMovieArray,
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
    let myMovieArray = this.state.movieObject;
    delete myMovieArray[movie.id];
    myMovieArray = this.props.findNewMovie(myMovieArray);

    let myotherMovieArray = this.state.movieArray[cardNumber];
    delete myotherMovieArray[movie.id];
    myotherMovieArray = this.props.findNewMovie(myotherMovieArray);

    let newMovieId;
    Object.keys(myotherMovieArray).forEach((movie) => {
      let latch = false
      this.state.movieArray.forEach((subMovie) => {
        if([movie][0] === [subMovie][0])
        {
          latch = true;
          newMovieId = [movie][0];
        } 
      })
      if(!latch)
      {
        newMovieId = [movie][0]
      }
    })

    let newArray = this.state.movieArray;
    newArray[cardNumber] = {[newMovieId]: myotherMovieArray[newMovieId]};

    this.setState({movieObject: myMovieArray, cardArray: newCardArary})
  }

  render() {
    return (
      <div className="swipe-view-container">
        {
          this.state.initializedFirst ? 
          <div>
            {
              this.state.movieArray.map((movie, index) => {
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
              )})
            }
          </div>
          : <LoadingPage />
        }
      </div>
    );
  };
};



export default Swipe;