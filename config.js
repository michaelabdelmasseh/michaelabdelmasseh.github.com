/**
 * ============================================================
 *  MOM'S LUXURY BIRTHDAY SURPRISE — CONFIGURATION
 * ============================================================
 *  Edit this file to customize text, personal messages, and photos!
 * ============================================================
 */

const birthdayConfig = {
  // ── General Info ──────────────────────────────────────────
  momName: "Mom",               // e.g., "Mom", "Mama", "Sarah"
  senderName: "Your Child",     // e.g., "Your loving daughter", "Michael"

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
    
    // Replace these with your real photo files in public/images/ or images/
    // If a photo file is missing, an elegant placeholder displays automatically.
    photos: [
      {
        src: "images/photo-1.jpg",
        caption: "Your smile that brightens every room",
        date: "Cherished Memory",
        alt: "Mom smiling warmly"
      },
      {
        src: "images/photo-2.jpg",
        caption: "All the laughter we share together",
        date: "Family Moments",
        alt: "Laughing together with Mom"
      },
      {
        src: "images/photo-3.jpg",
        caption: "Your comforting hugs that make everything okay",
        date: "Pure Warmth",
        alt: "Warm embrace with Mom"
      },
      {
        src: "images/photo-4.jpg",
        caption: "Adventures and beautiful days out",
        date: "Sweet Times",
        alt: "Trip and adventure with Mom"
      },
      {
        src: "images/photo-5.jpg",
        caption: "Standing proudly by my side at every milestone",
        date: "Always There",
        alt: "Mom celebrating a milestone"
      },
      {
        src: "images/photo-6.jpg",
        caption: "Quiet mornings and heart-to-heart talks",
        date: "Priceless",
        alt: "Tea and conversation with Mom"
      },
      {
        src: "images/hero.jpg",
        caption: "The queen of our hearts, today and always",
        date: "Queen Mom",
        alt: "Portrait of Mom"
      },
      {
        src: "images/final.jpg",
        caption: "Forever grateful for everything you are",
        date: "Always & Forever",
        alt: "Mom always loved"
      }
    ],

    closingHeading: "Happy Birthday, Mom ❤️",
    closingMessage: "Whatever life brings, I hope you always know how deeply and endlessly loved you are.",
    signature: "Made with love, just for you."
  }
};

// Make config globally accessible
if (typeof window !== "undefined") {
  window.birthdayConfig = birthdayConfig;
}
