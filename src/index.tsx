import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
// import usersJSON from './users.json';
import UserRecord from './inerfaces/UserRecord';
import TableFrame from './components/TableFrame';
import NewRecordForm from './components/NewRecordForm';
import AppUtils from './app-utils';

/**Initial state of the Redux store */
const initialState = {
  usersDB: [],
  sortByColumn: "first_name",
  currentPage: 1,
  recordsPerPage: 10,
  showForm: false,
  recordIndexForEdit: null
};
let _allRecords:any = [];
/**Reducer function for the Redux store */
const reducer = (state:any = initialState, action:any) => {
	switch (action.type) {
		case "SORT_TABLE": //action for sorting the table
			if (action.sortByColumn) {
				const newSortColumn:string = action.sortByColumn;
				let newSort:UserRecord[] = state.usersDB;
				newSort.sort(AppUtils.dynamicSort(newSortColumn));
				return {
					usersDB: newSort,
					sortByColumn: newSortColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: state.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "FILTER_TABLE": //action for filtering the table
			if (action.filterObject) {
				const filter:any = AppUtils.dynamicFilter(action.filterObject);
				const filteredDB:UserRecord[] = _allRecords.filter(filter);
				filteredDB.sort(AppUtils.dynamicSort(state.sortByColumn));
				return {
					usersDB: filteredDB,
					sortByColumn: state.sortByColumn,
					currentPage: 1,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
				};
			}
			break;
		case "CLEAR_FILTER_TABLE": //action for clearing the filters, applied to the table
			return {
				usersDB: _allRecords,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				showForm: false,
				recordIndexForEdit: null
			};
		case "CHANGE_PAGE": //action for changing the page
			if (action.newPageNum) {
				return {
					usersDB: state.usersDB,
					sortByColumn: state.sortByColumn,
					currentPage: action.newPageNum,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
				};
			}
			break;
		case "TOGGLE_FORM_DISPLAY": //action for showing or hiding the form
			return {
				usersDB: state.usersDB,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				showForm: action.showForm,
				recordIndexForEdit: action.recordIndexForEdit
			};
		case "RECORD_CREATE": //action for creating a new record
			if (action.recordUpdate) {
				_allRecords = _allRecords.concat(action.recordUpdate);
				let users:any = state.usersDB.concat(action.recordUpdate);
				users.sort(AppUtils.dynamicSort(state.sortByColumn));
				return {
					usersDB: users,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: action.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "RECORD_UPDATE": //action for updating an exisitng record
			if (action.recordUpdate) {
				let users:any = state.usersDB;
				users[state.recordIndexForEdit] = action.recordUpdate;
				users.sort(AppUtils.dynamicSort(state.sortByColumn));
				return {
					usersDB: users,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: action.showForm,
					recordIndexForEdit: null
				};
			}
			break;
		case "DELETE_RECORD": //action for deleting record
			if (action.recordIndex >= 0) {
				let users:any[] = state.usersDB;
				users = users.filter((elem, index) => {
					return (action.recordIndex !== index);
				});
				return {
					usersDB: users,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					showForm: false,
					recordIndexForEdit: null
				};
			}
			break;
		default:
			return state;
	}
	return state;
}

/**Creating the Redux store */
const store = createStore(reducer);
/**Initially sorting the table on load */
store.dispatch({
	type: "SORT_TABLE",
	sortByColumn: initialState.sortByColumn
});

/**Main component render function */
const App = () => (
	<Provider store={store}>
		<NewRecordForm />
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("usersTable"));

export default App