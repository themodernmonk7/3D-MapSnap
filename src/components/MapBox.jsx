import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Link } from "react-router-dom"

// Import mapbox access token
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN



mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
const MapBox = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [longitude, setLongitude] = useState(77.59)
  const [latitude, setLatitude] = useState(12.97)
  const [zoom, setZoom] = useState(10)
  const [imageURL, setImageURL] = useState("")

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], //starting position [lng, lat]
      zoom: zoom, // starting zoom
    })
    // Add the control to the map.
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    )
    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl())
  }, [])

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on("move", () => {
      setLongitude(map.current.getCenter().lng.toFixed(4))
      setLatitude(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [map.current])

  // Take a screenshot of a map
  const takeScreenShot = async () => {
    const response = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/400x400?access_token=${MAPBOX_ACCESS_TOKEN}`
    )
    setImageURL(response.url)
    return response.url
  }

  return (
    <>
      <main className="">
        <div ref={mapContainer} className=" h-screen" />{" "}
        {/* Visible region box */}
        <div className=" absolute inset-0 grid place-items-center pointer-events-none  ">
          <div className=" cursor-grab absolute shadow-2xl shadow-black/50 w-64 h-1/3  md:w-1/2 md:h-1/2 xl:w-1/3 xl:h-1/2 border border-black/10 bg-transparent rounded   "></div>
        </div>
        {/*   */}
        {/* Snapshot button */}
        <div className="z-50 space-y-5 absolute bottom-5 md:bottom-10 right-5  ">
          <button
            title=" Capture the visible region "
            onClick={takeScreenShot}
            className=" bg-white text-gray-600 shadow-xl border-2 border-gray-400/60 w-10 h-10 flex justify-center items-center rounded-md "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </button>
          {/* Display screenshot image */}
          {/* Render image into 3D button */}
          {imageURL && (
            <div className=" flex justify-center items-center ">
              <Link
                title="Render the Captured Image into 3D Cuboid Shape"
                to="/render-3D-image"
                state={{ imageURL }}
                className="bg-white text-gray-600 shadow-xl border-2 border-gray-400/60 w-10 h-10 flex justify-center items-center rounded-md "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MapBox
