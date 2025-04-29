// types/aframe.d.ts
declare global {
    namespace JSX {
      interface IntrinsicElements {
        "a-scene": any;
        "a-camera": any;
        "a-entity": any;
        "a-box": any;
        "a-text": any;
      }
    }
  
    interface Window {
      AFRAME: any;
    }
  }
  
  export {};