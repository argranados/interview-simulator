// Bancos de repaso disponibles.
// Para agregar uno nuevo: añade un objeto a este array.
const REPASO_BANKS = [
    {
        id: 'tech_interview/epam_interview_bank.json',
        title: 'EPAM',
        emoji: '🏢',
        description: 'Entrevista técnica real — Java, Spring, SQL, Testing',
        tag: 'Java · Spring · SQL · Testing',
    },
    {
        id: 'tech_interview/epam_interview_bank_2.json',
        title: 'EPAM 2',
        emoji: '🏢',
        description: 'OOP, Hibernate, Kafka, AWS, SOLID — Nov 2024',
        tag: 'OOP · Kafka · AWS · SOLID',
    },    
    // Ejemplo de cómo agregar más en el futuro:
    // {
    //   id: 'tech_interview/google_interview_bank.json',
    //   title: 'Google',
    //   emoji: '🔍',
    //   description: 'Preguntas estilo Google SWE',
    //   tag: 'Algorithms · System Design',
    // },
]

export default function FlashcardTopicPage({ onSelect, onBack }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Modo Repaso</h1>
            <p style={styles.subtitle}>Selecciona un banco de preguntas</p>

            <div style={styles.grid}>
                {REPASO_BANKS.map((bank) => (
                    <div
                        key={bank.id}
                        style={styles.card}
                        onClick={() => onSelect(bank.id)}
                    >
                        <div style={styles.emoji}>{bank.emoji}</div>
                        <h2 style={styles.cardTitle}>{bank.title}</h2>
                        <p style={styles.description}>{bank.description}</p>
                        <span style={styles.tag}>{bank.tag}</span>
                    </div>
                ))}
            </div>

            <button style={styles.backButton} onClick={onBack}>
                ← Volver
            </button>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh', background: '#f8fafc', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 'clamp(20px, 5vw, 40px)', fontFamily: 'Inter, sans-serif'
    },
    title: {
        fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800,
        color: '#111827', marginBottom: 12, textAlign: 'center'
    },
    subtitle: {
        fontSize: 'clamp(15px, 3vw, 19px)', color: '#6b7280',
        marginBottom: 40, textAlign: 'center'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20, width: '100%', maxWidth: 700
    },
    card: {
        background: 'white', borderRadius: 24,
        padding: 'clamp(24px, 4vw, 40px)', cursor: 'pointer',
        border: '2px solid #e0e7ff', transition: '0.2s',
        boxShadow: '0 10px 25px rgba(99,102,241,0.07)', textAlign: 'center',
    },
    emoji: { fontSize: 'clamp(44px, 8vw, 64px)', marginBottom: 16 },
    cardTitle: {
        fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800,
        color: '#111827', marginBottom: 10
    },
    description: {
        color: '#6b7280', fontSize: 'clamp(13px, 2.5vw, 15px)',
        lineHeight: 1.5, marginBottom: 14
    },
    tag: {
        display: 'inline-block',
        background: '#ede9fe', color: '#6d28d9',
        fontSize: 11, fontWeight: 700,
        padding: '4px 12px', borderRadius: 999,
        letterSpacing: '0.3px'
    },
    backButton: {
        marginTop: 36,
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
