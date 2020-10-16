import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import FilterObject from '../inerfaces/FilterObject';

/**The HeaderRow component renders the header cells of the table */
class HeaderRow extends React.Component {
	/**Calls dispatch for sorting the table by a given property */
	toggleSort (columnName:string) {
		const props:any = this.props;
		if (props.sortByColumn === columnName) {
			columnName = "-" + columnName;
		}
		props.dispatch({
			type: "SORT_TABLE",
			sortByColumn: columnName
		});
	};

	/**Calls dispatch for filtering the table by a given set of properties */
	toggleFilter (event:any) {
		const tableRowInputs:{}[] = event.target.parentNode.parentNode.querySelectorAll("input");
		const props:any = this.props;
		let filterObject:FilterObject|any = {};
		let element:any;
		let type:string, property:string, val:string|number;
		for (const key in tableRowInputs) {
			if (Object.prototype.hasOwnProperty.call(tableRowInputs, key)) {
				element = tableRowInputs[key];
				type = (element.type === "number" ? "number" : "string");
				val = element.value;
				if (type === "number" && element.value !== "") {
					val = parseFloat(element.value)
				}
				property = element.name.replace("_min", "").replace("_max", "");
				filterObject[element.name] = { type, val, property };
			}
		}
		props.dispatch({ 
			type: "FILTER_TABLE",
			filterObject
		});
	};

	/**Calls dispatch for displaying the form to create aa new record */
	createNewRecord () {
		const props:any = this.props;
		props.dispatch({ 
			type: "TOGGLE_FORM_DISPLAY",
			showForm: true,
			recordIndexForEdit: null
		});
	};

	/**Calls dispatch for clearing the applied filters on the table */
	claearFilters () {
		const tableRowInputs:any = document.body.querySelectorAll("input");
		for (const key in tableRowInputs) {
			if (Object.prototype.hasOwnProperty.call(tableRowInputs, key)) {
				tableRowInputs[key].value = "";
			}
		}
		const props:any = this.props;
		props.dispatch({ 
			type: "CLEAR_FILTER_TABLE"
		});
	};
	
	/**Component render function */
	render () {
		const props:any = this.props;
		let fields:string[] = ["first_name", "last_name", "email", "gender", "job_title"];
		let cls:string;
		let clsName:string;
		let columnForSort:string = props.sortByColumn;
		let prettyName:string = "";
		return (
			<tr>
				{
					fields.map((name:string) => {
						clsName = "selectedForSortAZ";
						if (columnForSort[0] === "-") {
							clsName = "selectedForSortZA";
						}
						cls = (columnForSort.replace("-", "") === name ? clsName : "");
						prettyName = AppUtils.prettifyHeaderName(name);
						return (<th key={name} id={name} className={cls}>
							<div onClick={(event:any) => {this.toggleSort(event.target.parentNode.id)}}>
								{prettyName}
								<svg viewBox="0 0 1792 1792" height="15" width="15" xmlns="http://www.w3.org/2000/svg">
									<path className="upArrow" d="M1408 704q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"/>
									<path className="downArrow" d="M1408 1088q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"/>
								</svg>
							</div>
							<input placeholder={prettyName.toLowerCase()} className="textFilter" name={name} type="text" onChange={(event:any) => {this.toggleFilter(event)}}/>
						</th>)
					})
				}
				<th className="headerClearFilter">
					<button className="uiBtn" onClick={() => {this.claearFilters()}}>Clear filters</button>
					<button className="uiBtn" onClick={() => {this.createNewRecord()}}>Add user</button>
				</th>
			</tr>
		);
	}
};

export default connect(AppUtils.mapStateToProps)(HeaderRow);