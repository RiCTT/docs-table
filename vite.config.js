import { svgBuilder } from './src/plugins/svg-builder'
import path from 'path'

export default {
  port: 3000,
  open: true,
  https: false,
  ssr: false,
  alias: {
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
  },
  proxy: {
    '/api': {
      target: 'http://10.192.195.96:8087/',
      changeOrigin: true
    }
  },
  plugins: [
    svgBuilder('./src/components/wheel-icon/svg/')
  ]
}
