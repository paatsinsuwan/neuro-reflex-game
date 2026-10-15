import { useState, useRef, useEffect } from '../vendor.js';

export function useContainerWidth() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(600);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width) {
          setWidth(entry.contentRect.width);
        }
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  return { containerRef, width };
}
