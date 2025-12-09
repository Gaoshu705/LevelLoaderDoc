import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LevelLoader",
  description: "一个简化添加自定义关卡到植物大战僵尸融合版的模组",
  lang: 'zh-CN',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'API 文档', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '快速开始', link: '/get-started' }
        ]
      },
      {
        text: 'API 文档',
        items: [
          { text: 'LevelLoader API', link: '/api-doc' }
        ]
      },
      {
        text: '示例',
        items: [
          { text: '完整示例', link: '/code-example' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Gaoshu705/LevelLoaderDoc' }
    ]
  }
})
