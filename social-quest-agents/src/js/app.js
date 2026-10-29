(function () {
  "use strict";

  const STORAGE_KEYS = {
    seen: "socialQuest.seen",
    completed: "socialQuest.completed"
  };

  const LEAVE_DURATION_MS = 150;

  const DIFFICULTY_LABELS = {
    facil: "Fácil",
    media: "Media",
    dificil: "Difícil"
  };

  const elements = {
    eventName: document.getElementById("event-name"),
    eventSubtitle: document.getElementById("event-subtitle"),
    screenWelcome: document.getElementById("screen-welcome"),
    screenChallenge: document.getElementById("screen-challenge"),
    screenError: document.getElementById("screen-error"),
    card: document.getElementById("challenge-card"),
    category: document.getElementById("challenge-category"),
    difficulty: document.getElementById("challenge-difficulty"),
    icon: document.getElementById("challenge-icon"),
    text: document.getElementById("challenge-text"),
    status: document.getElementById("challenge-status"),
    counter: document.getElementById("completed-counter"),
    btnDiscover: document.getElementById("btn-discover"),
    btnComplete: document.getElementById("btn-complete"),
    btnNext: document.getElementById("btn-next"),
    btnRetry: document.getElementById("btn-retry"),
    btnReset: document.getElementById("btn-reset")
  };

  const state = {
    challenges: [],
    currentChallenge: null,
    seenChallengeIds: [],
    completedChallengeIds: [],
    isTransitioning: false
  };

  // --- localStorage ---

  function readIds(key, validIds) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((id) => validIds.has(id));
    } catch (error) {
      return [];
    }
  }

  function saveIds(key, ids) {
    try {
      localStorage.setItem(key, JSON.stringify(ids));
    } catch (error) {
      // Sin almacenamiento disponible: el progreso solo dura esta visita.
    }
  }

  function saveProgress() {
    saveIds(STORAGE_KEYS.seen, state.seenChallengeIds);
    saveIds(STORAGE_KEYS.completed, state.completedChallengeIds);
  }

  // --- Datos ---

  function loadChallenges() {
    const data = window.SOCIAL_QUEST_CHALLENGES;
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item && typeof item.id === "string" && typeof item.text === "string");
  }

  function loadState() {
    state.challenges = loadChallenges();
    const validIds = new Set(state.challenges.map((challenge) => challenge.id));
    state.seenChallengeIds = readIds(STORAGE_KEYS.seen, validIds);
    state.completedChallengeIds = readIds(STORAGE_KEYS.completed, validIds);
  }

  // --- Selección ---

  function getAvailableChallenges() {
    const currentId = state.currentChallenge && state.currentChallenge.id;
    return state.challenges.filter(
      (challenge) => challenge.id !== currentId && !state.seenChallengeIds.includes(challenge.id)
    );
  }

  function pickNextChallenge() {
    let available = getAvailableChallenges();

    if (available.length === 0) {
      state.seenChallengeIds = [];
      available = getAvailableChallenges();
    }

    if (available.length === 0) return state.currentChallenge;

    const next = available[Math.floor(Math.random() * available.length)];
    state.seenChallengeIds.push(next.id);
    return next;
  }

  // --- Interfaz ---

  function showScreen(screen) {
    [elements.screenWelcome, elements.screenChallenge, elements.screenError].forEach((item) => {
      item.hidden = item !== screen;
    });
  }

  function renderEvent() {
    const event = window.SOCIAL_QUEST_EVENT || {};
    if (event.name) {
      elements.eventName.textContent = event.name;
      document.title = event.name;
    }
    elements.eventSubtitle.textContent = event.subtitle || "";
    elements.eventSubtitle.hidden = !event.subtitle;
  }

  function renderCounter() {
    const total = state.completedChallengeIds.length;
    elements.counter.textContent = total === 1 ? "1 desafío cumplido" : `${total} desafíos cumplidos`;
    elements.counter.hidden = total === 0;
    elements.btnReset.hidden = total === 0 && state.seenChallengeIds.length === 0;
  }

  function renderChallenge() {
    const challenge = state.currentChallenge;
    const isCompleted = state.completedChallengeIds.includes(challenge.id);

    elements.category.textContent = challenge.category || "Desafío";
    elements.difficulty.textContent = DIFFICULTY_LABELS[challenge.difficulty] || "";
    elements.difficulty.hidden = !DIFFICULTY_LABELS[challenge.difficulty];
    elements.icon.textContent = challenge.icon || "";
    elements.icon.hidden = !challenge.icon;
    elements.text.textContent = challenge.text;

    renderCompletedState(isCompleted);
  }

  function renderCompletedState(isCompleted) {
    elements.card.classList.toggle("is-completed", isCompleted);
    elements.status.hidden = !isCompleted;
    elements.btnComplete.disabled = isCompleted;
    elements.btnComplete.textContent = isCompleted ? "✓ Cumplido" : "Cumplido";
  }

  function playEnterAnimation() {
    elements.card.classList.remove("is-leaving", "is-entering");
    // Fuerza el reinicio de la animación de entrada.
    void elements.card.offsetWidth;
    elements.card.classList.add("is-entering");
  }

  function setControlsDisabled(disabled) {
    elements.btnNext.disabled = disabled;
    elements.btnComplete.disabled = disabled || state.completedChallengeIds.includes(state.currentChallenge.id);
  }

  function showNextChallenge() {
    if (state.isTransitioning) return;

    if (state.challenges.length === 0) {
      showScreen(elements.screenError);
      return;
    }

    const isFirst = elements.screenChallenge.hidden;
    state.currentChallenge = pickNextChallenge();
    saveProgress();

    if (isFirst) {
      renderChallenge();
      showScreen(elements.screenChallenge);
      playEnterAnimation();
      renderCounter();
      return;
    }

    state.isTransitioning = true;
    setControlsDisabled(true);
    elements.card.classList.add("is-leaving");

    window.setTimeout(() => {
      renderChallenge();
      playEnterAnimation();
      state.isTransitioning = false;
      setControlsDisabled(false);
      renderCounter();
    }, LEAVE_DURATION_MS);
  }

  // --- Acciones ---

  function completeChallenge() {
    const challenge = state.currentChallenge;
    if (!challenge || state.completedChallengeIds.includes(challenge.id)) return;

    state.completedChallengeIds.push(challenge.id);
    saveProgress();
    renderCompletedState(true);
    renderCounter();
  }

  function resetProgress() {
    if (!window.confirm("¿Reiniciar tu progreso en este celular?")) return;

    state.seenChallengeIds = [];
    state.completedChallengeIds = [];
    state.currentChallenge = null;
    saveProgress();
    renderCounter();
    showScreen(elements.screenWelcome);
  }

  function retryLoad() {
    loadState();
    if (state.challenges.length === 0) return;
    showScreen(elements.screenWelcome);
    renderCounter();
  }

  // --- Inicio ---

  function init() {
    renderEvent();
    loadState();
    renderCounter();

    elements.btnDiscover.addEventListener("click", showNextChallenge);
    elements.btnNext.addEventListener("click", showNextChallenge);
    elements.btnComplete.addEventListener("click", completeChallenge);
    elements.btnRetry.addEventListener("click", retryLoad);
    elements.btnReset.addEventListener("click", resetProgress);

    if (state.challenges.length === 0) showScreen(elements.screenError);
  }

  init();
})();
