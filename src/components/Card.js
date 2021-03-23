import React from "react";
import SwipeableViews from "react-swipeable-views";
import MovieDesicion from './MovieDesicion';
import LoadingPage from './LoadingPage';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayReady: true,
      swipeableActions: '',
      currentIndex: 1,
      initialized: false
    }
  }

  indexChange = (index) => {
    this.setState({currentIndex: index});
  }

  componentDidMount() {
    this.setState({initialized: true})
  }

  positionMe = () => {
    const pagelayout = document.getElementsByClassName(`box-layout${this.props.cardNumber}`)[0];
    const SwipeableView = document.getElementsByClassName(`swipeableView${this.props.cardNumber}`)[0];
    switch(this.props.positionArray[this.props.cardNumber].position) {
      case 0:
        pagelayout.style.transform = "scale(1) translate(0, 0)";
        SwipeableView.style.zIndex = "3";
        break;
      case 1:
        pagelayout.style.transform = "scale(0.9) translate(0, 8%)";
        SwipeableView.style.zIndex = "2";
        break;
      case 2:
        pagelayout.style.transform = "scale(0.8) translate(0, 18%)";
        SwipeableView.style.zIndex = "1";
        break;
    }
  }

  transitionEnd = () => {
    const SwipeableView = document.getElementsByClassName(`swipeableView${this.props.cardNumber}`)[0];
    switch(this.state.currentIndex) {
      case 0:
        this.props.negativeClicked(this.props.movie);
        this.setState({displayReady: false});
        SwipeableView.style.opacity = 0;
        this.setState({ currentIndex: 1});
        this.props.changeCardPositions(this.props.movie, this.props.cardNumber);
        break;
      case 1:
        SwipeableView.style.opacity = 1;
        break;
      case 2:
        this.props.positiveClicked(this.props.movie);
        this.setState({displayReady: false});
        SwipeableView.style.opacity = 0;
        this.setState({ currentIndex: 1});
        this.props.changeCardPositions(this.props.movie, this.props.cardNumber);
        break;
    }
  }

  positiveClicked = () => {
    this.setState({ currentIndex: 2});
  }

  negativeClicked= () => {
    this.setState({ currentIndex: 0});
  }

  switching = (index) => {
    const SwipeableView = document.getElementsByClassName(`swipeableView${this.props.cardNumber}`)[0];
    let changeValue;
    if(index < 1)
    {
      changeValue = index;
    } else if(index > 1) {
      changeValue = (2 - index);
    }
    SwipeableView.style.opacity = 0.5 + changeValue / 2;
  }

  render() {
    return (
      <div className="swipeableView-positioning">
        <SwipeableViews
          className={`swipeableView swipeableView${this.props.cardNumber}`}
          enableMouseEvents
          action={(actions) => this.setState({ swipeableActions: actions })}
          resistance
          animateHeight
          index={this.state.currentIndex}
          onChangeIndex={this.indexChange}
          onTransitionEnd={this.transitionEnd}
          onSwitching={this.switching}
          animateHeight={true}
          style={{overflow: 'hidden'}}
        >
          <div className="dummie-view">
          </div>
          <MovieDesicion 
            movie={this.props.movie}
            cardNumber={this.props.cardNumber}
            positiveClicked={this.positiveClicked}
            negativeClicked={this.negativeClicked}
          />
          <div className="dummie-view">
          </div>
        </SwipeableViews>
        {
          this.state.initialized ? 
          <div>
            {this.positionMe()}
          </div> : ''
        }
      </div> 
    );
  };
};

export default Card;