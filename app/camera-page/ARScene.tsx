"use client";
import React, { useEffect } from "react";

const ARScene = () => {
  useEffect(() => {
    const aframeScript = document.createElement("script");
    aframeScript.src = "https://aframe.io/releases/1.2.0/aframe.min.js";
    aframeScript.async = true;
    document.body.appendChild(aframeScript);

    const arjsScript = document.createElement("script");
    arjsScript.src = "https://cdn.rawgit.com/jeromeetienne/AR.js/2.1.7/aframe/build/aframe-ar.js";
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
  }, []);

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker type="pattern" url="/images/pattern-hiro.patt">
          <a-plane
            id="imagePlane"
            position="0 0 0"
            rotation="-90 0 0"
            width="4"
            height="2.25"
            material="shader: flat; scale: 2 2 2; src: /images/avatar.png"
          />
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARScene;
