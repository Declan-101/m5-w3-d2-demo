# Module 5 Week 3 Day 2 — Demo and Homework

Declan Wilde · WEB 403 Advanced Full Stack Web Development

## Start in VS Code

Open the `crud-json-server` folder, then open a terminal:

```sh
npm ci
npm run dev
```

`npm run dev` starts both React and JSON Server. Open the React address printed in the terminal and click **Get Lists**. If port 3000 is already used by your group challenge, React may ask to use another port. Stop the group challenge with Control+C or accept the alternate port.

The local API is `http://127.0.0.1:5000/posts`. It reads the supplied `db.json` file. Keep the terminal running while demonstrating the app. Press Control+C to stop both servers.

To run them separately, use `npm start` in one terminal and `npm run json-server` in another.

## Course implementation

- The starter's App class and `loading`, `alldata`, and `singledata` state fields are preserved. `singledata` is reserved for the later homework.
- Clicking Get Lists calls `getLists`. It sets loading to true, fetches `/posts`, checks the HTTP response, reads the JSON and stores the books with setState.
- The render method uses a conditional expression to show the loading message or Lists component. Initial instructions and connection errors are also handled.
- `Lists.js` is a functional component. It uses the specified `forEach()` method to push table rows into `listrows` and displays ID, title and author.
- Bootstrap is imported in Lists.js. Each row uses the database ID as its React key.
- The original four records from the supplied db.json are preserved.
- `json-server` is pinned to 0.17.4 so the course's `--watch` and numeric IDs work as demonstrated. Concurrently runs both processes.
- The project uses react-scripts, the Create React App tooling, scaffolded locally rather than rerunning the deprecated generator. React's createRoot entry point starts the required class App component.

## Explain it in class

“The React app is the client and JSON Server is the local API. My Get Lists button sends a GET request to the posts endpoint. The response is converted to JSON and saved in alldata state, which updates the screen. I pass that array to Lists through props and use forEach to create a table row for each book. The loading state controls the message while the request is pending.”

## Homework (second commit)

Adds CreateList.js, UpdateList.js and DeleteList.js using React Bootstrap Modal and useState for visibility. BookFields.js shares the controlled title/author fields. App.js remains the class parent: handleChange stores form values in singledata, getList fetches the selected record, and createList/updateList/deleteList call POST/PUT/DELETE with fetch. JSON bodies use Content-Type application/json and JSON.stringify. After successful writes, getLists reloads the table. Delete fields are disabled as the slides require. Failed requests leave the dialog open with an error, and required fields prevent blank records.

Bootstrap 5 and React Bootstrap 2 are paired for compatibility with the installed React version. The course's component split, class state, useState modal visibility and REST methods are preserved.

Start with npm run dev as above. Click Get Lists, then Create or a row's Update/Delete button. Data persists in db.json. The database is local development data, not a hosted service. The four original book records are retained.

No GAP submission has been made.
