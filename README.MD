
# 3D-MapSnap

3D-MapSnap is a React project that allows users to choose a location on a Mapbox map, display the visible region, and then capture it as an image to apply as a texture to a 3D cuboid using BabylonJs.

## Demo

You can access the live version by following this link: https://3d-mapsnap.netlify.app/


## Features

- Mapbox integration for choosing a location and displaying the visible region
- Capture the visible region as an image and apply it as a texture to a 3D cuboid
- Customizable size and position of the cuboid


## How to Use

1. Click on the map to choose a location.
2. Use the zoom and pan controls to adjust the visible region of the map.
3. Click the "Capture" button to capture the visible region as an image.
4. Use the sliders to adjust the size and position of the 3D cuboid.
5. The captured image will be applied as a texture to the cuboid in real-time.


## Built with
- ReactJs
- Mapbox
- BabylonJs

## Run Locally

Clone the project

```bash
  git clone https://github.com/themodernmonk7/3D-MapSnap.git
```

Go to the project directory

```bash
  cd 3D-MapSnap-main
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_MAPBOX_ACCESS_TOKEN=`

