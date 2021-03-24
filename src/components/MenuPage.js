import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { resetUser } from '../actions/user';
import { history } from '../routers/AppRouter'; //todo consider importing from a different file.
import { firebase, googleAuthProvider } from '../firebase/firebase';

export class MenuPage extends React.Component {
	constructor(props) {
		super(props)
	};

	resetAlgorithm = () => {
	    this.props.resetUser(this.props.auth.uid).then(() => {
			history.push({
				pathname: "/seen",
				state: { previousPath: history.location}
			});
	    });
	}

	goBack = () => {
		history.push({
			pathname: history.location.state.previousPath.pathname,
			state: { previousPath: history.location}
		});
	}

	render() {
		return (
			<div className="page-background">
				<div className="options-header-setup">
					<button className="options-back-button selectable" onClick={this.goBack}>
						<div className="icon-container">
							<img className="icon" src="/images/Chevron Left.png" alt="Chevron Left" />
						</div>
					</button>
					<div className="options-page-title">
						<h1>Settings</h1>
					</div>
				</div>
	    		<div className="options-body">
                    <div className="options-list">
						<div className="option selectable"  onClick={this.props.startLogout}>
							<div className="icon-container">
								<img className="icon" src="/images/Menu-Expand@4x.png" alt="Menu-Expand@4x" />
							</div>
							<h3 className="option-name">Logout</h3>
						</div>
						<div className="option selectable" onClick={this.resetAlgorithm}>
							<div className="icon-container">
								<img className="icon" src="/images/Favourite@4x.png" alt="Favourite@4x" />
							</div>
							<h3 className="option-name">Reset</h3>
						</div>
                    </div>
                </div>
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  resetUser: (id) => dispatch(resetUser(id))
});

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
