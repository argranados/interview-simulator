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
    padding: 40,
    fontFamily: 'Inter, sans-serif'
  },

  title: {
    fontSize: 52,
    fontWeight: 800,
    color: '#111827',
    marginBottom: 12
  },

  subtitle: {
    fontSize: 20,
    color: '#6b7280',
    marginBottom: 50
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 24,
    width: '100%',
    maxWidth: 950
  },

  card: {
    background: 'white',
    borderRadius: 24,
    padding: 40,
    cursor: 'pointer',
    border: '1px solid #e5e7eb',
    transition: '0.2s',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },

  emoji: {
    fontSize: 60,
    marginBottom: 20
  },

  cardTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10
  },

  description: {
    color: '#6b7280',
    fontSize: 16
  }
}  