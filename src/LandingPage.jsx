export default function LandingPage({ onSelect }) {
  const banks = [
    {
      id: 'chatgpt_java_core_interview_bank_junior_mid.json',
      title: 'ChatGPT',
      emoji: '🤖',
      description: 'Balanceado y claro'
    },
    {
      id: 'claude_java_core_interview_bank_junior_mid.json',
      title: 'Claude',
      emoji: '🧠',
      description: 'Más analítico'
    },
    {
      id: 'deepseek_java_core_interview_bank_junior_mid.json',
      title: 'DeepSeek',
      emoji: '⚡',
      description: 'Más técnico y directo'
    }
  ]

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Java Interview Simulator
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
  }
}