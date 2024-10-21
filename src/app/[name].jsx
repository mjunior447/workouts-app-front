import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import graphqlClient from '../graphqlClient'

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen() {
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', name],
    queryFn: () => graphqlClient.request(exerciseQuery, { name })
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch data</Text>
  }

  const exercise = data.exercises[0]

  if (!exercise) {
    return <Text>Exercise not found</Text>;
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
        <Text
          style={styles.instructions}
          numberOfLines={isInstructionExpanded ? 0 : 3}
        >
          {exercise.instructions}
        </Text>
        <Text
          style={styles.seeMore}
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
        >
          {`See ${isInstructionExpanded ? "less" : "more"}`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "600",
    color: "gray",
  },
});
