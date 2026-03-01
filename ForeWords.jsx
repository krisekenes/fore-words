import { useState, useEffect, useCallback, useRef } from "react";
import { COURSES, generateHoles, getThemedCourse } from "./data/courses.js";
import { checkWord, pickWord, evaluateGuess, getScoreName, HANDICAP_BONUS, computeHeatmap } from "./gameLogic.js";
import { loadProfile, saveHandicap, saveRound, saveBadges, markWelcomeSeen, saveGameState, loadGameState, clearGameState, saveLastScreen, loadLastScreen, getTodaysDailyResult } from "./storage.js";
import { BADGES } from "./data/badges.js";
import { getDailyHolesAndWords, DAILY_COURSE_NAME } from "./data/daily.js";
import MenuScreen from "./screens/MenuScreen.jsx";
import CourseSelect from "./screens/CourseSelect.jsx";
import PlayingScreen from "./screens/PlayingScreen.jsx";
import RoundEnd from "./screens/RoundEnd.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ScoringScreen from "./screens/ScoringScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";

export default function ForeWords() {
  const [profile, setProfile] = useState(() => loadProfile());
  // Compute saved game once synchronously so the screen starts as "playing" without a menu flash
  const [_initialSaved] = useState(() => {
    const lastScreen = loadLastScreen();
    if (lastScreen === "playing" && profile.hasSeenWelcome) return loadGameState() || null;
    return null;
  });
  const [screen, setScreen] = useState(() => {
    if (!profile.hasSeenWelcome) return "welcome";
    if (_initialSaved) return "playing";
    return "menu";
  });
  const [handicap, setHandicap] = useState(profile.handicap);
  const [selectedCourse, setSelectedCourse] = useState(() => _initialSaved?.selectedCourse ?? null);
  const [currentHole, setCurrentHole] = useState(() => _initialSaved?.currentHole ?? 0);
  const [holes, setHoles] = useState(() => _initialSaved?.holes ?? []);
  const [scores, setScores] = useState(() => _initialSaved?.scores ?? []);
  const [answer, setAnswer] = useState(() => _initialSaved?.answer ?? "");
  const [guesses, setGuesses] = useState(() => _initialSaved?.guesses ?? []);
  const [currentGuess, setCurrentGuess] = useState("");
  const [maxGuesses, setMaxGuesses] = useState(() => _initialSaved?.maxGuesses ?? 6);
  const [gameState, setGameState] = useState(() => {
    if (!_initialSaved) return "playing";
    const gs = _initialSaved.gameState;
    return gs === "won" || gs === "lost" ? gs : "playing";
  });
  const [shakeRow, setShakeRow] = useState(false);
  const [revealRow, setRevealRow] = useState(-1);
  const [letterStates, setLetterStates] = useState(() => _initialSaved?.letterStates ?? {});
  const [holeMessage, setHoleMessage] = useState(() => {
    if (!_initialSaved) return null;
    const gs = _initialSaved.gameState;
    const h = _initialSaved.holes[_initialSaved.currentHole];
    if (gs === "won") return getScoreName(_initialSaved.guesses.length, h.par);
    if (gs === "lost") {
      const score = _initialSaved.maxGuesses + 1;
      const info = getScoreName(score, h.par);
      return { ...info, name: `${info.name} (${_initialSaved.answer})`, color: "#8B0000" };
    }
    return null;
  });
  const [revealedTiles, setRevealedTiles] = useState(() => {
    if (!_initialSaved) return new Set();
    const revealed = new Set();
    for (let i = 0; i < _initialSaved.guesses.length; i++) {
      for (let j = 0; j < _initialSaved.guesses[i].word.length; j++) {
        revealed.add(`${i}-${j}`);
      }
    }
    return revealed;
  });
  const [toastMessage, setToastMessage] = useState(null);
  const hole = holes[currentHole] || null;

  const [pendingBadges, setPendingBadges] = useState([]);
  const [holeCount, setHoleCount] = useState(() => _initialSaved?.holeCount ?? 9);
  const [selectedTheme, setSelectedTheme] = useState(() => _initialSaved?.selectedTheme ?? "classic");
  const [gameMode, setGameMode] = useState(() => _initialSaved?.gameMode ?? "standard");
  const [isDaily, setIsDaily] = useState(() => _initialSaved?.isDaily ?? false);
  const [dailyWords, setDailyWords] = useState(() => _initialSaved?.dailyWords ?? null);

  const themeKey = gameMode === "experimental" ? "experimental" : selectedTheme !== "classic" ? selectedTheme : null;
  const displayCourseName = (themeKey && selectedCourse ? getThemedCourse(selectedCourse, themeKey)?.displayName : null) || selectedCourse;

  const updateHandicap = (value) => {
    setHandicap(value);
    saveHandicap(value);
  };

  // startHole accepts an optional pre-determined word (used for daily)
  const startHole = (h, theme, overrideWord = null) => {
    const word = overrideWord || pickWord(h.wordLength, theme || selectedTheme);
    const bonus = HANDICAP_BONUS(handicap);
    const max = h.par + 2 + bonus;
    setAnswer(word);
    setGuesses([]);
    setCurrentGuess("");
    setMaxGuesses(max);
    setGameState("playing");
    setRevealRow(-1);
    setHoleMessage(null);
    setLetterStates({});
    setRevealedTiles(new Set());
  };

  const startCourse = (courseName, count = 9, theme = "classic", mode = "standard") => {
    clearGameState();
    const generated = generateHoles(courseName, count);
    setSelectedCourse(courseName);
    setHoleCount(count);
    setSelectedTheme(theme);
    setGameMode(mode);
    setIsDaily(false);
    setDailyWords(null);
    setHoles(generated);
    setScores([]);
    setCurrentHole(0);
    setLetterStates({});
    startHole(generated[0], theme);
    setScreen("playing");
  };

  const startDaily = () => {
    clearGameState();
    const { holes: dailyHoles, words } = getDailyHolesAndWords();
    setSelectedCourse(DAILY_COURSE_NAME);
    setHoleCount(3);
    setSelectedTheme("classic");
    setGameMode("standard");
    setIsDaily(true);
    setDailyWords(words);
    setHoles(dailyHoles);
    setScores([]);
    setCurrentHole(0);
    setLetterStates({});
    startHole(dailyHoles[0], "classic", words[0]);
    setScreen("playing");
  };

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  }, []);

  const submitGuess = useCallback(() => {
    if (gameState !== "playing") return;
    if (currentGuess.length !== hole.wordLength) {
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      showToast("Not enough letters");
      return;
    }

    const guess = currentGuess.toUpperCase();
    const isValid = checkWord(guess);

    if (!isValid) {
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      showToast("Not in word list");
      return;
    }

    const evaluation = evaluateGuess(guess, answer);
    const newGuesses = [...guesses, { word: guess, evaluation }];

    setGuesses(newGuesses);
    setRevealRow(newGuesses.length - 1);
    setCurrentGuess("");

    const rowIdx = newGuesses.length - 1;
    for (let j = 0; j < guess.length; j++) {
      const delay = j * 300 + 250;
      setTimeout(() => {
        setRevealedTiles(prev => {
          const next = new Set(prev);
          next.add(`${rowIdx}-${j}`);
          return next;
        });
      }, delay);
    }

    const totalRevealTime = (guess.length - 1) * 300 + 500;
    setTimeout(() => {
      setLetterStates(prev => {
        const updated = { ...prev };
        for (let i = 0; i < guess.length; i++) {
          const letter = guess[i];
          const state = evaluation[i];
          const priority = { correct: 3, present: 2, absent: 1 };
          if (!updated[letter] || priority[state] > priority[updated[letter]]) {
            updated[letter] = state;
          }
        }
        return updated;
      });
    }, totalRevealTime);

    if (guess === answer) {
      const finishDelay = (guess.length - 1) * 300 + 800;
      setTimeout(() => {
        setGameState("won");
        const score = newGuesses.length;
        const scoreInfo = getScoreName(score, hole.par);
        setHoleMessage(scoreInfo);
      }, finishDelay);
    } else if (newGuesses.length >= maxGuesses) {
      const finishDelay = (guess.length - 1) * 300 + 800;
      setTimeout(() => {
        setGameState("lost");
        const score = maxGuesses + 1;
        const scoreInfo = getScoreName(score, hole.par);
        setHoleMessage({ ...scoreInfo, name: `${scoreInfo.name} (${answer})`, color: "#8B0000" });
      }, finishDelay);
    }
  }, [currentGuess, guesses, answer, gameState, hole, maxGuesses, showToast]);

  const handleKey = useCallback((key) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") {
      submitGuess();
    } else if (key === "⌫" || key === "BACKSPACE") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < (hole?.wordLength || 5)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [gameState, currentGuess, hole, submitGuess]);

  useEffect(() => {
    const handler = (e) => {
      if (screen !== "playing") return;
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        e.preventDefault();
        handleKey(key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey, screen]);

  const advanceHole = () => {
    const score = gameState === "won" ? guesses.length : maxGuesses + 1;
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentHole < holes.length - 1) {
      const nextHole = currentHole + 1;
      setCurrentHole(nextHole);
      const nextWord = (isDaily && dailyWords && nextHole < dailyWords.length) ? dailyWords[nextHole] : null;
      startHole(holes[nextHole], selectedTheme, nextWord);
    } else {
      clearGameState();
      saveRound({ course: selectedCourse, scores: newScores, holes, theme: selectedTheme, gameMode, isDaily });

      const freshProfile = loadProfile();
      const roundResult = {
        course: selectedCourse,
        scores: newScores,
        holes,
        totalScore: newScores.reduce((s, v) => s + v, 0),
        totalPar: holes.reduce((s, h) => s + h.par, 0),
        vsPar: newScores.reduce((s, v) => s + v, 0) - holes.reduce((s, h) => s + h.par, 0),
        aces: newScores.filter(s => s === 1).length,
        holeCount: holes.length,
        theme: selectedTheme,
        gameMode,
      };
      const alreadyEarned = new Set((freshProfile.badges || []).map(b => b.id));
      const newlyEarned = BADGES.filter(b => {
        if (alreadyEarned.has(b.id)) return false;
        try { return b.check(roundResult, freshProfile); } catch { return false; }
      });
      if (newlyEarned.length > 0) saveBadges(newlyEarned.map(b => b.id));
      setPendingBadges(newlyEarned);

      setProfile(loadProfile());
      setScreen("roundEnd");
    }
  };

  const quitRound = () => {
    setScreen("menu");
    setSelectedCourse(null);
  };

  const resumeRound = (saved) => {
    // Guard against a raw DOM event being passed (e.g. from onClick={fn} without wrapper)
    const state = (saved && saved.selectedCourse) ? saved : loadGameState();
    if (!state) return;

    setSelectedCourse(state.selectedCourse);
    setSelectedTheme(state.selectedTheme);
    setGameMode(state.gameMode || "standard");
    setHoleCount(state.holeCount);
    setHoles(state.holes);
    setScores(state.scores);
    setCurrentHole(state.currentHole);
    setAnswer(state.answer);
    setGuesses(state.guesses);
    setCurrentGuess("");
    setMaxGuesses(state.maxGuesses);
    setIsDaily(state.isDaily || false);
    setDailyWords(state.dailyWords || null);
    const restoredState = state.gameState === "won" || state.gameState === "lost" ? state.gameState : "playing";
    setGameState(restoredState);
    setRevealRow(-1);
    if (restoredState === "won") {
      const scoreInfo = getScoreName(state.guesses.length, state.holes[state.currentHole].par);
      setHoleMessage(scoreInfo);
    } else if (restoredState === "lost") {
      const score = state.maxGuesses + 1;
      const scoreInfo = getScoreName(score, state.holes[state.currentHole].par);
      setHoleMessage({ ...scoreInfo, name: `${scoreInfo.name} (${state.answer})`, color: "#8B0000" });
    } else {
      setHoleMessage(null);
    }
    setLetterStates(state.letterStates || {});

    const revealed = new Set();
    for (let i = 0; i < state.guesses.length; i++) {
      for (let j = 0; j < state.guesses[i].word.length; j++) {
        revealed.add(`${i}-${j}`);
      }
    }
    setRevealedTiles(revealed);
    setScreen("playing");
  };

  // Persist the current screen so reload returns to the right place.
  // Capture the pre-mount value with a ref BEFORE this effect overwrites it.
  const initialLastScreen = useRef(loadLastScreen());
  useEffect(() => {
    saveLastScreen(screen);
  }, [screen]);

  // Autosave gameplay state on every meaningful change
  useEffect(() => {
    if (screen !== "playing" || !selectedCourse) return;
    saveGameState({
      selectedCourse, selectedTheme, gameMode, holeCount,
      holes, scores, currentHole, answer, guesses, maxGuesses, letterStates, gameState,
      isDaily, dailyWords,
    });
  }, [screen, selectedCourse, guesses, scores, currentHole, gameState]);

  // Auto-resume only if the user was actively playing when they left.
  // Uses the ref value captured before the saveLastScreen effect runs.
  const [hasAutoResumed, setHasAutoResumed] = useState(() => _initialSaved !== null);
  useEffect(() => {
    if (hasAutoResumed) return;
    setHasAutoResumed(true);
    const saved = loadGameState();
    if (saved && profile.hasSeenWelcome && initialLastScreen.current === "playing") {
      resumeRound(saved);
    }
  }, []);

  if (screen === "welcome") {
    return (
      <WelcomeScreen
        onComplete={(selectedHandicap) => {
          updateHandicap(selectedHandicap);
          markWelcomeSeen();
          setProfile(loadProfile());
          setScreen("menu");
        }}
      />
    );
  }

  if (screen === "menu") {
    const savedGame = loadGameState();
    const todaysDailyResult = getTodaysDailyResult(profile);
    return (
      <MenuScreen
        onSelectCourse={() => setScreen("courseSelect")}
        onProfile={() => setScreen("profile")}
        onScoring={() => setScreen("scoring")}
        savedGame={savedGame}
        onResume={() => resumeRound()}
        onDaily={startDaily}
        todaysDailyResult={todaysDailyResult}
      />
    );
  }

  if (screen === "profile") {
    return (
      <ProfileScreen
        profile={profile}
        handicap={handicap}
        setHandicap={updateHandicap}
        onBack={() => setScreen("menu")}
      />
    );
  }

  if (screen === "scoring") {
    return (
      <ScoringScreen
        onBack={() => setScreen("menu")}
      />
    );
  }

  if (screen === "courseSelect") {
    return (
      <CourseSelect
        onBack={() => setScreen("menu")}
        onStartCourse={startCourse}
      />
    );
  }

  if (screen === "roundEnd") {
    return (
      <RoundEnd
        holes={holes}
        scores={scores}
        selectedCourse={selectedCourse}
        displayCourseName={displayCourseName}
        selectedTheme={selectedTheme}
        isDaily={isDaily}
        onPlayAgain={isDaily ? startDaily : () => startCourse(selectedCourse, holeCount, selectedTheme, gameMode)}
        onClubhouse={() => { setScreen("menu"); setSelectedCourse(null); }}
        pendingBadges={pendingBadges}
        onBadgesClaimed={() => setPendingBadges([])}
      />
    );
  }

  if (screen === "playing" && hole) {
    const heatmap = gameMode === "experimental" ? computeHeatmap(hole.wordLength, guesses) : null;
    return (
      <PlayingScreen
        guesses={guesses}
        currentGuess={currentGuess}
        answer={answer}
        gameState={gameState}
        hole={hole}
        holes={holes}
        scores={scores}
        currentHole={currentHole}
        selectedCourse={selectedCourse}
        displayCourseName={displayCourseName}
        maxGuesses={maxGuesses}
        shakeRow={shakeRow}
        revealRow={revealRow}
        letterStates={letterStates}
        holeMessage={holeMessage}
        revealedTiles={revealedTiles}
        toastMessage={toastMessage}
        heatmap={heatmap}
        onKey={handleKey}
        onAdvanceHole={advanceHole}
        onQuit={quitRound}
      />
    );
  }

  return null;
}
