# General Information

With this setup it is possible to create a website (React-App) and use it wihtin vvvv as e.g. a (touch) interface.
The website and vvvv communicate through a websocket Server, which is runnning locally in vvvv.
The website sends JSON data to vvvv and vice versa.
In this case you get the touch gesture and movement/position as a string.

More infos in the code and vvvv patch :D

### This project uses additional packages, so you need node.js and a package manager (npm comes with node.js)

# Start

Just open the vvvv patch and start the web-app. See further down on how to start the web-app. You should see a Stride Window like this:

![Stride window on start](image.png)

## How to start the Web Interface

In the project directory (/react-template), you can run:

### npm install

Installs all necessary packages. This web-app will not work without the packages!

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed or served locally!

### serve -s build

Serves the build on a local server.
Open http://localhost:3000 to view it in your browser.

For more information:
[serve npm package documentation](https://www.npmjs.com/package/serve)

## Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
