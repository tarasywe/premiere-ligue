import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTintColor: '#000',
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Search Teams',
              }}
            />
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
  );
}