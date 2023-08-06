# Welcome!

Welcome to Talk Shop Live full-stack assessment challenge!
Please fork the repo to start.

This challenge requires:

- NodeJS (>= v16.14.0)
- NPM
- A cup of ☕ or 🍵

The repo is pre-configured, so just running `npm install` you should be able to start.
You may use any other package of your choice to enrich your development experience.

### Project Structure

You will find a ReactJS app in the `/apps/frontend` folder and an ExpressJS app in the `/apps/backend` folder.

To start just run the following commands on the root directory:

1. Install the dependencies: `npm install`
1. Start both frontend and backend apps: `npm run dev`
1. The backend app should be running on [http://localhost:3000](http://localhost:3000) and the frontend app on [http://localhost:5173](http://localhost:5173)

### The Challenge

This is a typical Todo app build with ReactJS and ExpressJS in which you should be able to create, read, update, and delete todos, there are already some boilerplate code like styles, components, and setup code for the backend.

For this full-stack code challenge you will need to develop the following features using Typescript:

Backend:

- CRUD functionality, follow REST standard, there is no need for a DB, use the `todos` variable instead
- For Create, Update, and Delete, the request must have the correct `Api-Key` header (use the constant `API_KEY`), if not return the correct HTTP status

Frontend:

- Render the todo list
- Create todo, after one todo is added make sure to reset the input
- Toggle todo status and update the app state
- Delete todo and update the app state

Extra points:

- Add request validation
- Filter todos by status
- Ability to search for todos
- Ability to export todos to a CSV file
