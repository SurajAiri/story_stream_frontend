import React, { useState, useRef, useEffect } from "react";
import { Play, Loader2 } from "lucide-react";

interface LazyVideoProps {
  src: string;
  thumbnail: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  onLoadedData?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onVolumeChange?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  thumbnail,
  title,
  className = "",
  autoPlay = false,
  controls = false,
  loop = false,
  muted = true,
  onLoadedData,
  onLoadedMetadata,
  onVolumeChange,
  onError,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadVideo = () => {
    if (!isLoaded && !isLoading && !hasError) {
      setIsLoading(true);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handlePlayClick = () => {
    if (!isLoaded) {
      loadVideo();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-900 ${className}`}
      style={style}
    >
      {!isLoaded && !isLoading && !hasError && (
        <>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setHasError(true)}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
            <div
              className="bg-white/90 hover:bg-white rounded-full p-4 transition-all duration-300 group-hover:scale-110"
              onClick={handlePlayClick}
            >
              <Play className="h-8 w-8 text-black ml-1" />
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-sm opacity-75">Failed to load video</p>
            <button
              onClick={() => {
                setHasError(false);
                loadVideo();
              }}
              className="mt-2 text-xs text-purple-400 hover:text-purple-300"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {isInView && (isLoaded || isLoading) && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          preload="metadata"
          onLoadedData={(e) => {
            handleVideoLoad();
            onLoadedData?.(e);
          }}
          onLoadedMetadata={onLoadedMetadata}
          onVolumeChange={onVolumeChange}
          onError={handleVideoError}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      )}
    </div>
  );
};
