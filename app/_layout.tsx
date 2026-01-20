import { ScoreProvider } from '@/context/ScoreContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';


import { useColorScheme } from '@/hooks/use-color-scheme';



const toastConfig = {
  success: ({ text1, text2, props }: any) => (
    <View style={styles.toastContainer}>
      <View style={styles.toastCard}>
        <Text style={styles.toastTitle}>{text1}</Text>
        <Text style={styles.toastMessage}>{text2}</Text>
      </View>
    </View>
  ),
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ScoreProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ScoreProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    height: '100%',
    width: '100%', // Take full width/height to center manually if needed, or just be a big card
    justifyContent: 'center',
    alignItems: 'center',
    // We rely on the Toast being positioned or using topOffset. 
    // If not using topOffset trick, this view will be inside the standard toast wrapper. 
    // Standard wrapper usually has absolute positioning.
    // Let's try to style the card directly.
    minWidth: 300,
  },
  toastCard: {
    backgroundColor: 'rgba(0, 128, 0, 0.9)',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  toastTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  toastMessage: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
