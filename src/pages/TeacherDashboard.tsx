import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllResults, getAllStudents, calculatePercentage, formatDate } from '@/services/database';
import { ExerciseResult, Student } from '@/types';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
    const { teacher, logout } = useAuth();
    const navigate = useNavigate();

    const [results, setResults] = useState<ExerciseResult[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterGrade, setFilterGrade] = useState<number | 'all'>('all');
    const [filterStudent, setFilterStudent] = useState<string>('all');
    const [searchTopic, setSearchTopic] = useState('');

    useEffect(() => {
        if (!teacher) {
            navigate('/teacher/auth');
            return;
        }

        loadData();
    }, [teacher, navigate]);

    const loadData = async () => {
        setIsLoading(true);
        const [resultsData, studentsData] = await Promise.all([
            getAllResults(),
            getAllStudents()
        ]);
        setResults(resultsData);
        setStudents(studentsData);
        setIsLoading(false);
    };

    const getStudentName = (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        return student?.name || 'Unknown';
    };

    const filteredResults = results.filter(result => {
        if (filterGrade !== 'all' && result.grade !== filterGrade) return false;
        if (filterStudent !== 'all' && result.student_id !== filterStudent) return false;
        if (searchTopic && !result.topic.toLowerCase().includes(searchTopic.toLowerCase())) return false;
        return true;
    });

    const exportToCSV = () => {
        const headers = ['Học sinh', 'Lớp', 'Chủ đề', 'Bài học', 'Loại bài tập', 'Điểm', 'Tổng', 'Phần trăm', 'Thời gian'];
        const rows = filteredResults.map(result => [
            getStudentName(result.student_id),
            result.grade,
            result.topic,
            result.lesson_type,
            result.exercise_type,
            result.score,
            result.total_questions,
            `${calculatePercentage(result.score, result.total_questions)}%`,
            formatDate(result.created_at)
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ket-qua-hoc-sinh-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const stats = {
        totalResults: filteredResults.length,
        totalStudents: new Set(filteredResults.map(r => r.student_id)).size,
        averageScore: filteredResults.length > 0
            ? Math.round(filteredResults.reduce((sum, r) => sum + calculatePercentage(r.score, r.total_questions), 0) / filteredResults.length)
            : 0
    };

    if (isLoading) {
        return (
            <div className="teacher-dashboard-page">
                <LoadingSpinner size="lg" text="Đang tải dữ liệu..." />
            </div>
        );
    }

    return (
        <div className="teacher-dashboard-page">
            <header className="teacher-header">
                <div className="container">
                    <div className="header-content">
                        <div>
                            <h1>Dashboard Giáo Viên</h1>
                            <p className="text-secondary">Xin chào, {teacher?.name || 'Giáo viên'}</p>
                        </div>
                        <Button variant="ghost" onClick={logout}>
                            Đăng Xuất
                        </Button>
                    </div>
                </div>
            </header>

            <main className="teacher-main container">
                <div className="stats-grid">
                    <Card className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-value">{stats.totalResults}</div>
                        <div className="stat-label">Bài làm</div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-value">{stats.totalStudents}</div>
                        <div className="stat-label">Học sinh</div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-value">{stats.averageScore}%</div>
                        <div className="stat-label">Điểm TB</div>
                    </Card>
                </div>

                <Card className="filters-card">
                    <div className="filters-header">
                        <h2>Lọc kết quả</h2>
                        <Button variant="secondary" onClick={exportToCSV}>
                            📥 Xuất CSV
                        </Button>
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label>Lớp:</label>
                            <select
                                value={filterGrade}
                                onChange={(e) => setFilterGrade(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                            >
                                <option value="all">Tất cả</option>
                                <option value="6">Lớp 6</option>
                                <option value="7">Lớp 7</option>
                                <option value="8">Lớp 8</option>
                                <option value="9">Lớp 9</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Học sinh:</label>
                            <select
                                value={filterStudent}
                                onChange={(e) => setFilterStudent(e.target.value)}
                            >
                                <option value="all">Tất cả</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} (Lớp {student.grade})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Tìm chủ đề:</label>
                            <input
                                type="text"
                                placeholder="Nhập tên chủ đề..."
                                value={searchTopic}
                                onChange={(e) => setSearchTopic(e.target.value)}
                            />
                        </div>
                    </div>
                </Card>

                <Card className="results-card">
                    <h2>Kết quả học sinh ({filteredResults.length})</h2>

                    {filteredResults.length === 0 ? (
                        <div className="no-results">
                            <p>Không có kết quả nào</p>
                        </div>
                    ) : (
                        <div className="results-table-wrapper">
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Học sinh</th>
                                        <th>Lớp</th>
                                        <th>Chủ đề</th>
                                        <th>Bài học</th>
                                        <th>Loại BT</th>
                                        <th>Điểm</th>
                                        <th>%</th>
                                        <th>Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResults.map(result => (
                                        <tr key={result.id}>
                                            <td>{getStudentName(result.student_id)}</td>
                                            <td>{result.grade}</td>
                                            <td>{result.topic}</td>
                                            <td>{result.lesson_type}</td>
                                            <td>
                                                <span className="exercise-type-badge">
                                                    {result.exercise_type}
                                                </span>
                                            </td>
                                            <td>{result.score}/{result.total_questions}</td>
                                            <td>
                                                <span className={`percentage ${calculatePercentage(result.score, result.total_questions) >= 70 ? 'good' : 'needs-improvement'
                                                    }`}>
                                                    {calculatePercentage(result.score, result.total_questions)}%
                                                </span>
                                            </td>
                                            <td className="date-cell">{formatDate(result.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
