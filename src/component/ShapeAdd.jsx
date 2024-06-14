import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
// import {removeShapesFromLocalStorage} from './Deleteitem';
import Modal from 'react-modal';

const ShapeDrawer = ({ canvas }) => {
  const [color, setColor] = useState('#000000');
  const [modalOpen, setModalOpen] = useState(false);
  const [shapes, setShapes] = useState([]);

  // Function to save shapes to local storage
  const saveShapesToLocalStorage = (shapes) => {
    localStorage.setItem('shapes', JSON.stringify(shapes));
  };

  // Function to load shapes from local storage
  const loadShapesFromLocalStorage = () => {
    const storedShapes = localStorage.getItem('shapes');
    if (storedShapes) {
      const parsedShapes = JSON.parse(storedShapes);
      setShapes(parsedShapes);
      for (const shape of parsedShapes) {
        addShapeToCanvas(shape.type, shape.options, shape.uniqueId);
      }
    }
  };

  useEffect(() => {
    loadShapesFromLocalStorage();
  }, []);

  useEffect(() => {
    if (canvas) {
      loadShapesFromLocalStorage();

      canvas.on('object:modified', handleObjectModified);
    }

    return () => {
      if (canvas) {
        canvas.off('object:modified', handleObjectModified);
      }
    };
  }, [canvas]);

  const handleObjectModified = (event) => {
    const modifiedObject = event.target;
    if (modifiedObject && modifiedObject.uniqueId) {
      updateShapePosition(modifiedObject.uniqueId, modifiedObject);
    }
  };

  const addShapeToCanvas = (type, options, uniqueId = null) => {
    if (!canvas) return;

    let shape;
    switch (type) {
      case 'rectangle':
        shape = new fabric.Rect(options);
        break;
      case 'circle':
        shape = new fabric.Circle(options);
        break;
      case 'triangle':
        shape = new fabric.Triangle(options);
        break;
      case 'line':
        shape = new fabric.Line([options.x1, options.y1, options.x2, options.y2], options);
        break;
      case 'ellipse':
        shape = new fabric.Ellipse(options);
        break;
      case 'polygon':
        shape = new fabric.Polygon(options.points, options);
        break;
      default:
        break;
    }
    if (shape) {
      shape.uniqueId = uniqueId || generateUniqueId(); // Attach uniqueId to the shape
      canvas.add(shape);
      canvas.renderAll();
    }
  };

  const handleAddShape = (shape) => {
    const shapeOptions = {
      left: 100,
      top: 100,
      fill: color,
    };

    let options;
    switch (shape) {
      case 'rectangle':
        options = { ...shapeOptions, width: 60, height: 70 };
        break;
      case 'circle':
        options = { ...shapeOptions, radius: 50 };
        break;
      case 'triangle':
        options = { ...shapeOptions, width: 50, height: 50 };
        break;
      case 'line':
        options = { stroke: color, strokeWidth: 2, x1: 50, y1: 100, x2: 200, y2: 100 };
        break;
      case 'ellipse':
        options = { ...shapeOptions, rx: 50, ry: 30 };
        break;
      case 'polygon':
        options = {
          ...shapeOptions,
          points: [
            { x: 100, y: 0 },
            { x: 200, y: 50 },
            { x: 170, y: 100 },
            { x: 30, y: 100 },
            { x: 0, y: 50 },
          ],
        };
        break;
      default:
        break;
    }
    const uniqueId = generateUniqueId();
    const updatedShapes = [...shapes, { uniqueId, type: shape, options }];
    setShapes(updatedShapes);
    saveShapesToLocalStorage(updatedShapes);
    addShapeToCanvas(shape, options, uniqueId); // Pass the uniqueId to addShapeToCanvas
    setModalOpen(false);
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleCustomShape = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        fabric.Image.fromURL(event.target.result, (img) => {
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          img.uniqueId = generateUniqueId(); // Attach uniqueId to the image
          canvas.add(img);
          const updatedShapes = [...shapes, { uniqueId: img.uniqueId, type: 'image', options: img }];
          setShapes(updatedShapes);
          saveShapesToLocalStorage(updatedShapes);
          setModalOpen(false);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateShapePosition = (uniqueId, shapeObject) => {
    const shapes = JSON.parse(localStorage.getItem('shapes')) || [];
    const updatedShapes = shapes.map(shape => {
      if (shape.uniqueId === uniqueId) {
        return {
          ...shape,
          options: {
            ...shape.options,
            left: shapeObject.left,
            top: shapeObject.top,
            scaleX: shapeObject.scaleX,
            scaleY: shapeObject.scaleY,
            angle: shapeObject.angle,
          },
        };
      }
      return shape;
    });
    setShapes(updatedShapes);
    saveShapesToLocalStorage(updatedShapes);
  };

  const handleDeleteShape = () => {
    removeShapesFromLocalStorage()
  };

  return (
    <div className="space-y-4">
     
      <label data-tooltip-id="Shape-id" htmlFor="shape-btn"><box-icon name='shapes' type='solid' color='#040404' ></box-icon></label>
      <button
        id='shape-btn'
        onClick={() => setModalOpen(true)}
        className="hidden"
      >
        
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <div className="p-4">
        <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border rounded px-2 py-1"
      />
          <h2 className="text-xl font-bold mb-4">Select Shape</h2>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => handleAddShape('rectangle')} className="bg-gray-200 p-2 rounded">Rectangle</button>
            <button onClick={() => handleAddShape('circle')} className="bg-gray-200 p-2 rounded">Circle</button>
            <button onClick={() => handleAddShape('triangle')} className="bg-gray-200 p-2 rounded">Triangle</button>
            <button onClick={() => handleAddShape('line')} className="bg-gray-200 p-2 rounded">Line</button>
            <button onClick={() => handleAddShape('ellipse')} className="bg-gray-200 p-2 rounded">Ellipse</button>
            <button onClick={() => handleAddShape('polygon')} className="bg-gray-200 p-2 rounded">Polygon</button>
          </div>
          <div className="mt-4">
            <input type="file" accept="image/*" onChange={handleCustomShape} />
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={() => setModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShapeDrawer;
