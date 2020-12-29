# Welcome to Librarian - your online book keeper

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API running instructions
Librarian leverages a very simple `json-server` API for demonstrations and development purposes.
There are three possible ways to run de development API. All API instances will be available on port `3001`
### `yarn api`

Runs an instance of the API that is seeded with records comprised of fake data. 

Has a built in delay of 500ms to simulate real API conditions.

### `yarn api:empty`

Runs an empty instance of the API. The available `/books` enpoint will return an empty array by default.

Has a built in delay of 500ms to simulate real API conditions.

### `yarn api:fast`

Runs an API instance with fake data (like `yarn api`), but has no built in delay and therefore has a response time equatable to local data.


## Frontend running instructions

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
