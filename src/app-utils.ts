/* eslint-disable no-new-func */
import FilterObject from './inerfaces/FilterObject'
import FilterNumberProperty from './inerfaces/FilterNumberProperty'
import FilterStringProperty from './inerfaces/FilterStringProperty'

/**A simple namespace, containing functions used in the components */
const AppUtils:any = {

	/**Translates from state to props */
	mapStateToProps: (state:any) => ({
		usersDB: state.usersDB,
		sortByColumn: state.sortByColumn,
		currentPage: state.currentPage,
		recordsPerPage: state.recordsPerPage,
		recordIndexForEdit: state.recordIndexForEdit,
		showForm: state.showForm,
		showLoading: state.showLoading
	}),

	/**Makes header texts pretty */
	prettifyHeaderName: (uglyName:string) => {
		let prettyName:string = uglyName;
		if (uglyName === "id") {
			prettyName = "#";
		}
		if (uglyName.indexOf("_") > -1) {
			prettyName = uglyName.replace("_", " ");
		}
		return prettyName;
	},
	
	/**Returns a sorting function by a given property */
	dynamicSort: (property:string, isStringCompare:boolean) => {
		if (property) {
			let sortOrder:number = 1;
			if (property[0] === "-") {
				sortOrder = -1;
				property = property.substr(1);
			}
			return (object1:any,object2:any) => {
				let result:number = 0;
				let compare1:number = (isStringCompare ? object1[property].toString().toUpperCase() : object1[property]);
				let compare2:number = (isStringCompare ? object2[property].toString().toUpperCase() : object2[property]);
				//(a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0;
				if (compare1 < compare2) {
					result = -1;
				} else if (compare1 > compare2) {
					result = 1;
				} else {
					result = 0;
				}
				return result * sortOrder;
			}
		} else {
			return 0;
		}
	},

	/**Returns a filter function by a given set of properties */
	dynamicFilter: (filters:FilterObject|any) => {
		let functionBody:string[] = [];
		let element:FilterNumberProperty|FilterStringProperty;
		for (const key in filters) {
			if (Object.prototype.hasOwnProperty.call(filters, key)) {
				element = filters[key];
				if (element.type === "number" && typeof element.val === "number") {
					if (key.indexOf("max") >= 0) {
						functionBody.push("user." + element.property + " <= " + element.val);
					} else {
						functionBody.push("user." + element.property + " >= " + element.val);
					}
				}
				if (element.type === "string" && element.val) {
					functionBody.push("user." + element.property + ".toString().toLowerCase().indexOf('" + element.val.toString().toLowerCase() + "') >= 0");
				}
			}
		}
		if (functionBody.length === 0) {
			functionBody = ["true"]
		}
		const filterFunction:any = new Function("user", "return " + functionBody.join(" && ") + ";");
		return filterFunction;
	},

	/**Returns the index of a given record, specified by a dynamic property. If the record is not found, returns -1 */
	getIndexOfRecord: (collection:any[], key:string, val:any) => {
		for (let index = 0; index < collection.length; index++) {
			if (collection[index][key] === val) {
				return index;
			}
		}
		return -1;
	}
};

export default AppUtils;