import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to preload an array of image URLs into memory to eliminate flickering.
 * @param {string[]} imagePaths - Array of image URLs/paths to preload.
 * @returns {{ images: HTMLImageElement[], isLoaded: boolean, progress: number, loadedCount: number, totalCount: number }}
 */
export function useImagePreloader(imagePaths) {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  const imagesRef = useRef([]);

  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }

    let isMounted = true;
    let count = 0;
    const total = imagePaths.length;
    const loadedImages = new Array(total);

    setLoadedCount(0);
    setProgress(0);
    setIsLoaded(false);

    let lastReportedProgress = 0;

    imagePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;

      const onItemLoaded = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        count++;

        const currentProgress = Math.round((count / total) * 100);
        // Only trigger state updates at 5% increments or on final completion
        if (currentProgress >= lastReportedProgress + 5 || count === total) {
          lastReportedProgress = currentProgress;
          setLoadedCount(count);
          setProgress(currentProgress);
        }

        if (count === total) {
          imagesRef.current = loadedImages;
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      const handleLoad = () => {
        if (!isMounted) return;
        onItemLoaded();
      };

      const handleError = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        count++;

        const currentProgress = Math.round((count / total) * 100);
        if (currentProgress >= lastReportedProgress + 5 || count === total) {
          lastReportedProgress = currentProgress;
          setLoadedCount(count);
          setProgress(currentProgress);
        }

        if (count === total) {
          imagesRef.current = loadedImages;
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleError;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [imagePaths]);

  return {
    images: imagesRef.current.length > 0 ? imagesRef.current : images,
    isLoaded,
    progress,
    loadedCount,
    totalCount: imagePaths ? imagePaths.length : 0,
  };
}
