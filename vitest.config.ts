import { defineConfig } from 'vitest/config'
import 'reflect-metadata'
import dotenv from 'dotenv'
import swc from 'unplugin-swc'

process.env.NODE_ENV = 'test'
dotenv.config({ path: '.env.test' })

export default defineConfig({
    plugins: [
        swc.vite({
            // This is the important part for TypeORM
            jsc: {
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
            },
        }),
    ],
    test: {
        environment: 'node',
        globals: true,
        coverage: {
            provider: 'v8',
        },
    },
})
