import React, { useEffect, useRef, useState } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { fabric } from 'fabric';
import DeletionComponent from './Deleteitem';
import AddImage from './AddImage';
import AddText from './AddText';
import ShapeDrawer from './ShapeAdd';

const standardSize = { width: 700, height: 400, label: 'Standard Banner (400x700)' };

const Canvas = () => {
  const canvasRef = useRef();
  const [canvas, setCanvas] = useState();
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [canvasWidth, setCanvasWidth] = useState(standardSize.width);
  const [canvasHeight, setCanvasHeight] = useState(standardSize.height);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isObjectSelected, setIsObjectSelected] = useState(false);

  useEffect(() => {
    const savedCanvasData = JSON.parse(localStorage.getItem('canvasData'));
    if (savedCanvasData) {
      setCanvasWidth(savedCanvasData.canvasWidth);
      setCanvasHeight(savedCanvasData.canvasHeight);
      setBackgroundColor(savedCanvasData.backgroundColor);
    }
  }, []);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      height: canvasHeight,
      width: canvasWidth,
      backgroundColor: backgroundColor,
    });
    setCanvas(newCanvas);

    newCanvas.on('selection:created', () => {
      setIsObjectSelected(true);
    });

    newCanvas.on('selection:updated', () => {
      setIsObjectSelected(true);
    });

    newCanvas.on('selection:cleared', () => {
      setIsObjectSelected(false);
    });

    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas));

      localStorage.setItem('canvasData', JSON.stringify({
        canvasWidth,
        canvasHeight,
        backgroundColor,
      }));
    }
  }, [backgroundColor, canvasHeight, canvasWidth]);

  const handleDownload = () => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'banner.png';
    link.click();
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleSizeChange = (size) => {
    setCanvasWidth(size.width);
    setCanvasHeight(size.height);
  };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'width') {
      setCanvasWidth(parseInt(value, 10));
    } else if (name === 'height') {
      setCanvasHeight(parseInt(value, 10));
    }
  };

  const bringForward = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
      canvas.renderAll();
    }
  };

  const sendBackward = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
      canvas.renderAll();
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200 overflow-hidden">
        <div className={`transition-transform duration-300 ${isSidebarOpen ? 'w-32' : 'w-16'} text-black bg-white flex flex-col`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-gray-900 text-white p-2 focus:outline-none">
            {isSidebarOpen ? '<' : '>'}
          </button>
          {isSidebarOpen && (
            <div className="flex flex-col items-center p-4">
              <h2 className="text-lg font-bold mb-2">Canvas Settings</h2>
              <div className="flex flex-col md:flex-row justify-between items-center w-full">
                <div className="flex flex-col items-center">
                  <div>
                    <input
                      type="number"
                      name="width"
                      placeholder="Width"
                      value={canvasWidth}
                      onChange={handleCustomSizeChange}
                      className="border rounded px-2 py-1 mr-2 w-16"
                    />
                    <input
                      type="number"
                      name="height"
                      placeholder="Height"
                      value={canvasHeight}
                      onChange={handleCustomSizeChange}
                      className="border rounded px-2 py-1 mr-2 w-16"
                    />
                  </div>
                  <button
                    onClick={() => handleSizeChange({ width: canvasWidth, height: canvasHeight })}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Set Size
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  data-tooltip-id="BackgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="border rounded px-2 py-1 mr-2"
                />
              </div>
              <AddImage canvas={canvas} />
              <AddText canvas={canvas} />
              <DeletionComponent canvas={canvas} />
              <ShapeDrawer canvas={canvas} />
              {isObjectSelected && (
                <div className="mt-4 flex ">
                  <button onClick={bringForward}>
                    <box-icon name='arrow-from-bottom'></box-icon>
                  </button>
                  <button onClick={sendBackward}>
                    <box-icon name='arrow-from-top'></box-icon>
                  </button>
                </div>
              )}
              <label className='flex h-12 justify-end items-center bg-green-300' data-tooltip-id="Download" htmlFor="download-btn">
                <box-icon name='download' color='#040404'></box-icon> Download
              </label>
              <button
                id='download-btn'
                onClick={handleDownload}
                className="hidden">
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <canvas ref={canvasRef} className="border-2 border-gray-300"></canvas>
        </div>
      </div>
      <ReactTooltip
        id="text-id"
        place="bottom"
        variant="info"
        content="Add Text"
      />
      <ReactTooltip
        id="image-id"
        place="bottom"
        variant="info"
        content="Add Image"
      />
      <ReactTooltip
        id="delete-id"
        place="bottom"
        variant="info"
        content="Delete Item"
      />
      <ReactTooltip
        id="Shape-id"
        place="bottom"
        variant="info"
        content="Add Shapes/Graphics/PNG"
      />
      <ReactTooltip
        id="Download"
        place="bottom"
        variant="info"
        content="Download"
      />
      <ReactTooltip
        id="BackgroundColor"
        place="top"
        variant="info"
        content="Background Color"
      />
    </>
  );
};

export default Canvas;
