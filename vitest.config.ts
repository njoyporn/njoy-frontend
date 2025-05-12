import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: "v8",
        reporter: ['text', 'json', 'html'],
        exclude: ['./src/types/*', '*config.*', "./serve.js", "./src/api/http/httpClient.ts", "./src/main.ts", "./src/App.vue"]
      }
    }
  })
)
