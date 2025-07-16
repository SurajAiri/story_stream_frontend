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
  const [showPlayButton, setShowPlayButton] = useState(true);
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

  // Auto-load video when in view and autoPlay is true
  useEffect(() => {
    if (isInView && autoPlay && !isLoaded && !isLoading && !hasError) {
      setIsLoading(true);
      setShowPlayButton(false);
    }
  }, [isInView, autoPlay, isLoaded, isLoading, hasError]);

  const loadVideo = () => {
    if (!isLoaded && !isLoading && !hasError) {
      setIsLoading(true);
      setShowPlayButton(false);
    }
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsLoaded(true);
    setIsLoading(false);
    setShowPlayButton(false);

    const video = e.target as HTMLVideoElement;

    if (autoPlay) {
      video.muted = muted;
      video.volume = muted ? 0 : 1.0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            if (!muted) {
              video.muted = false;
              video.volume = 1.0;
            }
          })
          .catch((error) => {
            console.log("Auto-play failed, trying muted:", error);
            video.muted = true;
            video
              .play()
              .then(() => {
                if (!muted) {
                  setTimeout(() => {
                    video.muted = false;
                    video.volume = 1.0;
                  }, 500);
                }
              })
              .catch(() => {
                // If even muted playback fails, show play button
                setShowPlayButton(true);
              });
          });
      }
    }

    onLoadedData?.(e);
  };

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
    setShowPlayButton(true);
    onError?.();
  };

  const handlePlayClick = () => {
    if (!isLoaded) {
      loadVideo();
    } else if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  const handleVideoPause = () => {
    if (!autoPlay) {
      setShowPlayButton(true);
    }
  };

  const handleVideoPlay = () => {
    setShowPlayButton(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-900 ${className}`}
      style={style}
    >
      {/* Thumbnail */}
      {!isLoaded && !isLoading && !hasError && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}

      {/* Play button overlay */}
      {showPlayButton && !isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer z-10">
          <div
            className="bg-white/90 hover:bg-white rounded-full p-4 transition-all duration-300 group-hover:scale-110"
            onClick={handlePlayClick}
          >
            <Play className="h-8 w-8 text-black ml-1" />
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <p className="text-sm opacity-75">Failed to load video</p>
            <button
              onClick={() => {
                setHasError(false);
                setShowPlayButton(true);
                loadVideo();
              }}
              className="mt-2 text-xs text-purple-400 hover:text-purple-300"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      {isInView && (isLoaded || isLoading) && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          preload="metadata"
          playsInline
          onLoadedData={handleVideoLoad}
          onLoadedMetadata={onLoadedMetadata}
          onVolumeChange={onVolumeChange}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          style={{
            display: isLoaded ? "block" : "none",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
};
