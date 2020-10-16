import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import UserRecord from '../inerfaces/UserRecord';
import { v1 as uuidv1 } from 'uuid';

/**The NewRecordForm component renders a form for creating and editin records */
class NewRecordForm extends React.Component {
	/**Removes the red border from an input field */
	removeRedBorder (ev:any) {
		ev.target.style.boder = "";
	};

	/**Reads all feilds in the form and validates them. If errors are found a corresponding message appears */
	getFormData (checkForDuplicate:boolean) {
		let recordObj:any = {};
		let inputs:any = document.querySelectorAll("form.recordEditForm input, form.recordEditForm select");
		let hasEmptyFields:boolean = false;
		for (const key in inputs) {
			if (Object.prototype.hasOwnProperty.call(inputs, key)) {
				let element:any = inputs[key];
				if (element.value === "") {
					hasEmptyFields = true;
					element.style.border = "1px solid red";
				} else {
					if (element.checkValidity()) {
						if (element.type === "number") {
							recordObj[element.name] = parseFloat(element.value);
						} else {
							recordObj[element.name] = element.value;
						}
					} else {
						window.alert("Field contains invalid symbols!");
						element.style.border = "1px solid red";
						return null;
					}
				}
			}
		}
		const props:any = this.props;
		if (checkForDuplicate && AppUtils.getIndexOfRecord(props.usersDB, "email", recordObj.email) >= 0) {
			window.alert("A record with the same name already exists!");
			return null;
		} else {
			if (hasEmptyFields) {
				window.alert("All fields are required!");
				return null;
			} else {
				return recordObj;
			}
		}
	};
	
	/**Calls dispatch for hiding the form */
	closeForm () {
		const props:any = this.props;
		props.dispatch({ 
			type: "TOGGLE_FORM_DISPLAY",
			showForm: false
		});
	};

	/**Calls dispatch for creating or changing a record to the table */
	submitNewData (event:any, recordIndex:number) {
		event.preventDefault();
		const props:any = this.props;
		const isNewRecord:boolean = recordIndex === null;
		let recordData:UserRecord|null = this.getFormData(isNewRecord);
		if (recordData  !== null) {
			if (isNewRecord) {
				props.dispatch({ 
					type: "RECORD_CREATE",
					showForm: false,
					recordIndexForEdit: null,
					recordUpdate: recordData
				});
			} else {
				props.dispatch({ 
					type: "RECORD_UPDATE",
					showForm: false,
					recordIndexForEdit: null,
					recordUpdate: recordData
				});
			}
		}
	};

	/**Component render function */
	render () {
		const props:any = this.props;
		if (props.showForm) {
			let dummyRecord:any = {
				id: uuidv1(),
				first_name: "",
				last_name: "",
				email: "",
				gender: "",
				job_title: ""
			};
			let heading:string = "New user";
			let buttonText:string = "Add";
			const recordInd:number = props.recordIndexForEdit;
			if (recordInd !== null) {
				heading = "Edit user";
				buttonText = "Edit";
				dummyRecord = props.usersDB[recordInd];
			}
			return (<div className="screenOverlay">
				<form className="recordEditForm">
					<h1>{heading}</h1>
					<label>First name</label>
					<input name="first_name" type="text" placeholder="John" pattern="[A-Za-z\-]+" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.first_name}/>
					<label>Last name</label>
					<input name="last_name" type="text" placeholder="Doe" pattern="[A-Za-z\-]+" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.last_name}/>
					<label>Email</label>
					<input name="email" type="email" placeholder="john_doe@mail.com" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.email}/>
					<label>Gender</label>
					<select name="gender" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.gender}>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
					<label>Job title</label>
					<input name="job_title" type="text" placeholder="Internal auditor" pattern="[A-Za-z\-\s]+" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.job_title}/>
					<label className="hiddenElement">ID</label>
					<input className="hiddenElement" name="id" type="text" defaultValue={dummyRecord.id}/>
					
					<div className="buttonsContainer">
						<button className="uiBtn green" onClick={(event:any) => {this.submitNewData(event, recordInd)}}>{buttonText}</button>
						<button className="uiBtn" onClick={() => {this.closeForm()}}>Back</button>
					</div>
				</form>
			</div>);
		} else {
			return '';
		}
		
	}
};

export default connect(AppUtils.mapStateToProps)(NewRecordForm);