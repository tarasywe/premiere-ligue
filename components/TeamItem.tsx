import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  VStack,
  HStack,
  Pressable,
} from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { Team } from '../types/api';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export type TeamItemProps = {
  team: Team;
  onPress: () => void;
};

export const TeamItem = ({ team, onPress }: TeamItemProps) => (
  <Pressable
    key={team.team.id}
    onPress={onPress}
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
);

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