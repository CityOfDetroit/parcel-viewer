# parcel-viewer

Quickly lookup parcel information and zoning codes for properties in Detroit. 

[Parcel Points Ownership](https://data.detroitmi.gov/d/dxgi-9s8s) data come from our open data portal and update daily.

We're using [react-map-gl](https://github.com/uber/react-map-gl), [antd](https://ant.design/) UI components, and [Create React App](https://github.com/facebook/create-react-app). Create React App's default webpack configuration was ejected to use `react-map-gl`; [these instructions](https://github.com/zjhch123/react-map-gl-demo-with-create-react-app) were helpful for doing that.

## Install

Clone this repo, then run `npm install` or `yarn` to install dependencies

## Develop

`npm start` or `yarn start` starts the development server and opens `localhost:3000` in your browser

## Deploy

`npm deploy` or `yarn deploy` creates an optimized build and deploys to gh-pages
