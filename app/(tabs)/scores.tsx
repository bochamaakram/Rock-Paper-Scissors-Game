
import { useScore } from '@/context/ScoreContext';
import React from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ScoresScreen() {
    const { history, playerScore, computerScore } = useScore();
    const isWeb = Platform.OS === 'web';

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.historyItem}>
            <View style={styles.resultRow}>
                <Text style={[
                    styles.resultText,
                    item.result.includes('Player Won') ? styles.winText :
                        item.result.includes('Computer Won') ? styles.loseText :
                            item.result.includes('Timeout') ? styles.loseText : styles.tieText
                ]}>
                    {item.result}
                </Text>
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.scoreDetail}>Final Score: {item.finalPlayerScore} - {item.finalComputerScore}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isWeb && styles.webContainer]}>
            <View style={styles.header}>
                <Text style={styles.title}>Game History</Text>
                <View style={styles.aggregateScore}>
                    <Text style={styles.scoreText}>Current Session</Text>
                    <Text style={styles.scoreText}>Player: {playerScore} - Computer: {computerScore}</Text>
                </View>
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No full games played yet.</Text>
                    <Text style={styles.emptySubText}>Play until someone reaches 5 points!</Text>
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
        marginBottom: 5,
        color: '#333',
    },
    aggregateScore: {
        alignItems: 'center',
        gap: 5,
    },
    scoreText: {
        fontSize: 16,
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
        alignItems: 'center',
        marginBottom: 5,
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
        justifyContent: 'flex-start',
    },
    scoreDetail: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        fontWeight: 'bold',
    },
    emptySubText: {
        marginTop: 5,
        fontSize: 14,
        color: '#aaa',
    }
});
