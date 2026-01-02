import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '@/data/curriculum';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import './LessonSelection.css';

export default function LessonSelection() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const topic = getTopicById(topicId || '');

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

    return (
        <div className="lesson-page">
            <header className="lesson-header">
                <div className="container">
                    <Button variant="ghost" onClick={() => navigate('/student/dashboard')}>
                        ← Quay lại
                    </Button>
                    <h1>{topic.name}</h1>
                    <p className="text-secondary">{topic.description}</p>
                </div>
            </header>

            <main className="lesson-main container">
                <h2>Chọn loại bài học</h2>
                <div className="lessons-grid">
                    {topic.lessonTypes.map((lessonType, index) => (
                        <Card
                            key={lessonType.id}
                            hoverable
                            onClick={() => navigate(`/student/exercise/${lessonType.id}`)}
                            className="lesson-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="lesson-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <h3>{lessonType.name}</h3>
                            <p>{lessonType.description}</p>
                            <div className="lesson-action">
                                <span>Bắt đầu học →</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
