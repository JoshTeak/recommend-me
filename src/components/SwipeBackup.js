import React from "react";
import SwipeableViews from "react-swipeable-views";
import MovieDesicion from './MovieDesicion';
import LoadingPage from './LoadingPage';

class SwipeBackup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeableActions: '',
      currentFirstIndex: 1,
      currentSecondIndex: 1,
      currentMovieSecond: null,
      currentMovieFirst: null,
      initializedFirst: false,
      initializedSecond: false,
    }
  }

  componentDidMount() {
    this.initializePage();
  }

  initializePage = () => {
    const myFirstMovie = this.getFirstMovie();
    this.setState({ 
      currentMovieFirst: myFirstMovie,
      initializedFirst: true
    });  
    this.setState({ 
      currentMovieSecond: this.props.findNewMovie(myFirstMovie),
      initializedSecond: true
    }); 
  }

  getFirstMovie = () => {
    return (this.props.findNewMovie(this.state.currentMovieSecond))
  }

  indexChangeFirst = (index) => {
    this.setState({currentFirstIndex: index})
  }

  indexChangeSecond = (index) => {
    this.setState({currentSecondIndex: index})
  }

  transitionEndFirst = () => {
    const firstSwipeableView = document.getElementsByClassName("firstSwipeableView")[0];
    const secondSwipeableView = document.getElementsByClassName("secondSwipeableView")[0];
    let newMovie = '';
    switch(this.state.currentFirstIndex) {
      case 0:
        firstSwipeableView.style.zIndex = -1;
        secondSwipeableView.style.zIndex = 1;
        this.negativeClickedFirst();

        this.props.negativeClicked(this.state.currentMovieFirst);
        newMovie = this.props.findNewMovie(this.state.currentMovieSecond)
        this.setState({ currentFirstIndex: 0, currentMovieFirst: newMovie});
        break;
      case 1:
        firstSwipeableView.style.opacity = 1;
        //firstSwipeableView.style.background = 'white';
        break;
      case 2:
        firstSwipeableView.style.zIndex = -1;
        secondSwipeableView.style.zIndex = 1;
        this.positiveClickedFirst();

        this.props.positiveClicked(this.state.currentMovieFirst);
        newMovie = this.props.findNewMovie(this.state.currentMovieSecond)
        this.setState({ currentFirstIndex: 2, currentMovieFirst: newMovie});
        break;
    }
    this.setState({ currentFirstIndex: 1});
  }

  transitionEndSecond = () => {
    const firstSwipeableView = document.getElementsByClassName("firstSwipeableView")[0];
    const secondSwipeableView = document.getElementsByClassName("secondSwipeableView")[0];
    let newMovie = '';
    switch(this.state.currentSecondIndex) {
      case 0:
        secondSwipeableView.style.zIndex = -1;
        firstSwipeableView.style.zIndex = 1;
        this.negativeClickedSecond();

        this.props.negativeClicked(this.state.currentMovieSecond);
        newMovie = this.props.findNewMovie(this.state.currentMovieFirst);
        this.setState({ currentSecondIndex: 0, currentMovieSecond: newMovie});
        break;
      case 1:
        secondSwipeableView.style.opacity = 1;
        //secondSwipeableView.style.background = 'white';
        break;
      case 2:
        secondSwipeableView.style.zIndex = -1;
        firstSwipeableView.style.zIndex = 1;
        this.positiveClickedSecond();

        this.props.positiveClicked(this.state.currentMovieSecond);
        newMovie = this.props.findNewMovie(this.state.currentMovieFirst);
        this.setState({ currentSecondIndex: 2, currentMovieSecond: newMovie});

        break;
    }
    this.setState({ currentSecondIndex: 1});
  }

  positiveClickedFirst = () => {
    this.setState({ currentFirstIndex: 2});
    const firstSwipeableView = document.getElementsByClassName("firstSwipeableView")[0];
    firstSwipeableView.style.background = '#ff000000';
  }

  negativeClickedFirst = () => {
    this.setState({ currentFirstIndex: 0});
    const firstSwipeableView = document.getElementsByClassName("firstSwipeableView")[0];
    firstSwipeableView.style.background = '#ff000000';
  }

  positiveClickedSecond = () => {
    this.setState({ currentSecondIndex: 2});
    const secondSwipeableView = document.getElementsByClassName("secondSwipeableView")[0];
    secondSwipeableView.style.background = '#ff000000';
  }

  negativeClickedSecond = () => {
    this.setState({ currentSecondIndex: 0});
    const secondSwipeableView = document.getElementsByClassName("secondSwipeableView")[0];
    secondSwipeableView.style.background = '#ff000000';
  }

  switchingFirst = (index) => {
    const firstSwipeableView = document.getElementsByClassName("firstSwipeableView")[0];
    let changeValue;
    if(index < 1)
    {
      changeValue = index;
    } else if(index > 1) {
      changeValue = (2 - index);
    }
    firstSwipeableView.style.background = '#ff000000';
    firstSwipeableView.style.opacity = 0.5 + changeValue / 2;
  }

  switchingSecond = (index) => {
    const secondSwipeableView = document.getElementsByClassName("secondSwipeableView")[0];
    let changeValue;
    if(index < 1)
    {
      changeValue = index;
    } else if(index > 1) {
      changeValue = (2 - index);
    }
    secondSwipeableView.style.background = '#ff000000';
    secondSwipeableView.style.opacity = 0.5 + changeValue / 2;
  }

  render() {
    return (
      <div className="swipe-view-container">
        {
          this.state.initializedFirst ? 
          <SwipeableViews
            className="swipeableView firstSwipeableView"
            enableMouseEvents
            action={(actions) => this.setState({ swipeableActions: actions })}
            resistance
            animateHeight
            index={this.state.currentFirstIndex}
            onChangeIndex={this.indexChangeFirst}
            onTransitionEnd={this.transitionEndFirst}
            onSwitching={this.switchingFirst}
            animateHeight={true}
            style={{overflow: 'hidden'}}
          >
            <div className="dummie-view">
            </div>
            <MovieDesicion 
              movie={this.state.currentMovieFirst}
              positiveClicked={this.positiveClickedFirst}
              negativeClicked={this.negativeClickedFirst}
            />
            <div className="dummie-view">
            </div>
          </SwipeableViews>
          : <LoadingPage />
        }
        {
          this.state.initializedSecond ? 
          <SwipeableViews
            className="swipeableView secondSwipeableView"
            enableMouseEvents
            action={(actions) => this.setState({ swipeableActions: actions })}
            resistance
            animateHeight
            index={this.state.currentSecondIndex}
            onChangeIndex={this.indexChangeSecond}
            onTransitionEnd={this.transitionEndSecond}
            onSwitching={this.switchingSecond}
            animateHeight={true}
            style={{overflow: 'hidden'}}
          >
            <div className="dummie-view">
            </div>
            <MovieDesicion
              movie={this.state.currentMovieSecond}
              positiveClicked={this.positiveClickedSecond}
              negativeClicked={this.negativeClickedSecond}
            />
            <div className="dummie-view">
            </div>
          </SwipeableViews>
          : <LoadingPage />
        }
      </div>
    );
  };
};



export default SwipeBackup;