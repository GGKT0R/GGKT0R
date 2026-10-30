// Configuración compartida de Tailwind (index + conceptos)
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: '#040308',
          surface: '#0a0814',
          card: '#120d24',
          cardHover: '#181230',
          border: '#2e1c57',
          neonPurple: '#c084fc',
          purpleCore: '#9333ea',
          purpleGlow: '#a855f7',
          deepPurple: '#581c87',
          accentCyan: '#38bdf8',
          alertRed: '#f43f5e',
          statusGreen: '#10b981'
        }
      },
      boxShadow: {
        'neon-purple': '0 0 20px -3px rgba(168, 85, 247, 0.45)',
        'neon-purple-lg': '0 0 35px -2px rgba(147, 51, 234, 0.55)',
        'neon-border': 'inset 0 0 12px rgba(168, 85, 247, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(147, 51, 234, 0.18) 1px, transparent 1px)",
      }
    }
  }
}
