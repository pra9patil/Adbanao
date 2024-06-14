import React, { useEffect } from "react";
import { fabric } from "fabric";

const AddImage = ({ canvas }) => {
  const saveImageToLocalStorage = (uniqueId, dataURL) => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.push({ uniqueId, dataURL });
    localStorage.setItem("images", JSON.stringify(images));
  };

  const updateImagePositionInLocalStorage = (uniqueId, positionData) => {
    const images = JSON.parse(localStorage.getItem("images")) || [];
    const imageIndex = images.findIndex((image) => image.uniqueId === uniqueId);
    if (imageIndex !== -1) {
      images[imageIndex] = { ...images[imageIndex], ...positionData };
      localStorage.setItem("images", JSON.stringify(images));
    }
  };

  const addImage = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataURL = event.target.result;
      const uniqueId = generateUniqueId(); // Generate unique ID for the image
      saveImageToLocalStorage(uniqueId, dataURL); // Save image to local storage with unique ID

      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scaleX = canvasWidth / imgObj.width;
        const scaleY = canvasHeight / imgObj.height;
        const scale = Math.min(scaleX, scaleY);

        const img = new fabric.Image(imgObj);
        img.set({
          uniqueId: uniqueId, // Set unique ID as a property of the image object
          left: (canvasWidth - imgObj.width * scale) / 2,
          top: (canvasHeight - imgObj.height * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          borderColor: "black",
          cornerColor: "black",
        });
        canvas.add(img);
        canvas.setActiveObject(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addImage(file);
    }
  };

  const generateUniqueId = () => {
    // Generate a random unique ID (you can use a library like uuid for better unique IDs)
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    if (!canvas) return; // Ensure the canvas is initialized

    const imageData = JSON.parse(localStorage.getItem("images")) || [];
    imageData.forEach((image) => {
      const imgObj = new Image();
      imgObj.src = image.dataURL;
      imgObj.onload = () => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scaleX = canvasWidth / imgObj.width;
        const scaleY = canvasHeight / imgObj.height;
        const scale = Math.min(scaleX, scaleY);

        const img = new fabric.Image(imgObj);
        img.set({
          uniqueId: image.uniqueId, // Set unique ID as a property of the image object
          left: image.left || (canvasWidth - imgObj.width * scale) / 2,
          top: image.top || (canvasHeight - imgObj.height * scale) / 2,
          scaleX: image.scaleX || scale,
          scaleY: image.scaleY || scale,
          borderColor: "black",
          cornerColor: "black",
        });
        canvas.add(img);
        canvas.setActiveObject(img);
      };
    });

    // Add event listener for object modifications
    const handleObjectModified = (e) => {
      const obj = e.target;
      if (obj && obj.uniqueId) {
        updateImagePositionInLocalStorage(obj.uniqueId, {
          left: obj.left,
          top: obj.top,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
        });
      }
    };

    canvas.on("object:modified", handleObjectModified);

    // Clean up event listener on component unmount
    return () => {
      if (canvas) {
        canvas.off("object:modified", handleObjectModified);
      }
    };
  }, [canvas]);

  return (
    <div className="mt-4 flex space-x-2">
      <label data-tooltip-id="image-id" className="cursor-pointer" htmlFor="photo_sticker_png">
        <box-icon name="images" color="#040404"></box-icon>
      </label>
      <input
        type="file"
        id="photo_sticker_png"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
    </div>
  );
};

export default AddImage;
