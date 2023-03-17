import React, { useRef, useState } from "react"
import { Engine, Scene } from "react-babylonjs"
import { Vector3, Color3, Vector4 } from "@babylonjs/core"
import { Link, useLocation } from "react-router-dom"

// var texture = new BABYLON.Texture(, scene);
//     mat.diffuseTexture = texture;

var columns = 6 // 6 columns
var rows = 1 // 1 row

//alien sprite
var faceUV = new Array(6)

//set all faces to same
for (var i = 0; i < 6; i++) {
  faceUV[i] = new Vector4(i / columns, 0, (i + 1) / columns, 1 / rows)
}

const SpinningBox = (props) => {
  const boxRef = useRef(null)

  return (
    <box
      name={props.name}
      ref={boxRef}
      size={2}
      position={props.position}
      height={1}
      width={0.75}
      depth={0.25}
      faceUV={faceUV}
      wrap
    >
      <standardMaterial>
        <texture url={props.imageURL} assignTo={"diffuseTexture"} />
      </standardMaterial>
    </box>
  )
}

export const SceneWithSpinningBoxes = ({ imageURL }) => {
  const location = useLocation()
  return (
    <div>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={(3 * Math.PI) / 4}
            beta={Math.PI / 4}
            radius={2}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
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
