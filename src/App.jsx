import { useEffect, useMemo, useState } from 'react'
import LandingPage from './LandingPage'

const styles = {
    footerArea: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20
    },

    container: {
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: 40,
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
        padding: 40
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    progressBar: {
        height: 10,
        background: '#e5e7eb',
        borderRadius: 999,
        marginBottom: 30
    },

    progress: {
        height: 10,
        background: '#2563eb',
        borderRadius: 999
    },

    questionCard: {
        background: '#f9fafb',
        padding: 30,
        borderRadius: 20
    },

    tags: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
    },

    tagsLeft: {
        display: 'flex',
        gap: 10,
        alignItems: 'center'
    },

    aiTag: {
        background: '#ede9fe',
        color: '#6d28d9',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: 'nowrap'
    },

    tag: {
        background: '#dbeafe',
        padding: '6px 12px',
        borderRadius: 999
    },

    juniorTag: {
        background: '#dcfce7',
        color: '#166534',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600
    },

    midTag: {
        background: '#fed7aa',
        color: '#c2410c',
        padding: '6px 12px',
        borderRadius: 999,
        fontWeight: 600
    },

    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        marginTop: 20
    },

    optionButton: {
        padding: 20,
        borderRadius: 12,
        border: '1px solid #d1d5db',
        fontSize: 16,
        cursor: 'pointer',
        textAlign: 'left'
    },

    resultCard: {
        background: 'white',
        padding: 60,
        borderRadius: 24,
        textAlign: 'center',
        width: 500,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, sans-serif'
    },

    trophy: {
        fontSize: 60,
        marginBottom: 20
    },

    resultTitle: {
        fontSize: 42,
        fontWeight: 800,
        marginBottom: 30,
        color: '#111827'
    },

    resultScore: {
        fontSize: 52,
        fontWeight: 700,
        color: '#2563eb'
    },

    resultPercentage: {
        fontSize: 32,
        marginTop: 10,
        marginBottom: 40,
        color: '#6b7280',
        fontWeight: 600
    },

    explanation: {
        marginTop: 30,
        background: 'white',
        padding: 20,
        borderRadius: 12
    },

    restartButton: {
        padding: '10px 18px',
        background: '#f3f4f6',
        color: '#374151',
        border: '1px solid #d1d5db',
        borderRadius: 10,
        cursor: 'pointer',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 600,
        transition: '0.2s'
    },

    button: {
        marginTop: 30,
        padding: '15px 25px',
        background: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        fontSize: 16
    },

    codeBlock: {
        background: '#f3f4f6',
        color: '#111827',
        padding: 24,
        borderRadius: 16,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.7,
        marginTop: 24,
        marginBottom: 24,
        fontFamily:
            'Consolas, Monaco, monospace',
        border: '1px solid #e5e7eb',
        whiteSpace: 'pre-wrap'
    },
}

const AI_NAMES = { chatgpt: 'ChatGPT', claude: 'Claude', deepseek: 'DeepSeek' }

function getAIName(bank) {
    if (!bank) return ''
    const prefix = bank.split('_')[0]
    return AI_NAMES[prefix] || prefix
}

export default function App() {
    const TOTAL_QUESTIONS = 25

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [quizKey, setQuizKey] = useState(0)
    const [selectedBank, setSelectedBank] = useState(null)
    const [showLanding, setShowLanding] = useState(true)

    useEffect(() => {
        if (!selectedBank) return
        //fetch('/question-banks/deepseek_json_java_junior_mid.json')
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

    const shuffledQuestions = useMemo(() => {
        return [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, TOTAL_QUESTIONS)
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
        setShowLanding(true)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setFinished(false)
    }

    if (showLanding) {
        return (
            <LandingPage
                onSelect={(bank) => {
                    setSelectedBank(bank)
                    setShowLanding(false)
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
                        <h1>Java Core Interview Quiz</h1>

                        <p>
                            Pregunta {currentQuestionIndex + 1} de{' '}
                            {shuffledQuestions.length}
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button
                            style={styles.restartButton}
                            onClick={restartQuiz}
                        >
                            Nueva entrevista
                        </button>

                        <h2>{score} correctas</h2>
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
                        <div style={{ flex: 1 }}>
                            {showResult && (
                                <div style={styles.explanation}>
                                    <strong>Explicación:</strong>

                                    <p>{currentQuestion.explanation}</p>
                                </div>
                            )}
                        </div>

                        <button
                            style={{
                                ...styles.button,
                                opacity: showResult ? 1 : 0.5,
                                marginTop: 0,
                                minWidth: 180,
                                height: 60
                            }}
                            disabled={!showResult}
                            onClick={handleNext}
                        >
                            {currentQuestionIndex + 1 ===
                                shuffledQuestions.length
                                ? 'Finalizar'
                                : 'Siguiente'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
