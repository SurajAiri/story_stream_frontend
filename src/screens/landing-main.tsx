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
  Download,
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

// Import the FAQ section
import { FAQSection } from "@/components/FAQSection";

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

// Import optimized video carousel
import { OptimizedVideoCarousel } from "@/components/OptimizedVideoCarousel";

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
  const [script, setScript] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [animatedText, setAnimatedText] = useState("");

  // Refs for smooth scrolling
  const featuresRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
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
        ...(script && { extra: script }),
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
                onClick={() => scrollToSection(faqRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                FAQ
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
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8">
              See It In Action
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
              <div className="relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50"></div>

                <TabsList className="bg-slate-800/50 border border-slate-700 p-1 sm:p-2 relative z-20 backdrop-blur-sm shadow-2xl shadow-purple-500/10 rounded-xl hover:shadow-purple-500/20 transition-all duration-300">
                  <TabsTrigger
                    value="vertical"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 data-[state=active]:scale-105 px-3 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg transition-all duration-500 cursor-pointer relative z-30 rounded-lg hover:bg-slate-700/50 hover:scale-102 flex items-center gap-2 font-medium text-slate-300 hover:text-white group"
                  >
                    <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden xs:inline">Vertical Videos</span>
                    <span className="xs:hidden">Vertical</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="horizontal"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 data-[state=active]:scale-105 px-3 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg transition-all duration-500 cursor-pointer relative z-30 rounded-lg hover:bg-slate-700/50 hover:scale-102 flex items-center gap-2 font-medium text-slate-300 hover:text-white group"
                  >
                    <Monitor className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden xs:inline">Horizontal Videos</span>
                    <span className="xs:hidden">Horizontal</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </motion.div>

            <TabsContent value="vertical" className="mt-0 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <OptimizedVideoCarousel
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
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <OptimizedVideoCarousel
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
              Want to see your words come to life?{" "}
              <span className="text-purple-300 font-semibold">
                Try a free sample.
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
                          type="email"
                          placeholder="Your Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </motion.div>
                    </div>

                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <div className="space-y-2">
                        <textarea
                          placeholder="Your Script/Story (Optional - 150-600 characters for sample video)"
                          value={script}
                          onChange={(e) => setScript(e.target.value)}
                          disabled={isLoading}
                          rows={4}
                          maxLength={600}
                          className="w-full bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-4 resize-none border focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">
                            {script.length >= 150 ? (
                              <span className="text-green-400">
                                ✓ Ready for sample video
                              </span>
                            ) : script.length > 0 ? (
                              <span className="text-yellow-400">
                                Need {150 - script.length} more characters for
                                sample
                              </span>
                            ) : (
                              <span>
                                Add your script to get a personalized video demo
                              </span>
                            )}
                          </span>
                          <span className="text-slate-500">
                            {script.length}/600
                          </span>
                        </div>

                        {script.length >= 150 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3 text-xs text-slate-300"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-purple-400">✨</span>
                              <span>
                                By providing your script, you agree we may
                                showcase your video to help others see our
                                capabilities.
                                <span className="text-slate-400">
                                  {" "}
                                  Your email stays private.
                                </span>
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: isLoading ? 1 : 0.95 }}
                      className="mt-2"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className={`w-full h-16 text-xl font-semibold shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          script.length >= 150
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/25"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/25"
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            {script.length >= 150
                              ? "Creating Your Video..."
                              : "Joining Waitlist..."}
                          </>
                        ) : (
                          <>
                            {script.length >= 150 ? (
                              <>
                                <Zap className="mr-3 h-6 w-6" />
                                Get My Free Video Demo
                              </>
                            ) : (
                              <>
                                <Users className="mr-3 h-6 w-6" />
                                Join Waitlist - Get Early Access
                              </>
                            )}
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
                    <p className="text-green-300 text-xl mb-6">
                      {script.length >= 150
                        ? "We'll create your personalized video demo and send it to your email within 1-2 days."
                        : "We'll notify you as soon as Story Stream is ready for early access."}
                    </p>
                    {script.length >= 150 && (
                      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                        <p className="text-blue-300 text-sm">
                          <span className="font-semibold">
                            Processing Note:
                          </span>{" "}
                          Our AI system runs locally for security and quality
                          control. This means processing takes 1-2 days but
                          ensures your content gets personalized attention. We
                          appreciate your patience as we're bootstrapping and
                          don't have funds for cloud hosting yet!
                        </p>
                      </div>
                    )}
                    <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>
                          {script.length >= 150
                            ? "Free video demo"
                            : "Early access"}
                        </span>
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

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-24 bg-slate-900/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FAQSection
              onJoinWaitlist={() => scrollToSection(waitlistRef)}
              onWatchDemo={() => scrollToSection(videosRef)}
            />
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
