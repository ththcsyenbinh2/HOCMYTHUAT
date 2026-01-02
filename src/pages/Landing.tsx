import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import './Landing.css';

export default function Landing() {
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            if (role === 'student') {
                navigate('/student/dashboard');
            } else if (role === 'teacher') {
                navigate('/teacher/dashboard');
            }
        }
    }, [isAuthenticated, role, navigate]);

    return (
        <div className="landing-page">
            <div className="landing-background"></div>

            <div className="container">
                <div className="landing-content">
                    <div className="landing-header animate-fadeIn">
                        <h1 className="landing-title">
                            Mỹ Thuật THCS
                            <span className="gradient-text">Kết Nối Tri Thức</span>
                        </h1>
                        <p className="landing-subtitle">
                            Nền tảng học tập Mỹ thuật thông minh với AI - Dành cho học sinh và giáo viên THCS
                        </p>
                    </div>

                    <div className="landing-cards">
                        <Card hoverable className="role-card animate-slideInUp">
                            <div className="role-icon student-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
                                </svg>
                            </div>
                            <h2>Học Sinh</h2>
                            <p>Học tập với bài tập AI đa dạng và thú vị</p>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => navigate('/student/auth')}
                            >
                                Bắt Đầu Học
                            </Button>
                        </Card>

                        <Card hoverable className="role-card animate-slideInUp" style={{ animationDelay: '0.1s' }}>
                            <div className="role-icon teacher-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h2>Giáo Viên</h2>
                            <p>Quản lý và theo dõi kết quả học tập của học sinh</p>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => navigate('/teacher/auth')}
                            >
                                Đăng Nhập
                            </Button>
                        </Card>
                    </div>

                    <div className="landing-features animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <div className="feature">
                            <div className="feature-icon">🎨</div>
                            <h3>Chương Trình Chuẩn</h3>
                            <p>Theo sách Kết nối tri thức với cuộc sống</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Thông Minh</h3>
                            <p>Bài tập tự động với Google Gemini AI</p>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">📊</div>
                            <h3>Theo Dõi Tiến Độ</h3>
                            <p>Kết quả chi tiết và chính xác</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
