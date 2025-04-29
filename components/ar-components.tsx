"use client"

import { useEffect } from "react"
import "aframe"

// This component will register custom A-Frame components when loaded
export function ARComponentsRegistration() {
  useEffect(() => {
    // Make sure A-Frame is loaded
    if (typeof AFRAME !== "undefined") {
      // Register a component to make entities clickable
      if (!AFRAME.components["clickable"]) {
        AFRAME.registerComponent("clickable", {
          init: function () {
            this.el.addEventListener("click", function (evt) {
              console.log("I was clicked!", this)
            })
          },
        })
      }

      // Register a component to handle job marker interactions
      if (!AFRAME.components["job-marker"]) {
        AFRAME.registerComponent("job-marker", {
          schema: {
            id: { type: "string" },
          },
          init: function () {
            this.el.addEventListener("click", () => {
              console.log("Job clicked:", this.data.id)
              // Dispatch a custom event that can be caught by React
              const event = new CustomEvent("job-selected", {
                detail: { jobId: this.data.id },
              })
              document.dispatchEvent(event)
            })
          },
        })
      }

      // Register a component to handle apply button clicks
      if (!AFRAME.components["job-apply"]) {
        AFRAME.registerComponent("job-apply", {
          schema: {
            id: { type: "string" },
          },
          init: function () {
            this.el.addEventListener("click", () => {
              console.log("Apply clicked:", this.data.id)
              // Dispatch a custom event that can be caught by React
              const event = new CustomEvent("job-apply", {
                detail: { jobId: this.data.id },
              })
              document.dispatchEvent(event)
            })
          },
        })
      }
    }
  }, [])

  return null
}

// This component will create a job marker in AR
export function ARJobMarker({ job, userLocation }) {
  useEffect(() => {
    // Create job marker if A-Frame is loaded
    if (typeof AFRAME !== "undefined" && userLocation) {
      // Calculate random offset for demo purposes
      const latOffset = (Math.random() - 0.5) * 0.002
      const lonOffset = (Math.random() - 0.5) * 0.002

      // Create entity
      const entity = document.createElement("a-entity")
      entity.classList.add("job-entity")
      entity.setAttribute("data-job-id", job.id)

      // Position the entity with GPS coordinates
      entity.setAttribute(
        "gps-entity-place",
        `latitude: ${userLocation.latitude + latOffset}; longitude: ${userLocation.longitude + lonOffset}`,
      )

      // Create job card
      entity.innerHTML = `
        <a-entity
          geometry="primitive: plane; width: 2; height: 1.2"
          material="color: white; opacity: 0.9"
          position="0 0 0"
          rotation="0 0 0"
          scale="1 1 1"
          class="clickable"
          job-marker="id: ${job.id}"
        >
          <a-text
            value="${job.title}"
            align="center"
            color="#4F46E5"
            position="0 0.4 0.01"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-text
            value="${job.company}"
            align="center"
            color="#000"
            position="0 0.2 0.01"
            scale="0.4 0.4 0.4"
          ></a-text>
          <a-text
            value="${job.salary}"
            align="center"
            color="#000"
            position="0 0 0.01"
            scale="0.4 0.4 0.4"
          ></a-text>
          <a-text
            value="${job.distance}"
            align="center"
            color="#000"
            position="0 -0.2 0.01"
            scale="0.3 0.3 0.3"
          ></a-text>
          <a-entity
            geometry="primitive: plane; width: 1; height: 0.3"
            material="color: #4F46E5"
            position="0 -0.4 0.02"
            class="apply-button"
            job-apply="id: ${job.id}"
          >
            <a-text
              value="Apply Now"
              align="center"
              color="white"
              position="0 0 0.01"
              scale="0.3 0.3 0.3"
            ></a-text>
          </a-entity>
        </a-entity>
      `

      // Add to scene
      const scene = document.querySelector("a-scene")
      if (scene) {
        scene.appendChild(entity)
      }
    }
  }, [job, userLocation])

  return null
}
