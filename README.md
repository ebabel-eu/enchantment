# Single player adventure game
Enchantment (working title) is a free (for ever) browser based single player adventure game.

## Installation
```
npm install -g http-server
```

## Start running the game during development
```
http-server src
```

Browse to `http://localhost:8080`

## Branching model
Tackle issues organised in the Github issues system.

Create one branch per issue. Name it after the milestone and words from the title.

For example, for issue "Authenticate with Firebase to login with Facebook" due for the "0.4.0" milestone, create a branch named 0.4.0/firebase-facebook-login

When the work is completed, merge back to the develop branch.

When a milestone is completed, increase the version number accordingly and release to Firebase. Create a tag for that release number and document it in this README.

## Features that are already implemented
* Load Collada models and animate them with their own custom heartbeat.

## Versions

### Next release tag
* 2.0.0
- Switched license from MIT to GPL 3.0
- upgraded three.js from 87 to 91
- switch to require.js modules
- Remove webpack
- Remove build step
- Remove React.js (just Three.js and plain Javascript)
- Remove Firebase
- Add multiplayer chat

### Released tags
* 1.0.0 remove Facebook integration and let anyone move around virtual environment without any login
* 0.10.1 single player fixes
* 0.10.0 single player
* 0.9.0 refactor data and classes
* 0.8.1 fix the keyboard controls to move within the scene.
* 0.8.0 sprite interaction
* 0.7.0 remove collada and use THREE.js models instead
* 0.6.0 Rules of the game documentation, refactoring to match the rules and ES6 refactoring.
* 0.5.0 React.js and webpack.
* 0.4.0 Migration to Firebase backend.
* 0.3.1 Migration to client side only with Grunt and Bower.
* 0.2.0 Original version from https://github.com/jicksta/Enchantment
