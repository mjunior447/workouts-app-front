import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import exercises from '../../assets/data/exercises.json'

export default function ExerciseDetailsScreen() {
    const params = useLocalSearchParams();

    const exercise = exercises.find(item => item.name === params.name)

    if (!exercise) {
        return (
            <Text>Exercise not found</Text>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />
            <View style={styles.panel}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSubtitle}>
                    {exercise.muscle} | {exercise.equipment}
                </Text>
            </View>

            <View style={styles.panel}>
                <Text style={styles.instructions}>
                    {exercise.instructions}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '500'
    },
    exerciseSubtitle: {
        color: 'dimgray',
        textTransform: 'capitalize',
    },
    instructions: {
        fontSize: 16,
        lineHeight: 22,
    }
})