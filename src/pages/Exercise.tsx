import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getLessonTypeById, getTopicById } from '@/data/curriculum';
import { generateExercise } from '@/lib/gemini';
import { saveExerciseResult, calculatePercentage, getGradeLabel } from '@/services/database';
import {
    ComprehensiveExerciseData,
    QuestionData,
    MultipleChoiceQuestion,
    DragDropQuestion,
    MatchingQuestion,
    OrderingQuestion,
    ImageSelectionQuestion
} from '@/types';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import './Exercise.css';

export default function Exercise() {
    const { lessonTypeId } = useParams();
    const navigate = useNavigate();
    const { student } = useAuth();

    const [isGenerating, setIsGenerating] = useState(false);
    const [exerciseData, setExerciseData] = useState<ComprehensiveExerciseData | null>(null);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const lessonType = getLessonTypeById(lessonTypeId || '');
    const topicId = lessonTypeId?.split('-lesson')[0];
    const topic = getTopicById(topicId || '');

    useEffect(() => {
        if (student && lessonType && topic && !exerciseData && !isGenerating) {
            handleGenerateExercise();
        }
    }, [student, lessonType, topic]);

    if (!student || !lessonType || !topic) {
        return null;
    }

    const handleGenerateExercise = async () => {
        setIsGenerating(true);
        setExerciseData(null);
        setAnswers({});
        setIsSubmitted(false);

        try {
            const data = await generateExercise(student.grade, topic.name, lessonType.name);
            setExerciseData(data);
        } catch (error) {
            console.error('Error generating exercise:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAnswerChange = (questionIndex: number, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: value
        }));
    };

    const calculateScore = () => {
        if (!exerciseData) return;

        let earnedPoints = 0;
        let maxPoints = 0;

        exerciseData.questions.forEach((q, idx) => {
            const userAnswer = answers[idx];
            maxPoints += q.points;

            if (userAnswer === undefined) return;

            switch (q.type) {
                case 'multiple-choice': {
                    if (userAnswer === (q as MultipleChoiceQuestion).correctAnswer) {
                        earnedPoints += q.points;
                    }
                    break;
                }
                case 'drag-drop': {
                    const ddQ = q as DragDropQuestion;
                    const correctMapping = ddQ.correctMapping;
                    const userMapping = userAnswer || {};
                    const totalItems = Object.keys(correctMapping).length;
                    let correctItems = 0;

                    Object.entries(correctMapping).forEach(([k, v]) => {
                        if (userMapping[k] === v) correctItems++;
                    });

                    // Partial credit
                    if (totalItems > 0) {
                        earnedPoints += (correctItems / totalItems) * q.points;
                    }
                    break;
                }
                case 'matching': {
                    const mQ = q as MatchingQuestion;
                    const correctPairs = mQ.correctPairs;
                    const userPairs = userAnswer || {};
                    const totalPairs = Object.keys(correctPairs).length;
                    let correctCount = 0;

                    Object.entries(correctPairs).forEach(([k, v]) => {
                        if (userPairs[k] === v) correctCount++;
                    });

                    if (totalPairs > 0) {
                        earnedPoints += (correctCount / totalPairs) * q.points;
                    }
                    break;
                }
                case 'ordering': {
                    const oQ = q as OrderingQuestion;
                    const correctOrder = JSON.stringify(oQ.correctOrder);
                    const userOrder = JSON.stringify(userAnswer || []);
                    if (correctOrder === userOrder) {
                        earnedPoints += q.points;
                    }
                    break;
                }
                case 'image-selection': {
                    const isQ = q as ImageSelectionQuestion;
                    const correctIndices = JSON.stringify(isQ.correctIndices.slice().sort());
                    const userIndices = JSON.stringify((userAnswer || []).slice().sort());
                    if (correctIndices === userIndices) {
                        earnedPoints += q.points;
                    }
                    break;
                }
            }
        });

        setScore(Math.round(earnedPoints));
        setTotalPoints(maxPoints);
        setIsSubmitted(true);

        // Save to database
        saveExerciseResult(
            student.id,
            student.grade,
            topic.name,
            lessonType.name,
            'comprehensive', // New type
            Math.round(earnedPoints),
            maxPoints,
            answers
        );
    };

    const renderQuestion = (q: QuestionData, index: number) => {
        const commonProps = {
            className: "question-card mb-6",
            key: q.id || index
        };

        const questionHeader = (
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <div className="flex items-center gap-2">
                    <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded">
                        Câu {index + 1}
                    </span>
                    <span className="text-sm text-gray-500 uppercase font-semibold">
                        {q.difficulty.replace('_', ' ')}
                    </span>
                </div>
                <span className="text-sm font-medium text-primary">
                    {q.points} điểm
                </span>
            </div>
        );

        switch (q.type) {
            case 'multiple-choice': {
                const mcq = q as MultipleChoiceQuestion;
                return (
                    <Card {...commonProps}>
                        {questionHeader}
                        <h3 className="text-lg font-medium mb-4">{mcq.question}</h3>
                        <div className="space-y-3">
                            {mcq.options.map((opt, i) => (
                                <label key={i} className={`flex items-center p-3 rounded border cursor-pointer transition-colors ${answers[index] === i
                                        ? 'bg-blue-50 border-blue-500'
                                        : 'hover:bg-gray-50'
                                    }`}>
                                    <input
                                        type="radio"
                                        name={`q-${index}`}
                                        className="mr-3 h-4 w-4"
                                        checked={answers[index] === i}
                                        onChange={() => handleAnswerChange(index, i)}
                                        disabled={isSubmitted}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </Card>
                );
            }

            case 'drag-drop': {
                const ddq = q as DragDropQuestion;
                const currentAnswers = answers[index] || {};
                return (
                    <Card {...commonProps}>
                        {questionHeader}
                        <h3 className="text-lg font-medium mb-2">{ddq.instruction}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3 text-gray-700">Các mục:</h4>
                                <ul className="space-y-2">
                                    {ddq.items.map((item, i) => (
                                        <li key={i} className="p-2 bg-white rounded shadow-sm border">
                                            {i + 1}. {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-3 text-blue-800">Vùng thả:</h4>
                                <div className="space-y-3">
                                    {ddq.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between gap-2 p-2 bg-white rounded border">
                                            <span className="text-sm truncate flex-1">{i + 1}. {item}</span>
                                            <span className="text-gray-400">→</span>
                                            <select
                                                className="border rounded p-1 text-sm w-32"
                                                value={currentAnswers[i] !== undefined ? currentAnswers[i] : ''}
                                                onChange={(e) => handleAnswerChange(index, {
                                                    ...currentAnswers,
                                                    [i]: parseInt(e.target.value)
                                                })}
                                                disabled={isSubmitted}
                                            >
                                                <option value="">Chọn...</option>
                                                {ddq.dropZones.map((z, zIdx) => (
                                                    <option key={zIdx} value={zIdx}>{z}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            }

            case 'matching': {
                const mq = q as MatchingQuestion;
                const currentAnswers = answers[index] || {};
                return (
                    <Card {...commonProps}>
                        {questionHeader}
                        <h3 className="text-lg font-medium mb-2">{mq.instruction}</h3>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            {mq.leftItems.map((leftItem, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 border rounded bg-gray-50">
                                    <div className="flex-1 font-medium">{leftItem}</div>
                                    <div className="text-gray-400">↔</div>
                                    <div className="flex-1">
                                        <select
                                            className="w-full border rounded p-2"
                                            value={currentAnswers[i] !== undefined ? currentAnswers[i] : ''}
                                            onChange={(e) => handleAnswerChange(index, {
                                                ...currentAnswers,
                                                [i]: parseInt(e.target.value)
                                            })}
                                            disabled={isSubmitted}
                                        >
                                            <option value="">Chọn...</option>
                                            {mq.rightItems.map((rightItem, rIdx) => (
                                                <option key={rIdx} value={rIdx}>{rightItem}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            }

            case 'ordering': {
                const oq = q as OrderingQuestion;
                const currentOrder = answers[index] || [];
                // Using simple input numbers for ordering for now
                const inputValues = currentOrder.reduce((acc: any, val: number, idx: number) => {
                    // We need to reverse map: index in items array -> order value
                    // But here let's just use an object: { [itemIndex]: orderValue } for easier input handling
                    return acc;
                }, {});

                return (
                    <Card {...commonProps}>
                        {questionHeader}
                        <h3 className="text-lg font-medium mb-2">{oq.instruction}</h3>
                        <div className="space-y-2 mt-4">
                            {oq.items.map((item, i) => {
                                // Find the order value assigned to this item index
                                const assignedOrder = currentOrder.indexOf(i) + 1;
                                // Actually, simpler logic: Input stores order (1..N) for each item index
                                // Wait, the database/logic expects `correctOrder` as array of indices in correct sequence.
                                // e.g. correctOrder = [1, 0, 2] means item[1] is 1st, item[0] is 2nd...

                                // Let's store user input as { itemIndex: orderNumber } in a temporary object if valid,
                                // but `answers[index]` should be `number[]` (indices in order).

                                // To simplify UI, let's just let them select Position 1, Position 2... for each item
                                return (
                                    <div key={i} className="flex items-center gap-3 p-3 border rounded bg-white">
                                        <select
                                            className="w-20 border rounded p-1 font-bold text-center"
                                            onChange={(e) => {
                                                const pos = parseInt(e.target.value); // 1-based pos
                                                if (!pos) return;
                                                // items in order
                                                const newOrder = [...(answers[index] || Array(oq.items.length).fill(-1))];

                                                // Logic is tricky with simple selects.
                                                // Alternative: Just render inputs and rebuild the order array on submit or change.
                                                // I'll replicate the logic from previous version which worked ok-ish or improve it.

                                                // Let's store interim state in a local variable? No, component rerenders.
                                                // Let's store direct mapping { itemIndex: pos } in answers temporarily?
                                                // But `calculateScore` expects `Array`.

                                                // Let's use a simpler Drag-Sort UI library? No, raw React.
                                                // Let's stick to valid inputs.

                                                // Actually the previous implementation used `answers.order` which was built from inputs.
                                                // I'll do: `answers[index]` is { [itemIndex]: orderNumber }
                                                // And in `calculateScore`, I convert it.

                                                const currentMap = answers[index] || {};
                                                handleAnswerChange(index, { ...currentMap, [i]: pos });
                                            }}
                                            value={(answers[index] || {})[i] || ''}
                                            disabled={isSubmitted}
                                        >
                                            <option value="">#</option>
                                            {oq.items.map((_, idx) => (
                                                <option key={idx} value={idx + 1}>{idx + 1}</option>
                                            ))}
                                        </select>
                                        <span className="flex-1">{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                );
            }

            case 'image-selection': {
                const isq = q as ImageSelectionQuestion;
                const selectedIndices = answers[index] || [];
                return (
                    <Card {...commonProps}>
                        {questionHeader}
                        <h3 className="text-lg font-medium mb-1">{isq.instruction}</h3>
                        <p className="text-blue-600 mb-4 bg-blue-50 inline-block px-2 py-1 rounded text-sm">
                            Ý chính: {isq.mainIdea}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {isq.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`relative border-2 rounded-lg cursor-pointer overflow-hidden transition-all h-40 flex items-center justify-center p-2 text-center bg-gray-50
                                        ${selectedIndices.includes(i) ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                                    `}
                                    onClick={() => {
                                        if (isSubmitted) return;
                                        const newSelected = selectedIndices.includes(i)
                                            ? selectedIndices.filter((idx: number) => idx !== i)
                                            : [...selectedIndices, i];
                                        handleAnswerChange(index, newSelected);
                                    }}
                                >
                                    <span className="text-sm text-gray-600">{img.description}</span>
                                    {selectedIndices.includes(i) && (
                                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className="exercise-page min-h-screen bg-gray-50 pb-20">
            <header className="bg-white shadow-sm sticky top-0 z-10 px-4 py-3">
                <div className="container max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-600">
                            ← Quay lại
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">{lessonType.name}</h1>
                            <p className="text-sm text-gray-500">{topic.name}</p>
                        </div>
                    </div>
                    {!isGenerating && exerciseData && !isSubmitted && (
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Tiến độ</div>
                            <div className="font-bold text-primary">
                                {Object.keys(answers).length} / {exerciseData.questions.length} câu
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="container max-w-3xl mx-auto py-8 px-4">
                {isGenerating && (
                    <div className="text-center py-20">
                        <LoadingSpinner size="lg" text="AI đang biên soạn bộ câu hỏi tổng hợp..." />
                        <p className="mt-4 text-gray-500 max-w-md mx-auto">
                            Hệ thống đang tạo 15 câu hỏi (nhận biết, thông hiểu, vận dụng) với đa dạng hình thức theo chương trình SGK.
                        </p>
                    </div>
                )}

                {exerciseData && !isSubmitted && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
                            <h2 className="font-bold text-blue-800 text-lg mb-1">Bài tập tổng hợp</h2>
                            <p className="text-blue-700 text-sm">
                                Hoàn thành 15 câu hỏi dưới đây để đạt điểm tối đa {exerciseData.totalPoints}.
                            </p>
                        </div>

                        {exerciseData.questions.map((q, idx) => renderQuestion(q, idx))}

                        <div className="sticky bottom-4 z-10 flex justify-center pt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                className="shadow-lg px-12 py-3 text-lg font-bold"
                                onClick={calculateScore}
                            >
                                Nộp bài
                            </Button>
                        </div>
                    </div>
                )}

                {isSubmitted && (
                    <div className="max-w-xl mx-auto animate-scale-in">
                        <Card className="text-center p-8 border-t-8 border-t-primary">
                            <div className="text-6xl mb-4">
                                {calculatePercentage(score, totalPoints) >= 70 ? '🎉' : '💪'}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kết quả bài làm</h2>

                            <div className="flex justify-center items-end gap-2 my-6">
                                <span className="text-5xl font-black text-primary">{score}</span>
                                <span className="text-xl text-gray-500 mb-2">/ {totalPoints} điểm</span>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4 mb-6 inline-block">
                                <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">Xếp loại</div>
                                <div className="text-xl font-bold text-gray-800">
                                    {getGradeLabel(score, totalPoints)} ({calculatePercentage(score, totalPoints)}%)
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button variant="primary" onClick={handleGenerateExercise}>
                                    Làm bài tập mới
                                </Button>
                                <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>
                                    Về trang chủ
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
