export default function TopicPage({ onSelect }) {
const topics = [
    // Fila 1 - disponibles
    { id: 'java_core', title: 'Java Core', emoji: '☕', description: 'Fundamentos del lenguaje', available: true },
    { id: 'microservicios', title: 'Microservicios y APIs', emoji: '🔗', description: 'REST, gRPC, mensajería', available: true },
    
    // Fila 1 - próximamente
    { id: 'java_patrones', title: 'Java Patrones', emoji: '🧩', description: 'Design patterns', available: true },
    { id: 'java_arquitectura', title: 'Java Arquitectura', emoji: '🏛️', description: 'Arquitectura de software', available: true },
    
    // Fila 2 - NUEVOS TEMAS (todos como "Próximamente")
    { id: 'sql_java', title: 'SQL Java', emoji: '🗄️', description: 'Consultas, JDBC, JPA', available: false },
    { id: 'unit_testing', title: 'Unit Testing', emoji: '🧪', description: 'JUnit, Mockito, TDD', available: false },
    { id: 'devops_java', title: 'DevOps Java', emoji: '🚀', description: 'CI/CD, Docker, Kubernetes', available: false },
    { id: 'aws_java', title: 'AWS Java Backend', emoji: '☁️', description: 'Lambda, RDS, S3, EC2', available: false },
]

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Interview Simulator</h1>
            <p style={styles.subtitle}>¿Qué tema quieres practicar?</p>

            <div style={styles.grid}>
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        style={{ ...styles.card, ...(topic.available ? {} : styles.cardDisabled) }}
                        onClick={() => topic.available && onSelect(topic.id)}
                    >
                        <div style={styles.emoji}>{topic.emoji}</div>
                        <h2 style={styles.cardTitle}>{topic.title}</h2>
                        <p style={styles.description}>{topic.description}</p>
                        {!topic.available && <span style={styles.soon}>Próximamente</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ⬇️ IMPORTANTE: Este objeto debe estar definido
const styles = {
    container: {
        minHeight: '100vh', background: '#f8fafc', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: 'clamp(20px, 5vw, 40px)', fontFamily: 'Inter, sans-serif'
    },
    title: {
        fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 800,
        color: '#111827', marginBottom: 12, textAlign: 'center'
    },
    subtitle: {
        fontSize: 'clamp(16px, 3vw, 20px)', color: '#6b7280',
        marginBottom: 40, textAlign: 'center'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, width: '100%', maxWidth: 950
    },
    card: {
        background: 'white', borderRadius: 24,
        padding: 'clamp(20px, 4vw, 40px)', cursor: 'pointer',
        border: '1px solid #e5e7eb', transition: '0.2s',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center',
        position: 'relative'
    },
    cardDisabled: {
        opacity: 0.5, cursor: 'default', background: '#f9fafb'
    },
    emoji: { fontSize: 'clamp(40px, 8vw, 60px)', marginBottom: 16 },
    cardTitle: { fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: '#111827', marginBottom: 10 },
    description: { color: '#6b7280', fontSize: 'clamp(14px, 2.5vw, 16px)' },
    soon: {
        display: 'inline-block', marginTop: 10,
        background: '#fef3c7', color: '#92400e',
        fontSize: 12, fontWeight: 600,
        padding: '4px 10px', borderRadius: 999
    }
}