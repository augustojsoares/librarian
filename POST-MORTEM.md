# **Librarian** - Post-mortem

## Project summary

This project's goal was to develop a functional prototype for a book keeper and showcase app

## Proposed goals

The app should be capable of:

### Main goals

- Creating new books;
- Deleting existing books;
- Showing a list of books in alphabetical order;
- Showing a list of books in either a list or grid view;
- Having each book on the list be clickable and redirect to a dedicated page for that book's details;
- Reaching the detail page for each book via a specific URL;

### Stretch goals

- Adding categories (tags) to books;
- Showing books with specific categories;
- Sorting the book list alphabetically and by recency in ascending or descending order;
- Switching the book list between a grid and list view;
- Accessing any book list viewing options combination (sorting, filters or layout) via dedicated URL;
- Adding new fields to a book, dynamically when creating;
- Navigating the book list using the keyboard;
- Animating transitions between views;

## Results delivered

On top of all the main and stretch goals, **Librarian** is capable of:

- Sorting the book list publication date in ascending or descending order;
- Presenting book list results paginated;
- Navigating all interfaces with the keyboard;

## Overall assessment

Despite the time constraints the project was delivered with a full feature set and went, overall, according to plan.

This was facilitated by a substantial amount of experience working with similar solutions that included all the features that were requested.

Although there is still much room for improvement and further development I would qualify the project as successful.

## Challenges, trade-offs and production readiness

The main challenge for this project was to deliver the proposed feature set in the allotted amount of time (roughly 8 hours of development time).

To this goal, the objective was to keep the architecture [as simple as possible](REPORT.md#frontend-architecture). This meant that in order to achieve the proposed delivery goals many potential improvements are missing that would be required for a fully production ready app.

- A fully developed test suite with maximum possible coverage

  As discussed in the [project report](REPORT.md#testing) the provided test suite covers the happy path for the most fundamental usage scenarios but and stubs to indicate the general testing structure moving forward but is far from the desired coverage rate.
  Tests are missing for view changes, page changes and error scenarios with coverage for all possible control flow bifurcations.

  For most mainly presentational components tests were omitted entirely and the ones for [`BookCard`](src/__tests/BookCard.test.js) should be taken as example;

- A complete accessibility audit

  Although there was some concern with accessibility as well as what's provided by using `hsds-react` components, accessibility is far from thoroughly considered and would require a full audit before going to production;

- User control

  Although not, strictly speaking, a requirement for a production app, this type of app would benefit greatly from user authentication and authorization in a public facing production context, with role/ownership based permissions applied to different operations;

- Input sanitizing

  At this point, there is no escaping of user inputs which potentially opens the app up to XSS vulnerability exploits. Even though this should be enforced at the backend level, it would be wise to double down on this in the frontend client as well;

- Optimizations

  In order to speed up development and deliver the full feature set, there was very little regard for potential optimizations. While this is not a concern in development with a locally running API (that even had to be artificially delayed to simulate real usage) it's fundamental for a quality user experience in a production scenario.

  Some of the potential avenues for optimization are:

  - Caching strategies

    A good way to improve response times would be to store book data locally and optimistically update views based on that data when available and then reconciling the data when the request resolves;

  - Image optimizations

    Image usage could be optimized by deferring loading of images and using placeholders until they are available. Additionally, the fact that the app uses Cloudinary to host images could be used to leverage transformations and only download optimized images with just the required size;

  - Fonts

    Fonts are being loading directly from Google Fonts rather than delivered through a CDN;

  - Bundle size

    This app was developed with no regard for bundle size. A good example of where this could be improved is `parse-link-header` which while useful in a prototyping scenario has a relatively large bundle size for the features it provides and would be easy to emulate locally;

- An architectural change in the way the booking creation form is handled. See [lessons learned](lessons-learned).

## Lessons learned

Despite what I would call the overall success of this project, I have two main lessons learned for the future.

The first is an architecture change related to the book creation form. Moving forward I would refactor this to be rendered as a modal rather than a standalone page and to optionally take a book object as a prop. This would make it extremely easy to show the modal from the context of the main book list to create a new book but also to show it in the context of the book detail page, pre-filled with the books information on the fields in order to implement book edition.

The second lesson learned pertains to `hsds-react`. Although I had some familiarity with the library I had no practical experience with it. Using it for the first time in a time sensitive context meant that some issues arose (particularly regarding the `Animation` component) that I then did not have the time to properly debug. Moving forward I would try to not use something like this in a project of this type without first having a modicum of hands-on experience with the components I'd use.
