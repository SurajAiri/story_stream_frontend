import React, { useState, useEffect } from "react";
import {
  Play,
  Zap,
  Video,
  Image,
  Mic,
  Type,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  Settings,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  const fullText = "Transform Stories into Stunning Videos";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
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
        "Context-aware visual content creation. AI generates images that perfectly match your story narrative.",
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
            <button
              onClick={() =>
                document
                  .getElementById("waitlist")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div
        id="demo"
        className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-gray-300">
              Watch how stories transform into engaging videos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Preview 1 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
                  <Play className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    LIVE
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Landscape Format (1920x1080)
                </h3>
                <p className="text-gray-400">
                  Perfect for YouTube, LinkedIn, and desktop viewing
                </p>
              </div>
            </div>

            {/* Video Preview 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="aspect-[9/16] bg-gray-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden mx-auto max-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10"></div>
                  <Play className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    LIVE
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Vertical Format (720x1280)
                </h3>
                <p className="text-gray-400">
                  Optimized for Instagram Stories, TikTok, and Reels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
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
              </div>
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
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/20">
            <h2 className="text-4xl font-bold mb-4">Join the Waitlist</h2>
            <p className="text-xl text-gray-300 mb-8">
              Be among the first to experience the future of video creation
            </p>

            {!isSubmitted ? (
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Join Waitlist
                </button>
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
          </div>
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
