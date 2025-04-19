import React from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Pressable,
} from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Team } from '../types/api';
import { TeamItem } from '../components/TeamItem';
import { useSearch } from '../hooks/useSearch';

export default function SearchScreen() {
  const {
    query,
    setQuery,
    teams,
    isLoading,
    history,
    handleSearch,
    handleTeamPress,
    handleHistoryItemPress,
  } = useSearch();
  const insets = useSafeAreaInsets();

  const renderTeam = ({ item }: { item: Team }) => (
    <TeamItem team={item} onPress={() => handleTeamPress(item)} />
  );

  const renderHistory = () => {
    if (query.length === 0 && history.length > 0) {
      return (
        <VStack space="sm" mb="$4">
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
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Box flex={1} bg="$backgroundLight0">
        <VStack space="md" p="$4" pb={insets.bottom} flex={1}>
          <Input>
            <Input.Input
              placeholder="Search team (e.g., Manchester United, The Hammers)"
              value={query}
              onChangeText={setQuery}
            />
          </Input>

          <Button onPress={handleSearch}>
            <Button.Text>Search</Button.Text>
          </Button>

          {renderHistory()}

          {teams && (
            <Box flex={1}>
              <FlashList
                data={teams}
                renderItem={renderTeam}
                estimatedItemSize={76}
                keyExtractor={(item) => item.team.id.toString()}
                contentContainerStyle={{ paddingBottom: insets.bottom }}
                ListEmptyComponent={
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text>No teams found</Text>
                  </Box>
                }
              />
            </Box>
          )}

          {isLoading && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text>Loading...</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </SafeAreaView>
  );
}