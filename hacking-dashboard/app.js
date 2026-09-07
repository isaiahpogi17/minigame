// Hacking & Minigame Database classified by Job
const HACKING_DATA = [
  {
    id: "house-panel",
    name: "Home Security Panel Decryptor",
    job: "House Robbery",
    category: "house",
    provider: "rl_houserobbery / Custom",
    requiredItem: "House Security Decryptor (house_security_decryptor)",
    difficulty: "Medium (Cycling Digits)",
    timeLimit: "45 Seconds",
    maxAttempts: 6,
    specs: [
      { key: "Code Length", val: "4 Digits" },
      { key: "Digit Pool", val: "4 Options" },
      { key: "Step Speed", val: "700ms -> 450ms" },
      { key: "Tool Consumption", val: "1 Use / Attempt (6 Max)" },
      { key: "Failure Damage", val: "40% Health Damage" }
    ],
    description: "Decrypt the exterior security panel of residential properties between 10:00 PM and 5:30 AM to gain entry."
  },
  {
    id: "house-safe",
    name: "House Interior Safe Cracking",
    job: "House Robbery",
    category: "house",
    provider: "ox_lib / Dial Crack",
    requiredItem: "None (Manual Dial)",
    difficulty: "Hard (5 Combination Digits)",
    timeLimit: "45 Seconds",
    maxAttempts: "3 Tolerance Mistakes",
    specs: [
      { key: "Combination Length", val: "5 Numbers" },
      { key: "Tolerance Window", val: "3 Units" },
      { key: "Failure Spike", val: "+20.0 Noise Spike" },
      { key: "Risk Factor", val: "Immediately wakes homeowner & dog" }
    ],
    description: "Crack bedroom and office safes for high-tier loot (Telescopes, Laptops, Flat TVs, Gold Watches)."
  },
  {
    id: "store-terminal",
    name: "Cashier Register Hack",
    job: "Store Robbery",
    category: "store",
    provider: "rl_minigames (Terminal / WordFall)",
    requiredItem: "Equipped Firearm (Intimidation)",
    difficulty: "Medium",
    timeLimit: "60 Seconds",
    maxAttempts: 3,
    specs: [
      { key: "WordFall Rounds", val: "3 Rounds" },
      { key: "Words / Round", val: "7 Words" },
      { key: "Fall Speed", val: "Speed 11" },
      { key: "SkillCheck Keys", val: "['E']" },
      { key: "Police Alert", val: "10-90 Active Store Hold-Up" }
    ],
    description: "Intimidate the shopkeeper and override the cashier terminal to empty cash register drawers."
  },
  {
    id: "store-safe",
    name: "Store Safe Drilling",
    job: "Store Robbery",
    category: "store",
    provider: "rl_minigames (Safe Drill)",
    requiredItem: "Drill / Firearm Intimidation",
    difficulty: "Medium",
    timeLimit: "200 Seconds",
    maxAttempts: "Overheat Control",
    specs: [
      { key: "Minigame Type", val: "safe_drill" },
      { key: "Drill Time", val: "200 Seconds" },
      { key: "Global Cooldown", val: "60 Minutes / Store" },
      { key: "Police Window", val: "40 Minute Response Lease" }
    ],
    description: "Drill open the backroom heavy safe of 24/7 and liquor stores while holding off police response."
  },
  {
    id: "oil-security",
    name: "Tanker Security Panel Breach",
    job: "Oil Heist",
    category: "oil",
    provider: "rl_oil_heist (Breach Matrix)",
    requiredItem: "Oil Phone (oil_bphone) & Tanker Info",
    difficulty: "Expert (Level 12+ Black Market)",
    timeLimit: "9 Minutes (540s)",
    maxAttempts: "Noise Lockout 4000ms",
    specs: [
      { key: "Breach Stage", val: "3:30 Minutes" },
      { key: "Decoder Stage", val: "3:30 Minutes" },
      { key: "Pin Mistake Lock", val: "4000ms Lockout" },
      { key: "Noise Meter", val: "0 -> 100 Alert (Aggro Guards)" }
    ],
    description: "Bypass industrial security panels in heavily guarded oil tanker yards to enable fuel pump hoses."
  },
  {
    id: "carchop-hotwire",
    name: "Vehicle Hotwiring & GPS Decryption",
    job: "Car Chop / Boosting",
    category: "carchop",
    provider: "rl_carchop / rl_hotwire",
    requiredItem: "Lockpick, Hotwire Kit, Hacking Device",
    difficulty: "Class D -> Class S (Progressive)",
    timeLimit: "30 - 60 Seconds",
    maxAttempts: 3,
    specs: [
      { key: "Direction Keys", val: "['W', 'A', 'S', 'D']" },
      { key: "Classes", val: "Class D, C, B, A, S" },
      { key: "Speed Bonus", val: "Skill Tree Unlocks" },
      { key: "Tracking Removal", val: "GPS Signal Disabler" }
    ],
    description: "Disable GPS tracking signals, hotwire ignition switches, and bypass engine immobilizers for boosted vehicles."
  },
  {
    id: "petty-atm",
    name: "ATM Tampering & Cash Bypass",
    job: "Street Petty Crimes",
    category: "petty",
    provider: "ox_lib / Memory Sequence",
    requiredItem: "Crowbar / Decryptor",
    difficulty: "Medium",
    timeLimit: "15 Seconds",
    maxAttempts: "4-6 Memory Stages",
    specs: [
      { key: "Memory Stages", val: "4 - 6 Stages" },
      { key: "Stage Duration", val: "3000ms - 5000ms" },
      { key: "Cooldown", val: "300s - 600s" },
      { key: "Dispatch Code", val: "10-90 ATM Silent Alarm" }
    ],
    description: "Pry open street ATMs and complete memory pattern checks to dispense loose cash."
  },
  {
    id: "3d-printer-tuning",
    name: "3D Printer Frequency Tuning",
    job: "3D Printing & Crafting",
    category: "petty",
    provider: "rl_3dprinter",
    requiredItem: "3D Printer, Battery, Printer Head",
    difficulty: "Crafting Tier 1 - 3",
    timeLimit: "Batch Production",
    maxAttempts: "Component Wear",
    specs: [
      { key: "Printer Head", val: "Tier 1 - 3 Upgrades" },
      { key: "Material Slots", val: "5 Filament Slots" },
      { key: "Quality Variance", val: "Health & Component Weighted" },
      { key: "Blueprints", val: "Tribunal Gold Coin Drops" }
    ],
    description: "Configure heat frequencies, filament flow rates, and nozzle speeds to print weapon blanks and components."
  }
];

// DOM Render
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("jobs-grid");
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let currentCategory = "all";
  let searchQuery = "";

  function renderCards() {
    grid.innerHTML = "";
    
    const filtered = HACKING_DATA.filter(item => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery) || 
                          item.job.toLowerCase().includes(searchQuery) ||
                          item.provider.toLowerCase().includes(searchQuery) ||
                          item.requiredItem.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No hacking mechanisms found matching your filter criteria.</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.setAttribute("data-category", item.category);

      const specsHTML = item.specs.map(s => `
        <li class="spec-item">
          <span class="spec-key">${s.key}</span>
          <span class="spec-val">${s.val}</span>
        </li>
      `).join("");

      card.innerHTML = `
        <div class="card-header">
          <div class="job-title-group">
            <div class="job-icon">⚡</div>
            <div>
              <h3 class="job-name">${item.name}</h3>
              <span class="job-category-tag">${item.job}</span>
            </div>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.75rem;">${item.description}</p>

        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Provider</span>
            <span class="meta-value cyan">${item.provider}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Difficulty</span>
            <span class="meta-value amber">${item.difficulty}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Required Item</span>
            <span class="meta-value green">${item.requiredItem}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Time Limit</span>
            <span class="meta-value red">${item.timeLimit}</span>
          </div>
        </div>

        <div class="specs-section">
          <div class="specs-title">⚙️ HACK SPECIFICATIONS & PARAMETERS</div>
          <ul class="spec-list">
            ${specsHTML}
          </ul>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderCards();
    });
  });

  // Search Input
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCards();
  });

  // Initial Render
  renderCards();

  // Simulators
  initSimulators();
});

// Interactive Simulators Logic
function initSimulators() {
  // Simulator 1: Digit Decryptor
  const decDisplay = document.getElementById("dec-display");
  const decBtn = document.getElementById("dec-btn");
  let decInterval = null;
  let decTarget = "7492";

  if (decBtn) {
    decBtn.addEventListener("click", () => {
      if (decInterval) {
        clearInterval(decInterval);
        decInterval = null;
        decDisplay.innerHTML = `<span style="color: var(--accent-green); font-size: 1.8rem;">ACCESS GRANTED</span><br><span style="color: var(--text-muted); font-size: 0.85rem;">DECRYPTED CODE: ${decTarget}</span>`;
        decBtn.textContent = "RESET SIMULATOR";
      } else {
        decBtn.textContent = "LOCK DIGIT NOW";
        decInterval = setInterval(() => {
          const rand = Math.floor(1000 + Math.random() * 9000);
          decDisplay.innerHTML = `<span style="font-size: 2.2rem; letter-spacing: 6px; color: var(--accent-cyan);">${rand}</span><br><span style="color: var(--accent-amber); font-size: 0.8rem;">CYCLING DIGITS...</span>`;
        }, 80);
      }
    });
  }

  // Simulator 2: Safe Combination Dial
  const dialDisplay = document.getElementById("dial-display");
  const dialBtn = document.getElementById("dial-btn");
  let dialPos = 0;
  let combination = [14, 42, 88, 23, 67];
  let currentStep = 0;

  if (dialBtn) {
    dialBtn.addEventListener("click", () => {
      dialPos = (dialPos + 14) % 100;
      if (currentStep < combination.length) {
        if (Math.abs(dialPos - combination[currentStep]) < 10) {
          currentStep++;
        }
      }

      if (currentStep >= combination.length) {
        dialDisplay.innerHTML = `<span style="color: var(--accent-green); font-size: 1.8rem;">SAFE UNLOCKED</span><br><span style="color: var(--text-muted); font-size: 0.85rem;">COMBINATION MATCHED</span>`;
        dialBtn.textContent = "RESET SAFE SIMULATOR";
        currentStep = 0;
        dialPos = 0;
      } else {
        dialDisplay.innerHTML = `<span style="font-size: 2.2rem; color: var(--accent-amber);">DIAL: ${dialPos}°</span><br><span style="color: var(--text-muted); font-size: 0.85rem;">TARGET PIN [${currentStep + 1}/5]: MATCH DIAL</span>`;
        dialBtn.textContent = "TURN SAFE DIAL (+14°)";
      }
    });
  }
}
