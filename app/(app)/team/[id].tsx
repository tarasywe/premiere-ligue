import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Text,
  VStack,
  ScrollView,
  Pressable,
  HStack,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTeamSquad } from '../../../api/football';

export default function TeamScreen() {
  const { id, teamName } = useLocalSearchParams();
  const router = useRouter();
  const teamId = typeof id === 'string' ? parseInt(id, 10) : 0;

  const { data: players, isLoading } = useQuery({
    queryKey: ['squad', teamId],
    queryFn: () => getTeamSquad(teamId),
    enabled: teamId > 0,
  });

  return (
    <>
      <Stack.Screen 
        options={{
          title: teamName as string || 'Team Squad',
          headerBackTitle: 'Back',
        }} 
      />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <Box flex={1} bg="$backgroundLight0">
          {isLoading ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text>Loading squad information...</Text>
            </Box>
          ) : (
            <ScrollView>
              <VStack space="md" p="$4">
                {players?.map((player) => (
                  <Pressable
                    key={player.id}
                    style={styles.playerCard}
                    onPress={() => router.push({
                      pathname: '../player/[id]',
                      params: {
                        id: player.id.toString(),
                        player: JSON.stringify(player),
                        teamName: teamName as string,
                      },
                    } as any)}
                  >
                    <HStack space="md" alignItems="center">
                      <Image
                        source={{ uri: player.photo }}
                        style={styles.playerPhoto}
                        resizeMode="cover"
                        accessibilityLabel={`${player.name} photo`}
                      />
                      <VStack flex={1}>
                        <Text bold>{player.name}</Text>
                        <Text size="sm" color="$textLight900">
                          {player.position}
                        </Text>
                        <Text size="sm" color="$textLight900">
                          Number: {player.number}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
            </ScrollView>
          )}
        </Box>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  playerCard: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playerPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
}); 