import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Zap,
  Sparkles,
  Video,
  Mic,
  ImageIcon,
  Clock,
  Monitor,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Users,
  Palette,
  Bot,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Star,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  addToWaitlist,
  type WaitlistEntry,
} from "@/services/apis/waitlist_api";

// Video data type
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

// Video data with enhanced structure - using videos with audio
const verticalVideos: VideoData[] = [
  {
    link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752492585/audio_final_video_720x1280_zdjw87.mp4",
    title: "A dragon's Tale",
    description: "How a dragon saved her throne.",
    resolution: "720p",
    dimension: "720x1280",
    thumbnail:
      "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752492585/audio_final_video_720x1280_zdjw87.jpg",
    duration: "00:41",
    orientation: "vertical",
  },
  {
    link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752495703/orate-me-720x1280_eheshv.mp4",
    title: "Improve speaking skills",
    description: "Tips and tricks to enhance your speaking abilities.",
    resolution: "720p",
    dimension: "720x1280",
    thumbnail:
      "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752495703/orate-me-720x1280_eheshv.jpg",
    duration: "00:38",
    orientation: "vertical",
  },
];

const horizontalVideos: VideoData[] = [
  {
    link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752491953/audio_final_video_1280x720_bo1wna.mp4",
    title: "A dragon's Tale",
    description: "How a dragon saved her throne.",
    resolution: "720p",
    dimension: "1280x720",
    thumbnail:
      "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752491953/audio_final_video_1280x720_bo1wna.jpg",
    duration: "00:41",
    orientation: "horizontal",
  },
  {
    link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752495668/orateme_1280x720_kskkik.mp4",
    title: "Improve speaking skills",
    description: "Tips and tricks to enhance your speaking abilities.",
    resolution: "720p",
    dimension: "1280x720",
    thumbnail:
      "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752495668/orateme_1280x720_kskkik.jpg",
    duration: "00:38",
    orientation: "horizontal",
  },
];

// Enhanced Interactive Video Carousel Component
const VideoCarousel = ({
  videos,
  orientation,
}: {
  videos: VideoData[];
  orientation: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setPlayingVideo(null); // Stop playing when switching
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setPlayingVideo(null); // Stop playing when switching
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const switchToVideo = (videoIndex: number) => {
    if (isTransitioning || videoIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(videoIndex);
    setPlayingVideo(null);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextVideoInModal = () => {
    if (!selectedVideo) return;
    const currentVideoIndex = videos.findIndex(
      (v) => v.title === selectedVideo.title
    );
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
  };

  const prevVideoInModal = () => {
    if (!selectedVideo) return;
    const currentVideoIndex = videos.findIndex(
      (v) => v.title === selectedVideo.title
    );
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[prevIndex]);
  };

  const getVisibleVideos = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex - 1 + i + videos.length) % videos.length;
      result.push({ ...videos[index], displayIndex: i });
    }
    return result;
  };

  const handleVideoClick = (video: VideoData, isCenter: boolean) => {
    if (isCenter) {
      // If center video, toggle play/pause
      if (playingVideo === video.title) {
        setPlayingVideo(null);
      } else {
        setPlayingVideo(video.title);
        // Add a small delay to ensure the video element is created
        setTimeout(() => {
          const videoElement = document.querySelector(
            `video[src="${video.link}"]`
          ) as HTMLVideoElement;
          if (videoElement) {
            videoElement.muted = false;
            videoElement.volume = 1.0;
            videoElement.play().catch(() => {
              // If audio autoplay fails, try muted first then unmute
              videoElement.muted = true;
              videoElement.play().then(() => {
                videoElement.muted = false;
              });
            });
          }
        }, 100);
      }
    } else {
      // If side video, make it center
      const videoIndex = videos.findIndex((v) => v.title === video.title);
      switchToVideo(videoIndex);
    }
  };

  const handleMouseEnter = (video: VideoData) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a delay before switching to avoid rapid transitions
    hoverTimeoutRef.current = setTimeout(() => {
      const videoIndex = videos.findIndex((v) => v.title === video.title);
      if (videoIndex !== currentIndex && !isTransitioning) {
        switchToVideo(videoIndex);
      }
    }, 200); // 200ms delay
  };

  const handleMouseLeave = () => {
    // Clear timeout when mouse leaves
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handlePlayIconClick = (video: VideoData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVideo(video);
    // Ensure modal video will have audio when opened
    setTimeout(() => {
      const modalVideo = document.querySelector(
        ".modal-video"
      ) as HTMLVideoElement;
      if (modalVideo) {
        modalVideo.muted = false;
        modalVideo.volume = 1.0;
      }
    }, 100);
  };

  return (
    <div className="relative">
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
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center gap-4 md:gap-6">
          {getVisibleVideos().map((video, index) => {
            const isCenter = index === 1;
            const isPlaying = playingVideo === video.title && isCenter;

            return (
              <motion.div
                key={`${video.title}-${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isTransitioning ? 0.3 : isCenter ? 1 : 0.6,
                  scale: isTransitioning ? 0.7 : isCenter ? 1 : 0.85,
                  y: isTransitioning ? 40 : isCenter ? 0 : 20,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative ${
                  isCenter ? "z-10" : "z-0"
                } cursor-pointer`}
                style={{
                  width:
                    orientation === "vertical"
                      ? isCenter
                        ? "min(350px, 90vw)"
                        : "min(280px, 25vw)"
                      : isCenter
                      ? "min(500px, 90vw)"
                      : "min(400px, 30vw)",
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
                      height:
                        orientation === "vertical"
                          ? isCenter
                            ? "min(500px, 80vh)"
                            : "min(400px, 60vh)"
                          : isCenter
                          ? "min(280px, 50vh)"
                          : "min(225px, 40vh)",
                      aspectRatio: orientation === "vertical" ? "9/16" : "16/9",
                    }}
                  >
                    {isPlaying ? (
                      <video
                        src={video.link}
                        autoPlay
                        muted={false}
                        loop
                        controls
                        className="w-full h-full object-cover"
                        onError={() => setPlayingVideo(null)}
                        onLoadedData={(e) => {
                          const video = e.target as HTMLVideoElement;
                          video.volume = 1.0;
                          video.muted = false;

                          console.log(
                            "Video loaded with volume:",
                            video.volume,
                            "muted:",
                            video.muted
                          );
                          console.log("Video src:", video.src);

                          // Try to play with audio, fallback to muted if needed
                          video
                            .play()
                            .then(() => {
                              console.log(
                                "Video playing successfully with audio"
                              );
                            })
                            .catch((error) => {
                              console.log(
                                "Autoplay with audio failed:",
                                error.message
                              );
                              video.muted = true;
                              video.play().then(() => {
                                console.log(
                                  "Playing muted, will try to unmute in 1 second"
                                );
                                // After starting playback, try to unmute
                                setTimeout(() => {
                                  video.muted = false;
                                  video.volume = 1.0;
                                  console.log("Attempted to unmute video");
                                }, 1000);
                              });
                            });
                        }}
                        onLoadedMetadata={(e) => {
                          const video = e.target as HTMLVideoElement;
                          console.log(
                            "Video metadata loaded - duration:",
                            video.duration
                          );
                        }}
                        onVolumeChange={(e) => {
                          const video = e.target as HTMLVideoElement;
                          console.log(
                            "Volume changed:",
                            video.volume,
                            "muted:",
                            video.muted
                          );
                        }}
                      />
                    ) : (
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {!isPlaying && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        {isCenter && (
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300"
                            onClick={(e) => handlePlayIconClick(video, e)}
                          >
                            <Play className="h-8 w-8 text-white" />
                          </motion.div>
                        )}
                      </div>
                    )}

                    {isPlaying && isCenter && (
                      <div className="absolute top-4 right-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-black/50 backdrop-blur-sm rounded-full p-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayIconClick(video, e);
                          }}
                        >
                          <Play className="h-4 w-4 text-white" />
                        </motion.div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <Badge className="bg-purple-500/80 text-white backdrop-blur-sm">
                        {video.resolution}
                      </Badge>
                      <Badge className="bg-black/70 text-white backdrop-blur-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-semibold text-lg mb-1 truncate">
                        {video.title}
                      </h4>
                      <p className="text-slate-300 text-sm truncate">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => switchToVideo(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-400 w-8" : "bg-slate-600"
            } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        ))}
      </div>

      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-900 rounded-xl p-6 w-full max-w-5xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-slate-400">{selectedVideo.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevVideoInModal}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextVideoInModal}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
                <video
                  key={selectedVideo.link} // This ensures video reloads when video changes
                  src={selectedVideo.link}
                  controls
                  autoPlay
                  muted={false}
                  className="w-full h-full object-contain modal-video"
                  style={{ maxHeight: "70vh" }}
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.volume = 1.0;
                    video.muted = false;
                    console.log(
                      "Modal video loaded with volume:",
                      video.volume,
                      "muted:",
                      video.muted
                    );
                  }}
                  onPlay={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.muted = false;
                    video.volume = 1.0;
                    console.log(
                      "Modal video playing with volume:",
                      video.volume,
                      "muted:",
                      video.muted
                    );
                  }}
                  onVolumeChange={(e) => {
                    const video = e.target as HTMLVideoElement;
                    console.log(
                      "Modal video volume changed:",
                      video.volume,
                      "muted:",
                      video.muted
                    );
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Resolution: {selectedVideo.dimension}</span>
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>Format: {selectedVideo.orientation}</span>
                </div>
                <div className="text-sm text-slate-500">
                  {videos.findIndex((v) => v.title === selectedVideo.title) + 1}{" "}
                  of {videos.length}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Features Data
const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast Rendering",
    description:
      "Generate professional videos in minutes, not hours. Our optimized pipeline delivers results 10x faster than traditional methods.",
    highlight: "10x Faster",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "All Resolutions Supported",
    description:
      "From 480p to 4K, landscape to portrait. Perfect for Instagram Reels, YouTube Shorts, TikTok, and traditional platforms.",
    highlight: "480p - 4K",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Complete AI Automation",
    description:
      "From story input to final video - AI handles script validation, voice generation, image creation, and video assembly.",
    highlight: "100% Automated",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "15+ Text Animations",
    description:
      "Typewriter, fade, bounce, glitch, neon flicker - professional animations that make your content stand out.",
    highlight: "15+ Effects",
  },
  {
    icon: <Mic className="h-6 w-6" />,
    title: "Natural Voice Generation",
    description:
      "AI-powered text-to-speech with natural intonation and perfect lip-sync avatar integration.",
    highlight: "Human-like",
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Smart Visual Creation",
    description:
      "Context-aware image generation that perfectly matches your story narrative and maintains visual consistency.",
    highlight: "AI-Generated",
  },
];

// Enhanced Stats Data
const stats = [
  {
    number: "10x",
    label: "Faster Rendering",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    number: "15+",
    label: "Animation Types",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    number: "4K",
    label: "Max Resolution",
    icon: <Monitor className="h-5 w-5" />,
  },
  { number: "100%", label: "Automated", icon: <Bot className="h-5 w-5" /> },
];

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [animatedText, setAnimatedText] = useState("");

  // Refs for smooth scrolling
  const featuresRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLElement>(null);
  const waitlistRef = useRef<HTMLElement>(null);

  const fullText = "Transform Stories into Viral Videos";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setAnimatedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const waitlistEntry: WaitlistEntry = {
        name,
        email,
        ...(company && { extra: company }),
      };

      const response = await addToWaitlist(waitlistEntry);

      if (response.success) {
        setIsSubmitted(true);
      } else {
        setError(
          response.message || "Failed to join waitlist. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Waitlist submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Story Stream
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection(videosRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection(waitlistRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Waitlist
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-6 py-2">
                <Sparkles className="h-5 w-5 mr-2" />
                AI-Powered Video Automation Platform
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                {animatedText}
              </span>
              <span className="animate-pulse">|</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The first AI platform that automatically converts startup stories
              into polished Instagram Reels.{" "}
              <span className="text-purple-300 font-semibold">
                From script to final video in minutes, not hours.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection(waitlistRef)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold shadow-2xl shadow-purple-500/25"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection(videosRef)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-10 py-4 text-lg bg-transparent backdrop-blur-sm"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                >
                  <div className="text-purple-400 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-24 bg-slate-900/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Why Choose Story Stream?
            </h2>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
              Built for creators who demand{" "}
              <span className="text-purple-300 font-semibold">
                speed, quality, and automation
              </span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-500 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-110 transform">
                        {feature.icon}
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-purple-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Video Preview Section */}
      <section ref={videosRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              See It In Action
            </h2>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
              Real videos created with Story Stream Automation -{" "}
              <span className="text-purple-300 font-semibold">
                professional quality in minutes
              </span>
            </p>
          </motion.div>

          <Tabs defaultValue="vertical" className="w-full relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12 relative z-10"
            >
              <TabsList className="bg-slate-800/50 border border-slate-700 p-2 relative z-20">
                <TabsTrigger
                  value="vertical"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-8 py-3 text-lg transition-all duration-300 cursor-pointer relative z-30"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Vertical Videos
                </TabsTrigger>
                <TabsTrigger
                  value="horizontal"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-8 py-3 text-lg transition-all duration-300 cursor-pointer relative z-30"
                >
                  <Monitor className="h-5 w-5 mr-2" />
                  Horizontal Videos
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="vertical" className="mt-0 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <VideoCarousel
                  key="vertical-carousel"
                  videos={verticalVideos}
                  orientation="vertical"
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="horizontal" className="mt-0 relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <VideoCarousel
                  key="horizontal-carousel"
                  videos={horizontalVideos}
                  orientation="horizontal"
                />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              How It Works
            </h2>
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto">
              From story to viral video in{" "}
              <span className="text-purple-300 font-semibold">
                4 simple steps
              </span>
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Input Your Story",
                  description:
                    "Simply paste your startup story or let our AI scrape content from Reddit and other sources.",
                  icon: <Video className="h-8 w-8" />,
                },
                {
                  step: "02",
                  title: "AI Processing",
                  description:
                    "Our AI validates the script, generates natural voice narration, and creates contextual images.",
                  icon: <Bot className="h-8 w-8" />,
                },
                {
                  step: "03",
                  title: "Video Assembly",
                  description:
                    "Advanced video editor assembles timeline with media, transitions, and synchronized subtitles.",
                  icon: <Palette className="h-8 w-8" />,
                },
                {
                  step: "04",
                  title: "Export & Share",
                  description:
                    "Get your polished video in any resolution and format, ready for Instagram, TikTok, or YouTube.",
                  icon: <Download className="h-8 w-8" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 group-hover:bg-slate-800/50 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-purple-400">{item.icon}</div>
                      <h3 className="text-3xl font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Waitlist Section */}
      <section ref={waitlistRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Join the Waitlist
            </h2>
            <p className="text-2xl text-slate-300 mb-12">
              Be among the first to{" "}
              <span className="text-purple-300 font-semibold">
                transform your stories into viral videos
              </span>
            </p>

            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-10 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
                      >
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <span className="text-red-300">{error}</span>
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="text"
                          placeholder="Company (Optional)"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          disabled={isLoading}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </motion.div>
                    </div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        type="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-16 text-xl font-semibold shadow-2xl shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Joining Waitlist...
                          </>
                        ) : (
                          <>
                            <Users className="mr-3 h-6 w-6" />
                            Join Waitlist - Get Early Access
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-green-900/20 border-green-500/30 p-10 backdrop-blur-sm">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-semibold text-white mb-4">
                      You're on the list!
                    </h3>
                    <p className="text-green-300 text-xl">
                      We'll notify you as soon as Story Stream Automation is
                      ready.
                    </p>
                    <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Early access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>Special pricing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>No spam</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Video className="h-10 w-10 text-purple-400" />
              <span className="text-3xl font-bold text-white">
                Story Stream
              </span>
            </div>
            <p className="text-slate-400 mb-8 text-lg">
              Transform your stories into viral videos with AI automation
            </p>
            <div className="flex justify-center gap-8 text-slate-400">
              <a
                href="#"
                className="hover:text-white transition-colors text-lg"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-lg"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-lg"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
