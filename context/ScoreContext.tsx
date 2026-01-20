
import React, { createContext, ReactNode, useContext, useState } from 'react';

type Weapon = 'rock' | 'paper' | 'scissors';

interface GameRound {
    id: string;
    result: string;
    playerWeapon: Weapon | null;
    computerWeapon: Weapon | null;
    timestamp: Date;
}

interface ScoreContextType {
    playerScore: number;
    computerScore: number;
    history: GameRound[];
    incrementPlayerScore: () => void;
    incrementComputerScore: () => void;
    addRoundToHistory: (result: string, playerWeapon: Weapon | null, computerWeapon: Weapon | null) => void;
    resetGame: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [history, setHistory] = useState<GameRound[]>([]);

    const incrementPlayerScore = () => setPlayerScore((prev) => prev + 1);
    const incrementComputerScore = () => setComputerScore((prev) => prev + 1);

    const addRoundToHistory = (result: string, playerWeapon: Weapon | null, computerWeapon: Weapon | null) => {
        setHistory((prev) => [
            {
                id: Date.now().toString(),
                result,
                playerWeapon,
                computerWeapon,
                timestamp: new Date(),
            },
            ...prev,
        ]);
    };

    const resetGame = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setHistory([]);
    };

    return (
        <ScoreContext.Provider
            value={{
                playerScore,
                computerScore,
                history,
                incrementPlayerScore,
                incrementComputerScore,
                addRoundToHistory,
                resetGame,
            }}
        >
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error('useScore must be used within a ScoreProvider');
    }
    return context;
};
