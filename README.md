# 🌸 An Interactive Luxury Birthday Surprise For Mom

A complete, 4-page interactive luxury birthday website built with **pure HTML, CSS, and JavaScript**.

No Node.js or terminal required — simply double-click **`index.html`** in any web browser!

---

## 🎬 The 4-Stage Experience

1. **Page 1 — The Opening Envelope**
   * Centered ivory envelope with realistic layered paper and floating animation.
   * Burgundy wax heart seal.
   * Tap to unseal: The flap opens in 3D, the letter unfolds with a heartfelt greeting, and a *"Continue to your surprise →"* button appears.

2. **Page 2 — The Playful Gift Choice**
   * Heading: *"Mom, I made something special for you!"*
   * Two buttons:
     * **"I want my gift 🎁"** (Stable, prominent, easy to click).
     * **"I don't want my gift 🙈"** (Playfully dodges whenever her cursor or touch gets close, while **never** blocking the real gift button).
   * Accessible for keyboard & touch.

3. **Page 3 — The Luxury Birthday Cake**
   * Deep burgundy ambient scene with warm champagne-gold lighting and spotlight.
   * Multi-tier royal birthday cake with realistic candles.
   * Click *"Light up the candles ✨"*:
     * Flames ignite and glow.
     * The ambient light warms.
     * The cake begins a smooth, controlled accelerating rotation (`rotateY`).
     * A tasteful golden blur transition seamlessly carries her into the final page.

4. **Page 4 — The Animated 3D Photo Gallery**
   * Heading: *"Every picture holds a little piece of my heart."*
   * A 3D horizontal photo gallery that glides smoothly from left to right.
   * Each photo card turns gently along its vertical axis (`rotateY`).
   * Clicking any card opens a full **Lightbox modal** with caption and date.
   * Interactive controls: **Pause/Resume**, **Prev**, and **Next**.
   * Concludes with: *"Happy Birthday, Mom ❤️"* and a *"🔄 Experience It Again"* replay button.

---

## ⚙️ How to Personalize Everything in `config.js`

Open **`config.js`** in any text editor (Notepad, VS Code):
- Change her name and sender nickname.
- Edit the letter preview on Page 1.
- Customize the playful teasing messages on Page 2.
- Customize captions, dates, and alt text for each photo on Page 4.

---

## 📸 How to Add Mom's Real Photos

Create an `images/` folder next to `index.html` and drop your photos named:
- `photo-1.jpg`
- `photo-2.jpg`
- `photo-3.jpg`
- `photo-4.jpg`
- `photo-5.jpg`
- `photo-6.jpg`
- `hero.jpg`
- `final.jpg`

> **Note:** If any photo is missing, the website displays an elegant floral museum placeholder automatically — zero broken image icons!

---

## 🌐 How to Publish Online (Free & Instant)

To send her a live link on her phone:
1. Go to **[Netlify Drop](https://app.netlify.com/drop)**.
2. Drag and drop your **`mom birthday`** folder into the browser window.
3. In 5 seconds, Netlify will give you a live shareable URL (e.g., `https://mom-birthday-surprise.netlify.app`) that you can text to her!
