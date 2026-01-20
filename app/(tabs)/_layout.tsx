
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#008000',
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Game',
                    tabBarIcon: ({ color }) => <TabBarIcon name="gamepad" color={color} />,
                }}
            />
            <Tabs.Screen
                name="scores"
                options={{
                    title: 'Scores',
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
                }}
            />
        </Tabs>
    );
}
