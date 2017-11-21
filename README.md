fillet
===================
[![Coverage Status](https://coveralls.io/repos/github/chadlagore/fillet/badge.svg?branch=jordan%2Ftests)](https://coveralls.io/github/chadlagore/fillet?branch=jordan%2Ftests)

Event tracking, rating and prioritizing for your event going pleasure.


## :running: Getting Started

You'll need [Node & NPM](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install). To view the app on your phone during development, download [Expo](https://expo.io/). To view linting info in your editor, install ESLint in your editor of choice (search "eslint" in the extensions section).

## :construction_worker: Development

Install dependencies.
```
yarn install
```

Start the app. (Follow the directions in the terminal to view it on your phone.) After running, you can edit and save source files and the changes will be hot-reloaded to your device.
```
yarn start
```

Run tests.
```
yarn test
```

### Adding a new screen
Create a component in `views` implementing the screen, and add it to the Navigator in `App.js`. You can navigate to screens from any view-level component using `this.props.navigation.navigate(routeName)`.

## :shipit: Deployment

No where to deploy to.
