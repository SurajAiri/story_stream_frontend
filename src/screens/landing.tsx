import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Zap,
  Video,
  Image,
  Mic,
  Type,
  ArrowRight,
  Sparkles,
  Clock,
  Settings,
  CheckCircle,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Monitor,
  Smartphone,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Video {
  link: string;
  title: string;
  description: string;
  resolution: string;
  dimension: string;
  thumbnail: string;
  duration: string;
  orientation: "vertical" | "horizontal";
}

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [horizontalScrollIndex, setHorizontalScrollIndex] = useState(0);
  const [verticalScrollIndex, setVerticalScrollIndex] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const videoPreviewData: Video[] = [
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.mp4",
      title: "Startup Success Story",
      description: "A founder's journey from idea to IPO",
      resolution: "720p",
      dimension: "720x1280",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.jpg",
      duration: "2:15",
      orientation: "vertical",
    },
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.mp4",
      title: "Tech Innovation Tale",
      description: "How AI changed everything",
      resolution: "1080p",
      dimension: "1080x1920",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.jpg",
      duration: "1:45",
      orientation: "vertical",
    },
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.mp4",
      title: "Entrepreneur's Challenge",
      description: "Overcoming the impossible",
      resolution: "480p",
      dimension: "480x854",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477166/dragon_vert_fq5fx5.jpg",
      duration: "3:20",
      orientation: "vertical",
    },
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.mp4",
      title: "Business Transformation",
      description: "Digital revolution case study",
      resolution: "1080p",
      dimension: "1920x1080",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.jpg",
      duration: "2:30",
      orientation: "horizontal",
    },
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.mp4",
      title: "Market Disruption",
      description: "How one idea changed an industry",
      resolution: "720p",
      dimension: "1280x720",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.jpg",
      duration: "1:55",
      orientation: "horizontal",
    },
    {
      link: "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.mp4",
      title: "Leadership Journey",
      description: "From employee to CEO",
      resolution: "480p",
      dimension: "854x480",
      thumbnail:
        "https://res.cloudinary.com/dlzdj6k6u/video/upload/v1752477167/dragon_horiz_lr9qc2.jpg",
      duration: "4:10",
      orientation: "horizontal",
    },
  ];

  const fullText = "Transform Stories into Stunning Videos";

  // Separate videos by orientation
  const horizontalVideos = videoPreviewData.filter(
    (video) => video.orientation === "horizontal"
  );
  const verticalVideos = videoPreviewData.filter(
    (video) => video.orientation === "vertical"
  );

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

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const scrollCarousel = (
    direction: "left" | "right",
    orientation: "horizontal" | "vertical"
  ) => {
    const videos =
      orientation === "horizontal" ? horizontalVideos : verticalVideos;
    const currentIndex =
      orientation === "horizontal"
        ? horizontalScrollIndex
        : verticalScrollIndex;
    const setIndex =
      orientation === "horizontal"
        ? setHorizontalScrollIndex
        : setVerticalScrollIndex;

    if (direction === "left") {
      setIndex(Math.max(0, currentIndex - 1));
    } else {
      setIndex(Math.min(videos.length - 3, currentIndex + 1));
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
      console.log("Submitted:", { name, email });
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast Rendering",
      description:
        "Generate professional videos in minutes, not hours. Our optimized pipeline delivers speed without compromising quality.",
      highlight: "90% faster than traditional tools",
    },
    {
      icon: <Video className="w-8 h-8 text-blue-500" />,
      title: "Multiple Resolutions",
      description:
        "Support for 1080p, 720p, 480p in both landscape and vertical formats. Perfect for all social media platforms.",
      highlight: "All formats supported",
    },
    {
      icon: <Type className="w-8 h-8 text-purple-500" />,
      title: "15+ Text Animations",
      description:
        "From typewriter effects to glitch animations. Create engaging content with professional-grade text effects.",
      highlight: "Professional animations",
    },
    {
      icon: <Mic className="w-8 h-8 text-green-500" />,
      title: "AI Voice Generation",
      description:
        "Natural speech synthesis with precise timestamp control. Multiple voice options for different storytelling styles.",
      highlight: "Natural AI voices",
    },
    {
      icon: <Image className="w-8 h-8 text-pink-500" />,
      title: "Smart Image Generation",
      description:
        "Context-aware image creation that matches your story's mood and theme. Every frame tells your story perfectly.",
      highlight: "Context-aware visuals",
    },
    {
      icon: <Settings className="w-8 h-8 text-indigo-500" />,
      title: "Complete Automation",
      description:
        "From script to final video with zero manual intervention. Our pipeline handles every step of video production.",
      highlight: "Full automation",
    },
  ];

  const stats = [
    { number: "90%", label: "Faster Rendering" },
    { number: "15+", label: "Animation Types" },
    { number: "4", label: "Resolution Options" },
    { number: "100%", label: "Automated Pipeline" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
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
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                {animatedText}
              </span>
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-powered video creation platform that transforms text-based
              stories into
              <span className="text-purple-400 font-semibold">
                {" "}
                polished video content
              </span>{" "}
              in minutes
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() =>
                document
                  .getElementById("waitlist")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div
        id="demo"
        className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Experience the Magic</h2>
            <p className="text-xl text-gray-300">
              Discover how your stories come to life with stunning visuals
            </p>
          </div>

          {/* Landscape Videos Carousel */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Monitor className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold">Landscape Videos</h3>
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                  Perfect for YouTube, presentations
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCarousel("left", "horizontal")}
                  disabled={horizontalScrollIndex === 0}
                  className="bg-gray-800/50 text-white hover:bg-gray-700/50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCarousel("right", "horizontal")}
                  disabled={
                    horizontalScrollIndex >= horizontalVideos.length - 3
                  }
                  className="bg-gray-800/50 text-white hover:bg-gray-700/50 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex space-x-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${horizontalScrollIndex * 33.333}%)`,
                }}
              >
                {horizontalVideos.map((video, index) => (
                  <div
                    key={index}
                    className="flex-none w-full md:w-1/2 lg:w-1/3"
                  >
                    <Card className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                        {/* Play Button */}
                        <Button
                          onClick={() => handleVideoSelect(video)}
                          className="absolute inset-0 m-auto w-16 h-16 bg-purple-600/90 hover:bg-purple-500 text-white rounded-full border-2 border-white/20 shadow-lg transform group-hover:scale-110 transition-all duration-300"
                        >
                          <Play className="w-6 h-6 ml-1" />
                        </Button>

                        {/* Duration Badge */}
                        <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>

                        {/* Resolution Badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
                          {video.resolution}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h4 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                          {video.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{video.dimension}</span>
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Ready</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical Videos Carousel */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-pink-400" />
                <h3 className="text-2xl font-bold">Vertical Videos</h3>
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                  Perfect for Instagram, TikTok, Stories
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCarousel("left", "vertical")}
                  disabled={verticalScrollIndex === 0}
                  className="bg-gray-800/50 text-white hover:bg-gray-700/50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCarousel("right", "vertical")}
                  disabled={verticalScrollIndex >= verticalVideos.length - 4}
                  className="bg-gray-800/50 text-white hover:bg-gray-700/50 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex space-x-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${verticalScrollIndex * 25}%)`,
                }}
              >
                {verticalVideos.map((video, index) => (
                  <div key={index} className="flex-none w-48 md:w-52">
                    <Card className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-pink-500/20 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                      <div className="relative aspect-[9/16]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                        {/* Play Button */}
                        <Button
                          onClick={() => handleVideoSelect(video)}
                          className="absolute inset-0 m-auto w-12 h-12 bg-pink-600/90 hover:bg-pink-500 text-white rounded-full border-2 border-white/20 shadow-lg transform group-hover:scale-110 transition-all duration-300"
                        >
                          <Play className="w-4 h-4 ml-0.5" />
                        </Button>

                        {/* Duration Badge */}
                        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>

                        {/* Resolution Badge */}
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs px-2 py-1 rounded font-semibold">
                          {video.resolution}
                        </div>
                      </div>

                      <CardContent className="p-3">
                        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                          {video.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{video.dimension}</span>
                          <span className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>Ready</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Format Support Banner */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-xl px-8 py-4 border border-purple-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">1920x1080 HD</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">1280x720 HD</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">720x1280 Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">854x480 SD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl max-h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {selectedVideo.orientation === "horizontal" ? (
                    <Monitor className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-pink-400" />
                  )}
                  <h3 className="text-xl font-semibold text-white">
                    {selectedVideo.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-3 py-1 rounded font-semibold">
                    {selectedVideo.resolution}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {selectedVideo.dimension}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center p-6">
                <div
                  className={`relative ${
                    selectedVideo.orientation === "vertical"
                      ? "w-80 aspect-[9/16]"
                      : "w-full max-w-4xl aspect-video"
                  } rounded-lg overflow-hidden shadow-2xl`}
                >
                  <video
                    ref={modalVideoRef}
                    src={selectedVideo.link}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Video Info Sidebar */}
              <div className="w-full lg:w-80 p-6 bg-gray-800/50">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {selectedVideo.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Duration</span>
                      <span className="text-white text-sm font-medium">
                        {selectedVideo.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Resolution</span>
                      <span className="text-white text-sm font-medium">
                        {selectedVideo.resolution}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Dimensions</span>
                      <span className="text-white text-sm font-medium">
                        {selectedVideo.dimension}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Format</span>
                      <span className="text-white text-sm font-medium capitalize">
                        {selectedVideo.orientation}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>AI Generated • High Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300">
              Everything you need to create professional videos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg group-hover:from-purple-600/20 group-hover:to-blue-600/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <div className="text-sm text-purple-400 font-medium">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Process</h2>
            <p className="text-xl text-gray-300">
              From story to video in just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Your Story",
                description:
                  "Paste your text story or script. Our AI will validate and optimize it for video creation.",
              },
              {
                step: "02",
                title: "AI Processing",
                description:
                  "Our system generates audio, creates visuals, and prepares timeline automatically.",
              },
              {
                step: "03",
                title: "Export Video",
                description:
                  "Download your polished video in any format. Share directly to social media platforms.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <div id="waitlist" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/20 rounded-2xl p-12">
            <CardContent>
              <h2 className="text-4xl font-bold mb-4">Join the Waitlist</h2>
              <p className="text-xl text-gray-300 mb-8">
                Be among the first to experience the future of video creation
              </p>

              {!isSubmitted ? (
                <div className="max-w-md mx-auto space-y-6">
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
                  >
                    Join Waitlist
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-2xl font-semibold text-green-400">
                    You're on the list!
                  </h3>
                  <p className="text-gray-300">
                    We'll notify you when Story Stream Automation is ready.
                  </p>
                </div>
              )}

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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Story Stream Automation
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Story Stream Automation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
