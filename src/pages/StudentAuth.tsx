import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createStudent } from '@/services/database';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Card } from '@/components/UI/Card';
import './Auth.css';

export default function StudentAuth() {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState<6 | 7 | 8 | 9>(6);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Vui lòng nhập họ tên');
            return;
        }

        setIsLoading(true);

        try {
            const student = await createStudent(name.trim(), grade);

            if (student) {
                login(student, 'student');
                navigate('/student/dashboard');
            } else {
                setError('Không thể tạo tài khoản. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background"></div>

            <div className="container">
                <div className="auth-content">
                    <Card className="auth-card">
                        <div className="auth-header">
                            <div className="auth-icon student-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5" />
                                </svg>
                            </div>
                            <h1>Đăng Ký Học Sinh</h1>
                            <p>Nhập thông tin để bắt đầu học tập</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <Input
                                label="Họ và tên"
                                type="text"
                                placeholder="Nhập họ tên của bạn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={error}
                            />

                            <div className="input-wrapper">
                                <label className="input-label">Lớp</label>
                                <div className="grade-selector">
                                    {[6, 7, 8, 9].map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            className={`grade-button ${grade === g ? 'active' : ''}`}
                                            onClick={() => setGrade(g as 6 | 7 | 8 | 9)}
                                        >
                                            Lớp {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="auth-submit"
                            >
                                Bắt Đầu Học
                            </Button>

                            <button
                                type="button"
                                className="auth-back"
                                onClick={() => navigate('/')}
                            >
                                ← Quay lại
                            </button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
