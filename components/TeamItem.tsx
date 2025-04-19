import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

export type TeamItemProps = {
  team: {
    team: {
      id: number;
      name: string;
      logo: string;
      country: string;
    };
  };
  onPress: () => void;
};

export const TeamItem: React.FC<TeamItemProps> = ({ team, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Box style={styles.teamItem}>
        <Image
          source={{ uri: team.team.logo }}
          style={styles.teamLogo}
          resizeMode="contain"
          accessibilityLabel={`${team.team.name} logo`}
        />
        <Box flex={1} ml={10}>
          <Text size="lg" fontWeight="$bold">
            {team.team.name}
          </Text>
          <Text size="sm" color="$secondary500">
            {team.team.country}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 8,
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
    width: 50,
    height: 50,
  },
}); 