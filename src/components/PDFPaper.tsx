import { ReactNode } from 'react';

type PDFPaperProps = {
  children: ReactNode;
  orientation?: 'portrait' | 'landscape';
  className?: string;
};

const PDFPaper = ({
  children,
  orientation = 'portrait',
  className = ''
}: PDFPaperProps) => {
  const a4Width = 210; 
  const a4Height = 297; 

  return (
    <div
      className={`relative bg-white shadow-lg print:shadow-none ${className}`}
      style={{
        width: `${a4Width}mm`,
        height: `${a4Height}mm`,
        aspectRatio: orientation === 'portrait' ? '210/297' : '297/210',
        maxWidth: '100%',
        transform: orientation === 'landscape' ? 'rotate(-90deg)' : 'none'
      }}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default PDFPaper;