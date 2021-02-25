import { createContext, useState } from "react";
import challenges from "../../challenges.json";

interface Challenge {
  type: string;
  description: string;
  amount: number;
}

interface ChallengesContextData {
  levelUp: () => void;
  challengesCompleted: number;
  currentExperience: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
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

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge: Challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge({
      amount: 0,
      type: "",
      description: "",
    });
  }

  return (
    <ChallengeContext.Provider
      value={{
        levelUp,
        challengesCompleted,
        currentExperience,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChanllengesProvider };
