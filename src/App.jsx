import { useEffect, useMemo, useState } from 'react'
import LandingPage from './LandingPage'
import TopicPage from './TopicPage'

const styles = {
    footerArea: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },

    container: {
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: 'clamp(12px, 3vw, 40px)',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
    },

    center: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        width: '100%',
        maxWidth: 900,
        background: 'white',
        borderRadius: 20,
        padding: 'clamp(16px, 3vw, 40px)'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        gap: 10
    },

    progressBar: {
        height: 10,
        background: '#e5e7eb',
        borderRadius: 999,
        marginBottom: 20
    },

    progress: {
        height: 10,
        background: '#2563eb',
        borderRadius: 999
    },

    questionCard: {
        background: '#f9fafb',
        padding: 'clamp(16px, 3vw, 30px)',
        borderRadius: 20
    },

    tags: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap'
    },

    tagsLeft: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    aiTag: {
        background: '#ede9fe',
        color: '#6d28d9',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 'clamp(12px, 2vw, 14px)',
        whiteSpace: 'nowrap'
    },

    tag: {
        background: '#dbeafe',
        padding: '6px 12px',
        borderRadius: 999,
        fontSize: 'clamp(12px, 2vw, 14px)'
    },

    juniorTag: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 'clamp(12px, 2vw, 14px)'
    },

    midTag: {
        background: '#fed7aa',
        color: '#c2410c',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 'clamp(12px, 2vw, 14px)'
    },

    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginTop: 16
    },

    optionButton: {
        padding: 'clamp(16px, 3vw, 22px) clamp(16px, 3vw, 20px)',
        borderRadius: 12,
        border: '1.5px solid #c7d2e0',
        fontSize: 'clamp(16px, 2.8vw, 19px)',
        cursor: 'pointer',
        textAlign: 'left',
        lineHeight: 1.5,
        width: '100%',
        background: '#f0f4f8',
        color: '#1e293b',
        fontWeight: 500
    },

    resultCard: {
        background: 'white',
        padding: 'clamp(30px, 5vw, 60px)',
        borderRadius: 24,
        textAlign: 'center',
        width: '100%',
        maxWidth: 500,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, sans-serif'
    },

    trophy: {
        fontSize: 'clamp(40px, 8vw, 60px)',
        marginBottom: 20
    },

    resultTitle: {
        fontSize: 'clamp(24px, 5vw, 42px)',
        fontWeight: 800,
        marginBottom: 20,
        color: '#111827'
    },

    resultScore: {
        fontSize: 'clamp(36px, 7vw, 52px)',
        fontWeight: 700,
        color: '#2563eb'
    },

    resultPercentage: {
        fontSize: 'clamp(22px, 4vw, 32px)',
        marginTop: 10,
        marginBottom: 30,
        color: '#6b7280',
        fontWeight: 600
    },

    explanation: {
        marginTop: 20,
        background: 'white',
        padding: 'clamp(14px, 3vw, 20px)',
        borderRadius: 12,
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        lineHeight: 1.6
    },

    restartButton: {
        padding: '10px 18px',
        background: '#f3f4f6',
        color: '#374151',
        border: '1px solid #d1d5db',
        borderRadius: 10,
        cursor: 'pointer',
        marginBottom: 10,
        fontSize: 'clamp(13px, 2vw, 14px)',
        fontWeight: 600,
        transition: '0.2s'
    },

    button: {
        padding: 'clamp(14px, 3vw, 15px) 25px',
        background: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        fontSize: 'clamp(15px, 2.5vw, 17px)',
        fontWeight: 600,
        width: '100%'
    },

    codeBlock: {
        background: '#f3f4f6',
        color: '#111827',
        padding: 'clamp(16px, 3vw, 24px)',
        borderRadius: 16,
        overflowX: 'auto',
        fontSize: 'clamp(12px, 2vw, 14px)',
        lineHeight: 1.7,
        marginTop: 16,
        marginBottom: 16,
        fontFamily: 'Consolas, Monaco, monospace',
        border: '1px solid #e5e7eb',
        whiteSpace: 'pre-wrap'
    },
}

const AI_NAMES = { chatgpt: 'ChatGPT', claude: 'Claude', deepseek: 'DeepSeek' }

const TOPIC_LABELS = {
    java_core: 'Java Core',
    microservicios: 'Microservicios y APIs',
    java_patrones: 'Java Patrones',
    java_arquitectura: 'Java Arquitectura',
}

function getAIName(bank) {
    if (!bank) return ''
    const filename = bank.split('/').pop()
    const prefix = filename.split('_')[0]
    return AI_NAMES[prefix] || prefix
}

export default function App() {
    const TOTAL_QUESTIONS = 25

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [quizKey, setQuizKey] = useState(0)
    const [selectedBank, setSelectedBank] = useState(null)
    const [selectedTopic, setSelectedTopic] = useState(null)
    const [showTopic, setShowTopic] = useState(true)
    const [showLanding, setShowLanding] = useState(false)

    useEffect(() => {
        if (!selectedBank) return
        setLoading(true)
        fetch(`/question-banks/${selectedBank}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [selectedBank])

    // DESPUÉS
    const shuffledQuestions = useMemo(() => {
        const a = [...questions]
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        return a.slice(0, TOTAL_QUESTIONS)
    }, [questions, quizKey])

    const currentQuestion = shuffledQuestions[currentQuestionIndex]

    const handleAnswer = (index) => {
        if (showResult) return

        setSelectedAnswer(index)
        setShowResult(true)

        if (index === currentQuestion.correct) {
            setScore((prev) => prev + 1)
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex + 1 >= shuffledQuestions.length) {
            setFinished(true)
            return
        }

        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
    }

    const restartQuiz = () => {
        setQuizKey(k => k + 1)
        setShowTopic(true)
        setShowLanding(false)
        setSelectedTopic(null)
        setSelectedBank(null)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setFinished(false)
        setQuestions([])
    }

    if (showTopic) {
        return (
            <TopicPage
                onSelect={(topic) => {
                    setSelectedTopic(topic)
                    setShowTopic(false)
                    setShowLanding(true)
                }}
            />
        )
    }

    if (showLanding) {
        return (
            <LandingPage
                topic={selectedTopic}
                onSelect={(bank) => {
                    setSelectedBank(bank)
                    setShowLanding(false)
                }}
                onBack={() => {
                    setShowLanding(false)
                    setShowTopic(true)
                    setSelectedTopic(null)
                }}
            />
        )
    }

    if (loading) {
        return (
            <div style={styles.center}>
                <h1>Cargando banco de preguntas...</h1>
            </div>
        )
    }

    if (!questions.length) {
        return (
            <div style={styles.center}>
                <h1>No se encontraron preguntas</h1>
            </div>
        )
    }

    if (finished) {
        const percentage = Math.round(
            (score / shuffledQuestions.length) * 100
        )

        return (
            <div style={styles.center}>
                <div style={styles.resultCard}>
                    <div style={styles.trophy}>🏆</div>

                    <h1 style={styles.resultTitle}>
                        Entrevista Finalizada
                    </h1>

                    <div style={styles.resultScore}>
                        {score}/{shuffledQuestions.length}
                    </div>

                    <div style={styles.resultPercentage}>
                        {percentage}%
                    </div>

                    <button style={styles.button} onClick={restartQuiz}>
                        Nueva entrevista
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div>
                        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, margin: 0 }}>{TOPIC_LABELS[selectedTopic] || 'Interview'}</h1>

                        <p style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', margin: '4px 0 0 0', color: '#374151', fontWeight: 500, whiteSpace: 'nowrap' }}>
                            Pregunta {currentQuestionIndex + 1} de {shuffledQuestions.length} &nbsp;·&nbsp; <strong>{score} correctas</strong>
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button
                            style={styles.restartButton}
                            onClick={restartQuiz}
                        >
                            Nueva entrevista
                        </button>
                    </div>
                </div>

                <div style={styles.progressBar}>
                    <div
                        style={{
                            ...styles.progress,
                            width: `${((currentQuestionIndex + 1) /
                                shuffledQuestions.length) *
                                100
                                }%`
                        }}
                    />
                </div>

                <div style={styles.questionCard}>
                    <div style={styles.tags}>
                        <div style={styles.tagsLeft}>
                            <span
                                style={
                                    currentQuestion.level === 'Mid'
                                        ? styles.midTag
                                        : styles.juniorTag
                                }
                            >
                                {currentQuestion.level}
                            </span>

                            {currentQuestion.category && (
                                <span style={styles.tag}>
                                    {currentQuestion.category}
                                </span>
                            )}
                        </div>

                        <span style={styles.aiTag}>
                            {getAIName(selectedBank)}
                        </span>
                    </div>

                    <h2>{currentQuestion.question}</h2>

                    {
                        currentQuestion.code && (
                            <pre style={styles.codeBlock}>
                                <code>
                                    {currentQuestion.code}
                                </code>
                            </pre>
                        )
                    }

                    <div style={styles.options}>
                        {currentQuestion.options.map((option, index) => {
                            const isCorrect =
                                index === currentQuestion.correct

                            const isSelected =
                                index === selectedAnswer

                            let background = 'white'

                            if (showResult) {
                                if (isCorrect) {
                                    background = '#d1fae5'
                                } else if (isSelected) {
                                    background = '#fee2e2'
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    style={{
                                        ...styles.optionButton,
                                        background
                                    }}
                                    onClick={() => handleAnswer(index)}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>

                    <div style={styles.footerArea}>
                        <button
                            style={{
                                ...styles.button,
                                opacity: showResult ? 1 : 0.5,
                            }}
                            disabled={!showResult}
                            onClick={handleNext}
                        >
                            {currentQuestionIndex + 1 ===
                                shuffledQuestions.length
                                ? 'Finalizar'
                                : 'Siguiente'}
                        </button>

                        {showResult && (
                            <div style={styles.explanation}>
                                <strong>Explicación:</strong>
                                <p>{currentQuestion.explanation}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
