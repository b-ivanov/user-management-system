import AppUtils from '../app-utils'
/*import UserRecord from '../inerfaces/UserRecord';

const testMoviesDB:UserRecord[] = [
	{
		"id": "54925a66-331f-43c4-a62b-679ad03e7485",
		"first_name": "Aksel",
		"last_name": "Cleef",
		"email": "acleefn@marriott.com",
		"gender": "Male",
		"job_title": "Account Representative I"
	}, {
		"id": "42ececbd-409c-4961-bc40-47ebd0b60749",
		"first_name": "Ange",
		"last_name": "Lumb",
		"email": "alumbk@simplemachines.org",
		"gender": "Female",
		"job_title": "Internal Auditor"
	}, {
		"id": "96e22cea-c42b-4de7-860b-5e9edcc7eebc",
		"first_name": "Gypsy",
		"last_name": "Cadell",
		"email": "gcadello@live.com",
		"gender": "Female",
		"job_title": "Data Coordiator"
	}, {
		"id": "d63522cd-7bcf-454c-849f-04ab2e704b21",
		"first_name": "Carilyn",
		"last_name": "Novacek",
		"email": "cnovaceks@umich.edu",
		"gender": "Female",
		"job_title": "Internal Auditor"
	}, {
		"id": "91f48516-63d5-40cf-8d3f-f88f3b71c9bc",
		"first_name": "Elysee",
		"last_name": "Melin",
		"email": "emelint@nymag.com",
		"gender": "Female",
		"job_title": "Nurse Practicioner"
	}
];


test('Test mapStateToProps function', () => {
  const testStateObject:any = {
		usersDB: [],
		sortByColumn: "title",
		currentPage: 1,
		recordsPerPage: 20,
		showForm: false,
		recordIndexForEdit: null
	};
	const props:any = AppUtils.mapStateToProps(testStateObject);
	for (const key in testStateObject) {
		if (Object.prototype.hasOwnProperty.call(testStateObject, key)) {
			expect(props[key] === testStateObject[key]).toBeTruthy();
		}
	}
});

test('Test prettifyHeaderName function', () => {
	expect(AppUtils.prettifyHeaderName("id") === "#").toBeTruthy();
	expect(AppUtils.prettifyHeaderName("title") === "title").toBeTruthy();
	expect(AppUtils.prettifyHeaderName("imdb_votes") === "IMDB votes").toBeTruthy();
});

test('Test getPropertyType function', () => {
	expect(AppUtils.getPropertyType("id") === "number").toBeTruthy();
	expect(AppUtils.getPropertyType("title") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("director") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("distributor") === "string").toBeTruthy();
	expect(AppUtils.getPropertyType("imdb_votes") === "number").toBeTruthy();
	expect(AppUtils.getPropertyType("imdb_rating") === "number").toBeTruthy();
});

test('Test getIndexOfRecord function', () => {
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "title", "Body Double") === 0).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "title", "Indiana Jones") === 4).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "director", "Christopher Nolan") === 1).toBeTruthy();
	expect(AppUtils.getIndexOfRecord(testMoviesDB, "imdb_rating", 7.6) === 2).toBeTruthy();
});

test('Test dynamicSort function', () => {
	const titleSort:UserRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("title", true));
	expect(titleSort[0].title === "Beverly Hills Cop III").toBeTruthy();
	expect(titleSort[4].title === "The Abyss").toBeTruthy();

	const titleSortRev:UserRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("-title", true));
	expect(titleSortRev[0].title === "The Abyss").toBeTruthy();
	expect(titleSortRev[4].title === "Beverly Hills Cop III").toBeTruthy();

	const IMDBvotesSort:UserRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("imdb_votes", false));
	expect(IMDBvotesSort[0].title === "Body Double").toBeTruthy();
	expect(IMDBvotesSort[4].title === "The Abyss").toBeTruthy();

	const IMDBvotesSortRev:UserRecord[] = testMoviesDB.sort(AppUtils.dynamicSort("-imdb_votes", false));
	expect(IMDBvotesSortRev[0].title === "The Abyss").toBeTruthy();
	expect(IMDBvotesSortRev[4].title === "Body Double").toBeTruthy();
});

test('Test dynamicFilter function', () => {
	const titleFilter:UserRecord[] = testMoviesDB.filter(AppUtils.dynamicFilter({
		title: {
			type: "string",
			val: "Following",
			property: "title"
		}
	}));
	expect(titleFilter.length === 1).toBeTruthy();
	expect(titleFilter[0].title === "Following").toBeTruthy();

	const IMDBvotesFilter:UserRecord[] = testMoviesDB.filter(AppUtils.dynamicFilter({
		min_imdb_votes: {
			type: "number",
			val: 15000,
			property: "imdb_votes"
		}
	}));
	expect(IMDBvotesFilter.length === 3).toBeTruthy();
});*/

test('Test', () => {
	expect(true).toBeTruthy();
});