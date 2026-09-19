/**
 * SpeakSphere ESL: Interactive Grammar Speaking Lab
 * Application Logic & Web Audio / Speech Integration
 */

(() => {
  'use strict';

  // =========================================================================
  // Application State
  // =========================================================================
  let customQuestions = [];
  try {
    const saved = localStorage.getItem('esl_custom_questions');
    if (saved) customQuestions = JSON.parse(saved);
  } catch (e) {
    console.warn('Could not load custom questions from localStorage:', e);
  }

  let allQuestions = [...(window.ESL_QUESTIONS || []), ...customQuestions];
  let currentFilter = 'all';
  let filteredQuestions = [...allQuestions];
  let currentIndex = 0;

  // Bookmarks & Mastered storage
  let favorites = new Set();
  let spokenSet = new Set();
  try {
    const favSaved = localStorage.getItem('esl_favorites');
    if (favSaved) favorites = new Set(JSON.parse(favSaved));
    const spokenSaved = localStorage.getItem('esl_spoken');
    if (spokenSaved) spokenSet = new Set(JSON.parse(spokenSaved));
  } catch (e) {
    console.warn('Could not load user data from localStorage:', e);
  }

  let currentMode = 'studio';

  // Media Recording & Timer variables
  let mediaRecorder = null;
  let audioChunks = [];
  let recordingInterval = null;
  let recordingSeconds = 0;
  let isRecording = false;

  // Challenge Timer variables
  let timerInterval = null;
  let timerState = 'idle'; // 'prep' | 'speak' | 'paused' | 'idle'
  let timerSecondsLeft = 15;
  let timerTotalDuration = 15;
  let timerQuestion = null;

  // Web Audio Context for Chimes (Zero external sound dependencies)
  let audioCtx = null;
  function playTone(freq = 440, type = 'sine', duration = 0.2, gainValue = 0.15) {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      console.warn('Audio tone error:', err);
    }
  }

  function playChimeSequence(type = 'start') {
    if (type === 'start') {
      playTone(523.25, 'sine', 0.15, 0.12); // C5
      setTimeout(() => playTone(659.25, 'sine', 0.25, 0.15), 120); // E5
    } else if (type === 'prep-end') {
      playTone(440, 'triangle', 0.1, 0.1);
      setTimeout(() => playTone(880, 'triangle', 0.3, 0.2), 150);
    } else if (type === 'finish') {
      playTone(587.33, 'sine', 0.15, 0.12); // D5
      setTimeout(() => playTone(783.99, 'sine', 0.15, 0.12), 120); // G5
      setTimeout(() => playTone(1046.50, 'sine', 0.4, 0.2), 240); // C6
    }
  }

  // =========================================================================
  // DOM Elements Selection
  // =========================================================================
  const elements = {
    // Mode views
    views: {
      studio: document.getElementById('mode-studio'),
      directory: document.getElementById('mode-directory'),
      timer: document.getElementById('mode-timer'),
      dice: document.getElementById('mode-dice'),
      guide: document.getElementById('mode-guide'),
    },
    modeTabs: document.querySelectorAll('.mode-tab-btn'),
    filterChips: document.querySelectorAll('.filter-chip'),

    // Top Header & Actions
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    themeText: document.getElementById('themeText'),
    printBtn: document.getElementById('printBtn'),
    statsBtn: document.getElementById('statsBtn'),
    statsLabel: document.getElementById('statsLabel'),
    addCustomBtn: document.getElementById('addCustomBtn'),

    // Card Studio Elements
    speakingCard: document.getElementById('mainSpeakingCard'),
    cardCategoryTag: document.getElementById('cardCategoryTag'),
    cardLevelTag: document.getElementById('cardLevelTag'),
    cardThemeTag: document.getElementById('cardThemeTag'),
    cardFavoriteBtn: document.getElementById('cardFavoriteBtn'),
    cardMasteredBtn: document.getElementById('cardMasteredBtn'),
    cardPromptTitle: document.getElementById('cardPromptTitle'),
    cardQuestionContent: document.getElementById('cardQuestionContent'),
    ttsPlayBtn: document.getElementById('ttsPlayBtn'),
    ttsLabel: document.getElementById('ttsLabel'),
    ttsIcon: document.getElementById('ttsIcon'),
    ttsSpeedSelect: document.getElementById('ttsSpeedSelect'),
    studioCounter: document.getElementById('studioCounter'),
    prevCardBtn: document.getElementById('prevCardBtn'),
    nextCardBtn: document.getElementById('nextCardBtn'),
    randomCardBtn: document.getElementById('randomCardBtn'),

    // Card Drawer Tabs & Panes
    drawerTabs: document.querySelectorAll('.drawer-tab'),
    paneStarters: document.getElementById('pane-starters'),
    paneTip: document.getElementById('pane-tip'),
    paneFollowups: document.getElementById('pane-followups'),
    paneRecord: document.getElementById('pane-record'),
    startersContainer: document.getElementById('startersContainer'),
    grammarRuleTitle: document.getElementById('grammarRuleTitle'),
    grammarRuleBody: document.getElementById('grammarRuleBody'),
    grammarKeywords: document.getElementById('grammarKeywords'),
    followupsContainer: document.getElementById('followupsContainer'),
    followupCount: document.getElementById('followupCount'),

    // Voice Studio Elements
    recordToggleBtn: document.getElementById('recordToggleBtn'),
    recBtnLabel: document.getElementById('recBtnLabel'),
    recIcon: document.getElementById('recIcon'),
    recordingTimer: document.getElementById('recordingTimer'),
    audioPlaybackContainer: document.getElementById('audioPlaybackContainer'),
    audioPlayback: document.getElementById('audioPlayback'),
    speechToTextBtn: document.getElementById('speechToTextBtn'),
    speechFeedbackBox: document.getElementById('speechFeedbackBox'),
    transcriptText: document.getElementById('transcriptText'),
    grammarDetectedAlert: document.getElementById('grammarDetectedAlert'),

    // Directory Mode Elements
    directoryGrid: document.getElementById('directoryGrid'),
    directorySearchInput: document.getElementById('directorySearchInput'),
    levelFilterSelect: document.getElementById('levelFilterSelect'),
    themeFilterSelect: document.getElementById('themeFilterSelect'),
    statusFilterSelect: document.getElementById('statusFilterSelect'),

    // Timed Challenge Elements
    timerPhaseBadge: document.getElementById('timerPhaseBadge'),
    timerDisplay: document.getElementById('timerDisplay'),
    timerProgressFill: document.getElementById('timerProgressFill'),
    timerQuestionTitle: document.getElementById('timerQuestionTitle'),
    timerQuestionText: document.getElementById('timerQuestionText'),
    prepTimeSelect: document.getElementById('prepTimeSelect'),
    speakTimeSelect: document.getElementById('speakTimeSelect'),
    startTimerBtn: document.getElementById('startTimerBtn'),
    pauseTimerBtn: document.getElementById('pauseTimerBtn'),
    resetTimerBtn: document.getElementById('resetTimerBtn'),
    newTimerPromptBtn: document.getElementById('newTimerPromptBtn'),

    // Classroom Dice Elements
    rollDiceBtn: document.getElementById('rollDiceBtn'),
    diceCategoryTag: document.getElementById('diceCategoryTag'),
    diceLevelTag: document.getElementById('diceLevelTag'),
    dicePromptTitle: document.getElementById('dicePromptTitle'),
    diceQuestionText: document.getElementById('diceQuestionText'),
    diceFollowupSuggestion: document.getElementById('diceFollowupSuggestion'),
    diceStarterSuggestion: document.getElementById('diceStarterSuggestion'),
    openInStudioBtn: document.getElementById('openInStudioBtn'),
    diceTtsBtn: document.getElementById('diceTtsBtn'),

    // Grammar Guide Elements
    cheatSheetsGrid: document.getElementById('cheatSheetsGrid'),

    // Custom Modal Elements
    customPromptModal: document.getElementById('customPromptModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelModalBtn: document.getElementById('cancelModalBtn'),
    customPromptForm: document.getElementById('customPromptForm'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // =========================================================================
  // Utilities: Toast Notification
  // =========================================================================
  function showToast(message, icon = 'ℹ️', duration = 3000) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // Theme Management (Dark / Light)
  // =========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('esl_theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    elements.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      showToast(`Switched to ${next} theme`, next === 'dark' ? '🌙' : '☀️', 1500);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('esl_theme', theme);
    if (elements.themeIcon && elements.themeText) {
      if (theme === 'dark') {
        elements.themeIcon.textContent = '☀️';
        elements.themeText.textContent = 'Light';
      } else {
        elements.themeIcon.textContent = '🌙';
        elements.themeText.textContent = 'Dark';
      }
    }
  }

  // =========================================================================
  // Filtering & Category Badges
  // =========================================================================
  function updateBadgeCounts() {
    const counts = {
      'all': allQuestions.length,
      'present-modals': 0,
      'present-perfect': 0,
      'past-simple': 0,
      'past-perfect': 0,
      'mixed-contrast': 0
    };

    allQuestions.forEach(q => {
      if (counts[q.grammar] !== undefined) counts[q.grammar]++;
    });

    Object.keys(counts).forEach(key => {
      const badge = document.getElementById(`badge-${key}`);
      if (badge) badge.textContent = counts[key];
    });

    // Update top stats
    if (elements.statsLabel) {
      elements.statsLabel.textContent = `${spokenSet.size}/${allQuestions.length} Spoken`;
    }
  }

  function filterQuestions(category) {
    currentFilter = category;
    if (category === 'all') {
      filteredQuestions = [...allQuestions];
    } else {
      filteredQuestions = allQuestions.filter(q => q.grammar === category);
    }

    // Reset index if out of bounds
    currentIndex = 0;
    renderCurrentCard();
    renderDirectory();
    renderDicePrompt();
  }

  // =========================================================================
  // MODE 1: Card Studio Rendering
  // =========================================================================
  function renderCurrentCard() {
    if (filteredQuestions.length === 0) {
      elements.cardPromptTitle.textContent = "No questions found";
      elements.cardQuestionContent.textContent = "Try selecting another topic filter above or reset your search parameters.";
      elements.studioCounter.textContent = "0 of 0";
      return;
    }

    const q = filteredQuestions[currentIndex];
    const catMeta = (window.GRAMMAR_CATEGORIES && window.GRAMMAR_CATEGORIES[q.grammar]) || {};

    // Accent colors
    const accentColor = catMeta.color || '#4f46e5';
    elements.speakingCard.style.setProperty('--card-accent', accentColor);
    elements.speakingCard.style.setProperty('--card-accent-bg', `${accentColor}18`);

    // Meta tags
    elements.cardCategoryTag.textContent = q.categoryLabel || catMeta.label || 'Grammar';
    elements.cardLevelTag.textContent = q.level || 'B2';
    elements.cardThemeTag.textContent = q.theme || 'Speaking';

    // Titles and Question
    elements.cardPromptTitle.textContent = q.title;
    elements.cardQuestionContent.textContent = q.question;

    // Counter
    elements.studioCounter.textContent = `Question ${currentIndex + 1} of ${filteredQuestions.length}`;

    // Bookmarks and Mastered states
    const isFav = favorites.has(q.id);
    elements.cardFavoriteBtn.classList.toggle('active', isFav);
    elements.cardFavoriteBtn.title = isFav ? "Remove Bookmark" : "Bookmark Prompt";

    const isSpoken = spokenSet.has(q.id);
    elements.cardMasteredBtn.classList.toggle('mastered-active', isSpoken);
    elements.cardMasteredBtn.title = isSpoken ? "Marked as Spoken (Click to reset)" : "Mark as Spoken";

    // Drawer Tabs: Sentence Starters
    elements.startersContainer.innerHTML = '';
    if (q.sentenceStarters && q.sentenceStarters.length > 0) {
      q.sentenceStarters.forEach(starter => {
        const item = document.createElement('div');
        item.className = 'starter-item';
        item.innerHTML = `
          <span>${starter}</span>
          <button class="copy-starter-btn" title="Copy to clipboard">Copy</button>
        `;
        const copyBtn = item.querySelector('.copy-starter-btn');
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(starter).then(() => {
            showToast('Sentence starter copied!', '📋', 2000);
          }).catch(() => {
            showToast('Selected: ' + starter, '💬', 2000);
          });
        });
        elements.startersContainer.appendChild(item);
      });
    } else {
      elements.startersContainer.innerHTML = '<p style="color: var(--text-muted);">Formulate your response starting with an affirmative phrase.</p>';
    }

    // Drawer Tabs: Grammar Tip
    elements.grammarRuleTitle.textContent = `Target: ${catMeta.label || q.categoryLabel}`;
    elements.grammarRuleBody.textContent = q.grammarTip || catMeta.usage || 'Practice standard natural conversational responses.';

    elements.grammarKeywords.innerHTML = '';
    if (q.targetKeywords && q.targetKeywords.length > 0) {
      q.targetKeywords.forEach(kw => {
        const kwBadge = document.createElement('span');
        kwBadge.className = 'kw-badge';
        kwBadge.textContent = kw;
        elements.grammarKeywords.appendChild(kwBadge);
      });
    }

    // Drawer Tabs: Follow-up Questions
    elements.followupsContainer.innerHTML = '';
    if (q.followUps && q.followUps.length > 0) {
      elements.followupCount.textContent = q.followUps.length;
      q.followUps.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        elements.followupsContainer.appendChild(li);
      });
    } else {
      elements.followupCount.textContent = '0';
      elements.followupsContainer.innerHTML = '<li style="color: var(--text-muted);">No follow-up questions recorded.</li>';
    }

    // Reset recording UI for new card
    resetVoiceStudio();
  }

  // =========================================================================
  // Text to Speech (TTS) Native Integration
  // =========================================================================
  let isSpeaking = false;

  function speakText(text, rate = 1.0) {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-Speech is not supported in this browser.', '⚠️', 3000);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    if (isSpeaking) {
      isSpeaking = false;
      updateTtsBtnUI(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(rate) || 1.0;
    utterance.lang = 'en-US';

    // Attempt to pick a natural English voice
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      isSpeaking = true;
      updateTtsBtnUI(true);
    };

    utterance.onend = () => {
      isSpeaking = false;
      updateTtsBtnUI(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      isSpeaking = false;
      updateTtsBtnUI(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  function updateTtsBtnUI(speaking) {
    if (speaking) {
      elements.ttsPlayBtn.classList.add('speaking');
      elements.ttsLabel.textContent = 'Stop Reading';
      elements.ttsIcon.textContent = '⏹️';
    } else {
      elements.ttsPlayBtn.classList.remove('speaking');
      elements.ttsLabel.textContent = 'Listen to Prompt';
      elements.ttsIcon.textContent = '🔊';
    }
  }

  // =========================================================================
  // Voice Recording (MediaRecorder API) & Grammar Check
  // =========================================================================
  function resetVoiceStudio() {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
    isRecording = false;
    clearInterval(recordingInterval);
    recordingSeconds = 0;
    if (elements.recordingTimer) elements.recordingTimer.textContent = '00:00';
    if (elements.recBtnLabel) elements.recBtnLabel.textContent = 'Record Your Answer';
    if (elements.recIcon) elements.recIcon.textContent = '⏺️';
    if (elements.recordToggleBtn) elements.recordToggleBtn.classList.remove('recording');
    if (elements.audioPlaybackContainer) elements.audioPlaybackContainer.style.display = 'none';
    if (elements.speechFeedbackBox) elements.speechFeedbackBox.style.display = 'none';
  }

  async function toggleVoiceRecording() {
    if (isRecording) {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      clearInterval(recordingInterval);
      isRecording = false;
      elements.recordToggleBtn.classList.remove('recording');
      elements.recBtnLabel.textContent = 'Record New Take';
      elements.recIcon.textContent = '⏺️';
      showToast('Recording finished! Play back to review your answer.', '🎙️', 3000);
      return;
    }

    // Start recording
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('Microphone access is not available in this environment.', '⚠️', 4000);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        elements.audioPlayback.src = audioUrl;
        elements.audioPlaybackContainer.style.display = 'block';

        // Auto mark question as practiced/spoken
        if (filteredQuestions[currentIndex]) {
          markAsSpoken(filteredQuestions[currentIndex].id, true);
        }

        // Release tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      isRecording = true;
      recordingSeconds = 0;
      elements.recordToggleBtn.classList.add('recording');
      elements.recBtnLabel.textContent = 'Stop Recording';
      elements.recIcon.textContent = '⏹️';
      playTone(660, 'sine', 0.1, 0.1);

      recordingInterval = setInterval(() => {
        recordingSeconds++;
        const mins = String(Math.floor(recordingSeconds / 60)).padStart(2, '0');
        const secs = String(recordingSeconds % 60).padStart(2, '0');
        elements.recordingTimer.textContent = `${mins}:${secs}`;
      }, 1000);

    } catch (err) {
      console.warn('Microphone permission error:', err);
      showToast('Microphone access denied or unavailable.', '⚠️', 4000);
    }
  }

  // Web Speech Recognition for Real-Time Grammar Structure Checking
  function runSpeechRecognitionCheck() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Live speech recognition is not supported in this browser.', 'ℹ️', 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    elements.speechFeedbackBox.style.display = 'block';
    elements.transcriptText.textContent = 'Listening... Speak your English response now into your microphone!';
    elements.grammarDetectedAlert.innerHTML = '';
    elements.speechToTextBtn.classList.add('active');

    recognition.onstart = () => {
      playTone(550, 'sine', 0.1, 0.08);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      elements.transcriptText.textContent = `"${speechResult}"`;
      analyzeGrammarInText(speechResult);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      elements.transcriptText.textContent = `Speech detection notice: ${event.error}. You can still practice speaking freely!`;
      elements.speechToTextBtn.classList.remove('active');
    };

    recognition.onend = () => {
      elements.speechToTextBtn.classList.remove('active');
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn('Recognition already started:', e);
    }
  }

  function analyzeGrammarInText(text) {
    const q = filteredQuestions[currentIndex];
    if (!q) return;

    const lower = text.toLowerCase();
    const detected = [];

    // Check target keywords
    if (q.targetKeywords) {
      q.targetKeywords.forEach(kw => {
        if (lower.includes(kw.toLowerCase())) {
          detected.push(kw);
        }
      });
    }

    // Also check category patterns
    if (q.grammar === 'present-modals') {
      const modalVerbs = ['should', 'must', 'have to', 'has to', 'can', 'could', 'might', 'may', 'ought to', 'had better'];
      modalVerbs.forEach(mv => {
        if (lower.includes(mv) && !detected.includes(mv)) detected.push(mv);
      });
    } else if (q.grammar === 'present-perfect') {
      if (/\b(have|has|haven't|hasn't|'ve|'s)\b.*\b(been|seen|done|visited|worked|lived|tried|had|met|gone)\b/.test(lower) ||
          lower.includes('since') || lower.includes('for') || lower.includes('already') || lower.includes('ever') || lower.includes('never')) {
        detected.push('Present Perfect structure');
      }
    } else if (q.grammar === 'past-perfect') {
      if (/\b(had|hadn't|'d)\b.*\b(been|seen|done|left|gone|finished|started|arrived|heard|known)\b/.test(lower) ||
          lower.includes('had already') || lower.includes('by the time')) {
        detected.push('Past Perfect structure');
      }
    }

    if (detected.length > 0) {
      playTone(880, 'sine', 0.2, 0.12);
      elements.grammarDetectedAlert.innerHTML = `
        <span style="color: #10b981;">🎉 Target Grammar Detected!</span> 
        Used: <span style="font-family: monospace; color: var(--primary);">${detected.join(', ')}</span>
      `;
    } else {
      elements.grammarDetectedAlert.innerHTML = `
        <span style="color: var(--text-muted);">Good attempt! Try challenging yourself to also include: 
        <strong style="color: var(--primary);">${q.targetKeywords ? q.targetKeywords.slice(0, 3).join(', ') : 'target forms'}</strong></span>
      `;
    }
  }

  // =========================================================================
  // User Actions: Favorites & Mastered
  // =========================================================================
  function toggleFavorite(id) {
    if (favorites.has(id)) {
      favorites.delete(id);
      showToast('Removed from bookmarks', '⭐', 1500);
    } else {
      favorites.add(id);
      showToast('Saved to bookmarks!', '⭐', 1500);
    }
    localStorage.setItem('esl_favorites', JSON.stringify(Array.from(favorites)));
    renderCurrentCard();
    renderDirectory();
  }

  function markAsSpoken(id, explicit = false) {
    if (spokenSet.has(id)) {
      if (!explicit) {
        spokenSet.delete(id);
        showToast('Marked as unstudied', '↩️', 1500);
      }
    } else {
      spokenSet.add(id);
      showToast('Marked as spoken! Great practice!', '✓', 2000);
      playTone(784, 'sine', 0.15, 0.1);
    }
    localStorage.setItem('esl_spoken', JSON.stringify(Array.from(spokenSet)));
    updateBadgeCounts();
    renderCurrentCard();
    renderDirectory();
  }

  // =========================================================================
  // MODE 2: Question Directory Grid & Search Filtering
  // =========================================================================
  function renderDirectory() {
    if (!elements.directoryGrid) return;

    const searchTerm = (elements.directorySearchInput.value || '').trim().toLowerCase();
    const levelFilter = elements.levelFilterSelect.value;
    const themeFilter = elements.themeFilterSelect.value;
    const statusFilter = elements.statusFilterSelect.value;

    const matches = allQuestions.filter(q => {
      // Category filter check
      if (currentFilter !== 'all' && q.grammar !== currentFilter) return false;

      // CEFR level filter
      if (levelFilter !== 'all' && q.level !== levelFilter) return false;

      // Theme filter
      if (themeFilter !== 'all' && q.theme !== themeFilter) return false;

      // Status filter
      if (statusFilter === 'favorites' && !favorites.has(q.id)) return false;
      if (statusFilter === 'spoken' && !spokenSet.has(q.id)) return false;
      if (statusFilter === 'unspoken' && spokenSet.has(q.id)) return false;

      // Search term
      if (searchTerm) {
        const text = `${q.title} ${q.question} ${q.theme} ${q.grammar} ${q.targetKeywords ? q.targetKeywords.join(' ') : ''}`.toLowerCase();
        if (!text.includes(searchTerm)) return false;
      }

      return true;
    });

    elements.directoryGrid.innerHTML = '';

    if (matches.length === 0) {
      elements.directoryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.5rem;">No speaking prompts match your filters.</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try clearing your search query or selecting "All Topics".</p>
        </div>
      `;
      return;
    }

    matches.forEach(q => {
      const catMeta = (window.GRAMMAR_CATEGORIES && window.GRAMMAR_CATEGORIES[q.grammar]) || {};
      const isFav = favorites.has(q.id);
      const isDone = spokenSet.has(q.id);

      const card = document.createElement('div');
      card.className = 'grid-card';
      card.style.setProperty('--card-accent', catMeta.color || 'var(--primary)');

      card.innerHTML = `
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="category-tag" style="background: ${catMeta.color}15; color: ${catMeta.color}; font-size: 0.7rem;">
              ${catMeta.label || q.grammar}
            </span>
            <span class="level-tag" style="font-size: 0.7rem;">${q.level}</span>
          </div>
          <h4 class="grid-card-title">${q.title}</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.45;">
            ${q.question}
          </p>
        </div>

        <div class="grid-card-footer">
          <div style="display: flex; gap: 0.35rem;">
            <button class="icon-btn tts-card-btn" title="Listen" aria-label="Listen">
              <span>🔊</span>
            </button>
            <button class="icon-btn fav-card-btn ${isFav ? 'active' : ''}" title="Bookmark" aria-label="Bookmark">
              <span>⭐</span>
            </button>
            <button class="icon-btn spoken-card-btn ${isDone ? 'mastered-active' : ''}" title="Mark as spoken" aria-label="Spoken">
              <span>✓</span>
            </button>
          </div>
          <button class="action-btn open-studio-btn" style="padding: 0.35rem 0.7rem; font-size: 0.8rem;">
            <span>Practice</span> ↗
          </button>
        </div>
      `;

      // Event listeners
      card.querySelector('.tts-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        speakText(q.question, elements.ttsSpeedSelect ? elements.ttsSpeedSelect.value : 1.0);
      });

      card.querySelector('.fav-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(q.id);
      });

      card.querySelector('.spoken-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        markAsSpoken(q.id);
      });

      card.querySelector('.open-studio-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openQuestionInStudio(q.id);
      });

      elements.directoryGrid.appendChild(card);
    });
  }

  function openQuestionInStudio(id) {
    const idx = filteredQuestions.findIndex(q => q.id === id);
    if (idx !== -1) {
      currentIndex = idx;
    } else {
      // Find in allQuestions
      const fallbackIdx = allQuestions.findIndex(q => q.id === id);
      if (fallbackIdx !== -1) {
        currentFilter = 'all';
        filteredQuestions = [...allQuestions];
        elements.filterChips.forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
        currentIndex = fallbackIdx;
      }
    }
    switchMode('studio');
    renderCurrentCard();
  }

  // =========================================================================
  // MODE 3: Timed Speaking Challenge
  // =========================================================================
  function getRandomPrompt() {
    const pool = filteredQuestions.length > 0 ? filteredQuestions : allQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function initTimerPrompt() {
    timerQuestion = getRandomPrompt();
    if (timerQuestion) {
      elements.timerQuestionTitle.textContent = timerQuestion.title;
      elements.timerQuestionText.textContent = timerQuestion.question;
    }
    resetChallengeTimer();
  }

  function resetChallengeTimer() {
    clearInterval(timerInterval);
    timerState = 'idle';
    const prepSeconds = parseInt(elements.prepTimeSelect.value, 10) || 15;
    timerSecondsLeft = prepSeconds;
    timerTotalDuration = prepSeconds;

    elements.timerPhaseBadge.textContent = "Preparation Phase";
    elements.timerPhaseBadge.className = "timer-phase-badge prep";
    elements.timerDisplay.textContent = formatTime(timerSecondsLeft);
    elements.timerProgressFill.style.width = '100%';
    elements.timerProgressFill.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';

    elements.startTimerBtn.style.display = 'inline-flex';
    elements.pauseTimerBtn.style.display = 'none';
  }

  function startChallengeTimer() {
    if (timerState === 'idle') {
      const prepSeconds = parseInt(elements.prepTimeSelect.value, 10) || 15;
      timerSecondsLeft = prepSeconds;
      timerTotalDuration = prepSeconds;
      timerState = 'prep';
      playTone(523.25, 'sine', 0.2, 0.15);
      showToast('Preparation time started! Organize your thoughts and sentence frames.', '⏱️', 3000);
    } else if (timerState === 'paused') {
      timerState = elements.timerPhaseBadge.classList.contains('speak') ? 'speak' : 'prep';
    }

    elements.startTimerBtn.style.display = 'none';
    elements.pauseTimerBtn.style.display = 'inline-flex';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerSecondsLeft--;

      if (timerSecondsLeft <= 0) {
        if (timerState === 'prep') {
          // Switch to Speaking Phase!
          timerState = 'speak';
          const speakSeconds = parseInt(elements.speakTimeSelect.value, 10) || 60;
          timerSecondsLeft = speakSeconds;
          timerTotalDuration = speakSeconds;

          elements.timerPhaseBadge.textContent = "Speaking Phase - Speak Now!";
          elements.timerPhaseBadge.className = "timer-phase-badge speak";
          elements.timerProgressFill.style.background = 'linear-gradient(90deg, #10b981, #6366f1)';
          playChimeSequence('prep-end');
          showToast('Speak now! Answer the prompt continuously.', '🗣️', 3000);
        } else if (timerState === 'speak') {
          // Timer finished!
          clearInterval(timerInterval);
          timerState = 'idle';
          elements.timerDisplay.textContent = "00:00";
          elements.timerProgressFill.style.width = '0%';
          playChimeSequence('finish');
          showToast('Time is up! Outstanding speaking practice.', '🎉', 4000);

          if (timerQuestion) {
            markAsSpoken(timerQuestion.id, true);
          }

          elements.startTimerBtn.style.display = 'inline-flex';
          elements.pauseTimerBtn.style.display = 'none';
          return;
        }
      }

      // Update timer numbers and progress fill
      elements.timerDisplay.textContent = formatTime(timerSecondsLeft);
      const pct = Math.max(0, (timerSecondsLeft / timerTotalDuration) * 100);
      elements.timerProgressFill.style.width = `${pct}%`;

      // Tick sound in the final 3 seconds
      if (timerSecondsLeft <= 3 && timerSecondsLeft > 0) {
        playTone(700, 'triangle', 0.05, 0.06);
      }
    }, 1000);
  }

  function pauseChallengeTimer() {
    clearInterval(timerInterval);
    timerState = 'paused';
    elements.startTimerBtn.style.display = 'inline-flex';
    elements.pauseTimerBtn.style.display = 'none';
    elements.startTimerBtn.innerHTML = '<span aria-hidden="true">▶️</span> Resume';
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // =========================================================================
  // MODE 4: Classroom Dice / Pair-Work
  // =========================================================================
  let diceQuestion = null;

  function renderDicePrompt() {
    diceQuestion = getRandomPrompt();
    if (!diceQuestion) return;

    elements.dicePromptTitle.textContent = diceQuestion.title;
    elements.diceQuestionText.textContent = diceQuestion.question;
    elements.diceCategoryTag.textContent = diceQuestion.categoryLabel || diceQuestion.grammar;
    elements.diceLevelTag.textContent = diceQuestion.level || 'B2';

    // Partner suggestions
    if (diceQuestion.followUps && diceQuestion.followUps.length > 0) {
      elements.diceFollowupSuggestion.textContent = `"${diceQuestion.followUps[0]}"`;
    } else {
      elements.diceFollowupSuggestion.textContent = '"Why do you feel that way? Can you give a specific example?"';
    }

    if (diceQuestion.sentenceStarters && diceQuestion.sentenceStarters.length > 0) {
      elements.diceStarterSuggestion.textContent = `"${diceQuestion.sentenceStarters[0]}"`;
    } else {
      elements.diceStarterSuggestion.textContent = '"In my personal experience..."';
    }
  }

  function rollDiceAnimation() {
    elements.rollDiceBtn.classList.add('rolling');
    playTone(400, 'square', 0.08, 0.08);

    let rolls = 0;
    const interval = setInterval(() => {
      rolls++;
      const diceIcons = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅', '🎲'];
      elements.rollDiceBtn.textContent = diceIcons[rolls % diceIcons.length];
      playTone(450 + rolls * 30, 'square', 0.03, 0.05);

      if (rolls >= 8) {
        clearInterval(interval);
        elements.rollDiceBtn.classList.remove('rolling');
        elements.rollDiceBtn.textContent = '🎲';
        renderDicePrompt();
        playChimeSequence('start');
        showToast('New pair-work prompt selected!', '🎲', 2000);
      }
    }, 80);
  }

  // =========================================================================
  // MODE 5: Grammar Master Guide Rendering
  // =========================================================================
  function renderGrammarGuide() {
    if (!elements.cheatSheetsGrid || !window.GRAMMAR_CATEGORIES) return;

    elements.cheatSheetsGrid.innerHTML = '';
    const categories = ['present-modals', 'present-perfect', 'past-simple', 'past-perfect', 'mixed-contrast'];

    categories.forEach(catKey => {
      const cat = window.GRAMMAR_CATEGORIES[catKey];
      if (!cat) return;

      const card = document.createElement('div');
      card.className = 'cheat-sheet-card';
      card.style.borderTop = `4px solid ${cat.color}`;

      let rowsHtml = '';
      if (cat.cheatSheet) {
        rowsHtml = cat.cheatSheet.map(item => `
          <tr>
            <td><strong>${item.rule}</strong></td>
            <td><code style="font-size: 0.8rem;">${item.markers}</code></td>
            <td style="font-style: italic; color: var(--text-secondary);">${item.eg}</td>
          </tr>
        `).join('');
      }

      card.innerHTML = `
        <h3>
          <span style="color: ${cat.color};">${cat.label}</span>
          <span class="category-tag" style="background: ${cat.color}18; color: ${cat.color}; font-size: 0.72rem;">${cat.badge}</span>
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${cat.usage}</p>
        <div style="background: var(--bg-surface-subtle); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem;">
          Formula: <span style="color: ${cat.color};">${cat.formula}</span>
        </div>
        <table class="cheat-table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Key Markers</th>
              <th>Model Spoken Sentence</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;

      elements.cheatSheetsGrid.appendChild(card);
    });
  }

  // =========================================================================
  // Mode Switching
  // =========================================================================
  function switchMode(targetMode) {
    currentMode = targetMode;

    // Update navigation button active state
    elements.modeTabs.forEach(btn => {
      const isActive = btn.dataset.mode === targetMode;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Toggle panels
    Object.keys(elements.views).forEach(key => {
      const panel = elements.views[key];
      if (panel) {
        panel.style.display = (key === targetMode) ? 'block' : 'none';
      }
    });

    // Mode-specific on-activate hooks
    if (targetMode === 'directory') {
      renderDirectory();
    } else if (targetMode === 'timer') {
      initTimerPrompt();
    } else if (targetMode === 'dice') {
      renderDicePrompt();
    } else if (targetMode === 'guide') {
      renderGrammarGuide();
    }
  }

  // =========================================================================
  // Custom Question Creator Modal
  // =========================================================================
  function openCustomModal() {
    elements.customPromptModal.classList.add('active');
  }

  function closeCustomModal() {
    elements.customPromptModal.classList.remove('active');
    elements.customPromptForm.reset();
  }

  function handleCustomPromptSubmit(e) {
    e.preventDefault();
    const grammar = document.getElementById('customGrammarSelect').value;
    const title = document.getElementById('customTitleInput').value.trim();
    const question = document.getElementById('customQuestionInput').value.trim();
    const followupsRaw = document.getElementById('customFollowupInput').value;
    const startersRaw = document.getElementById('customStartersInput').value;

    if (!title || !question) {
      showToast('Please fill out all required fields.', '⚠️', 3000);
      return;
    }

    const followUps = followupsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const sentenceStarters = startersRaw.split('\n').map(s => s.trim()).filter(Boolean);

    const newQuestion = {
      id: `custom-${Date.now()}`,
      grammar,
      categoryLabel: (window.GRAMMAR_CATEGORIES && window.GRAMMAR_CATEGORIES[grammar]?.label) || grammar,
      title,
      question,
      followUps,
      level: "B2",
      theme: "Teacher Custom Prompt",
      grammarTip: "Created by instructor / learner for interactive speaking.",
      sentenceStarters: sentenceStarters.length > 0 ? sentenceStarters : ["In my view..."],
      targetKeywords: ["must", "have to", "have", "had", "did"]
    };

    customQuestions.push(newQuestion);
    allQuestions.push(newQuestion);
    try {
      localStorage.setItem('esl_custom_questions', JSON.stringify(customQuestions));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    updateBadgeCounts();
    filterQuestions(currentFilter);
    closeCustomModal();
    showToast('New question saved to library!', '🎉', 3000);

    // Jump to the new card
    openQuestionInStudio(newQuestion.id);
  }

  // =========================================================================
  // Event Listeners Setup
  // =========================================================================
  function setupEventListeners() {
    // Mode navigation
    elements.modeTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        playTone(480, 'sine', 0.05, 0.05);
        switchMode(btn.dataset.mode);
      });
    });

    // Category filter chips
    elements.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        playTone(550, 'sine', 0.05, 0.06);
        filterQuestions(chip.dataset.filter);
      });
    });

    // Card Studio Next / Prev / Shuffle
    elements.nextCardBtn.addEventListener('click', () => {
      if (filteredQuestions.length === 0) return;
      currentIndex = (currentIndex + 1) % filteredQuestions.length;
      playTone(600, 'sine', 0.05, 0.05);
      renderCurrentCard();
    });

    elements.prevCardBtn.addEventListener('click', () => {
      if (filteredQuestions.length === 0) return;
      currentIndex = (currentIndex - 1 + filteredQuestions.length) % filteredQuestions.length;
      playTone(500, 'sine', 0.05, 0.05);
      renderCurrentCard();
    });

    elements.randomCardBtn.addEventListener('click', () => {
      if (filteredQuestions.length <= 1) return;
      let nextIdx = currentIndex;
      while (nextIdx === currentIndex) {
        nextIdx = Math.floor(Math.random() * filteredQuestions.length);
      }
      currentIndex = nextIdx;
      playTone(680, 'sine', 0.06, 0.06);
      renderCurrentCard();
    });

    // Favorites & Mastered
    elements.cardFavoriteBtn.addEventListener('click', () => {
      if (filteredQuestions[currentIndex]) {
        toggleFavorite(filteredQuestions[currentIndex].id);
      }
    });

    elements.cardMasteredBtn.addEventListener('click', () => {
      if (filteredQuestions[currentIndex]) {
        markAsSpoken(filteredQuestions[currentIndex].id);
      }
    });

    // TTS Button
    elements.ttsPlayBtn.addEventListener('click', () => {
      if (filteredQuestions[currentIndex]) {
        const speed = elements.ttsSpeedSelect ? elements.ttsSpeedSelect.value : 1.0;
        speakText(filteredQuestions[currentIndex].question, speed);
      }
    });

    // Drawer Tabs
    elements.drawerTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.drawerTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const targetPane = tab.dataset.tab;
        [elements.paneStarters, elements.paneTip, elements.paneFollowups, elements.paneRecord].forEach(pane => {
          if (pane) pane.classList.remove('active');
        });

        const activePane = document.getElementById(`pane-${targetPane}`);
        if (activePane) activePane.classList.add('active');
        playTone(450, 'sine', 0.04, 0.04);
      });
    });

    // Voice Recording & Speech Recognition
    elements.recordToggleBtn.addEventListener('click', toggleVoiceRecording);
    elements.speechToTextBtn.addEventListener('click', runSpeechRecognitionCheck);

    // Directory Search & Filters
    elements.directorySearchInput.addEventListener('input', renderDirectory);
    elements.levelFilterSelect.addEventListener('change', renderDirectory);
    elements.themeFilterSelect.addEventListener('change', renderDirectory);
    elements.statusFilterSelect.addEventListener('change', renderDirectory);

    // Timed Challenge Controls
    elements.startTimerBtn.addEventListener('click', startChallengeTimer);
    elements.pauseTimerBtn.addEventListener('click', pauseChallengeTimer);
    elements.resetTimerBtn.addEventListener('click', resetChallengeTimer);
    elements.newTimerPromptBtn.addEventListener('click', initTimerPrompt);
    elements.prepTimeSelect.addEventListener('change', resetChallengeTimer);
    elements.speakTimeSelect.addEventListener('change', resetChallengeTimer);

    // Classroom Dice Controls
    elements.rollDiceBtn.addEventListener('click', rollDiceAnimation);
    elements.openInStudioBtn.addEventListener('click', () => {
      if (diceQuestion) openQuestionInStudio(diceQuestion.id);
    });
    elements.diceTtsBtn.addEventListener('click', () => {
      if (diceQuestion) {
        speakText(diceQuestion.question, elements.ttsSpeedSelect ? elements.ttsSpeedSelect.value : 1.0);
      }
    });

    // Custom Prompt Modal Controls
    elements.addCustomBtn.addEventListener('click', openCustomModal);
    elements.closeModalBtn.addEventListener('click', closeCustomModal);
    elements.cancelModalBtn.addEventListener('click', closeCustomModal);
    elements.customPromptForm.addEventListener('submit', handleCustomPromptSubmit);

    // Print Button
    elements.printBtn.addEventListener('click', () => {
      window.print();
    });

    // Stats View
    elements.statsBtn.addEventListener('click', () => {
      showToast(`Progress: ${spokenSet.size} of ${allQuestions.length} prompts completed (${favorites.size} bookmarked)`, '📊', 4000);
    });

    // Keyboard Shortcuts (Arrow Left, Arrow Right, Spacebar)
    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (currentMode === 'studio') {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          elements.nextCardBtn.click();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          elements.prevCardBtn.click();
        } else if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          elements.ttsPlayBtn.click();
        }
      }
    });
  }

  // =========================================================================
  // App Initialization
  // =========================================================================
  function init() {
    initTheme();
    updateBadgeCounts();
    renderCurrentCard();
    renderGrammarGuide();
    setupEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
