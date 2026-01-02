import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getTopicById } from '@/data/curriculum';
import { Lesson, LessonMode } from '@/types';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import './LessonSelection.css';

export default function LessonSelection() {
    const { grade, topicId } = useParams();
    const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [showModeSelection, setShowModeSelection] = useState(false);

    const gradeNum = parseInt(grade || '6') as 6 | 7 | 8 | 9;
    const topic = getTopicById(gradeNum, topicId || '');

    if (!topic) {
        return (
            <div className="lesson-page container">
                <h1>Không tìm thấy chủ đề</h1>
                <Button onClick={() => navigate('/student/dashboard')}>
                    Quay lại Dashboard
                </Button>
            </div>
        );
    }

    const handleLessonClick = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setShowModeSelection(true);
    };

    const handleModeSelect = (mode: LessonMode) => {
        if (!selectedLesson) return;

        if (mode === 'questions') {
            navigate(`/student/exercise/${gradeNum}/${topicId}/${selectedLesson.id}`);
        } else {
            navigate(`/student/simulation/${gradeNum}/${topicId}/${selectedLesson.id}`);
        }
    };

    const handleBack = () => {
        if (showModeSelection) {
            setShowModeSelection(false);
            setSelectedLesson(null);
        } else {
            navigate('/student/dashboard');
        }
    };

    return (
        <div className="lesson-page">
            <header className="lesson-header">
                <div className="container">
                    <Button variant="ghost" onClick={handleBack}>
                        ← Quay lại
                    </Button>
                    <h1>{topic.title}</h1>
                    <p className="text-secondary">Lớp {gradeNum}</p>
                </div>
            </header>

            <main className="lesson-main container">
                {!showModeSelection ? (
                    <>
                        <h2>Chọn bài học</h2>
                        <div className="lessons-grid">
                            {topic.lessons.map((lesson, index) => (
                                <Card
                                    key={lesson.id}
                                    hoverable
                                    onClick={() => handleLessonClick(lesson)}
                                    className="lesson-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="lesson-icon">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                    </div>
                                    <h3>{lesson.title}</h3>
                                    <div className="lesson-action">
                                        <span>Bắt đầu học →</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Chọn hình thức học tập</h2>
                        <div className="selected-lesson-info">
                            <h3>{selectedLesson?.title}</h3>
                            <p>Chọn một trong hai hình thức học tập dưới đây</p>
                        </div>
                        <div className="mode-selection-grid">
                            <Card
                                hoverable
                                onClick={() => handleModeSelect('questions')}
                                className="mode-card questions-mode"
                            >
                                <div className="mode-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm2-8v10h10V7H11zm8 8h-6v-2h6v2zm0-4h-6V9h6v2z" />
                                    </svg>
                                </div>
                                <h3>📝 Làm bài tập</h3>
                                <p>Trả lời 15-20 câu hỏi trộn lẫn các dạng bài tập</p>
                                <ul className="mode-features">
                                    <li>✓ Câu hỏi trắc nghiệm</li>
                                    <li>✓ Bài tập kéo thả, ghép đôi</li>
                                    <li>✓ Sắp xếp thứ tự, chọn hình</li>
                                    <li>✓ Chấm điểm tự động</li>
                                </ul>
                                <div className="mode-action">
                                    <span>Bắt đầu làm bài →</span>
                                </div>
                            </Card>

                            <Card
                                hoverable
                                onClick={() => handleModeSelect('simulation')}
                                className="mode-card simulation-mode"
                            >
                                <div className="mode-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M9 9h6v6H9z" />
                                        <path d="M9 3v6M15 3v6M9 15v6M15 15v6M3 9h6M3 15h6M15 9h6M15 15h6" />
                                    </svg>
                                </div>
                                <h3>🎨 Mô phỏng trực quan</h3>
                                <p>Khám phá và thực hành tương tác với nội dung bài học</p>
                                <ul className="mode-features">
                                    <li>✓ Khái niệm và lý thuyết</li>
                                    <li>✓ Thực hành vẽ tương tác</li>
                                    <li>✓ Thư viện tác phẩm</li>
                                    <li>✓ Hướng dẫn chi tiết</li>
                                </ul>
                                <div className="mode-action">
                                    <span>Khám phá ngay →</span>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
