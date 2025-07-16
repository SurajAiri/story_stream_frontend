import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LazyVideo } from "@/components/ui/lazy-video";
import { usePerformantState } from "@/hooks/usePerformantState";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoData {
  link: string;
  title: string;
  description: string;
  resolution: string;
  dimension: string;
  thumbnail: string;
  duration: string;
  orientation: string;
}

interface OptimizedVideoCarouselProps {
  videos: VideoData[];
  orientation: string;
}

export const OptimizedVideoCarousel: React.FC<OptimizedVideoCarouselProps> = ({
  videos,
  orientation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { state: playingVideo, setState: setPlayingVideo } = usePerformantState<
    string | null
  >(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize visible videos calculation
  const visibleVideos = useMemo(() => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex - 1 + i + videos.length) % videos.length;
      result.push({ ...videos[index], displayIndex: i });
    }
    return result;
  }, [currentIndex, videos]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleSlideChange = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      if (direction === "next") {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
      }
      setPlayingVideo(null);

      // Use requestAnimationFrame for smooth transitions
      requestAnimationFrame(() => {
        setTimeout(() => setIsTransitioning(false), 400);
      });
    },
    [isTransitioning, videos.length, setPlayingVideo]
  );

  const nextSlide = useCallback(
    () => handleSlideChange("next"),
    [handleSlideChange]
  );
  const prevSlide = useCallback(
    () => handleSlideChange("prev"),
    [handleSlideChange]
  );

  const switchToVideo = useCallback(
    (videoIndex: number) => {
      if (isTransitioning || videoIndex === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(videoIndex);
      setPlayingVideo(null);
      requestAnimationFrame(() => {
        setTimeout(() => setIsTransitioning(false), 400);
      });
    },
    [isTransitioning, currentIndex, setPlayingVideo]
  );

  const handleVideoClick = useCallback(
    (video: VideoData, isCenter: boolean) => {
      if (isCenter) {
        if (playingVideo === video.title) {
          setPlayingVideo(null);
        } else {
          setPlayingVideo(video.title);
        }
      } else {
        const videoIndex = videos.findIndex((v) => v.title === video.title);
        switchToVideo(videoIndex);
      }
    },
    [playingVideo, setPlayingVideo, videos, switchToVideo]
  );

  const handleMouseEnter = useCallback(
    (video: VideoData) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      hoverTimeoutRef.current = setTimeout(() => {
        const videoIndex = videos.findIndex((v) => v.title === video.title);
        if (videoIndex !== currentIndex && !isTransitioning) {
          switchToVideo(videoIndex);
        }
      }, 150);
    },
    [videos, currentIndex, isTransitioning, switchToVideo]
  );

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handlePlayIconClick = useCallback(
    (video: VideoData, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedVideo(video);
    },
    []
  );

  const navigateModal = useCallback(
    (direction: "next" | "prev") => {
      if (!selectedVideo) return;

      const currentModalIndex = videos.findIndex(
        (v) => v.title === selectedVideo.title
      );
      let newIndex;

      if (direction === "next") {
        newIndex = (currentModalIndex + 1) % videos.length;
      } else {
        newIndex = (currentModalIndex - 1 + videos.length) % videos.length;
      }

      setSelectedVideo(videos[newIndex]);
    },
    [selectedVideo, videos]
  );

  const getVideoSize = useCallback(
    (isCenter: boolean) => {
      if (orientation === "vertical") {
        return {
          width: isCenter ? "min(350px, 90vw)" : "min(280px, 25vw)",
          height: isCenter ? "min(500px, 80vh)" : "min(400px, 60vh)",
        };
      } else {
        return {
          width: isCenter ? "min(500px, 90vw)" : "min(400px, 30vw)",
          height: isCenter ? "min(280px, 50vh)" : "min(225px, 40vh)",
        };
      }
    },
    [orientation]
  );

  return (
    <div className="relative lazy-load">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          {orientation === "vertical" ? (
            <>
              <Smartphone className="h-6 w-6 text-purple-400" />
              Instagram Reels & TikTok
            </>
          ) : (
            <>
              <Monitor className="h-6 w-6 text-purple-400" />
              YouTube & Landscape
            </>
          )}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center gap-4 md:gap-6">
          <AnimatePresence mode="wait">
            {visibleVideos.map((video, index) => {
              const isCenter = index === 1;
              const isPlaying = playingVideo === video.title && isCenter;
              const videoSize = getVideoSize(isCenter);

              return (
                <motion.div
                  key={`${video.title}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isTransitioning ? 0.3 : isCenter ? 1 : 0.6,
                    scale: isTransitioning ? 0.7 : isCenter ? 1 : 0.85,
                    y: isTransitioning ? 40 : isCenter ? 0 : 20,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`relative ${
                    isCenter ? "z-10" : "z-0"
                  } cursor-pointer gpu-accelerated`}
                  style={{
                    width: videoSize.width,
                  }}
                  onMouseEnter={() => {
                    if (!isCenter && !isTransitioning) {
                      handleMouseEnter(video);
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleVideoClick(video, isCenter)}
                >
                  <Card
                    className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 overflow-hidden group ${
                      isCenter ? "ring-2 ring-purple-500/50" : ""
                    }`}
                  >
                    <div
                      className="relative bg-slate-900 overflow-hidden"
                      style={{
                        height: videoSize.height,
                        aspectRatio:
                          orientation === "vertical" ? "9/16" : "16/9",
                      }}
                    >
                      {isPlaying ? (
                        <LazyVideo
                          src={video.link}
                          thumbnail={video.thumbnail}
                          title={video.title}
                          className="w-full h-full object-contain bg-black"
                          autoPlay={true}
                          controls={true}
                          loop={true}
                          muted={false}
                          onError={() => setPlayingVideo(null)}
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        <LazyVideo
                          src={video.link}
                          thumbnail={video.thumbnail}
                          title={video.title}
                          className="w-full h-full object-contain bg-black"
                          autoPlay={false}
                          controls={false}
                          loop={false}
                          muted={true}
                          style={{ objectFit: "contain" }}
                        />
                      )}

                      {/* Play button overlay */}
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={(e) => handlePlayIconClick(video, e)}
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                          aria-label="Play video in modal"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h4 className="font-medium text-white mb-1 line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{video.resolution}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal for full video view */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className={`relative w-full max-w-6xl mx-auto bg-slate-900 rounded-xl overflow-hidden shadow-2xl ${
                selectedVideo.orientation === "vertical"
                  ? "max-h-[90vh] flex flex-col"
                  : "max-h-[85vh] flex flex-col"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2.5 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video container */}
              <div className="flex-1 flex items-center justify-center bg-black min-h-0">
                <div
                  className={`relative w-full h-full flex items-center justify-center ${
                    selectedVideo.orientation === "vertical"
                      ? "max-h-[60vh] max-w-[40vh]"
                      : "max-h-[55vh] max-w-full"
                  }`}
                  style={{
                    aspectRatio:
                      selectedVideo.orientation === "vertical"
                        ? "9/16"
                        : "16/9",
                  }}
                >
                  <LazyVideo
                    src={selectedVideo.link}
                    thumbnail={selectedVideo.thumbnail}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    autoPlay={true}
                    controls={true}
                    loop={true}
                    muted={false}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* Title and description with navigation */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-t border-slate-700/50 p-4 md:p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateModal("prev")}
                    className="text-slate-300 hover:text-white hover:bg-slate-800 p-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="text-center flex-1 px-4">
                    <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 break-words">
                      {selectedVideo.title}
                    </h3>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateModal("next")}
                    className="text-slate-300 hover:text-white hover:bg-slate-800 p-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="text-center space-y-3">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <span className="flex items-center gap-1 bg-slate-800/60 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-700/50">
                      {selectedVideo.orientation === "vertical" ? (
                        <Smartphone className="h-3 w-3" />
                      ) : (
                        <Monitor className="h-3 w-3" />
                      )}
                      {selectedVideo.resolution}
                    </span>
                    <span className="bg-slate-800/60 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-700/50">
                      {selectedVideo.duration}
                    </span>
                    <span className="bg-slate-800/60 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-700/50">
                      {selectedVideo.dimension}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 max-w-4xl mx-auto break-words">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
