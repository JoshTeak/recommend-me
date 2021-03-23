import React from 'react';

class MovieDesicion extends React.Component {
	constructor(props) {
		super(props)
	};

	positiveClicked = () => {
		this.props.positiveClicked();
	}

	negativeClicked = () => {
		this.props.negativeClicked();
	}

	render() {
		return (
			<div className="page-layout">
				<div className={`box-layout box-layout${this.props.cardNumber}`}>
					<div className="box-movie-card-layout"> 
			    		<div className="box-layout__poster">
				    		<img 
						      src={this.props.movie.poster}
						      alt="new"
						    />
					    </div>
					    <div className="box-loyout__bottom">
						    <div className="button--pair">
							    <button className="button--desicion" onClick={this.positiveClicked}>
							    	<div className="icon-container yes-icon-container">
			                          <img className="icon" src="/images/Checkmark Circle.png" alt="Checkmark Circle" />
			                        </div>
							    </button>
							    <button className="button--desicion" onClick={this.negativeClicked}>
							    	<div className="icon-container no-icon-container">
			                          <img className="icon" src="/images/Cancel Close Circle.png" alt="Cancel Close Circle" />
			                        </div>
							    </button>
						    </div> 
							<div className="box-loyout__bottom-info-with-buttons">
			    				<p className="box-layout__title">{this.props.movie.title}</p>
			    			</div>
					    </div>
				    </div>
			    </div>
		    </div>
		);
	};
}

export default MovieDesicion