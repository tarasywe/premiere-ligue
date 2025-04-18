import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { searchTeams } from '../api/football';
import { useSearchHistory } from '../store/searchHistory';
import { Team } from '../types/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { history, addSearch, loadHistory } = useSearchHistory();

  useEffect(() => {
    loadHistory();
  }, []);

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams', searchTerm],
    queryFn: () => searchTeams(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const handleSearch = async () => {
    if (query.length > 2) {
      await addSearch(query);
      setSearchTerm(query);
    }
  };

  const handleTeamPress = (team: Team) => {
    router.push({
      pathname: '/team/[id]',
      params: { 
        id: team.team.id.toString(),
        teamName: team.team.name,
      },
    });
  };

  const handleHistoryItemPress = (historyQuery: string) => {
    setQuery(historyQuery);
    setSearchTerm(historyQuery);
  };

  return {
    query,
    setQuery,
    teams,
    isLoading,
    history,
    handleSearch,
    handleTeamPress,
    handleHistoryItemPress,
  };
} 