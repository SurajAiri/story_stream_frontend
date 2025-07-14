// Google Analytics utility functions

// TypeScript types for Google Analytics
interface GtagConfig {
  [key: string]: string | number | boolean | undefined;
}

interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: GtagConfig
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

// Track Google Analytics events
export const trackEvent = (eventName: string, parameters?: GtagEvent) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "engagement",
      event_label: "user_interaction",
      ...parameters,
    });
    console.log("Analytics event tracked:", eventName, parameters);
  } else {
    console.warn("Google Analytics not available");
  }
};

// Specific event tracking functions
export const trackWaitlistClick = (source?: string) => {
  trackEvent("join_waitlist_click", {
    event_category: "conversion",
    event_label: "waitlist_signup",
    source: source || "unknown",
    value: 1,
  });
};

export const trackVideoPlay = (videoTitle: string, videoType: string) => {
  trackEvent("video_play", {
    event_category: "media",
    event_label: "video_interaction",
    video_title: videoTitle,
    video_type: videoType,
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent("section_view", {
    event_category: "navigation",
    event_label: "section_scroll",
    section_name: sectionName,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent("external_link_click", {
    event_category: "outbound",
    event_label: "external_navigation",
    url: url,
    link_text: linkText,
  });
};
