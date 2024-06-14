import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import Modal from 'react-modal';

// Bind modal to your app element
Modal.setAppElement('#root');

const AddText = ({ canvas }) => {
  const [text, setText] = useState('');
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#333');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTextId, setActiveTextId] = useState(null);

  useEffect(() => {
    if (canvas) {
      loadTextsFromLocalStorage();
    }
  }, [canvas]);

  const saveTextsToLocalStorage = (texts) => {
    localStorage.setItem('texts', JSON.stringify(texts));
  };

  const loadTextsFromLocalStorage = () => {
    const storedTexts = localStorage.getItem('texts');
    if (storedTexts) {
      const texts = JSON.parse(storedTexts);
      if (texts.length > 0) {
        const text = texts[0]; // Assume only one text object
        const textObj = new fabric.IText(text.content, {
          left: text.left,
          top: text.top,
          fontFamily: text.fontFamily,
          fill: text.fill,
          fontSize: text.fontSize,
        });
        textObj.uniqueId = text.uniqueId; // Ensure uniqueId is set
        canvas.add(textObj);
        setActiveTextId(text.uniqueId); // Set the active text ID
        setText(text.content); // Set modal text input to existing text content
        setFontStyle(text.fontFamily); // Set modal font style to existing font family
        setFontSize(text.fontSize); // Set modal font size to existing font size
        setFontColor(text.fill); // Set modal font color to existing font color

        // Add event listener for movement and resizing
        textObj.on('modified', () => {
          updateTextAttributes(text.uniqueId, textObj);
        });

        // Set the active object on canvas
        canvas.setActiveObject(textObj);
      }
    }
  };

  const addOrUpdateText = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      // Update existing text object
      activeObject.set({
        text: text,
        fontFamily: fontStyle,
        fill: fontColor,
        fontSize: parseInt(fontSize, 10),
      });
      canvas.renderAll();
      updateTextAttributes(activeObject.uniqueId, activeObject);
    } else {
      // Add new text object
      const textObj = new fabric.IText(text, {
        left: 100,
        top: 100,
        fontFamily: fontStyle,
        fill: fontColor,
        fontSize: parseInt(fontSize, 10),
      });
      textObj.uniqueId = generateUniqueId(); // Generate unique ID for the text object
      canvas.add(textObj);
      canvas.setActiveObject(textObj);
      setActiveTextId(textObj.uniqueId); // Set the active text ID

      // Save the new text object to local storage
      saveTextsToLocalStorage([{
        uniqueId: textObj.uniqueId,
        content: text,
        left: 100,
        top: 100,
        fontFamily: fontStyle,
        fill: fontColor,
        fontSize: parseInt(fontSize, 10),
      }]);

      // Add event listener for movement and resizing
      textObj.on('modified', () => {
        updateTextAttributes(textObj.uniqueId, textObj);
      });
    }

    closeModal();
  };

  const updateTextAttributes = (uniqueId, textObj) => {
    const texts = JSON.parse(localStorage.getItem('texts')) || [];
    const updatedTexts = texts.map((text) => {
      if (text.uniqueId === uniqueId) {
        return {
          ...text,
          left: textObj.left,
          top: textObj.top,
          fontSize: textObj.fontSize, // Update fontSize in local storage
          content: textObj.text, // Update text content
          fontFamily: textObj.fontFamily, // Update font family
          fill: textObj.fill, // Update font color
        };
      }
      return text;
    });
    saveTextsToLocalStorage(updatedTexts);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('text', e.target.value);
      canvas.renderAll();
      updateTextAttributes(activeObject.uniqueId, activeObject);
    }
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontFamily', e.target.value);
      canvas.renderAll();
      updateTextAttributes(activeObject.uniqueId, activeObject);
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fontSize', parseInt(e.target.value, 10));
      canvas.renderAll();
      updateTextAttributes(activeObject.uniqueId, activeObject);
    }
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set('fill', e.target.value);
      canvas.renderAll();
      updateTextAttributes(activeObject.uniqueId, activeObject);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <label data-tooltip-id="text-id" className='cursor-pointer' htmlFor="text-btn"><box-icon name='text' color='#040404' ></box-icon></label>
      <button id='text-btn' onClick={openModal} className="hidden">
        Add Text
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Text Options"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="mt-2 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Enter text"
              value={text}
              onChange={handleTextChange}
              className="border rounded px-2 py-1"
            />
            <select
              value={fontStyle}
              onChange={handleFontStyleChange}
              className="border rounded px-2 py-1"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Lucida Sans">Lucida Sans</option>
              <option value="Pacifico">Pacifico</option>
              <option value="Roboto">Roboto</option>
              <option value="Lobster">Lobster</option>
            </select>
            <input
              type="number"
              placeholder="Font size"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="border rounded px-2 py-1"
            />
            <input
              type="color"
              value={fontColor}
              onChange={handleFontColorChange}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={addOrUpdateText}
              id='addtext-btn'
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Text
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddText;
