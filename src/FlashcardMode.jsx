import { useState, useEffect } from 'react'

const TOTAL = 20

const levelColors = {
    Junior: { bg: '#eff6ff', text: '#2563eb' },
    Mid:    { bg: '#f0fdf4', text: '#15803d' },
    Senior: { bg: '#fef9c3', text: '#92400e' },
}

export default function FlashcardMode({ bank, onBack }) {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading]     = useState(true)
    const [index, setIndex]         = useState(0)
    const [revealed, setRevealed]   = useState(false)
    const [knew, setKnew]           = useState(0)
    const [didntKnow, setDidntKnow] = useState(0)
    const [finished, setFinished]   = useState(false)

    useEffect(() => {
        fetch(`/question-banks/${bank}`)
            .then(r => r.json())
            .then(data => {
                const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, TOTAL)
                setQuestions(shuffled)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [bank])

    const current = questions[index]
    const progress = questions.length > 0 ? (index / questions.length) * 100 : 0

    const handleRate = (didKnow) => {
        if (didKnow) setKnew(k => k + 1)
        else setDidntKnow(d => d + 1)

        if (index + 1 >= questions.length) {
            setFinished(true)
        } else {
            setIndex(i => i + 1)
            setRevealed(false)
        }
    }

    if (loading) {
        return (
            <div style={styles.center}>
                <p style={{ color: '#94a3b8', fontSize: 16 }}>Cargando preguntas...</p>
            </div>
        )
    }

    if (!questions.length) {
        return (
            <div style={styles.center}>
                <p style={{ color: '#94a3b8' }}>No se encontraron preguntas.</p>
                <button style={styles.backBtn} onClick={onBack}>← Volver</button>
            </div>
        )
    }

    if (finished) {
        const pct = Math.round((knew / questions.length) * 100)
        const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚'
        return (
            <div style={styles.center}>
                <div style={styles.resultCard}>
                    <div style={styles.trophy}>{emoji}</div>
                    <h1 style={styles.resultTitle}>Repaso completado</h1>
                    <p style={styles.resultSub}>{questions.length} preguntas · {pct}% dominado</p>

                    <div style={styles.statsRow}>
                        <div style={styles.statBoxGreen}>
                            <div style={styles.statNumGreen}>{knew}</div>
                            <div style={styles.statLabel}>Lo supe ✅</div>
                        </div>
                        <div style={styles.statBoxRed}>
                            <div style={styles.statNumRed}>{didntKnow}</div>
                            <div style={styles.statLabel}>No lo supe ❌</div>
                        </div>
                    </div>

                    <button style={styles.primaryBtn} onClick={onBack}>
                        ← Volver al inicio
                    </button>
                </div>
            </div>
        )
    }

    const lvlColor = levelColors[current.level] || levelColors['Junior']

    return (
        <div style={styles.container}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header */}
            <div style={styles.header}>
                <button style={styles.backBtn} onClick={onBack}>← Salir</button>
                <span style={styles.progressInfo}>{index + 1} / {questions.length}</span>
            </div>

            {/* Barra de progreso */}
            <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>

            {/* Card pregunta */}
            <div style={styles.card}>
                <div style={styles.meta}>
                    <span style={{ ...styles.badge, background: lvlColor.bg, color: lvlColor.text }}>
                        {current.level}
                    </span>
                    {current.category && (
                        <span style={{ ...styles.badge, background: '#f8fafc', color: '#64748b' }}>
                            {current.category}
                        </span>
                    )}
                </div>

                <p style={styles.question}>{current.question}</p>

                {/* Respuesta revelada */}
                {revealed && (
                    <div style={{ animation: 'fadeIn 0.25s ease' }}>
                        <div style={styles.divider} />
                        <div style={styles.answerLabel}>Respuesta</div>
                        <p style={styles.answerText}>{current.answer}</p>
                        {current.example && (
                            <pre style={styles.codeBlock}>{current.example}</pre>
                        )}
                    </div>
                )}
            </div>

            {/* Botones de acción */}
            <div style={styles.actions}>
                {!revealed ? (
                    <button style={styles.primaryBtn} onClick={() => setRevealed(true)}>
                        Ver respuesta
                    </button>
                ) : (
                    <div style={styles.ratingRow}>
                        <button style={styles.knewBtn} onClick={() => handleRate(true)}>
                            ✅ Lo supe
                        </button>
                        <button style={styles.didntBtn} onClick={() => handleRate(false)}>
                            ❌ No lo supe
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh', background: '#f8fafc',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(16px, 4vw, 32px)',
        fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
    },
    center: {
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        fontFamily: 'Inter, sans-serif', gap: 16,
    },
    header: {
        width: '100%', maxWidth: 680,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20,
    },
    backBtn: {
        background: 'none', border: '1.5px solid #cbd5e1', borderRadius: 10,
        padding: '8px 16px', cursor: 'pointer', fontSize: 14,
        color: '#64748b', fontWeight: 600,
    },
    progressInfo: {
        fontSize: 13, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.5px',
    },
    progressTrack: {
        width: '100%', maxWidth: 680, height: 5, background: '#e2e8f0',
        borderRadius: 99, marginBottom: 24, overflow: 'hidden',
    },
    progressFill: {
        height: '100%', background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
        borderRadius: 99, transition: 'width 0.4s ease',
    },
    card: {
        width: '100%', maxWidth: 680, background: '#fff', borderRadius: 20,
        padding: 'clamp(24px, 5vw, 36px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9',
        marginBottom: 20,
    },
    meta: { display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' },
    badge: {
        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
        letterSpacing: '0.5px', textTransform: 'uppercase',
    },
    question: {
        fontSize: 'clamp(16px, 2.5vw, 19px)', fontWeight: 700,
        color: '#0f172a', lineHeight: 1.55, margin: 0,
    },
    divider: { width: '100%', height: 1, background: '#f1f5f9', margin: '20px 0' },
    answerLabel: {
        fontSize: 11, fontWeight: 700, color: '#3b82f6',
        letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10,
    },
    answerText: {
        fontSize: 'clamp(14px, 2vw, 15px)', color: '#334155',
        lineHeight: 1.75, whiteSpace: 'pre-line', margin: 0,
    },
    codeBlock: {
        background: '#1e293b', color: '#e2e8f0',
        padding: '16px 18px', borderRadius: 12, overflowX: 'auto',
        fontSize: 'clamp(12px, 1.8vw, 13px)', lineHeight: 1.7, marginTop: 14,
        fontFamily: "'Fira Code', 'Consolas', monospace", whiteSpace: 'pre',
    },
    actions: { width: '100%', maxWidth: 680 },
    primaryBtn: {
        width: '100%', padding: 'clamp(14px, 3vw, 16px)',
        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        color: '#fff', border: 'none', borderRadius: 14,
        fontSize: 'clamp(15px, 2.5vw, 16px)', fontWeight: 700, cursor: 'pointer',
    },
    ratingRow: { display: 'flex', gap: 12 },
    knewBtn: {
        flex: 1, padding: 'clamp(13px, 3vw, 15px)',
        background: '#f0fdf4', color: '#16a34a', border: '2px solid #bbf7d0',
        borderRadius: 14, fontSize: 'clamp(14px, 2.5vw, 15px)',
        fontWeight: 700, cursor: 'pointer',
    },
    didntBtn: {
        flex: 1, padding: 'clamp(13px, 3vw, 15px)',
        background: '#fff1f2', color: '#dc2626', border: '2px solid #fecdd3',
        borderRadius: 14, fontSize: 'clamp(14px, 2.5vw, 15px)',
        fontWeight: 700, cursor: 'pointer',
    },
    // Results
    resultCard: {
        background: '#fff', borderRadius: 20,
        padding: 'clamp(28px, 6vw, 44px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid #f1f5f9', textAlign: 'center',
        width: '100%', maxWidth: 440,
    },
    trophy: { fontSize: 56, marginBottom: 16 },
    resultTitle: {
        fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800,
        color: '#0f172a', marginBottom: 8,
    },
    resultSub: { fontSize: 14, color: '#94a3b8', marginBottom: 28 },
    statsRow: { display: 'flex', gap: 14, marginBottom: 28, justifyContent: 'center' },
    statBoxGreen: {
        flex: 1, maxWidth: 160, padding: '18px 12px', borderRadius: 14,
        background: '#f0fdf4', border: '1.5px solid #bbf7d0',
    },
    statBoxRed: {
        flex: 1, maxWidth: 160, padding: '18px 12px', borderRadius: 14,
        background: '#fff1f2', border: '1.5px solid #fecdd3',
    },
    statNumGreen: { fontSize: 36, fontWeight: 800, color: '#16a34a', lineHeight: 1, marginBottom: 4 },
    statNumRed:   { fontSize: 36, fontWeight: 800, color: '#dc2626', lineHeight: 1, marginBottom: 4 },
    statLabel: { fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
}
