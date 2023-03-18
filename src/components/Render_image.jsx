import React, { useRef, useState } from "react"
import { Engine, Scene, useClick, useBeforeRender } from "react-babylonjs"
import { Vector3, Color3 } from "@babylonjs/core"
import { Link, useLocation } from "react-router-dom"

const DefaultScale = new Vector3(1, 1, 1)
const BiggerScale = new Vector3(1.25, 1.25, 1.25)

const SpinningBox = (props) => {
  const boxRef = useRef(null)
  const [clicked, setClicked] = useState(false)
  useClick(() => setClicked((clicked) => !clicked), boxRef)

  // This will rotate the box on every Babylon frame.
  const rpm = 5
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      var deltaTimeInMillis = scene.getEngine().getDeltaTime()
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
  })

  return (
    <box
      name={props.name}
      ref={boxRef}
      size={2}
      position={props.position}
      scaling={clicked ? BiggerScale : DefaultScale}
      height={1}
      width={0.75}
      depth={0.25}
      wrap
    >
      <standardMaterial>
        <texture url={props.imageURL} assignTo={"diffuseTexture"} />
      </standardMaterial>
    </box>
  )
}

export const SceneWithSpinningBoxes = () => {
  const location = useLocation()
  return (
    <div className=" h-80 md:h-full ">
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 4}
            beta={Math.PI / 3}
            radius={2}
          />
          <hemisphericLight
            name="light1"
            intensity={1.2}
            direction={Vector3.Up()}
          />
          <SpinningBox
            name="left"
            position={new Vector3(0, 0, 0)}
            color={Color3.FromHexString("#EEB5EB")}
            imageURL={location.state.imageURL}
          />
        </Scene>
      </Engine>

      {/* Back to home button */}
      <div className=" mt-20 flex justify-center items-center ">
        <Link to="/" className="bg-blue-700 px-5 py-1 rounded-full font-medium">
          {" "}
          Back to home{" "}
        </Link>
      </div>
    </div>
  )
}

export default SceneWithSpinningBoxes
