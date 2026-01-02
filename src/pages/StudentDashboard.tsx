import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getCurriculumByGrade } from '@/data/curriculum';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import './StudentDashboard.css';

export default function StudentDashboard() {
    const { student, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState(student?.grade || 6);

    if (!student) {
        navigate('/student/auth');
        return null;
    }

    const curriculum = getCurriculumByGrade(selectedGrade);

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="container">
                    <div className="header-content">
                        <div>
                            <h1>Xin chào, {student.name}!</h1>
                            <p className="text-secondary">Chọn chủ đề để bắt đầu học tập</p>
                        </div>
                        <Button variant="ghost" onClick={logout}>
                            Đăng Xuất
                        </Button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main container">
                <div className="grade-tabs">
                    {[6, 7, 8, 9].map((grade) => (
                        <button
                            key={grade}
                            className={`grade-tab ${selectedGrade === grade ? 'active' : ''}`}
                            onClick={() => setSelectedGrade(grade as 6 | 7 | 8 | 9)}
                        >
                            Lớp {grade}
                        </button>
                    ))}
                </div>

                <div className="topics-grid">
                    {curriculum?.topics.map((topic, index) => (
                        <Card
                            key={topic.id}
                            hoverable
                            onClick={() => navigate(`/student/lesson/${topic.id}`)}
                            className="topic-card"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="topic-number">{index + 1}</div>
                            <h3>{topic.name}</h3>
                            <p>{topic.description}</p>
                            <div className="topic-lessons">
                                <span className="lesson-count">
                                    {topic.lessonTypes.length} bài học
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
