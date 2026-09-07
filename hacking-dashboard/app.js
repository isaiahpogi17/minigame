// Complete Master Hacking Database (All 12 Server Minigames Consolidated from rl_minigames & Custom)
const HACKING_DATA = [
  {
    id: "ap-decryption",
    name: "Mastermind Color Decryption",
    job: "Black Market / High-Tier Tech",
    category: "blackmarket",
    provider: "rl_minigames (AP Decryption)",
    requiredItem: "Encrypted Device Shell / Hacker Tablet",
    difficulty: "Expert (4 - 7 Color Slots)",
    timeLimit: "120 Seconds",
    maxAttempts: "6 - 8 Attempts",
    specs: [
      { key: "Color Palette", val: "Red, Orange, Yellow, Green, Cyan, Blue, Purple" },
      { key: "Slots Count", val: "4 to 7 Slots" },
      { key: "Time Limit", val: "120 Seconds" },
      { key: "Attempts Allowed", val: "6 - 8 Max Attempts" },
      { key: "Rounds to Win", val: "1 Complete Sequence" }
    ],
    description: "Decipher multi-slot color sequences by placing color pins and getting feedback on exact and partial matches."
  },
  {
    id: "ap-circuitrun",
    name: "Circuit Run Track Bypass",
    job: "Car Chop & Vehicle Hotwiring",
    category: "carchop",
    provider: "rl_minigames (AP CircuitRun)",
    requiredItem: "Hacking Device / Hotwire Kit",
    difficulty: "Medium - Extreme",
    timeLimit: "30 - 45 Seconds",
    maxAttempts: "1 Round",
    specs: [
      { key: "Track Width", val: "16px (Extreme) -> 34px (Easy)" },
      { key: "Close Delay", val: "2000ms" },
      { key: "Time Limit", val: "30 - 45 Seconds" },
      { key: "Rounds", val: "1 Round" }
    ],
    description: "Guide a electrical pulse through narrowing circuit channels without touching the electrified track borders."
  },
  {
    id: "ap-chevrons",
    name: "Speed Chevron Matcher",
    job: "Store Robbery & Rapid Overrides",
    category: "store",
    provider: "rl_minigames (AP Chevrons)",
    requiredItem: "Firearm Intimidation / Lockpick",
    difficulty: "Rookie -> Expert",
    timeLimit: "5 - 10 Seconds",
    maxAttempts: "Instant Fail Option",
    specs: [
      { key: "Bars per Round", val: "18 to 42 Chevron Bars" },
      { key: "Time Window", val: "5s (Expert) -> 10s (Easy)" },
      { key: "Penalty", val: "+1.0s to +2.0s per miss" },
      { key: "Instant Fail", val: "Enabled on Expert" }
    ],
    description: "Match fast-moving directional chevron bars before the quick countdown timer runs out."
  },
  {
    id: "ap-gemini",
    name: "Gemini Grid Matrix Match",
    job: "Oil Heist & Security Panels",
    category: "oil",
    provider: "rl_minigames (AP Gemini)",
    requiredItem: "Oil Phone (oil_bphone)",
    difficulty: "Hard (6x6 Grid)",
    timeLimit: "90 - 120 Seconds",
    maxAttempts: "35 - 70 Attempts",
    specs: [
      { key: "Grid Dimensions", val: "4x4 to 6x6 Matrix" },
      { key: "Time Limit", val: "90s (Expert) -> 120s (Easy)" },
      { key: "Max Attempts", val: "35 to 70 Attempts" },
      { key: "Rounds", val: "1 Complete Grid Match" }
    ],
    description: "Memorize and pair twin node pairs hidden across a complex digital grid under high security watch."
  },
  {
    id: "ap-redchip",
    name: "RedChip Spotlight Hunt",
    job: "Cyber Salvage & Microchip Extraction",
    category: "blackmarket",
    provider: "rl_minigames (AP RedChip)",
    requiredItem: "Angle Grinder / Disassembly Kit",
    difficulty: "Medium - Expert",
    timeLimit: "45 - 70 Seconds",
    maxAttempts: "8 - 14 Chips",
    specs: [
      { key: "Microchips Count", val: "8 to 14 Hidden Chips" },
      { key: "Spotlight Radius", val: "45px (Expert) -> 90px (Easy)" },
      { key: "Initial Timer", val: "45s -> 70s" },
      { key: "Time Bonus", val: "+3s to +7s per chip" }
    ],
    description: "Use a narrow flashlight beam in a dark UI to find and extract hidden microchips before the timer runs out."
  },
  {
    id: "ap-sequenceletters",
    name: "Key Sequence Memory",
    job: "ATM Tampering & Petty Theft",
    category: "petty",
    provider: "rl_minigames (AP SequenceLetters)",
    requiredItem: "Crowbar / Decryptor",
    difficulty: "Medium - Hard",
    timeLimit: "8.5 - 12 Seconds",
    maxAttempts: "2 Rounds",
    specs: [
      { key: "Sequence Length", val: "12 to 24 Keys" },
      { key: "Timeout Window", val: "8,500ms to 12,000ms" },
      { key: "Rounds to Win", val: "2 Rounds" },
      { key: "Failure Risk", val: "Immediate ATM Alarm" }
    ],
    description: "Memorize and re-enter rapid key sequences flashed across the keypad screen."
  },
  {
    id: "ap-arrowstrike",
    name: "Arrow Strike Rhythm",
    job: "Roof Running AC Unit Stripping",
    category: "roofrunning",
    provider: "rl_minigames (AP ArrowStrike)",
    requiredItem: "Black Market Lvl 8+ Contract",
    difficulty: "Tier 1 - 5 Strike Zones",
    timeLimit: "15 Rounds",
    maxAttempts: "15 Rounds",
    specs: [
      { key: "Rounds Count", val: "15 Rounds" },
      { key: "Strike Zone Size", val: "22px (Tier 5) -> 50px (Tier 1)" },
      { key: "Spawn Interval", val: "600ms -> 2500ms" },
      { key: "Perfect Window", val: "12ms -> 35ms" }
    ],
    description: "Hit moving arrow targets within precise strike zones to strip heavy industrial AC units without waking roof guards."
  },
  {
    id: "ap-balance",
    name: "Stabilizer Needle Balance",
    job: "Safe Drilling & Lock Stabilization",
    category: "house",
    provider: "rl_minigames (AP Balance)",
    requiredItem: "Manual Lockpick / Safe Dial",
    difficulty: "Medium - Expert",
    timeLimit: "8 - 12 Seconds",
    maxAttempts: "300ms - 900ms Danger Limit",
    specs: [
      { key: "Green Zone Width", val: "8px (Expert) -> 20px (Easy)" },
      { key: "Drift Speed", val: "Speed 4 -> Speed 10" },
      { key: "Drift Randomness", val: "3 to 9 Variance" },
      { key: "Max Danger Time", val: "300ms -> 900ms" }
    ],
    description: "Keep a drifting needle centered inside a narrow green stabilization window using counter-balancing key taps."
  },
  {
    id: "wordfall",
    name: "Cyber WordFall Rain",
    job: "Store Register Hack",
    category: "store",
    provider: "rl_minigames (WordFall)",
    requiredItem: "Firearm Intimidation",
    difficulty: "Easy -> Expert",
    timeLimit: "25 - 35 Seconds / Round",
    maxAttempts: "1 - 4 Rounds",
    specs: [
      { key: "Rounds Count", val: "1 to 4 Rounds" },
      { key: "Words per Round", val: "4 to 7 Words" },
      { key: "Fall Speed", val: "Speed 3 -> Speed 8" },
      { key: "Word Pool", val: "robbery, stickup, heist, holdup, snatch..." }
    ],
    description: "Type falling cyber words before they touch the bottom threshold to override cashier registers."
  },
  {
    id: "pipeflow",
    name: "PipeFlow Cyber Bypass",
    job: "House Robbery Security Panel",
    category: "house",
    provider: "rl_minigames (PipeFlow)",
    requiredItem: "House Security Decryptor",
    difficulty: "10x10 -> 18x18 Grid",
    timeLimit: "35 - 90 Seconds",
    maxAttempts: "2 - 5 Rounds",
    specs: [
      { key: "Grid Dimensions", val: "10x10 -> 18x18 Grid" },
      { key: "Blockage Percent", val: "8% to 25% Blocked" },
      { key: "Pipe Types", val: "Straight, Corner, T-Pipe, Cross" },
      { key: "End Points", val: "6 to 14 Targets" }
    ],
    description: "Rotate pipe segments to connect electrical flow from entry node to target exit nodes before time expires."
  },
  {
    id: "mines",
    name: "Cyber Minefield Sweep",
    job: "Vault Door Keycard Decryption",
    category: "store",
    provider: "rl_minigames (Mines)",
    requiredItem: "Blue Card Access Card",
    difficulty: "1 - 5 Stages",
    timeLimit: "15 - 25 Seconds / Stage",
    maxAttempts: "1 - 4 Allowed Fails",
    specs: [
      { key: "Grid Size", val: "6x6 to 9x9 Grid" },
      { key: "Mines Count", val: "6 to 18 Hidden Mines" },
      { key: "Preview Flash", val: "3s to 6s Preview" },
      { key: "Max Fails", val: "1 to 4 Fails" }
    ],
    description: "Memorize a brief flash of red mine positions, then navigate across the clear green grid tiles."
  },
  {
    id: "drill",
    name: "Heavy Overheat Safe Drill",
    job: "Store Heavy Safe / Bank Vault",
    category: "store",
    provider: "rl_minigames (Drill)",
    requiredItem: "Industrial Heavy Drill",
    difficulty: "5 - 8 Stages",
    timeLimit: "150 - 300 Seconds",
    maxAttempts: "80% Overheat Limit",
    specs: [
      { key: "Drill Stages", val: "5 to 8 Stages" },
      { key: "Overheat Limit", val: "80% Overheat Threshold" },
      { key: "Cooling Time", val: "10 Seconds Cooldown" },
      { key: "Drill Speed", val: "0.35 to 0.8 Speed" }
    ],
    description: "Manage drill pressure, bit vibration, and heat build-up to drill through 5 to 8 pins without melting the drill bit."
  }
];

// DOM Navigation
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  renderJobs();
  initSimulators();
});

// Render Matrix Grid
function renderJobs() {
  const grid = document.getElementById("jobs-grid");
  if (!grid) return;
  grid.innerHTML = "";

  HACKING_DATA.forEach(item => {
    const card = document.createElement("div");
    card.className = "job-card";

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
            <h3 style="font-size: 1.15rem; color: var(--text-main);">${item.name}</h3>
            <span style="font-size: 0.75rem; color: var(--accent-cyan); font-family: var(--font-mono);">${item.job}</span>
          </div>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">${item.description}</p>
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">Provider</span>
          <span class="meta-value" style="color: var(--accent-cyan);">${item.provider}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Difficulty</span>
          <span class="meta-value" style="color: var(--accent-amber);">${item.difficulty}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Required Item</span>
          <span class="meta-value" style="color: var(--accent-green);">${item.requiredItem}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Time Limit</span>
          <span class="meta-value" style="color: var(--accent-red);">${item.timeLimit}</span>
        </div>
      </div>
      <ul class="spec-list">${specsHTML}</ul>
    `;

    grid.appendChild(card);
  });
}

// Interactive Simulators Engine
function initSimulators() {
  // 1. Color Mastermind Decryptor Simulator
  const colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];
  let targetSeq = ["green", "cyan", "red", "yellow"];
  let userSeq = [];
  const decScreen = document.getElementById("mastermind-screen");

  function renderMastermind() {
    if (!decScreen) return;
    let pinsHTML = userSeq.map(c => `<div style="width:24px; height:24px; border-radius:50%; background:${c}; border:1px solid #fff;"></div>`).join("");
    let paletteHTML = colors.map(c => `<button onclick="pickColor('${c}')" style="width:30px; height:30px; border-radius:50%; background:${c}; border:none; cursor:pointer; margin:2px;"></button>`).join("");

    decScreen.innerHTML = `
      <div style="font-size: 0.85rem; color: var(--text-muted);">MASTERMIND COLOR DECRYPTION (SELECT 4 PINS):</div>
      <div style="display:flex; gap:0.5rem; margin:0.75rem 0;">${pinsHTML || '<span style="color:#666;">[Empty Pins]</span>'}</div>
      <div style="display:flex; gap:0.25rem;">${paletteHTML}</div>
    `;
  }
  window.pickColor = function(c) {
    if (userSeq.length < 4) {
      userSeq.push(c);
      renderMastermind();
      if (userSeq.length === 4) {
        let exact = 0;
        userSeq.forEach((col, i) => { if (col === targetSeq[i]) exact++; });
        if (exact === 4) {
          decScreen.innerHTML = `<div style="color:var(--accent-green); font-size:1.4rem; font-weight:700;">SEQUENCE DECRYPTED!</div>`;
        } else {
          decScreen.innerHTML += `<div style="color:var(--accent-amber); margin-top:0.5rem;">EXACT MATCHES: ${exact}/4. <button onclick="resetMastermind()" style="background:#222; color:#fff; border:1px solid #555; padding:2px 6px; cursor:pointer;">TRY AGAIN</button></div>`;
        }
      }
    }
  };
  window.resetMastermind = function() { userSeq = []; renderMastermind(); };
  renderMastermind();

  // 2. WordFall Simulator
  let fallingWord = "HOLDOUT";
  let typedWord = "";
  const wfScreen = document.getElementById("wordfall-screen");
  const wfInput = document.getElementById("wordfall-input");

  function renderWordfall() {
    if (!wfScreen) return;
    wfScreen.innerHTML = `
      <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-green); letter-spacing: 2px;">${fallingWord}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">TYPE WORD BELOW TO CLEAR BEFORE TIMEOUT</div>
    `;
  }
  if (wfInput) {
    wfInput.addEventListener("input", (e) => {
      if (e.target.value.toUpperCase().trim() === fallingWord) {
        wfScreen.innerHTML = `<div style="color:var(--accent-green); font-size:1.5rem; font-weight:700;">WORD CLEARED!</div>`;
        e.target.value = "";
        setTimeout(() => { fallingWord = "ROBBERY"; renderWordfall(); }, 1200);
      }
    });
  }
  renderWordfall();

  // 3. Arrow Strike Simulator
  let arrowSequence = ["▲", "▶", "▼", "◀"];
  let arrowIdx = 0;
  const arrowScreen = document.getElementById("arrow-screen");

  function renderArrow() {
    if (!arrowScreen) return;
    let seqHTML = arrowSequence.map((a, i) => `
      <div style="font-size: 2rem; color: ${i === arrowIdx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)'}; margin: 0 5px;">${a}</div>
    `).join("");

    arrowScreen.innerHTML = `
      <div style="display:flex;">${seqHTML}</div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">USE ARROW KEYS TO MATCH HIGHLIGHTED ARROW [${arrowIdx + 1}/4]</div>
    `;
  }

  window.addEventListener("keydown", (e) => {
    const keyMap = { ArrowUp: "▲", ArrowRight: "▶", ArrowDown: "▼", ArrowLeft: "◀" };
    if (keyMap[e.key] && keyMap[e.key] === arrowSequence[arrowIdx]) {
      arrowIdx++;
      if (arrowIdx === 4) {
        arrowScreen.innerHTML = `<div style="color:var(--accent-green); font-size:1.4rem; font-weight:700;">AC STRIPPED PERFECTLY!</div>`;
        setTimeout(() => { arrowIdx = 0; renderArrow(); }, 1500);
      } else {
        renderArrow();
      }
    }
  });
  renderArrow();
}
