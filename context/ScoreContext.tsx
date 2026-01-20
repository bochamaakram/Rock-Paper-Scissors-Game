
import React, { createContext, ReactNode, useContext, useState } from 'react';

type Weapon = 'rock' | 'paper' | 'scissors';

interface GameResult {
    id: string;
    result: string; // "Player Won", "Computer Won", "Timeout"
    finalPlayerScore: number;
    finalComputerScore: number;
    timestamp: Date;
}

interface ScoreContextType {
    playerScore: number;
    computerScore: number;
    history: GameResult[];
    incrementPlayerScore: () => void;
    incrementComputerScore: () => void;
    addGameResult: (result: string, finalPlayerScore: number, finalComputerScore: number) => void;
    resetGame: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [history, setHistory] = useState<GameResult[]>([]);

    const incrementPlayerScore = () => setPlayerScore((prev) => prev + 1);
    const incrementComputerScore = () => setComputerScore((prev) => prev + 1);

    const addGameResult = (result: string, finalPlayerScore: number, finalComputerScore: number) => {
        setHistory((prev) => [
            {
                id: Date.now().toString(),
                result,
                finalPlayerScore,
                finalComputerScore,
                timestamp: new Date(),
            },
            ...prev,
        ]);
    };

    const resetGame = () => {
        setPlayerScore(0);
        setComputerScore(0);
        // history is preserved
    };

    return (
        <ScoreContext.Provider
            value={{
                playerScore,
                computerScore,
                history,
                incrementPlayerScore,
                incrementComputerScore,
                addGameResult,
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
