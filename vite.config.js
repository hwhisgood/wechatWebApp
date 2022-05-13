import { fileURLToPath, URL } from 'url'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svgBuilder';
import { createProxy } from './src/utils/proxy'
import { wrapperEnv } from './src/utils/env'
// 指定解析路径
import { resolve } from 'path'
const pathResolve = (dir) => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const root = process.cwd();
  // 根据 `mode` 加载当前工作目录下的 env 文件
  const env = loadEnv(mode, root);
  const { VITE_PROXY } = wrapperEnv(env);
  return {
    base: './',
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
      svgBuilder('./src/assets/icons/svg/')
    ],
    resolve: {
      alias: {
        '@': pathResolve('./src'),  // 设置 `@` 指向 `src` 目录
        // '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    css: {
      //css预处理
      preprocessorOptions: {
        scss: {
          /*
          多个文件可以使用'@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
           */
          additionalData: '@import "@/assets/styles/index.scss";'
        },
        less: {
          javascriptEnabled: true,
          // 覆盖样式变量
          modifyVars: {
            // 'text-color': '#111',
            'pagination-item-default-color': 'red',
            'button-success-background-color': '#00CD96'
          },
        },
      }
    },
    server: {
      port: 8888,
      open: true,
      cors: true,
      host: '0.0.0.0',
      // proxy: createProxy(VITE_PROXY)
      proxy: {
        '/api': {
          target: 'http://10.80.210.72',    // 后台服务地址
          changeOrigin: true, // 是否允许不同源
          secure: false,      // 支持https
          rewrite: path => path.replace(/^api/, '')
        }
      },
    },
    build: {
      outDir: 'dist',
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,  // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true,   // 生产环境去除 console
          drop_debugger: true   // 生产环境去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500   // chunk 大小警告的限制（以 kbs 为单位）
    }
  }
})

