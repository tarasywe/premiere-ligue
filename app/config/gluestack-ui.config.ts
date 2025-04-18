import { createConfig } from "@gluestack-ui/themed"
import { config as defaultConfig } from '@gluestack-ui/config'

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary0: '#ffffff',
      primary400: '#0891b2',
      primary500: '#0e7490',
      primary600: '#155e75',
    },
  },
})

// This is what was missing - we need to export the config as default
export default config