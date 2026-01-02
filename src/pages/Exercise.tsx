import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonById } from '@/data/curriculum';
import { generateExercise } from '@/lib/gemini';
import { saveExerciseResult, calculatePercentage, getGradeLabel } from '@/services/database';
import { ExerciseData, ExerciseType } from '@/types';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import './Exercise.css';

const EXERCISE_TYPES: { type: ExerciseType; name: string; icon: string }[] = [
    { type: 'multiple-choice', name: 'Trắc nghiệm', icon: '✓' },
    { type: 'drag-drop', name: 'Kéo thả', icon: '⇄' },
    { type: 'matching', name: 'Ghép đôi', icon: '⚏' },
    { type: 'ordering', name: 'Sắp xếp', icon: '↕' },
    { type: 'image-selection', name: 'Chọn hình', icon: '🖼' },
];

export default function Exercise() {
    const { grade, topicId, lessonId } = useParams();
    const navigate = useNavigate();
    const { student } = useAuth();

    const [selectedType, setSelectedType] = useState<ExerciseType | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);
    const [answers, setAnswers] = useState<any>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    const gradeNum = parseInt(grade || '6') as 6 | 7 | 8 | 9;
    const lessonIdNum = parseInt(lessonId || '1');
    const lessonData = getLessonById(gradeNum, lessonIdNum);

    if (!student || !lessonData) {
        return null;
    }

    const { lesson, topic } = lessonData;

    const handleGenerateExercise = async (type: ExerciseType) => {
        setSelectedType(type);
        setIsGenerating(true);
        setExerciseData(null);
        setAnswers({});
        setIsSubmitted(false);

        try {
            const data = await generateExercise(student.grade, topic.title, lesson.title, type);
            setExerciseData(data);
        } catch (error) {
            console.error('Error generating exercise:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async () => {
        if (!exerciseData) return;

        let correctCount = 0;
        let totalQuestions = 0;

        // Calculate score based on exercise type
        if (exerciseData.type === 'multiple-choice') {
            totalQuestions = exerciseData.questions.length;
            exerciseData.questions.forEach((q, idx) => {
                if (answers[idx] === q.correctAnswer) correctCount++;
            });
        } else if (exerciseData.type === 'drag-drop') {
            const mapping = exerciseData.exercise.correctMapping;
            totalQuestions = Object.keys(mapping).length;
            Object.entries(mapping).forEach(([key, value]) => {
                if (answers[key] === value) correctCount++;
            });
        } else if (exerciseData.type === 'matching') {
            const pairs = exerciseData.exercise.correctPairs;
            totalQuestions = Object.keys(pairs).length;
            Object.entries(pairs).forEach(([key, value]) => {
                if (answers[key] === value) correctCount++;
            });
        } else if (exerciseData.type === 'ordering') {
            totalQuestions = 1;
            const correct = JSON.stringify(exerciseData.exercise.correctOrder);
            const userAnswer = JSON.stringify(answers.order || []);
            if (correct === userAnswer) correctCount = 1;
        } else if (exerciseData.type === 'image-selection') {
            totalQuestions = 1;
            const correct = JSON.stringify(exerciseData.exercise.correctIndices.sort());
            const userAnswer = JSON.stringify((answers.selected || []).sort());
            if (correct === userAnswer) correctCount = 1;
        }

        setScore(correctCount);
        setTotal(totalQuestions);
        setIsSubmitted(true);

        // Save to database
        await saveExerciseResult(
            student.id,
            student.grade,
            topic.title,
            lesson.title,
            exerciseData.type,
            correctCount,
            totalQuestions,
            answers
        );
    };

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
                {!selectedType && (
                    <div className="exercise-type-selection">
                        <h2>Chọn loại bài tập</h2>
                        <div className="exercise-types-grid">
                            {EXERCISE_TYPES.map((type) => (
                                <Card
                                    key={type.type}
                                    hoverable
                                    onClick={() => handleGenerateExercise(type.type)}
                                    className="exercise-type-card"
                                >
                                    <div className="exercise-type-icon">{type.icon}</div>
                                    <h3>{type.name}</h3>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {isGenerating && (
                    <LoadingSpinner size="lg" text="AI đang tạo bài tập cho bạn..." />
                )}

                {exerciseData && !isSubmitted && (
                    <div className="exercise-content">
                        <div className="exercise-header-bar">
                            <h2>Bài tập: {EXERCISE_TYPES.find(t => t.type === exerciseData.type)?.name}</h2>
                            <Button variant="ghost" onClick={() => setSelectedType(null)}>
                                Chọn bài khác
                            </Button>
                        </div>

                        {exerciseData.type === 'multiple-choice' && (
                            <div className="multiple-choice-exercise">
                                {exerciseData.questions.map((q, idx) => (
                                    <Card key={idx} className="question-card">
                                        <h3>Câu {idx + 1}: {q.question}</h3>
                                        <div className="options">
                                            {q.options.map((option, optIdx) => (
                                                <label key={optIdx} className="option">
                                                    <input
                                                        type="radio"
                                                        name={`question-${idx}`}
                                                        checked={answers[idx] === optIdx}
                                                        onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                                                    />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {exerciseData.type === 'drag-drop' && (
                            <Card className="drag-drop-exercise">
                                <h3>{exerciseData.exercise.instruction}</h3>
                                <p className="text-secondary">Chọn mục và vùng thả tương ứng</p>
                                <div className="drag-drop-content">
                                    <div className="items-list">
                                        <h4>Các mục:</h4>
                                        {exerciseData.exercise.items.map((item, idx) => (
                                            <div key={idx} className="drag-item">
                                                {idx + 1}. {item}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="drop-zones">
                                        <h4>Chọn vùng thả:</h4>
                                        {exerciseData.exercise.items.map((item, idx) => (
                                            <div key={idx} className="drop-zone-selector">
                                                <span>{idx + 1}. {item} →</span>
                                                <select
                                                    value={answers[idx] ?? ''}
                                                    onChange={(e) => setAnswers({ ...answers, [idx]: parseInt(e.target.value) })}
                                                >
                                                    <option value="">Chọn...</option>
                                                    {exerciseData.exercise.dropZones.map((zone, zoneIdx) => (
                                                        <option key={zoneIdx} value={zoneIdx}>
                                                            {zone}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {exerciseData.type === 'matching' && (
                            <Card className="matching-exercise">
                                <h3>{exerciseData.exercise.instruction}</h3>
                                <div className="matching-content">
                                    {exerciseData.exercise.leftItems.map((leftItem, idx) => (
                                        <div key={idx} className="matching-pair">
                                            <div className="left-item">{leftItem}</div>
                                            <span>→</span>
                                            <select
                                                value={answers[idx] ?? ''}
                                                onChange={(e) => setAnswers({ ...answers, [idx]: parseInt(e.target.value) })}
                                                className="right-select"
                                            >
                                                <option value="">Chọn...</option>
                                                {exerciseData.exercise.rightItems.map((rightItem, rightIdx) => (
                                                    <option key={rightIdx} value={rightIdx}>
                                                        {rightItem}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {exerciseData.type === 'ordering' && (
                            <Card className="ordering-exercise">
                                <h3>{exerciseData.exercise.instruction}</h3>
                                <p className="text-secondary">Nhập số thứ tự (1, 2, 3...) cho mỗi mục</p>
                                <div className="ordering-items">
                                    {exerciseData.exercise.items.map((item, idx) => (
                                        <div key={idx} className="ordering-item">
                                            <input
                                                type="number"
                                                min="1"
                                                max={exerciseData.exercise.items.length}
                                                placeholder="#"
                                                value={answers[`item-${idx}`] || ''}
                                                onChange={(e) => {
                                                    const newAnswers = { ...answers, [`item-${idx}`]: parseInt(e.target.value) || 0 };
                                                    const order = exerciseData.exercise.items.map((_, i) =>
                                                        newAnswers[`item-${i}`] ? { idx: i, order: newAnswers[`item-${i}`] } : null
                                                    ).filter(Boolean).sort((a, b) => a!.order - b!.order).map(x => x!.idx);
                                                    setAnswers({ ...newAnswers, order });
                                                }}
                                                className="order-input"
                                            />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {exerciseData.type === 'image-selection' && (
                            <Card className="image-selection-exercise">
                                <h3>{exerciseData.exercise.instruction}</h3>
                                <p className="main-idea">Ý chính: {exerciseData.exercise.mainIdea}</p>
                                <div className="images-grid">
                                    {exerciseData.exercise.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`image-option ${(answers.selected || []).includes(idx) ? 'selected' : ''}`}
                                            onClick={() => {
                                                const selected = answers.selected || [];
                                                const newSelected = selected.includes(idx)
                                                    ? selected.filter((i: number) => i !== idx)
                                                    : [...selected, idx];
                                                setAnswers({ ...answers, selected: newSelected });
                                            }}
                                        >
                                            <div className="image-placeholder">
                                                {img.description}
                                            </div>
                                            {(answers.selected || []).includes(idx) && (
                                                <div className="selected-badge">✓</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        <div className="exercise-actions">
                            <Button variant="primary" size="lg" onClick={handleSubmit}>
                                Nộp bài
                            </Button>
                        </div>
                    </div>
                )}

                {isSubmitted && (
                    <div className="exercise-result">
                        <Card className="result-card">
                            <div className="result-icon">
                                {calculatePercentage(score, total) >= 70 ? '🎉' : '💪'}
                            </div>
                            <h2>Kết quả bài tập</h2>
                            <div className="result-score">
                                <span className="score-number">{score}/{total}</span>
                                <span className="score-percentage">({calculatePercentage(score, total)}%)</span>
                            </div>
                            <div className="result-grade">
                                Đánh giá: <strong>{getGradeLabel(score, total)}</strong>
                            </div>
                            <div className="result-actions">
                                <Button variant="primary" onClick={() => {
                                    setSelectedType(null);
                                    setExerciseData(null);
                                    setIsSubmitted(false);
                                }}>
                                    Làm bài khác
                                </Button>
                                <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
                                    Về Dashboard
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
