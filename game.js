// ============================================================
//  ESCAPE GAME MARIAGE — Deux parcours : Alex & Clémence
//  v2 — Bugs corrigés · Timer · Score · Confettis · Indices
// ============================================================

let currentPlayer = null;
let current       = 0;
let attempts      = 0;
let score         = 0;
let timerInterval = null;
let timeLeft      = 0;
const STEP_TIME   = 120; // secondes par étape

// ============================================================
//  EMOJIS mémoire
// ============================================================
const EMOJIS = {
  1:"💍", 2:"💐", 3:"🥂", 4:"🕊️",
  5:"💌", 6:"🎶", 7:"🍰", 8:"🌹",
  9:"⭐", 10:"🌸", 11:"🦋", 12:"✨"
};

// ============================================================
//  PARCOURS ALEX  (le marié)
// ============================================================
const stepsAlex = [
  {
    type: "intro",
    stepLabel: "",
    title: "Bravo Alex…",
    description: "Aujourd'hui est un grand jour. \n\n Tu as relevé le premier défi facilement (... ou pas) \n\n Nous t'avons préparé une 2ème partie, rien que pour toi ! \n\n Prêt à relever le défi ?\n\nBonne chance, marié.",
    btnLabel: "Je suis prêt !"
  },
  {
    type: "code",
    stepLabel: "Étape 1",
    title: "La promesse",
    description: "Prouve que tu te souviens de l'année de votre rencontre.",
    code: "2014"
  },
  {
    type: "puzzle",
    stepLabel: "Étape 2",
    title: "Une photo, un souvenir",
    image: "images/photo1.jpg",
    size:3
  },
  {
    type: "quiz",
    stepLabel: "Étape 3",
    title: "Faille de l'invocateur",
    description: "Quel est l'item principal d'une Kayle de qualité sur League of Legends ?",
    options: ["Arc courbé","Trinité","Guinsoo","Gantelet"],
    answer: "Guinsoo"
  },
  {
    type: "image",
    stepLabel: "Étape 4",
    title: "Qui est-ce ?",
    description: "",
    image: "images/devinette1.png",  // ← chemin vers ta photo
    question: "Quel est le nom de ce pokémon ?",
    options: ["Hoothoot","Brindibou","Flamiaou","Noarfang"],
    answer: "Brindibou"
  },
  {
    type: "memory",
    stepLabel: "Étape 5",
    title: "Deux cœurs, une âme",
    description: "Retrouvez toutes les paires pour continuer.",
    pairs: [1,1,2,2,3,3,4,4]
  }, 
  {
    type: "puzzle",
    stepLabel: "Étape 6",
    title: "Une photo, un souvenir",
    image: "images/photo2.jpg",
    size:3
  },  
  {
    type: "image",
    stepLabel: "Étape 7",
    title: "Qui est-ce ?",
    description: "",
    image: "images/devinette2.jpg",  // ← chemin vers ta photo
    question: "Quel est le nom de cette série ?",
    options: ["Titanic","Le roi lion","Breaking Bad","D, la réponse D"],
    answer: "Breaking Bad"
  },
  {
    type: "memory",
    stepLabel: "Étape 8",
    title: "Souvenirs partagés",
    description: "Encore quelques paires à retrouver…",
    pairs: [5,5,6,6,7,7,8,8]
  },
  {
    type: "code",
    stepLabel: "Étape 9",
    title: "Le serment final",
    description: "Le mot que tu as prononcé tout à l'heure à la mairie.",
    code: "OUI"
  },
  {
    type: "puzzle",
    stepLabel: "Étape 10",
    title: "Une photo, un souvenir",
    image: "images/photo3.jpg",
    size:3
  },
  {
    type: "code",
    stepLabel: "Étape 12",
    title: "Le pokémon mystère",
    description: "Quel pokémon a le numéro 25 dans le pokedex ?",
    code: "Pikachu"
  },
  {
    type: "image",
    stepLabel: "Étape 11",
    title: "Qui est-ce ?",
    description: "",
    image: "images/devinette3.jpg",  // ← chemin vers ta photo
    question: "Quel est le nom de ce stade ?",
    options: ["Saint Symphorien","Amédée-Domenech","Stade de France","Gilbert Montagné"],
    answer: "Amédée-Domenech"
  },
  {
    type: "code",
    stepLabel: "Étape 13",
    title: "Voici la question 13",
    description: "Quel est le 6ème nombre premier ?",
    code: "13"
  },
  {
    type: "image",
    stepLabel: "Étape finale",
    title: "Qui est-ce ?",
    description: "",
    image: "images/mariage.jpg",  // ← chemin vers ta photo
    question: "Vous vous êtes dit ?",
    options: ["oui","peut-être","D, la réponse D"],
    answer: "oui"
  }
];
// ============================================================
//  PARCOURS CLÉMENCE  (la mariée)
// ============================================================
const stepsClemence = [
  {
    type: "intro",
    stepLabel: "",
    title: "Félicitations Clémence…",
    description: "Tu viens de dire oui et de vivre le plus beau jour de ta vie… ✨\n\nMaintenant, quelques petits défis t'attendent.\n\n Bonne chance, mariée. 💐",
    btnLabel: "C'est parti !"
  },
  {
    type: "code",
    stepLabel: "Étape 1",
    title: "Le commencement",
    description: "Tu te souviens du mois de votre rencontre ? Entre-le en 2 chiffres.",
    code: "04"
  },
  {
    type: "puzzle",
    stepLabel: "Étape 2",
    title: "Mini lui ?",
    image: "images/photo5.jpg",
    size:3
  },
  {
    type: "quiz",
    stepLabel: "Étape 3",
    title: "Zog Zog",
    description: "Quels sont les buffs prodigués par les paladins dans ce petit jeu indé appelé World of Warcraft : ",
    options: ["Bénédictions","Malnutrition","Déjection","Clarification"],
    answer: "Bénédictions"
  },
  {
    type: "image",
    stepLabel: "Étape 4",
    title: "Qui est-ce ?",
    description: "",
    image: "images/devinette4.png",
    question: "Quel est le nom de ce personnage ?",
    options: ["Koopa Troopa","Goomba","Maskass","Masqué"],
    answer: "Maskass"
  },
  {
    type: "memory",
    stepLabel: "Étape 5",
    title: "Petits bonheurs",
    description: "Retrouvez toutes les paires pour continuer.",
    pairs: [9,9,10,10,11,11,12,12]
  },
  {
    type: "code",
    stepLabel: "Étape 6",
    title: "La couleur du jour",
    description: "Je règne sur cette journée et je me glisse aussi dans les couleurs du CA Brive Corrèze ? (en 5 lettres)",
    code: "BLANC"
  },
  {
    type: "image",
    stepLabel: "Étape 7",
    title: "Qui est-ce ?",
    description: "Question série US niche",
    image: "images/devinette5.png",
    question: "Qui est l'avocate amoureuse de Lincoln dans la série (bien trop ancienne) Prison Break ?",
    options: ["Sara Tancredi","Veronica Donovan","Gretchen Morgan","D, la réponse D"],
    answer: "Veronica Donovan"
  },
  {
    type: "puzzle",
    stepLabel: "Étape 8",
    title: "L'ami des bêtes",
    image: "images/photo6.jpg",
    size:3
  },
  {
    type: "quiz",
    stepLabel: "Étape 9",
    title: "💕",
    description: "Quelle hormone est libérée lors des câlins (on parle d'hormone) et renforce l'attachement ?",
    options: ["Dopamine","Ocytocine","Cortisol","Insuline"],
    answer: "Ocytocine"
  }, 
  {
    type: "code",
    stepLabel: "Étape 10",
    title: "Le mammifère mystère",
    description: "Je suis un mammifère de l'ordre des Proboscidiens\n\nMon cerveau pèse environ 5kg, l'un des plus gros parmi les animaux terrestres\n\nJe suis un symbole de sagesse et de mémoire dans de nombreuses cultures\n\nQui suis-je ? (en 8 lettres)",
    code: "ELEPHANT"
  },
  {
    type: "quiz",
    stepLabel: "Étape 11",
    title: "Manga peu connu",
    description: "Combien de sabres utilise Zoro (le BG) ?",
    options: ["2","3","4","5"],
    answer: "3"
  },
  {
    type: "puzzle",
    stepLabel: "Étape 12",
    title: "On n'avait pas Tchoupi",
    image: "images/photo7.jpg",
    size:3
  },
  {
    type: "memory",
    stepLabel: "Étape 13",
    title: "Souvenirs partagés",
    description: "Encore quelques paires à retrouver…",
    pairs: [5,5,6,6,7,7,8,8]
  },
  {
    type: "image",
    stepLabel: "Étape finale",
    title: "💕",
    description: "",
    image: "images/mariage.jpg",  // ← chemin vers ta photo
    question: "Vous vous êtes dit ?",
    options: ["oui","peut-être","D, la réponse D"],
    answer: "oui"
  }
];

// ============================================================
//  DÉMARRAGE
// ============================================================
function startGame(player) {
  currentPlayer = player;
  current       = 0;
  score         = 0;

  document.getElementById("playerSelect").style.display = "none";
  const gs = document.getElementById("gameScreen");
  gs.classList.remove("hidden");
  gs.style.animation = "fadeUp 0.5s ease";

  document.getElementById("playerBadge").innerText =
    player === "alex" ? "🤵 Alex" : "👰 Clémence";

  updateScoreDisplay();
  spawnPetals();
  loadStep();
}

function getSteps() {
  return currentPlayer === "alex" ? stepsAlex : stepsClemence;
}

// ============================================================
//  TIMER
// ============================================================
function startTimer(step) {
  clearInterval(timerInterval);
  // Pas de timer sur intro et memory (open-ended)
  if (step.type === "intro" || step.type === "memory") {
    document.getElementById("timerBadge").style.display = "none";
    return;
  }
  timeLeft = STEP_TIME;
  const badge = document.getElementById("timerBadge");
  badge.style.display = "";
  badge.classList.remove("danger");
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 15) badge.classList.add("danger");
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Affiche l'indice automatiquement quand le temps expire
      showHint(step);
      setFeedback("⏱️ Temps écoulé ! Voici un indice…");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  document.getElementById("timerBadge").innerText = `⏱ ${m}:${s}`;
}

// ============================================================
//  SCORE
// ============================================================
function addScore(pts) {
  score += pts;
  updateScoreDisplay();
  // Petite animation flash
  const badge = document.getElementById("scoreBadge");
  badge.classList.add("score-flash");
  setTimeout(() => badge.classList.remove("score-flash"), 600);
}

function updateScoreDisplay() {
  document.getElementById("scoreBadge").innerText = `⭐ ${score} pts`;
}

// ============================================================
//  INDICE
// ============================================================
function showHint(step) {
  if (!step.hint) return;
  const hintEl = document.getElementById("hintBox");
  if (!hintEl) return;
  hintEl.innerText = "💡 " + step.hint;
  hintEl.style.display = "block";
}

// ============================================================
//  LOAD STEP
// ============================================================
function loadStep() {
  clearInterval(timerInterval);

  const steps = getSteps();
  const step  = steps[current];

  // Réinitialise l'indice
  const hintBox = document.getElementById("hintBox");
  if (hintBox) { hintBox.innerText = ""; hintBox.style.display = "none"; }

  document.getElementById("title").innerText       = step.title;
  document.getElementById("description").innerText = step.description || "";
  document.getElementById("stepLabel").innerText   = step.stepLabel || "";
  document.getElementById("progress").innerText    =
    step.type === "intro" ? "" : `${current} / ${steps.length - 1}`;
  document.getElementById("feedback").innerText    = "";
  document.getElementById("feedback").className    = "feedback";

  const lock = document.getElementById("lock");
  lock.className = "lock-icon";
  lock.innerText = step.type === "intro" ? "💍" : "🔒";

  const validateBtn  = document.getElementById("validateBtn");
  const hintBtn      = document.getElementById("hintBtn");

  // Bouton valider : uniquement pour "code"
  validateBtn.style.display = step.type === "code" ? "block" : "none";

  // Bouton indice : tout sauf intro & memory
  if (hintBtn) {
    hintBtn.style.display =
      (step.hint && step.type !== "intro" && step.type !== "memory")
        ? "block" : "none";
  }

  attempts = 0;

  const content = document.getElementById("gameContent");
  content.innerHTML    = "";
  content.style.display = "";
  content.style.flexWrap = "";

  switch (step.type) {
    case "intro":   createIntro(step);      break;
    case "code":    createInputs(step.code.length); break;
    case "quiz":
    case "image":   createQuizStep(step);   break;
    case "memory":  createMemory(step);     break;
    case "puzzle":  createPuzzle(step);     break;
    default:
      console.warn("Type de step inconnu :", step.type);
  }

  startTimer(step);
  if (step.type === "code") {
    setTimeout(() => document.querySelector(".digit")?.focus(), 80);
  }
}

// ============================================================
//  INTRO STEP
// ============================================================
function createIntro(step) {
  const content = document.getElementById("gameContent");
  // La description est déjà affichée dans #description
  const btn = document.getElementById("validateBtn");
  btn.innerText = step.btnLabel || "Commencer";
  btn.style.display = "block";
  btn.onclick = () => nextStep();
}

// ============================================================
//  CODE INPUTS
// ============================================================
function createInputs(length) {
  const content = document.getElementById("gameContent");
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.classList.add("digit");
    input.maxLength     = 1;
    input.autocomplete  = "off";
    input.spellcheck    = false;
    content.appendChild(input);
  }
  // Rebranche onclick sur validate classique
  document.getElementById("validateBtn").onclick = validate;
  document.getElementById("validateBtn").innerText = "🔓 Déverrouiller";
}

// ============================================================
//  VALIDATE CODE
// ============================================================
function validate() {
  const steps = getSteps();
  const step  = steps[current];
  if (step.type !== "code") return;

  const inputs = document.querySelectorAll(".digit");
  let val = "";
  inputs.forEach(i => val += i.value);
  val = val.toUpperCase().trim();

  if (!val || val.length < step.code.length) {
    setFeedback("✏️ Complète tous les champs.");
    return;
  }

  const card = document.getElementById("card");
  card.classList.remove("error", "success");

  attempts++;

  if (val === step.code.toUpperCase()) {
    clearInterval(timerInterval);
    card.classList.add("success");
    document.getElementById("lock").classList.add("unlocked");
    document.getElementById("lock").innerText = "🔓";
    // Score : base 100 – malus tentatives – malus temps
    const timePts = Math.max(0, timeLeft) * 0.5;
    const pts = Math.max(10, Math.round(100 - (attempts - 1) * 15 + timePts));
    addScore(pts);
    setFeedback(`✨ Parfait ! +${pts} pts`, true);
    setTimeout(nextStep, 900);
  } else {
    card.classList.add("error");
    setFeedback(`❌ Code incorrect — tentative ${attempts}`);
    // Affiche l'indice après 3 erreurs
    if (attempts >= 3) showHint(step);
    setTimeout(() => card.classList.remove("error"), 400);
  }
}

// ============================================================
//  QUIZ (avec ou sans image)
// ============================================================
function createQuizStep(step) {
  const content = document.getElementById("gameContent");
  content.innerHTML = "";
  let answered = false;

  // Image optionnelle
  if (step.image) {
    const img = document.createElement("img");
    img.src = step.image;
    img.alt = step.question || "Photo";
    img.style.cssText = "width:100%;border-radius:12px;margin-bottom:15px;";
    img.onerror = () => {
      img.style.display = "none";
      console.warn("Image introuvable :", step.image);
    };
    content.appendChild(img);
  }

// Question texte
  if (step.question) {
    const q = document.createElement("p");
    q.innerText = step.question;
    q.style.cssText = "text-align:center;margin-bottom:15px;font-style:italic;width:100%;";
    content.appendChild(q);
  }

  // Options
  (step.options || []).forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("quiz-option");
    btn.innerText = opt;

    btn.onclick = () => {
      if (answered) return;
      attempts++;

      if (opt === step.answer) {
        answered = true;
        clearInterval(timerInterval);
        btn.classList.add("correct");
        const timePts = Math.max(0, timeLeft) * 0.5;
        const pts = Math.max(10, Math.round(80 - (attempts - 1) * 15 + timePts));
        addScore(pts);
        setFeedback(`✨ Bonne réponse ! +${pts} pts`, true);
        document.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
        setTimeout(nextStep, 900);
      } else {
        btn.classList.add("wrong");
        setFeedback("❌ Essaie encore…");
        setTimeout(() => { btn.classList.remove("wrong"); btn.disabled = true; }, 700);
        if (attempts >= 3) showHint(step);
      }
    };

    content.appendChild(btn);
  });

  document.getElementById("validateBtn").style.display = "none";
}

// ============================================================
//  MEMORY
// ============================================================
function createMemory(step) {
  const content = document.getElementById("gameContent");
  content.style.flexWrap = "unset";
  content.style.display  = "block";

  const cards = step.pairs.slice().sort(() => Math.random() - 0.5);
  let first = null, second = null, busy = false, matched = 0;

  const grid = document.createElement("div");
  grid.classList.add("memory-grid");

  cards.forEach(val => {
    const cell = document.createElement("div");
    cell.classList.add("memory-cell");
    cell.dataset.val = val;
    cell.setAttribute("aria-label", "Carte retournée");

    cell.onclick = () => {
      if (busy || cell.classList.contains("matched") || cell === first) return;
      cell.innerText = EMOJIS[val] || val;
      cell.classList.add("flipped");

      if (!first) {
        first = cell;
      } else {
        second = cell;
        busy = true;

        if (first.dataset.val === second.dataset.val) {
          first.classList.add("matched");
          second.classList.add("matched");
          matched += 2;
          first = second = null;
          busy  = false;
          if (matched === cards.length) {
            addScore(50);
            setFeedback("✨ Toutes les paires trouvées ! +50 pts", true);
            setTimeout(nextStep, 900);
          }
        } else {
          const f = first, s = second;
          setTimeout(() => {
            f.innerText = ""; f.classList.remove("flipped");
            s.innerText = ""; s.classList.remove("flipped");
            first = second = null;
            busy  = false;
          }, 750);
        }
      }
    };

    grid.appendChild(cell);
  });

  content.appendChild(grid);
  document.getElementById("validateBtn").style.display = "none";
  if (document.getElementById("hintBtn"))
    document.getElementById("hintBtn").style.display = "none";
}

// ============================================================
//  PUZZLE
// ============================================================
function createPuzzle(step) {
  const content = document.getElementById("gameContent");
  content.style.display = "block";

  const w  = Math.min(window.innerWidth * 0.82, 360);
  const n  = step.size || 3;
  const ps = Math.floor(w / n);

  const container = document.createElement("div");
  container.classList.add("puzzle-container");
  container.style.gridTemplateColumns = `repeat(${n}, ${ps}px)`;
  container.style.width = `${ps * n}px`;

  let indices = [...Array(n * n).keys()].sort(() => Math.random() - 0.5);

  indices.forEach((idx, pos) => {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.style.width  = `${ps}px`;
    piece.style.height = `${ps}px`;
    piece.style.backgroundImage    = `url(${step.image})`;
    piece.style.backgroundSize     = `${ps * n}px ${ps * n}px`;
    piece.style.backgroundPosition =
      `-${(idx % n) * ps}px -${Math.floor(idx / n) * ps}px`;
    piece.dataset.correct = idx;
    piece.dataset.pos     = pos;
    piece.addEventListener("click", handlePieceClick);
    container.appendChild(piece);
  });

  content.appendChild(container);
  document.getElementById("validateBtn").style.display = "none";
}

let firstPiece = null;
function handlePieceClick(e) {
  const clicked = e.currentTarget;
  if (!firstPiece) {
    firstPiece = clicked;
    clicked.classList.add("selected");
  } else {
    // Swap background positions
    const tmpBg  = clicked.style.backgroundPosition;
    const tmpIdx = clicked.dataset.correct;
    clicked.style.backgroundPosition  = firstPiece.style.backgroundPosition;
    clicked.dataset.correct            = firstPiece.dataset.correct;
    firstPiece.style.backgroundPosition = tmpBg;
    firstPiece.dataset.correct           = tmpIdx;
    firstPiece.classList.remove("selected");
    firstPiece = null;
    checkPuzzle();
  }
}

function checkPuzzle() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  for (let i = 0; i < pieces.length; i++) {
    if (parseInt(pieces[i].dataset.correct) !== parseInt(pieces[i].dataset.pos)) return;
  }
  addScore(60);
  setFeedback("✨ Puzzle résolu ! +60 pts", true);
  setTimeout(nextStep, 900);
}

// ============================================================
//  NEXT STEP
// ============================================================
function nextStep() {
  clearInterval(timerInterval);
  console.log("currentPlayer =", currentPlayer);
  const card = document.getElementById("card");
  card.classList.add("hidden");

  setTimeout(() => {
    current++;
    const steps = getSteps();
    if (current >= steps.length) { showVictory(); return; }
    loadStep();
    card.classList.remove("hidden");
  }, 380);
}

// ============================================================
//  VICTOIRE + CONFETTIS
// ============================================================
function showVictory() {
  clearInterval(timerInterval);
  const card = document.getElementById("card");
  const name = currentPlayer === "alex" ? "Alex" : "Clémence";

  // Vidéo selon le joueur
const videoSrc = currentPlayer === "alex"
  ? "images/alex.mp4"
  : "images/clemence.mp4";

  card.classList.remove("hidden");
  card.innerHTML = `
    <div class="victory-card">
      <span class="trophy">🏆</span>
      <h2>Félicitations, ${name} !</h2>
      <p>Tu as relevé tous les défis avec brio.<br>Score final : <strong>${score} pts</strong></p>
      <p style="margin-top:12px;font-style:italic;opacity:0.75;">
        Tu pensais vraiment que le jeu était terminé ? <br>  Ce n'est que le début ... regarde la vidéo 🔊
      </p>
      <video controls style="width:100%; margin-top:20px; border-radius:12px;">
        <source src="${videoSrc}" type="video/mp4">
        Ton navigateur ne supporte pas la vidéo.
      </video>
      <p style="margin-top:20px;font-size:2.2rem;letter-spacing:0.2em;">💍 🌹 💐</p>
      <button class="btn-reset" onclick="returnToMenu()" style="margin-top:24px;opacity:0.7;">
        ← Changer de joueur
      </button>
    </div>
  `;
  launchConfetti();
}

function launchConfetti() {
  const symbols = ["🌸","🌷","💐","✨","💍","🎊","🥂","🌹","🕊️","💌"];
  const container = document.getElementById("petalsBg");
  container.innerHTML = "";

  for (let i = 0; i < 45; i++) {
    const p = document.createElement("div");
    p.classList.add("petal");
    p.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left             = Math.random() * 100 + "vw";
    p.style.animationDuration = (3 + Math.random() * 5) + "s";
    p.style.animationDelay   = (Math.random() * 3) + "s";
    p.style.fontSize          = (1 + Math.random() * 1.5) + "rem";
    container.appendChild(p);
  }
}

// ============================================================
//  FEEDBACK
// ============================================================
function setFeedback(msg, ok = false) {
  const fb = document.getElementById("feedback");
  fb.innerText  = msg;
  fb.className  = ok ? "feedback ok" : "feedback";
}

// ============================================================
//  RESET / MENU
// ============================================================
function resetGame() {
  clearInterval(timerInterval);
  score   = 0;
  current = 0;
  updateScoreDisplay();
  const card = document.getElementById("card");
  card.classList.add("hidden");
  setTimeout(() => { loadStep(); card.classList.remove("hidden"); }, 300);
}

function returnToMenu() {
  clearInterval(timerInterval);
  currentPlayer = null;
  current       = 0;
  score         = 0;

  // Restaure le HTML de la card (écrasé par showVictory)
  document.getElementById("card").innerHTML = `
    <div class="card-top">
      <div id="lock" class="lock-icon">🔒</div>
      <div class="step-label" id="stepLabel"></div>
    </div>
    <h2 id="title" class="card-title"></h2>
    <p id="description" class="card-desc"></p>
    <div id="gameContent" class="game-content"></div>
    <div id="hintBox" class="hint-box" style="display:none;"></div>
    <button onclick="validate()" id="validateBtn" class="btn-main">🔓 Déverrouiller</button>
    <button id="hintBtn" class="btn-hint" style="display:none;"
      onclick="showHint(getSteps()[current])">💡 Voir un indice</button>
    <p id="feedback" class="feedback"></p>
  `;

  document.getElementById("gameScreen").classList.add("hidden");
  const ps = document.getElementById("playerSelect");
  ps.style.display   = "flex";
  ps.style.animation = "fadeUp 0.5s ease";
}

// ============================================================
//  KEYBOARD NAVIGATION
// ============================================================
document.addEventListener("input", e => {
  if (!e.target.classList.contains("digit")) return;
  e.target.value = e.target.value.slice(-1).toUpperCase();
  if (e.target.value) {
    const next = e.target.nextElementSibling;
    if (next?.classList.contains("digit")) next.focus();
  }
});

document.addEventListener("focusin", e => {
  if (e.target.classList.contains("digit"))
    setTimeout(() => e.target.select(), 0);
});

document.addEventListener("keydown", e => {
  if (!e.target.classList.contains("digit")) return;
  if (e.key === "Backspace" && !e.target.value) {
    const prev = e.target.previousElementSibling;
    if (prev?.classList.contains("digit")) prev.focus();
  }
  if (e.key === "Enter") validate();
});

// ============================================================
//  PÉTALES
// ============================================================
function spawnPetals() {
  const container = document.getElementById("petalsBg");
  container.innerHTML = "";
  const symbols = ["🌸","🌷","🌹","✿","❀","🍃"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.classList.add("petal");
    p.innerText              = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left             = Math.random() * 100 + "vw";
    p.style.animationDuration = (8 + Math.random() * 10) + "s";
    p.style.animationDelay   = (Math.random() * 14) + "s";
    p.style.fontSize          = (0.8 + Math.random() * 1) + "rem";
    container.appendChild(p);
  }
}