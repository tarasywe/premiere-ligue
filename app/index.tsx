import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  ScrollView,
  Pressable,
  Alert,
} from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { searchTeams } from '../api/football';
import { useSearchHistory } from '../store/searchHistory';
import { Team } from '../types/api';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { history, addSearch, loadHistory } = useSearchHistory();

  useEffect(() => {
    loadHistory();
  }, []);

  const { data: teams, isLoading, error } = useQuery({
    queryKey: ['teams', searchTerm],
    queryFn: () => searchTeams(searchTerm),
    enabled: searchTerm.length > 2,
    retry: false,
  });

  const handleSearch = async () => {
    if (query.length > 2) {
      await addSearch(query);
      setSearchTerm(query);
    }
  };

  const handleHistoryItemPress = (historyQuery: string) => {
    setQuery(historyQuery);
    setSearchTerm(historyQuery);
  };

  const handleTeamPress = (team: Team) => {
    router.push({
      pathname: '/team/[id]',
      params: { id: team.team.id.toString() },
    });
  };

  return (
    <Box flex={1} bg="$backgroundLight0">
      <VStack space="md" p="$4">
        <Input>
          <Input.Input
            placeholder="Search team (e.g., Manchester United, The Hammers)"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </Input>

        <Button onPress={handleSearch}>
          <Button.Text>Search</Button.Text>
        </Button>

        <ScrollView>
          {error && (
            <Alert action="error" variant="solid" mb="$4">
              <Alert.Text>
                {error instanceof Error ? error.message : 'An error occurred while searching'}
              </Alert.Text>
            </Alert>
          )}

          {!searchTerm && history.length > 0 && (
            <VStack space="sm">
              <Text bold>Recent Searches</Text>
              {history.map((item) => (
                <Pressable
                  key={item.timestamp}
                  onPress={() => handleHistoryItemPress(item.query)}
                >
                  <Text>{item.query}</Text>
                </Pressable>
              ))}
            </VStack>
          )}

          {teams?.map((team) => (
            <Pressable
              key={team.team.id}
              onPress={() => handleTeamPress(team)}
              style={styles.teamItem}
            >
              <HStack space="md" alignItems="center">
                <Image
                  source={{ uri: team.team.logo }}
                  style={styles.teamLogo}
                  placeholder={blurhash}
                  contentFit="contain"
                  transition={1000}
                />
                <VStack>
                  <Text bold>{team.team.name}</Text>
                  <Text size="sm" color="$textLight900">
                    {team.team.country}
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          ))}

          {isLoading && (
            <Box p="$4" alignItems="center">
              <Text>Loading...</Text>
            </Box>
          )}
        </ScrollView>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  teamItem: {
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
  teamLogo: {
    width: 40,
    height: 40,
  },
}); 