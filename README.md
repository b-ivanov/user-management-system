## Short task description
This project is a small user management system. It was bootstrapped with [React](https://github.com/facebook/create-react-app) and it uses the browser local storage ([IdexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)) to store its data. The data is a list of employees with fields:
* first_name - First name of the employee (free text);
* last_name - Last name of the employee (free text);
* email - Email of the employee (free text);
* gender - Gender of the employee (Male/Female); and
* job_title - Job title of the employee (free text);
The project consists of two views:

### Users table
This view displays all of the data stored in the IndexedDB database in a form of a table. The view supports pagination and only 10 records are shown per page. The user can use this view to:
1. Sort the records in the database.
2. Filter by a given field the records in the database.
3. Add a new record in the database.
4. Edit an existing record in the database.
5. Delete an existing record in the database.
6. Show the number of records in the database.
7. Navigate through the pages.

### Manipulation form
This view is accessed when the user has clicked the "Add user" or "Edit user" from the Users table. The Manupulation form is overlayed on the Users table. The key features of this view are:
1. Fill-in fields for a new user.
2. Edit fields for an existing user.
3. Validate each field while typing.
4. Shows an error message when a field is left empty (all of them are required).
5. Shows an error message when a record with the same email exists.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
