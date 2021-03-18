import React from 'react';

class MovieDesicion extends React.Component {
	constructor(props) {
		super(props)
	};

	positiveClicked = () => {
		this.props.positiveClicked(this.props.movie);
	}

	negativeClicked = () => {
		this.props.negativeClicked(this.props.movie);
	}

	render() {
		return (
			<div className="page-layout">
				<div className="box-layout">
					<div className="box-movie-card-layout"> 
			    		<div className="box-layout__poster">
				    		<img 
						      src={this.props.movie.poster}
						      alt="new"
						    />
					    </div>
					    <div className="box-loyout__bottom-info">
			    			<p className="box-layout__title">{this.props.movie.title}</p>
			    			{
								this.props.pageType === "SEEN" ?
							    <div className="button--pair">
								    <button className="button--yes" onClick={this.positiveClicked}>Seen</button>
								    <button className="button--no" onClick={this.negativeClicked}>Haven't seen</button>
							    </div> :
							    <div className="button--pair">
								    <button className="button--yes" onClick={this.positiveClicked}>Recommend</button>
								    <button className="button--no" onClick={this.negativeClicked}>Don't Recommend</button>
							    </div>
							}
					    </div>
				    </div>
			    </div>
		    </div>
		);
	};
}

export default MovieDesicion