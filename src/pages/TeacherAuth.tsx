import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getTeacherByEmail } from '@/services/database';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Card } from '@/components/UI/Card';
import './Auth.css';

export default function TeacherAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setIsLoading(true);

        try {
            const teacher = await getTeacherByEmail(email.trim());

            if (teacher) {
                // In production, verify password hash
                // For demo, we'll just login
                login(teacher, 'teacher');
                navigate('/teacher/dashboard');
            } else {
                setError('Email hoặc mật khẩu không đúng');
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
                            <div className="auth-icon teacher-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h1>Đăng Nhập Giáo Viên</h1>
                            <p>Quản lý và theo dõi học sinh</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="teacher@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Mật khẩu"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={error}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="auth-submit"
                            >
                                Đăng Nhập
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
