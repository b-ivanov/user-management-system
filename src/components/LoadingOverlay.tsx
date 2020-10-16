import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';

/**The LoadingOverlay component renders a loading overlay */
class LoadingOverlay extends React.Component {
	/**Component render function */
	render () {
		const props:any = this.props;
		if (props.showLoading) {
			return (<div className="screenOverlay">
				<div className="loadingWheel"></div>
				<span className="loadingText">Loading...</span>
			</div>);
		} else {
			return '';
		}
	}
};

export default connect(AppUtils.mapStateToProps)(LoadingOverlay);