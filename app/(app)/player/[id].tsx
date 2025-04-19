import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  Box,
  Text,
  VStack,
  ScrollView,
  HStack,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SquadPlayer } from '../../../types/api';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function PlayerScreen() {
  const { player, teamName } = useLocalSearchParams<{ player: string; teamName: string }>();
  const playerData: SquadPlayer = player ? JSON.parse(player) : null;

  if (!playerData) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Player not found</Text>
      </Box>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: playerData.name,
          headerBackTitle: teamName || 'Team',
        }} 
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <Box flex={1} bg="$backgroundLight0">
          <ScrollView>
            <VStack space="xl" p="$4">
              <Box alignItems="center">
                <Image
                  source={{ uri: playerData.photo }}
                  style={styles.playerPhoto}
                />
                <Text size="xl" bold mt="$4">
                  {playerData.name}
                </Text>
                <Text size="md" color="$textLight900">
                  {playerData.position}
                </Text>
              </Box>

              <VStack space="md" style={styles.infoCard}>
                <Text size="lg" bold>
                  Personal Information
                </Text>
                
                <HStack justifyContent="space-between">
                  <Text color="$textLight900">Age</Text>
                  <Text>{playerData.age} years</Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color="$textLight900">Squad Number</Text>
                  <Text>#{playerData.number}</Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color="$textLight900">Position</Text>
                  <Text>{playerData.position}</Text>
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  playerPhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
}); 