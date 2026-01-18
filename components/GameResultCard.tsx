import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Weapon = 'rock' | 'paper' | 'scissors';

interface GameResultCardProps {
    playerWeapon: Weapon;
    computerWeapon: Weapon;
    getWeaponIcon: (weapon: Weapon) => string;
}

const GameResultCard: React.FC<GameResultCardProps> = ({ playerWeapon, computerWeapon, getWeaponIcon }) => {
    return (
        <View style={styles.container}>
            <View style={styles.choiceContainer}>
                <Text style={styles.label}>You</Text>
                <Icon name={getWeaponIcon(playerWeapon)} size={50} color="#007AFF" />
                <Text style={styles.weaponName}>{playerWeapon.charAt(0).toUpperCase() + playerWeapon.slice(1)}</Text>
            </View>

            <View style={styles.vsContainer}>
                <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.choiceContainer}>
                <Text style={styles.label}>Computer</Text>
                <Icon name={getWeaponIcon(computerWeapon)} size={50} color="#FF3B30" />
                <Text style={styles.weaponName}>{computerWeapon.charAt(0).toUpperCase() + computerWeapon.slice(1)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
        marginBottom: 20,
    },
    choiceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    weaponName: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    vsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    vsText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#ccc',
        fontStyle: 'italic',
    },
});

export default GameResultCard;
