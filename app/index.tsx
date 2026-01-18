import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GameResultCard from '../components/GameResultCard';

type Weapon = 'rock' | 'paper' | 'scissors';

const RockPaperScissors: React.FC = () => {
    const weapons: Weapon[] = ['rock', 'paper', 'scissors'];
    const winMessages = [
        "Nice move!",
        "Wow!",
        "Great job!",
        "Excellent!",
        "You got this!",
        "Superb!",
        "Victory is yours!",
        "Sharp thinking!",
        "Way to go!",
        "Unstoppable!"
    ];
    const isWeb = Platform.OS === 'web';
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);
    const [countdown, setCountdown] = useState<number>(10);
    const [result, setResult] = useState<string>('Choose your weapon!');
    const [computerWeapon, setComputerWeapon] = useState<Weapon | null>(null);
    const [playerChoice, setPlayerChoice] = useState<Weapon | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [resultColor, setResultColor] = useState<string>('#660033');
    const confettiRef = useRef<any>(null);

    // Function to generate random weapon for computer
    const computerPlay = useCallback((): Weapon => {
        const weaponIndex = Math.floor(Math.random() * weapons.length);
        return weapons[weaponIndex];
    }, [weapons]);

    // Function to determine winner and update score
    const updateScore = useCallback((playerWeapon: Weapon | null, computerWeapon: Weapon) => {
        if (playerWeapon) {
            setComputerWeapon(computerWeapon);
            setPlayerChoice(playerWeapon);

            if (playerWeapon === computerWeapon) {
                setResult("It's a tie!");
                setResultColor('#660033');
            } else if (
                (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
                (playerWeapon === 'paper' && computerWeapon === 'rock') ||
                (playerWeapon === 'scissors' && computerWeapon === 'paper')
            ) {
                setResult('You win!');
                setResultColor('#660033');
                setPlayerScore(prev => prev + 1);
                const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
                Toast.show({
                    type: 'success',
                    text1: 'Round Won!',
                    text2: randomMessage,
                    position: 'top',
                    topOffset: 200, // Move it down towards center
                    visibilityTime: 2000,
                });
            } else {
                setResult('Computer wins!');
                setResultColor('#660033');
                setComputerScore(prev => prev + 1);
            }
        } else {
            setComputerWeapon(null);
            setPlayerChoice(null);
            setResult('You did not make a choice! | You lose the game!');
            setResultColor('red');
            setGameOver(true);
        }
    }, []);

    // Function to handle player choice
    const selectWeapon = useCallback((weapon: Weapon) => {
        if (gameOver) return;

        setCountdown(10);
        const computerWeapon = computerPlay();
        updateScore(weapon, computerWeapon);
    }, [gameOver, computerPlay, updateScore]);

    // Function to reset the game
    const resetGame = useCallback(() => {
        setPlayerScore(0);
        setComputerScore(0);
        setCountdown(10);
        setResult('Choose your weapon!');
        setComputerWeapon(null);
        setPlayerChoice(null);
        setGameOver(false);
        setResultColor('#660033');
    }, []);

    // Countdown timer effect
    useEffect(() => {
        if (playerScore === 5 || computerScore === 5) {
            if (playerScore === 5) {
                setResult('You win the game!');
                setResultColor('green');
                // Alert.alert('Congratulations!', 'You won the game!');
                Toast.show({
                    type: 'success',
                    text1: 'CHAMPION!',
                    text2: 'You reached 5 points and won the game!',
                    position: 'top',
                    topOffset: 200,
                    visibilityTime: 4000,
                });
                if (confettiRef.current) {
                    confettiRef.current.start();
                }
            } else {
                setResult('You lose the game!');
                setResultColor('red');
                Alert.alert('Game Over', 'You lost the game!');
            }
            // setComputerChoice('Game Over'); // No longer needed as we check gameOver state for UI
            setGameOver(true);
            return;
        }

        if (countdown === 0) {
            const computerWeapon = computerPlay();
            updateScore(null, computerWeapon);
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, playerScore, computerScore, computerPlay, updateScore]);

    const getWeaponIcon = (weapon: Weapon) => {
        switch (weapon) {
            case 'rock':
                return 'hand-rock';
            case 'paper':
                return 'hand-paper';
            case 'scissors':
                return 'hand-scissors';
            default:
                return 'question';
        }
    };

    return (
        <SafeAreaView style={[styles.container, isWeb && styles.webContainerBackground]}>
            <View style={[styles.mainWrapper, isWeb && styles.webCard]}>
                {/* Top Section: Title and Reset Button */}
                <View>
                    <View style={styles.topSection}>
                        <Text style={styles.title}>Rock, Paper, Scissors</Text>
                        <TouchableOpacity
                            style={styles.playAgainButton}
                            onPress={resetGame}>
                            <Text style={styles.playAgainText}><FontAwesome name="refresh" size={14} color="#fff" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scoreboard}>
                        <Text style={styles.score}>Player: {playerScore}</Text>
                        <Text style={styles.score}>Computer: {computerScore}</Text>
                    </View>
                </View>

                {/* Center Section: Results and Game Info */}
                <View style={styles.centerSection}>

                    <View style={styles.resultContainer}>
                        <Text style={[styles.result, { color: resultColor }]}>
                            {result}
                        </Text>
                    </View>

                    {playerChoice && computerWeapon && (
                        <GameResultCard
                            playerWeapon={playerChoice}
                            computerWeapon={computerWeapon}
                            getWeaponIcon={getWeaponIcon}
                        />
                    )}

                </View>
                {/* Bottom Section: Weapon Choices */}
                <View style={styles.bottomSection}>
                    <View style={styles.timer}>
                        <Text style={styles.timerText}>
                            Time left: <Text style={styles.countdown}>{countdown}s</Text>
                        </Text>
                    </View>
                    <View style={styles.choices}>
                        {weapons.map((weapon) => (
                            <TouchableOpacity
                                key={weapon}
                                style={[
                                    styles.choice,
                                    gameOver && styles.disabled
                                ]}
                                onPress={() => selectWeapon(weapon)}
                                disabled={gameOver}
                            >
                                <Icon
                                    name={getWeaponIcon(weapon)}
                                    size={40}
                                    color="#333"
                                />
                                <Text style={styles.choiceText}>
                                    {weapon.charAt(0).toUpperCase() + weapon.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <ConfettiCannon
                count={10}
                origin={{ x: -10, y: 0 }}
                autoStart={false}
                ref={confettiRef}
                fadeOut={true}
                fallSpeed={3000}
                explosionSpeed={350}
            />
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    webContainerBackground: {
        backgroundColor: '#e0e0e0', // Slightly darker background for desktop
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mainWrapper: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    webCard: {
        maxWidth: 600,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        // Reset flex to allow it to be centered vertically if needed or take natural height
        flex: undefined,
        minHeight: '60%',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    bottomSection: {
        width: '100%',
        marginBottom: 20,
    },
    scoreboard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    score: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    choices: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    choice: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        minWidth: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    disabled: {
        opacity: 0.5,
    },
    choiceText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    resultContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    result: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    timer: {
        marginBottom: 30,
    },
    timerText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
    countdown: {
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    playAgainButton: {
        backgroundColor: '#008000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    playAgainText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default RockPaperScissors;