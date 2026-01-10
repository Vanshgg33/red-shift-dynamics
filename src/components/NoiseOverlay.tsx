import { useEffect, useRef } from 'react';

const NoiseOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Generate noise
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 15;    // A (increased opacity ~6%)
    }

    ctx.putImageData(imageData, 0, 0);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      const newImageData = ctx.createImageData(newWidth, newHeight);
      const newData = newImageData.data;

      for (let i = 0; i < newData.length; i += 4) {
        const value = Math.random() * 255;
        newData[i] = value;
        newData[i + 1] = value;
        newData[i + 2] = value;
        newData[i + 3] = 15;
      }

      ctx.putImageData(newImageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
      style={{ zIndex: 1 }}
    />
  );
};

export default NoiseOverlay;




