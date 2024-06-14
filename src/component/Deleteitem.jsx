import React from 'react';

const DeletionComponent = ({ canvas }) => {
  const handleDelete = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const objectType = activeObject;
      canvas.remove(activeObject);
      canvas.renderAll();
      console.log(objectType.type);
      // Remove data from local storage based on object type
      switch (objectType.type) {
        case 'image':
          removeImageFromLocalStorage(activeObject);
          break;
        case 'textbox':
        case 'i-text':
          removeTextFromLocalStorage(activeObject);
          break;
          
          // console.log(activeObject.uniqueId);
          break;
        // Add cases for other object types as needed
        default:
          removeShapesFromLocalStorage(activeObject);
          break;
      }
    }
  };

  const removeImageFromLocalStorage = (imageObject) => {
    console.log(imageObject)
    const storedImages = JSON.parse(localStorage.getItem('images')) || [];
    const updatedImages = storedImages.filter(
      (image) => image.uniqueId !== imageObject.uniqueId
    );
    localStorage.setItem('images', JSON.stringify(updatedImages));
  };

  const removeTextFromLocalStorage = (textObject) => {
    const storedTexts = JSON.parse(localStorage.getItem('texts')) || [];
    const updatedTexts = storedTexts.filter(
      (text) =>
        text.left !== textObject.left ||
        text.top !== textObject.top ||
        text.content !== textObject.text
    );
    localStorage.setItem('texts', JSON.stringify(updatedTexts));
  };

  const  removeShapesFromLocalStorage = (shapeObject) =>{
   const activeObject = canvas.getActiveObject();
  const storedShapes = JSON.parse(localStorage.getItem('shapes')) || [];

    console.log(shapeObject);
    
      const updatedShapes = storedShapes.filter(shape => shape.uniqueId !== shapeObject.uniqueId);
      // setShapes(updatedShapes);
      // saveShapesToLocalStorage(updatedShapes);
      localStorage.setItem('shapes', JSON.stringify(updatedShapes));

      
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label data-tooltip-id="delete-id"  className='cursor-pointer' htmlFor="delete-button"><box-icon name='trash' color='#040404' ></box-icon></label>
      <button
        onClick={handleDelete}
        className="hidden"
        id='delete-button'
      >
        
      </button>
    </div>
  );
};

export default DeletionComponent;
