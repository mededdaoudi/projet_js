class InternGrindShowcase {
  constructor() {

    this.totalClicks = 0;
    this.coffeeCount = 0;
    this.currentLevel = 1;
    this.cps = 40;
    this.maxReached = false;
    this.sound = true;

    console.log("InternGrind starting...");

    document.addEventListener("DOMContentLoaded", () => {
      this.startEverything();
    });
  }

  startEverything() {
    this.navbarStuff();
    this.scrollFades();
    this.cardsLogic();
    this.startBtn();
    this.upgrades();
    this.statsClickThings();
    this.megaBtn();
    this.soundToggle();
    this.startCoffeeTimer();

    console.log("test ready");
  }

  // Navigation
  
  navbarStuff() {
    const nav = document.getElementById("navbar");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const y = window.scrollY;

      // hide nav when scrolling down
      if (y > lastScroll && y > 100) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }

      lastScroll = y;
    });

    const links = document.querySelectorAll(".nav-link");
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        const h = a.getAttribute("href");
        if (h && h.startsWith("#")) {
          e.preventDefault();
          const sec = document.querySelector(h);
          if (sec) sec.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    const sc = document.querySelector(".scroll-indicator");
    if (sc) {
      sc.addEventListener("click", () => {
        const f = document.querySelector("#features");
        if (f) f.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  // Scroll fade effects

  scrollFades() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0px)";
        }
      });
    });

    const els = document.querySelectorAll(".feature-card, .upgrade-item, .stat-card");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = "0.5s";
      obs.observe(el);
    });
  }

  // Features cards
  
  cardsLogic() {
    const cards = document.querySelectorAll(".feature-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => this.soundEffect("hover"));

      card.addEventListener("click", () => {
        this.soundEffect("click");
        this.sparkle(card);
      });
    });
  }
 
  // Start button

  startBtn() {
    const btn = document.getElementById("start-btn");
    if (!btn) return;

    btn.addEventListener("mouseenter", () => this.soundEffect("hover"));

    btn.addEventListener("click", () => {
      btn.textContent = "Chargement...";
      btn.style.background = "#4caf50";
      this.soundEffect("start");

      setTimeout(() => {
        btn.textContent = "Jouer maintenant!";
        setTimeout(() => {
          btn.textContent = "Commencer l'aventure";
          btn.style.background = "";
        }, 1300);
      }, 900);
    });
  }

  // Upgrades

  upgrades() {
    const items = document.querySelectorAll(".upgrade-item");
    items.forEach((it) => {
      it.addEventListener("mouseenter", () => this.soundEffect("hover"));
      it.addEventListener("click", () => {
        this.soundEffect("upgrade");
        this.showUpgradePopup();
      });
    });
  }

  showUpgradePopup() {
    const box = document.createElement("div");
    box.textContent = "Amélioré !";
    box.style.position = "fixed";
    box.style.top = "100px";
    box.style.right = "20px";
    box.style.padding = "1rem 2rem";
    box.style.color = "white";
    box.style.background = "#4caf50";
    box.style.borderRadius = "10px";
    box.style.zIndex = 9999;

    document.body.appendChild(box);

    // remove after a moment
    setTimeout(() => {
      box.style.opacity = "0";
      setTimeout(() => box.remove(), 400);
    }, 1500);
  }

  // stats cards

  statsClickThings() {
    const stats = document.querySelectorAll(".stat-card");

    stats.forEach((card) => {
      card.addEventListener("click", () => {
        this.soundEffect("click");

        const v = card.querySelector(".stat-value");
        if (!v) return;

        v.style.transform = "scale(1.3)";
        setTimeout(() => (v.style.transform = ""), 300);
      });
    });
  }

  // Mega button
  
  megaBtn() {
    const btn = document.getElementById("mega-click");
    const particlesBox = document.getElementById("click-particles");

    if (!btn) return;

    btn.addEventListener("click", (e) => {
      if (this.maxReached) {
        this.soundEffect("click");
        return;
      }

      this.totalClicks++;
      this.coffeeCount += 125;

      if (this.coffeeCount >= 15000) {
        this.coffeeCount = 15000;
        this.maxReached = true;
        this.showMaxPopup();
      }

      this.updateStats();
      this.soundEffect("mega");

      // particles
      if (particlesBox) {
        for (let i = 0; i < 12; i++) {
          this.makeParticle(particlesBox, e.clientX, e.clientY);
        }
      }
    });
  }

  makeParticle(box, x, y) {
    const p = document.createElement("div");
    const arr = ["☕", "⭐", "📊", "🚀"];
    p.textContent = arr[Math.floor(Math.random() * arr.length)];
    p.className = "particle";

    const r = box.getBoundingClientRect();
    p.style.left = x - r.left + "px";
    p.style.top = y - r.top + "px";

    box.appendChild(p);

    setTimeout(() => p.remove(), 1500);
  }

  sparkle(el) {
    const sp = document.createElement("div");
    sp.textContent = "✨";
    sp.style.position = "absolute";
    sp.style.fontSize = "1.7rem";
    sp.style.animation = "particleFloat 1s forwards";
    sp.style.pointerEvents = "none";

    const r = el.getBoundingClientRect();
    sp.style.left = r.left + r.width / 2 + "px";
    sp.style.top = r.top - 10 + "px";

    document.body.appendChild(sp);

    setTimeout(() => sp.remove(), 900);
  }

  // Max coffee popup

  showMaxPopup() {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>🏆 Objectif atteint !</h2>
      <p>15,000 cafés produits</p>
      <p>Total de clics : ${this.totalClicks}</p>
    `;

    div.style.position = "fixed";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.padding = "2rem 3rem";
    div.style.background = "orangered";
    div.style.color = "white";
    div.style.borderRadius = "15px";
    div.style.textAlign = "center";
    div.style.zIndex = 99999;

    document.body.appendChild(div);
    this.soundEffect("levelup");

    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 400);
    }, 3800);
  }

  // Coffe Interval

  startCoffeeTimer() {
    setInterval(() => {
      if (this.maxReached) return;

      this.coffeeCount += this.cps;
      if (this.coffeeCount >= 15000) {
        this.coffeeCount = 15000;
        this.maxReached = true;
        this.showMaxPopup();
      }

      this.updateStats();
    }, 1000);
  }

  updateStats() {
    const set = (id, val) => {
      let el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set("total-clicks", this.totalClicks);
    set("coffee-count", this.coffeeCount);
    set("cps-count", this.cps);
    set("level-count", this.currentLevel);
  }

  // Sound
      
  soundToggle() {
    const btn = document.getElementById("sound-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.sound = !this.sound;
      btn.textContent = this.sound ? "🔊" : "🔇";
      this.soundEffect("click");
    });
  }

  soundEffect(type) {
    if (!this.sound) return;

    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freqs = {
        click: 820,
        hover: 580,
        upgrade: 1200,
        mega: 400,
        start: 950,
        levelup: 1400
      };

      osc.frequency.value = freqs[type] || 500;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (err) {
      console.log("sound err:", err);
    }
  }
}

new InternGrindShowcase();
