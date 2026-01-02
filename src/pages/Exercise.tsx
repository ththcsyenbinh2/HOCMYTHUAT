import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonById } from '@/data/curriculum';
import { generateMixedExam, calculateScore } from '@/lib/gemini';
import { MixedExam, Question } from '@/types';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import './Exercise.css';

export default function Exercise() {
    const { grade, lessonId } = useParams();
    const navigate = useNavigate();
    const { student } = useAuth();

    const [isGenerating, setIsGenerating] = useState(true);
    const [exam, setExam] = useState<MixedExam | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState<any>(null);

    const gradeNum = parseInt(grade || '6') as 6 | 7 | 8 | 9;
    const lessonIdNum = parseInt(lessonId || '1');
    const lessonData = getLessonById(gradeNum, lessonIdNum);

    useEffect(() => {
        if (!student || !lessonData) return;

        const generateExam = async () => {
            setIsGenerating(true);
            try {
                const mixedExam = await generateMixedExam(
                    gradeNum,
                    lessonData.topic.title,
                    lessonData.lesson.title
                );
                setExam(mixedExam);
            } catch (error) {
                console.error('Error generating exam:', error);
            } finally {
                setIsGenerating(false);
            }
        };

        generateExam();
    }, [student, lessonData, gradeNum]);

    if (!student || !lessonData) {
        return null;
    }

    const { lesson, topic } = lessonData;

    const handleSubmit = () => {
        if (!exam) return;

        const examResult = calculateScore(exam, answers);
        setResult(examResult);
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setIsSubmitted(false);
        setResult(null);
        setIsGenerating(true);

        // Generate new exam
        generateMixedExam(gradeNum, topic.title, lesson.title)
            .then(mixedExam => {
                setExam(mixedExam);
                setIsGenerating(false);
            })
            .catch(error => {
                console.error('Error generating exam:', error);
                setIsGenerating(false);
            });
    };

    if (isGenerating) {
        return (
            <div className="exercise-page">
                <header className="exercise-header">
                    <div className="container">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            ← Quay lại
                        </Button>
                        <div className="exercise-info">
                            <h1>{lesson.title}</h1>
                            <p className="text-secondary">{topic.title}</p>
                        </div>
                    </div>
                </header>
                <main className="exercise-main container">
                    <LoadingSpinner size="lg" text="AI đang tạo đề thi 20 câu hỏi trộn lẫn cho bạn..." />
                </main>
            </div>
        );
    }

    if (!exam) {
        return (
            <div className="exercise-page">
                <header className="exercise-header">
                    <div className="container">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            ← Quay lại
                        </Button>
                    </div>
                </header>
                <main className="exercise-main container">
                    <Card>
                        <h2>Không thể tạo đề thi</h2>
                        <p>Vui lòng thử lại sau.</p>
                        <Button onClick={() => navigate(-1)}>Quay lại</Button>
                    </Card>
                </main>
            </div>
        );
    }

    if (isSubmitted && result) {
        const percentage = (result.score / result.totalQuestions) * 100;
        const passed = percentage >= 70;

        return (
            <div className="exercise-page">
                <header className="exercise-header">
                    <div className="container">
                        <div className="exercise-info">
                            <h1>Kết quả bài thi</h1>
                            <p className="text-secondary">{lesson.title}</p>
                        </div>
                    </div>
                </header>
                <main className="exercise-main container">
                    <Card className="result-card">
                        <div className="result-icon">
                            {passed ? '🎉' : '💪'}
                        </div>
                        <h2>{passed ? 'Chúc mừng!' : 'Cố gắng lên!'}</h2>
                        <div className="result-score">
                            <span className="score-number">{result.score}/{result.totalQuestions}</span>
                            <span className="score-percentage">({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="result-breakdown">
                            <h3>Chi tiết theo mức độ:</h3>
                            <div className="breakdown-grid">
                                <div className="breakdown-item">
                                    <span className="breakdown-label">Nhận biết:</span>
                                    <span className="breakdown-value">
                                        {result.byLevel?.nhận_biết?.correct || 0}/{result.byLevel?.nhận_biết?.total || 0}
                                    </span>
                                </div>
                                <div className="breakdown-item">
                                    <span className="breakdown-label">Thông hiểu:</span>
                                    <span className="breakdown-value">
                                        {result.byLevel?.thông_hiểu?.correct || 0}/{result.byLevel?.thông_hiểu?.total || 0}
                                    </span>
                                </div>
                                <div className="breakdown-item">
                                    <span className="breakdown-label">Vận dụng:</span>
                                    <span className="breakdown-value">
                                        {result.byLevel?.vận_dụng?.correct || 0}/{result.byLevel?.vận_dụng?.total || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="result-actions">
                            <Button variant="primary" onClick={handleRetry}>
                                Làm lại
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
                                Về Dashboard
                            </Button>
                        </div>
                    </Card>
                </main>
            </div>
        );
    }

    const currentQuestion = exam.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

    return (
        <div className="exercise-page">
            <header className="exercise-header">
                <div className="container">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        ← Quay lại
                    </Button>
                    <div className="exercise-info">
                        <h1>{lesson.title}</h1>
                        <p className="text-secondary">{topic.title} - Đề thi 20 câu trộn lẫn</p>
                    </div>
                </div>
            </header>

            <main className="exercise-main container">
                <div className="exam-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-text">
                        Câu {currentQuestionIndex + 1} / {exam.questions.length}
                    </div>
                </div>

                <QuestionRenderer
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onAnswerChange={(answer) => setAnswers({ ...answers, [currentQuestion.id]: answer })}
                />

                <div className="exam-navigation">
                    {currentQuestionIndex > 0 && (
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        >
                            ← Câu trước
                        </Button>
                    )}
                    <div style={{ flex: 1 }}></div>
                    {currentQuestionIndex < exam.questions.length - 1 ? (
                        <Button
                            variant="primary"
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            disabled={!answers[currentQuestion.id]}
                        >
                            Câu tiếp →
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length < exam.questions.length}
                        >
                            Nộp bài
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
}

// Question Renderer Component
function QuestionRenderer({ question, answer, onAnswerChange }: {
    question: Question;
    answer: any;
    onAnswerChange: (answer: any) => void;
}) {
    const getQuestionTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            'multiple-choice': '📝 Trắc nghiệm',
            'drag-drop': '⇄ Kéo thả',
            'matching': '⚏ Ghép đôi',
            'ordering': '↕ Sắp xếp',
            'image-selection': '🖼 Chọn hình'
        };
        return labels[type] || type;
    };

    const getCognitiveLevelLabel = (level: string) => {
        const labels: Record<string, string> = {
            'nhận_biết': '🟢 Nhận biết',
            'thông_hiểu': '🟡 Thông hiểu',
            'vận_dụng': '🔴 Vận dụng'
        };
        return labels[level] || level;
    };

    return (
        <Card className="question-card">
            <div className="question-header">
                <span className="question-type">{getQuestionTypeLabel(question.type)}</span>
                <span className="question-level">{getCognitiveLevelLabel(question.cognitiveLevel)}</span>
            </div>

            {question.type === 'multiple-choice' && (
                <div className="multiple-choice-question">
                    <h3>{question.question}</h3>
                    <div className="options">
                        {question.options.map((option, idx) => (
                            <label key={idx} className={`option ${answer === idx ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={answer === idx}
                                    onChange={() => onAnswerChange(idx)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {question.type === 'drag-drop' && (
                <div className="drag-drop-question">
                    <h3>{question.instruction}</h3>
                    <p className="text-secondary">Chọn vùng thả tương ứng cho mỗi mục</p>
                    <div className="drag-drop-content">
                        {question.items.map((item, idx) => (
                            <div key={idx} className="drop-zone-selector">
                                <span className="item-label">{idx + 1}. {item}</span>
                                <select
                                    value={answer?.[idx] ?? ''}
                                    onChange={(e) => {
                                        const newAnswer = { ...answer, [idx]: parseInt(e.target.value) };
                                        onAnswerChange(newAnswer);
                                    }}
                                    className="zone-select"
                                >
                                    <option value="">Chọn vùng...</option>
                                    {question.dropZones.map((zone, zoneIdx) => (
                                        <option key={zoneIdx} value={zoneIdx}>
                                            {zone}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {question.type === 'matching' && (
                <div className="matching-question">
                    <h3>{question.instruction}</h3>
                    <div className="matching-content">
                        {question.leftItems.map((leftItem, idx) => (
                            <div key={idx} className="matching-pair">
                                <div className="left-item">{leftItem}</div>
                                <span className="arrow">→</span>
                                <select
                                    value={answer?.[idx] ?? ''}
                                    onChange={(e) => {
                                        const newAnswer = { ...answer, [idx]: parseInt(e.target.value) };
                                        onAnswerChange(newAnswer);
                                    }}
                                    className="right-select"
                                >
                                    <option value="">Chọn...</option>
                                    {question.rightItems.map((rightItem, rightIdx) => (
                                        <option key={rightIdx} value={rightIdx}>
                                            {rightItem}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {question.type === 'ordering' && (
                <div className="ordering-question">
                    <h3>{question.instruction}</h3>
                    <p className="text-secondary">Nhập số thứ tự (1, 2, 3...) cho mỗi mục</p>
                    <div className="ordering-items">
                        {question.items.map((item, idx) => (
                            <div key={idx} className="ordering-item">
                                <input
                                    type="number"
                                    min="1"
                                    max={question.items.length}
                                    placeholder="#"
                                    value={answer?.[idx] || ''}
                                    onChange={(e) => {
                                        const newAnswer = { ...answer, [idx]: parseInt(e.target.value) || 0 };
                                        onAnswerChange(newAnswer);
                                    }}
                                    className="order-input"
                                />
                                <span className="item-text">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {question.type === 'image-selection' && (
                <div className="image-selection-question">
                    <h3>{question.instruction}</h3>
                    <p className="main-idea">Ý chính: {question.mainIdea}</p>
                    <div className="images-grid">
                        {question.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`image-option ${(answer || []).includes(idx) ? 'selected' : ''}`}
                                onClick={() => {
                                    const selected = answer || [];
                                    const newSelected = selected.includes(idx)
                                        ? selected.filter((i: number) => i !== idx)
                                        : [...selected, idx];
                                    onAnswerChange(newSelected);
                                }}
                            >
                                <div className="image-placeholder">
                                    {img.description}
                                </div>
                                {(answer || []).includes(idx) && (
                                    <div className="selected-badge">✓</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
