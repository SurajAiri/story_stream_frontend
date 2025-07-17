import React, { useState, useCallback, memo, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Clock,
  Shield,
  Play,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "technical" | "pricing" | "support" | "demo";
  icon?: React.ReactNode;
}

interface FAQSectionProps {
  className?: string;
  onJoinWaitlist?: () => void;
  onWatchDemo?: () => void;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-story-stream",
    question: "What exactly is Story Stream and how does it work?",
    answer:
      "Story Stream is an AI-powered video creation platform that transforms text-based stories into polished, professional videos. Simply input your story or content, and our AI automatically generates voiceovers, creates relevant visuals, adds animations, and produces a final video ready for social media platforms.",
    category: "general",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "video-quality",
    question: "What video quality and formats can I expect?",
    answer:
      "All videos are produced in HD quality (1280x720) or higher, with support for Full HD (1920x1080). We generate videos optimized for Instagram Reels, TikTok, YouTube Shorts (vertical 9:16), and traditional landscape format (16:9) for YouTube and other platforms.",
    category: "technical",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "processing-time",
    question: "How long does it take to create a video?",
    answer:
      "Most videos are generated within 2-5 minutes depending on length and complexity. Short-form content (15-60 seconds) typically processes in under 2 minutes, while longer content (up to 10 minutes) may take 3-5 minutes.",
    category: "technical",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "content-types",
    question: "What types of content work best with Story Stream?",
    answer:
      "Story Stream works excellently with startup stories, business narratives, educational content, product launches, customer testimonials, how-to guides, and any text-based content that can be transformed into engaging video format.",
    category: "general",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "voice-customization",
    question: "Can I customize the voice and visual style?",
    answer:
      "Yes! You can choose from multiple AI voice options with different tones and accents. Visual customization includes selecting color schemes, text animation styles (typewriter, fade, bounce, glitch), and transition effects to match your brand identity.",
    category: "technical",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "content-ownership",
    question: "Do I own the rights to my generated videos?",
    answer:
      "Absolutely! You retain full ownership and commercial rights to all videos created using Story Stream. You can use them across any platform, modify them, or use them for commercial purposes without any restrictions.",
    category: "general",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "video-length-limits",
    question: "Are there any limits on video length?",
    answer:
      "Videos can range from 15 seconds to 10 minutes. We optimize for social media best practices: 15-60 seconds for Instagram Reels and TikTok, 60 seconds to 3 minutes for YouTube Shorts, and up to 10 minutes for longer-form content.",
    category: "technical",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "ai-accuracy",
    question: "How accurate is the AI in understanding my content?",
    answer:
      "Our AI uses advanced language models to understand context, tone, and narrative structure. It automatically validates your content, suggests improvements, and ensures the final video maintains your original message while optimizing for engagement.",
    category: "technical",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "bulk-processing",
    question: "Can I create multiple videos at once?",
    answer:
      "Yes! Our platform supports batch processing. You can upload multiple stories or content pieces and our AI will process them simultaneously, generating a complete video library efficiently - perfect for content creators and marketing teams.",
    category: "technical",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "pricing-plans",
    question: "What are your pricing plans?",
    answer:
      "We offer flexible pricing tiers including a free trial, starter plan for individual creators, and professional plans for teams and businesses. Early waitlist members receive special pricing and priority access. Full pricing details will be shared upon launch.",
    category: "pricing",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "platform-integration",
    question: "Does it integrate with social media platforms?",
    answer:
      "Currently, you download videos in platform-optimized formats. We are developing direct integrations with Instagram, TikTok, YouTube, and LinkedIn for seamless publishing. Waitlist members will get early access to these features.",
    category: "general",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "content-guidelines",
    question: "Are there any content restrictions or guidelines?",
    answer:
      "We maintain standard content guidelines prohibiting harmful, offensive, or copyrighted material. All content should be original or properly licensed. Our AI also helps ensure your content follows platform-specific best practices for maximum engagement.",
    category: "general",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "editing-capabilities",
    question: "Can I edit or modify the generated videos?",
    answer:
      "Currently, our AI creates polished videos automatically with the settings you provide. While editing features aren't available yet, we're actively considering adding customization options for text, timing, and visual elements based on user feedback. If this is something you'd like to see, let us know!",
    category: "technical",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "launch-timeline",
    question: "When will Story Stream be available?",
    answer:
      "We are currently in final development and testing phases. Waitlist members will receive early access in the coming weeks, with full public launch planned shortly after. Join our waitlist to be among the first to experience Story Stream.",
    category: "general",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "sample-video-timeline",
    question: "How long does it take to get my free sample video and why?",
    answer:
      "Sample videos typically take 1–2 days to process. We're currently running our AI systems locally as we're still in the testing phase and haven’t yet scaled to full cloud deployment. This allows us to keep development agile, experiment faster, and maintain tight control over quality. While this results in slightly longer turnaround times, it ensures your content is handled securely and thoughtfully. We're bootstrapping for now, and focusing on building something that truly works before scaling up.",
    category: "demo",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "privacy-and-content-sharing",
    question: "What content will be shared and what stays private?",
    answer:
      "Your email address and personal details are never shared and remain completely private. However, your final video (with your name/title) may be showcased as a demo to help others see our platform's capabilities. We don't process NSFW, offensive, or inappropriate content - these submissions won't receive a response. You can request to have your video removed from our showcase at any time by emailing us.",
    category: "demo",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    id: "video-format-support",
    question: "Do you support horizontal videos or just vertical?",
    answer:
      "Currently, we primarily focus on vertical videos (9:16 aspect ratio) optimized for Instagram Reels, TikTok, and YouTube Shorts. However, we are actively developing horizontal video support (16:9) for YouTube and other platforms. This feature will be available soon after launch.",
    category: "demo",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "commercial-rights-credits",
    question:
      "Can I use the videos commercially? Do I need to credit Story Stream?",
    answer:
      "Yes! You have full commercial rights to use your generated videos for business purposes, marketing, sales, or any commercial application. While not required, we'd appreciate a simple credit mention (like 'Video created with Story Stream') to help others discover our platform. This helps us grow while you grow your business!",
    category: "demo",
    icon: <Shield className="h-4 w-4" />,
  },
];

const FAQItem = memo(
  ({
    faq,
    isOpen,
    onToggle,
  }: {
    faq: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-purple-400 flex-shrink-0">{faq.icon}</div>
            <h3 className="text-white font-medium text-sm md:text-base leading-relaxed">
              {faq.question}
            </h3>
          </div>
          <div className="text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 transform rotate-0" />
            ) : (
              <ChevronDown className="h-5 w-5 transform rotate-0" />
            )}
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="pl-7 border-l-2 border-purple-500/20">
            <p className="text-slate-300 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
);

FAQItem.displayName = "FAQItem";

export const FAQSection: React.FC<FAQSectionProps> = memo(
  ({ className = "", onJoinWaitlist, onWatchDemo }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const toggleItem = useCallback((id: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }, []);

    const filteredFAQs = useMemo(() => {
      if (activeCategory === "all") return faqData;
      return faqData.filter((faq) => faq.category === activeCategory);
    }, [activeCategory]);

    const categories = [
      { id: "all", label: "All Questions", count: faqData.length },
      {
        id: "general",
        label: "General",
        count: faqData.filter((f) => f.category === "general").length,
      },
      {
        id: "technical",
        label: "Technical",
        count: faqData.filter((f) => f.category === "technical").length,
      },
      {
        id: "pricing",
        label: "Pricing",
        count: faqData.filter((f) => f.category === "pricing").length,
      },
      {
        id: "demo",
        label: "Demo & Samples",
        count: faqData.filter((f) => f.category === "demo").length,
      },
    ];

    return (
      <div className={`relative ${className}`}>
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about creating AI-powered videos with
            Story Stream
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-purple-500 text-white"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFAQs.map((faq: FAQItem, index: number) => (
            <div
              key={faq.id}
              className="opacity-0 translate-y-5 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <FAQItem
                faq={faq}
                isOpen={openItems.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4">
              Ready to transform your stories into viral videos?
            </h3>
            <p className="text-slate-400 mb-6">
              Join thousands of creators already using AI to streamline their
              video production.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onJoinWaitlist}
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Join Waitlist
              </button>
              <button
                onClick={onWatchDemo}
                className="bg-slate-800/50 hover:bg-slate-800/70 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 border border-slate-700 flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FAQSection.displayName = "FAQSection";
