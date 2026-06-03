const BANKS_CONFIG = {
  java_core: [
    { ai: 'chatgpt', title: 'ChatGPT', emoji: '🤖', description: 'Balanceado y claro' },
    { ai: 'claude', title: 'Claude', emoji: '🧠', description: 'Más analítico' },
    { ai: 'deepseek', title: 'DeepSeek', emoji: '⚡', description: 'Más técnico y directo', file: 'deepseek_java_core_v2.json' },
  ],
  microservicios: [
    { ai: 'chatgpt', title: 'ChatGPT', emoji: '🤖', description: 'Balanceado y claro' },
    { ai: 'claude', title: 'Claude', emoji: '🧠', description: 'Más analítico' },
    { ai: 'deepseek', title: 'DeepSeek', emoji: '⚡', description: 'Más técnico y directo' },
  ],
  java_patrones: [
    { ai: 'chatgpt', title: 'ChatGPT', emoji: '🤖', description: 'Balanceado y claro', file: 'chatgpt_java_patrones_v2.json' },
    { ai: 'claude', title: 'Claude', emoji: '🧠', description: 'Más analítico' },
    { ai: 'deepseek', title: 'DeepSeek', emoji: '⚡', description: 'Más técnico y directo' },
  ],

  java_arquitectura: [
    { ai: 'chatgpt', title: 'ChatGPT', emoji: '🤖', description: 'Balanceado y claro' },
    { ai: 'claude', title: 'Claude', emoji: '🧠', description: 'Más analítico' },
    { ai: 'deepseek', title: 'DeepSeek', emoji: '⚡', description: 'Más técnico y directo' },
  ],
}

const TOPIC_LABELS = {
  java_core: 'Java Core',
  microservicios: 'Microservicios y APIs',
  java_patrones: 'Java Patrones',
  java_arquitectura: 'Java Arquitectura',
}

export default function LandingPage({ onSelect, onBack, topic }) {
  const banks = (BANKS_CONFIG[topic] || []).map(b => ({
    ...b,
    id: `${topic}/${b.file ?? `${b.ai}_${topic}.json`}`,
  }))

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {TOPIC_LABELS[topic] || 'Interview Simulator'}
      </h1>

      <p style={styles.subtitle}>
        Selecciona tu entrevistador
      </p>

      <div style={styles.grid}>
        {banks.map((bank) => (
          <div
            key={bank.id}
            style={styles.card}
            onClick={() => onSelect(bank.id)}
          >
            <div style={styles.emoji}>
              {bank.emoji}
            </div>

            <h2 style={styles.cardTitle}>
              {bank.title}
            </h2>

            <p style={styles.description}>
              {bank.description}
            </p>
          </div>
        ))}
      </div>

      <button style={styles.backButton} onClick={onBack}>
        ← Cambiar tema
      </button>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'clamp(20px, 5vw, 40px)',
    fontFamily: 'Inter, sans-serif'
  },

  title: {
    fontSize: 'clamp(28px, 6vw, 52px)',
    fontWeight: 800,
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 'clamp(16px, 3vw, 20px)',
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    width: '100%',
    maxWidth: 950
  },

  card: {
    background: 'white',
    borderRadius: 24,
    padding: 'clamp(20px, 4vw, 40px)',
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    transition: '0.2s',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },

  emoji: {
    fontSize: 'clamp(40px, 8vw, 60px)',
    marginBottom: 16
  },

  cardTitle: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10
  },

  description: {
    color: '#6b7280',
    fontSize: 'clamp(14px, 2.5vw, 16px)'
  },

  backButton: {
    marginTop: 32,
    background: 'none',
    border: '1px solid #d1d5db',
    borderRadius: 10,
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 2vw, 15px)',
    color: '#6b7280',
    fontWeight: 500
  }
}
