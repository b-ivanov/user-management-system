import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import UserRecord from './inerfaces/UserRecord';
import TableFrame from './components/TableFrame';
import NewRecordForm from './components/NewRecordForm';
import LoadingOverlay from './components/LoadingOverlay';
import AppUtils from './app-utils';
import usersTableActions from './services/usersTableActions';

/**Initial state of the Redux store */
const initialState = {
  usersDB: [],
  sortByColumn: "first_name",
  currentPage: 1,
  recordsPerPage: 10,
  recordIndexForEdit: null,
  showForm: false,
  showLoading: true
};

/**Data retriver from IndexedDB */
const dataTranslator:usersTableActions = new usersTableActions();
let _allRecords:any = [];

/**Reducer function for the Redux store */
const reducer = (state:any = initialState, action:any) => {
	switch (action.type) {
		case "UPDATE_TABLE_VALUES": //action for updating table vlues
			if (action.data && action.data.length > 0) {
				_allRecords = action.data;
				let newSort:UserRecord[] = action.data;
				newSort.sort(AppUtils.dynamicSort(state.sortByColumn));
				return {
					usersDB: newSort,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					recordIndexForEdit: null,
					showForm: false,
					showLoading: false
				};
			}
			break;
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
					recordIndexForEdit: null,
					showForm: state.showForm,
					showLoading: state.showLoading
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
					recordIndexForEdit: null,
					showForm: false,
					showLoading: state.showLoading
				};
			}
			break;
		case "CLEAR_FILTER_TABLE": //action for clearing the filters, applied to the table
			return {
				usersDB: _allRecords,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				recordIndexForEdit: null,
				showForm: false,
				showLoading: state.showLoading
			};
		case "CHANGE_PAGE": //action for changing the page
			if (action.newPageNum) {
				return {
					usersDB: state.usersDB,
					sortByColumn: state.sortByColumn,
					currentPage: action.newPageNum,
					recordsPerPage: state.recordsPerPage,
					recordIndexForEdit: null,
					showForm: false,
					showLoading: state.showLoading
				};
			}
			break;
		case "TOGGLE_FORM_DISPLAY": //action for showing or hiding the form
			return {
				usersDB: state.usersDB,
				sortByColumn: state.sortByColumn,
				currentPage: state.currentPage,
				recordsPerPage: state.recordsPerPage,
				recordIndexForEdit: action.recordIndexForEdit,
				showForm: action.showForm,
				showLoading: state.showLoading
			};
		case "RECORD_CREATE": //action for creating a new record
		case "RECORD_UPDATE": //action for updating an exisitng record
			if (action.recordUpdate) {
				dataTranslator.addUser(action.recordUpdate, (allUsers:UserRecord[]) => {
					if (allUsers !== null) {
						store.dispatch({
							type: "UPDATE_TABLE_VALUES",
							data: allUsers
						});
					}
				});
				return {
					usersDB: state.usersDB,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					recordIndexForEdit: null,
					showForm: false,
					showLoading: true
				};
			}
			break;
		case "DELETE_RECORD": //action for deleting record
			if (typeof action.recordID === "string") {
				dataTranslator.deleteUser(action.recordID, (allUsers:UserRecord[]) => {
					if (allUsers !== null) {
						store.dispatch({
							type: "UPDATE_TABLE_VALUES",
							data: allUsers
						});
					}
				});
				return {
					usersDB: state.usersDB,
					sortByColumn: state.sortByColumn,
					currentPage: state.currentPage,
					recordsPerPage: state.recordsPerPage,
					recordIndexForEdit: null,
					showForm: false,
					showLoading: true
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

/**Initially getting data from indexedDB */
dataTranslator.getAllUsers((allUsers:UserRecord[]) => {
	store.dispatch({
		type: "UPDATE_TABLE_VALUES",
		data: allUsers
	});
});

/**Main component render function */
const App = () => (
	<Provider store={store}>
		<LoadingOverlay />
		<NewRecordForm />
		<TableFrame />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("usersTable"));

export default App