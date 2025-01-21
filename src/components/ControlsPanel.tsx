import React from 'react';

type ControlsPanelProps = {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  fontColor: string;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onTextChange: (value: string) => void;
  onFontSizeChange: (value: number) => void;
  onFontColorChange: (value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  width,
  height,
  text,
  fontSize,
  fontColor,
  onWidthChange,
  onHeightChange,
  onTextChange,
  onFontSizeChange,
  onFontColorChange,
  onImageUpload,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <input
          type="number"
          value={width}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Font Color</label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => onFontColorChange(e.target.value)}
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default ControlsPanel;