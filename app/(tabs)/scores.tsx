
import { useScore } from '@/context/ScoreContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ScoresScreen() {
    const { history, playerScore, computerScore } = useScore();
    const isWeb = Platform.OS === 'web';

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.historyItem}>
            <View style={styles.resultRow}>
                <Text style={[styles.resultText, item.result.includes('Win') ? styles.winText : item.result.includes('Tie') ? styles.tieText : styles.loseText]}>
                    {item.result}
                </Text>
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.detailsRow}>
                <View style={styles.weaponContainer}>
                    <FontAwesome
                        name={item.playerWeapon === 'rock' ? 'hand-rock-o' : item.playerWeapon === 'paper' ? 'hand-paper-o' : 'hand-scissors-o'}
                        size={20}
                        color="#333"
                    />
                    <Text style={styles.weaponText}>You: {item.playerWeapon}</Text>
                </View>
                <View style={styles.weaponContainer}>
                    <FontAwesome
                        name={item.computerWeapon === 'rock' ? 'hand-rock-o' : item.computerWeapon === 'paper' ? 'hand-paper-o' : 'hand-scissors-o'}
                        size={20}
                        color="#333"
                    />
                    <Text style={styles.weaponText}>Comp: {item.computerWeapon}</Text>
                </View>

            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isWeb && styles.webContainer]}>
            <View style={styles.header}>
                <Text style={styles.title}>Game History</Text>
                <View style={styles.aggregateScore}>
                    <Text style={styles.scoreText}>Player: {playerScore}</Text>
                    <Text style={styles.scoreText}>Computer: {computerScore}</Text>
                </View>
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No games played yet. Go play some rounds!</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    webContainer: {
        alignItems: 'center',
        padding: 20,
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    aggregateScore: {
        flexDirection: 'row',
        gap: 20,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    list: {
        flex: 1,
        width: '100%',
        maxWidth: 600,
    },
    listContent: {
        padding: 20,
    },
    historyItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    winText: {
        color: 'green',
    },
    loseText: {
        color: 'red',
    },
    tieText: {
        color: '#8b8b00',
    },
    timestamp: {
        color: '#999',
        fontSize: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weaponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    weaponText: {
        marginLeft: 5,
        textTransform: 'capitalize',
        color: '#444',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
});
