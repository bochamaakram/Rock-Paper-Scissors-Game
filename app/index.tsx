
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FontAwesome name="hand-rock-o" size={80} color="#008000" style={styles.icon} />
                <Text style={styles.title}>Rock Paper Scissors</Text>
                <Text style={styles.subtitle}>Ultimate Edition</Text>

                <View style={styles.menu}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/(tabs)')}
                    >
                        <FontAwesome name="play" size={20} color="#fff" style={styles.btnIcon} />
                        <Text style={styles.buttonText}>Play Game</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => router.push('/(tabs)/scores')}
                    >
                        <FontAwesome name="list" size={20} color="#008000" style={styles.btnIcon} />
                        <Text style={[styles.buttonText, styles.secondaryButtonText]}>View Scores</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 60,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    menu: {
        width: '100%',
        gap: 15,
    },
    button: {
        backgroundColor: '#008000',
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#008000',
    },
    secondaryButtonText: {
        color: '#008000',
    },
    btnIcon: {
        marginRight: 10,
    },
});
