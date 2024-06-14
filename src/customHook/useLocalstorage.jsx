
export const saveImageToLocalStorage = (uniqueId, dataURL) => {
  // Implement the logic to save the image data to local storage
  // Example:
  const images = JSON.parse(localStorage.getItem('images')) || [];
  const newImage = { uniqueId, dataURL };
  images.push(newImage);
  localStorage.setItem('images', JSON.stringify(images));
};

// export const removeImageFromLocalStorage = (imageObject) => {
//   const storedImages = JSON.parse(localStorage.getItem('images')) || [];
//   console.log("Stored images before removal:", storedImages);

//   const updatedImages = storedImages.filter(
//     image => image.src !== imageObject._element.src
//   );
//   console.log("Filtered images after removal:", updatedImages);

//   localStorage.setItem('images', JSON.stringify(updatedImages));
// };

// export const removeShapesFromLocalStorage =(shapeObject)=>{
//   const activeObject = canvas.getActiveObject();
//   console.log('dd');
//   const storedShapes = JSON.parse(localStorage.getItem('shapes')) || [];

  
//     if (shapeObject && shapeObject.uniqueId === uniqueId) {
//       const updatedShapes = storedShapes.filter(shape => shape.src !== shapeObject.src);
     
//       localStorage.setItem('shapes', JSON.stringify(updatedShapes));

    
//     }
// }


export const saveShapesToLocalStorage = (uniqueId, shapesData) => {
  const shapes = JSON.parse(localStorage.getItem('shapes')) || [];
  const newShape = { uniqueId, shapesData };
  shapes.push(newShape);
  localStorage.setItem('shapes', JSON.stringify(shapes));
};

// export const removeShapeFromLocalStorage = (uniqueId) => {
//   const shapes = JSON.parse(localStorage.getItem('shapes')) || [];
//   const updatedShapes = shapes.filter(shape => shape.uniqueId !== uniqueId);
//   console.log('updatedShapes');
//   localStorage.setItem('shapes', JSON.stringify(updatedShapes));
// };

export const loadShapesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('shapes')) || [];
  console.log(shapes);
};