import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PDFPaper from '../components/PdfPaper';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showControls, setShowControls] = useState(true);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [width, setWidth] = useState<number>(100); 
    const [height, setHeight] = useState<number>(50); 
    const [text, setText] = useState<string>('Your Text');
    const [fontSize, setFontSize] = useState<number>(5);
    const [fontColor, setFontColor] = useState<string>('#000000');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfigure = () => {
        navigate('/pdf-download', {
            state: {
                imageSrc,
                width,
                height,
                text,
                fontSize,
                fontColor
            }
        });
    };

    return (
        <div className="min-h-screen w-[100vw] bg-gray-100 p-8">
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Design Studio</h1>
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {showControls ? 'Hide Controls' : 'Show Controls'}
                    </button>
                </div>

                <div className={`grid gap-8 ${showControls ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Preview Section */}
                    <PDFPaper orientation="portrait">
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 aspect-[210/297] bg-white relative">
                            {imageSrc ? (
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        width: `${width}mm`,
                                        height: `${height}mm`
                                    }}>
                                    <img
                                        src={imageSrc}
                                        alt="Design Preview"
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center"
                                        style={{
                                            fontSize: `${fontSize}mm`,
                                            color: fontColor,
                                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        }}>
                                        {text}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-400 text-center absolute inset-0 flex items-center justify-center">
                                    Upload an image to preview
                                </div>
                            )}
                            <button
                                onClick={handleConfigure}
                                disabled={!imageSrc}
                                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                Prepare for Printing
                            </button>
                        </div>
                    </PDFPaper>

                    {/* Controls */}
                    {showControls && (
                        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Upload Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Width (mm)
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Height (mm)
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Text
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Size (mm)
                                        <input
                                            type="number"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(Math.max(1, Number(e.target.value)))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Font Color
                                        <input
                                            type="color"
                                            value={fontColor}
                                            onChange={(e) => setFontColor(e.target.value)}
                                            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;