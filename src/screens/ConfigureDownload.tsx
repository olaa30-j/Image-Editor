import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import PDFPaper from '../components/PdfPaper';

type LocationState = {
    imageSrc: string;
    height: number; 
    text: string;
    fontSize: number; 
    fontColor: string;
    width: number;
};

const ConfigureDownload: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [spacing, setSpacing] = useState<number>(10);
    const [rows, setRows] = useState<number>(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [naturalRatio, setNaturalRatio] = useState<number>(1);

    const { imageSrc, height, text, fontSize, fontColor, width } =
        (location.state || {}) as LocationState;

    useEffect(() => {
        if (!imageSrc) return;

        const img = new Image();
        img.onload = () => {
            setNaturalRatio(img.naturalWidth / img.naturalHeight);
        };
        img.src = imageSrc;
    }, [imageSrc]);

    useEffect(() => {
        if (!imageSrc) navigate('/');
    }, [imageSrc, navigate]);

    const handleDownload = async () => {
        setIsGenerating(true);
        const pdf = new jsPDF('p', 'mm', 'a4');

        try {
            if (!imageSrc) return;

            const img = await new Promise<HTMLImageElement>((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = imageSrc;
            });

            const a4Width = 210;  
            const a4Height = 297;  
            let yPos = 0;

            const displayHeight = height;
            const displayWidth = height * naturalRatio;

            for (let i = 0; i < rows; i++) {
                if (yPos + displayHeight > a4Height) {
                    pdf.addPage();
                    yPos = 0;
                }

                const xPos = (a4Width - displayWidth) / 2;

                pdf.addImage(
                    img,
                    'PNG',
                    xPos,
                    yPos,
                    displayWidth,
                    displayHeight
                );

                pdf.setFontSize(fontSize);
                pdf.setTextColor(fontColor);
                pdf.text(
                    text,
                    a4Width / 2,
                    yPos + displayHeight / 2,
                    { align: 'center' }
                );

                yPos += displayHeight + spacing;
            }

            pdf.save('perfect-height-template.pdf');

        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    if (!imageSrc) return null;

    const displayHeight = height;
    const displayWidth = height * naturalRatio;

    return (
        <div className="min-h-screen w-[100vw] bg-gray-100 p-8">
            <div className="mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Print Configuration</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Original Dimensions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-600">Width:</span>
                                        <div className="font-medium">{width}mm</div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Height:</span>
                                        <div className="font-medium">{height}mm</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Number of Rows
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={rows}
                                        onChange={(e) => setRows(Math.max(1, Number(e.target.value)))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Row Spacing (mm)
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={spacing}
                                        onChange={(e) => setSpacing(Math.max(0, Number(e.target.value)))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </label>
                            </div>

                            <button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400"
                            >
                                {isGenerating ? 'Generating...' : 'Download PDF'}
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-white">
                            <PDFPaper>
                                {Array.from({ length: rows }).map((_, index) => {
                                    const topPosition = index * (displayHeight + spacing);
                                    return (
                                        <div
                                            key={index}
                                            className="absolute left-1/2 -translate-x-1/2"
                                            style={{
                                                width: `${displayWidth}mm`,
                                                height: `${displayHeight}mm`,
                                                top: `${topPosition}mm`,
                                            }}
                                        >
                                            <img
                                                src={imageSrc}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                            />
                                            <div
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                                                style={{
                                                    fontSize: `${fontSize}mm`,
                                                    color: fontColor
                                                }}
                                            >
                                                {text}
                                            </div>
                                        </div>
                                    );
                                })}
                            </PDFPaper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigureDownload;