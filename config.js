/**
 * ============================================================
 *  MOM'S LUXURY BIRTHDAY SURPRISE — CONFIGURATION
 * ============================================================
 *  Configured with your 6 personal photos and birthday audio!
 * ============================================================
 */

const birthdayConfig = {
  // ── General Info ──────────────────────────────────────────
  momName: "Mom",
  senderName: "With All My Love",

  // ── Background Audio ──────────────────────────────────────
  audioFile: "sub_clair-happy-birthday-592177.mp3",

  // ── Page 1: Opening Envelope ──────────────────────────────
  envelope: {
    badge: "A little surprise for you, Mom 💌",
    instruction: "Tap to open your letter",
    greetingTitle: "To the Most Wonderful Mom",
    letterPreview: 
      "Today is all about celebrating the incredible woman you are. " +
      "I put together a little journey filled with memories, laughter, and love just for you.",
    continueButton: "Continue to your surprise →"
  },

  // ── Page 2: Playful Gift Choice ───────────────────────────
  giftChoice: {
    heading: "Mom, I made something special for you!",
    subtitle: "Please make your choice below (Be careful what you pick! 😜)",
    acceptBtn: "I want my gift 🎁",
    refuseBtn: "I don't want my gift 🙈",
    teaseMessages: [
      "Are you sure? 🙈",
      "Nope, can't catch me! 🏃‍♀️💨",
      "Mom, you HAVE to accept this gift! ❤️",
      "Just give up and click the pink one! 😜",
      "You can't escape my love! 🥰",
      "Come on Mom, you deserve the world! 🎁"
    ]
  },

  // ── Page 3: Luxury Birthday Cake ──────────────────────────
  cakeScene: {
    heading: "Happy Birthday, Mom!",
    subtitle: "Make a wish in your heart...",
    lightButton: "Light up the candles ✨",
    lightingText: "Making your wish come true... ✨"
  },

  // ── Page 4: Animated Photo Gallery ────────────────────────
  gallery: {
    heading: "Every picture holds a little piece of my heart.",
    subtitle: "A journey through our favorite memories together.",
    
    // Configured with your 6 real photos
    photos: [
      {
        src: "WhatsApp Image 2026-10-19 at 9.54.30 PM.jpeg",
        caption: "Your radiant smile that lights up our world",
        date: "Cherished Moment",
        alt: "Beautiful photo of Mom"
      },
      {
        src: "WhatsApp Image 2026-10-19 at 9.55.09 PM.jpeg",
        caption: "All the warmth, love, and laughter you bring",
        date: "Priceless Memory",
        alt: "Mom smiling warmly"
      },
      {
        src: "WhatsApp Image 2026-10-19 at 9.56.50 PM.jpeg",
        caption: "The queen of our hearts, today and always",
        date: "Queen Mom",
        alt: "Memorable moment with Mom"
      },
      {
        src: "WhatsApp Image 2026-10-19 at 9.57.45 PM.jpeg",
        caption: "Every hug and quiet moment with you is a blessing",
        date: "Pure Warmth",
        alt: "Sweet memory with Mom"
      },
      {
        src: "WhatsApp Image 2026-10-19 at 9.59.06 PM.jpeg",
        caption: "Your strength and kindness guide me every day",
        date: "Always Grateful",
        alt: "Mom looking beautiful"
      },
      {
        src: "received_2297448677452112.jpeg",
        caption: "Forever grateful for everything you are to us",
        date: "Always & Forever",
        alt: "Cherished photo of Mom"
      }
    ],

    closingHeading: "Happy Birthday, Mom ❤️",
    closingMessage: "Whatever life brings, I hope you always know how deeply and endlessly loved you are.",
    signature: "Made with all my love, just for you."
  }
};

// Make config globally accessible
if (typeof window !== "undefined") {
  window.birthdayConfig = birthdayConfig;
}
