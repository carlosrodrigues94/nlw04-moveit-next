import { createContext, useEffect, useState } from "react";
import challenges from "../../challenges.json";

interface Challenge {
  type: string;
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
  completeChallenge: () => void;
}

const ChallengeContext = createContext<ChallengesContextData>(
  {} as ChallengesContextData
);

const ChanllengesProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState<Challenge>({
    amount: 0,
    description: "",
    type: "",
  });

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge: Challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valenge ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge({
      amount: 0,
      type: "",
      description: "",
    });
  }
  function completeChallenge() {
    if (!activeChallenge.description) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge({
      amount: 0,
      type: "",
      description: "",
    });
    setChallengesCompleted(challengesCompleted + 1);
  }
  return (
    <ChallengeContext.Provider
      value={{
        levelUp,
        resetChallenge,
        activeChallenge,
        currentExperience,
        startNewChallenge,
        completeChallenge,
        challengesCompleted,
        experienceToNextLevel,
        level,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChanllengesProvider };
