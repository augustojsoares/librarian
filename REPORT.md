Brief document explaining why you built it the way you did. Include details of how
you approached CSS as well as your choice of external libraries (if any).

# **Librarian** - project report

A summary of solution design/architecture decisions made to build **Librarian**

## Mock API

Single-page applications such as this don't make much sense when working with purely static local content, and are at their best as an interface to wrap data retrieved from some type of API.

Since building a fully functional web service was out of the scope of this project, I decided to use [`json-server`](https://github.com/typicode/json-server) as it allowed me to build a mock API with a lot of built in functionality and have it running in a matter of seconds.
Using faker to add some mock data, allowed me to have a fully featured and populated service with which to develop the frontend client, up and running in a matter of minutes.

## Frontend architecture

**Librarian** uses a very standard application architecture for SPA. With the need to deliver a not too complicated feature set in a very limited amount of time, I decided to go for a simple, robust architecture rather than focus on potentially more performant but complex architecture patterns.

### Component structure

An app level component that holds navigation logic ([`PageHeader`](src/Components/PageHeader.jsx)).

Route based components for each major scenario that encapsulate most of the required logic and hold the necessary state ([`BookList`](src/Components/BookList.jsx)`, `[`BookDetail`](src/Components/BookDetail.jsx)`, `[`BookForm`](src/Components/BookForm.jsx)`).

When some of the logic became too complex it was extracted to secondary components ([`BookListHeader`](src/Components/BookListHeader.jsx), [`TagSelector`](src/Components/TagSelector.jsx)).

There are also a few components that are either purely presentational units ([`BookCard`](src/Components/BookCard.jsx)) or very thin wrappers to add small functionality/configuration evolutions to other components ([`DateInput`](src/Components/DateInput.jsx), [`EmptyState`](src/Components/EmptyState.jsx), [`ImageInput`](src/Components/ImageInput.jsx), [`Loader`](src/Components/Loader.jsx), [`TagList`](src/Components/TagList.jsx)).

### API

I wrapped API interaction in a [`custom agent`](src/API.js) that exposes resource types with their possible actions while completely decoupling from the actual API access layer.

This would make it very easy to, for instance, change the rest library or add any type of middleware to the requests with zero changes to the API interface in the components.

Note: Things like the Cloudinary addresses and api address would generally be kept in .env files and not be committed to version control, but given the context of this project and that I created a Cloudinary burner account specifically for it, I just kept them here.

### State management

For this iteration of the project I decided to use only local component state with data fetching on each mount. This removed a lot of potential complexity that would not add a lot of gain.

For future development it could be useful to keep global state to improve user experience when navigating the page by optimistically updating the page with pre-fetched data or even potentially apply some sort of caching strategy.

If that were the case, I would favor an implementation with a context provider wrapping a custom reducer that could be imported wherever the data is needed.

## CSS

Using `hsds-react` as a component library meant that the app had a predefined style out of the box. This meant that any added CSS would deal mostly with UI structuring rather than visual styling.

The solutions architecture meant that Sass's nesting capabilities would be ideally suited to achieve the proposed goals. This is especially apparent when changing the book list view type (grid/list) or when minimizing the page header. The added class for these scenarios can be handled with minimal nested changes on top of the default case.

Sass also provides good default isolation and namespacing between component styles, at the same time that it has great support for style extraction and reusability (although this was minimally used in the context of this project).

## Testing

I focused on testing the happy path scenarios for the core functionality: see a list of books, see a book detail, create a new book.

Following the philosophy espoused by [Testing Library](https://testing-library.com/docs/) I wrote my tests in a user centric way, meaning that assertions are primarily based on what is shown on the page (as the user would interact with it) rather than artificial markers such as element tags or classes.

Although still lacking in a production context, I added some stub tests to indicate the direction I'd take in expanding the current test suite.

## Project dependencies

On top of `create-react-app` and that of the dependencies that it adds by default, **Librarian** uses the following third party libraries

- [`json-server`](https://github.com/typicode/json-server)

  As discussed above, provides a fully featured API for testing with minimal effort;

- [`hsds-react`](https://github.com/helpscout/hsds-react)

  The React implementation of the Help Scout Design System. This provided a set of components with a consistent design identity and good accessibility support;

- [`faker`](https://github.com/marak/Faker.js/)

  Used to generate mock data for the development API. Has better support for real world type data than similar libraries;

- [`parse-link-header`](https://github.com/thlorenz/parse-link-header)

  Used to parse the `Link` header to access pagination data. Not very lightweight for what we needed it for, but was useful to save development time in this context;

- [`react-router-dom`](https://github.com/ReactTraining/react-router)

  React Router provides route based component rendering with the possibility of nesting within the page with support for query parameters. All of these features were useful in **Librarian**;

- [`Cloudinary`](https://cloudinary.com/)

  Although not a project dependency in the regular sense, **Librarian** makes use of a Cloudinary repository for hosting images. This saved development effort and provided an out of the box hosting solution with ample support for future development with Cloudinary image transformations.

  Cloudinary does provide a native library but it was unnecessary for this app.
