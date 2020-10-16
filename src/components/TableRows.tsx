import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import UserRecord from '../inerfaces/UserRecord';

/**The TableRows component renders each row in the table */
class TableRows extends React.Component {
	/**Calls dispatch for deleting a record */
	deleteRecord (user:UserRecord) {
		const props:any = this.props;
		const answer:boolean = window.confirm("You are about to delete user '" + user.first_name + " " + user.last_name + "'!");
		if (answer) {
			props.dispatch({
				type: "DELETE_RECORD",
				recordID: user.id
			});
		}
	};

	/**Calls dispatch for displaying the form with a given record */
	editRecord (userID:string) {
		const props:any = this.props;
		const recordIndex:number = AppUtils.getIndexOfRecord(props.usersDB, "id", userID);
		props.dispatch({ 
			type: "TOGGLE_FORM_DISPLAY",
			showForm: true,
			recordIndexForEdit: recordIndex
		});
	};
	
	/**Component render function */
	render () {
		const props:any = this.props;
		const startIndex:number = (props.recordsPerPage * (props.currentPage - 1));
		const endIndex:number = ((props.recordsPerPage * props.currentPage) - 1);
		return props.usersDB.map((user:UserRecord, index:number) => {
			//<td>{user.id}</td>
			if (index >= startIndex && index <= endIndex) {
				return <tr className="recordRow" key={'id_' + user.id}>
					<td>{user.first_name}</td>
					<td>{user.last_name}</td>
					<td>{user.email}</td>
					<td>{user.gender}</td>
					<td>{user.job_title}</td>
					<td className="recordActions">
						<button className="uiBtn orange" onClick={() => {this.editRecord(user.id)}}>Edit user</button>
						<button className="uiBtn red" onClick={() => {this.deleteRecord(user)}}>Remove user</button>
					</td>
				</tr>
			} else {
				return false;
			}
		});
	}
};

export default connect(AppUtils.mapStateToProps)(TableRows);