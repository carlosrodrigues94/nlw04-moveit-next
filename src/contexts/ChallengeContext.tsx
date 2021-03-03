import { createContext, useEffect, useState } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";
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
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

const ChallengeContext = createContext<ChallengesContextData>(
  {} as ChallengesContextData
);

const ChanllengesProvider: React.FC<ChallengesProviderProps> = ({
  children,
  ...rest
}) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState<Challenge>({
    amount: 0,
    description: "",
    type: "",
  });
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
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
        closeLevelUpModal,
      }}
    >
      {isLevelModalOpen && <LevelUpModal />}
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChanllengesProvider };
