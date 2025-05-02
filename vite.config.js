import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/   
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    visualizer({ // Optional: generates stats.html to visualize bundle size
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        ecma: 2020,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three'],
          'three-extras': ['@react-three/fiber', '@react-three/drei'],
          'animation': ['framer-motion'],
          'utils': ['three/examples/jsm/loaders/SVGLoader', 'three/examples/jsm/loaders/GLTFLoader'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit for chunk size
    sourcemap: false, // Disable sourcemaps in production for better performance
  },
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'three', 'framer-motion', 'react-router-dom'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    host: true, // Needed for mobile testing on local network
    open: false,
    cors: true,
  },
  preview: {
    port: 5173,
  },
  // Enable tree-shaking and improved performance
  esbuild: {
    legalComments: 'none',
    target: 'esnext',
    minifyIdentifiers: true,
    minifySyntax: true,
  },
})
