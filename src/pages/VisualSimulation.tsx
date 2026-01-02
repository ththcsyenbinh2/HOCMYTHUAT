import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '@/data/curriculum';
import './VisualSimulation.css';

export default function VisualSimulation() {
    const { grade, topicId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'concept' | 'interactive' | 'gallery'>('concept');

    const gradeNum = parseInt(grade || '6') as 6 | 7 | 8 | 9;
    const lessonIdNum = parseInt(lessonId || '1');
    const lessonData = getLessonById(gradeNum, lessonIdNum);

    if (!lessonData) {
        return (
            <div className="visual-simulation">
                <div className="simulation-header">
                    <button onClick={() => navigate('/student/dashboard')} className="back-button">
                        ← Quay lại Dashboard
                    </button>
                    <h1>Không tìm thấy bài học</h1>
                </div>
            </div>
        );
    }

    const { lesson, topic } = lessonData;

    const handleBack = () => {
        navigate(`/student/lesson/${gradeNum}/${topicId}`);
    };

    return (
        <div className="visual-simulation">
            <div className="simulation-header">
                <button onClick={handleBack} className="back-button">
                    ← Quay lại
                </button>
                <div className="simulation-info">
                    <h1>{lesson.title}</h1>
                    <p className="topic-subtitle">{topic.title} - Lớp {gradeNum}</p>
                </div>
            </div>

            <div className="simulation-tabs">
                <button
                    className={`tab ${activeTab === 'concept' ? 'active' : ''}`}
                    onClick={() => setActiveTab('concept')}
                >
                    📚 Khái niệm
                </button>
                <button
                    className={`tab ${activeTab === 'interactive' ? 'active' : ''}`}
                    onClick={() => setActiveTab('interactive')}
                >
                    🎨 Thực hành tương tác
                </button>
                <button
                    className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gallery')}
                >
                    🖼️ Thư viện tác phẩm
                </button>
            </div>

            <div className="simulation-content">
                {activeTab === 'concept' && <ConceptView lessonTitle={lesson.title} />}
                {activeTab === 'interactive' && <InteractiveView lessonTitle={lesson.title} />}
                {activeTab === 'gallery' && <GalleryView lessonTitle={lesson.title} />}
            </div>
        </div>
    );
}

function ConceptView({ lessonTitle }: { lessonTitle: string }) {
    return (
        <div className="concept-view">
            <div className="concept-card">
                <h2>🎯 Mục tiêu bài học</h2>
                <ul>
                    <li>Hiểu được khái niệm cơ bản về {lessonTitle}</li>
                    <li>Nhận biết các đặc điểm và yếu tố quan trọng</li>
                    <li>Phát triển kỹ năng quan sát và cảm thụ nghệ thuật</li>
                    <li>Áp dụng kiến thức vào thực hành sáng tạo</li>
                </ul>
            </div>

            <div className="concept-card">
                <h2>📖 Kiến thức cốt lõi</h2>
                <div className="knowledge-grid">
                    <div className="knowledge-item">
                        <div className="knowledge-icon">🎨</div>
                        <h3>Khái niệm</h3>
                        <p>Tìm hiểu định nghĩa và ý nghĩa của các khái niệm mỹ thuật trong bài học</p>
                    </div>
                    <div className="knowledge-item">
                        <div className="knowledge-icon">🖌️</div>
                        <h3>Kỹ thuật</h3>
                        <p>Nắm vững các kỹ thuật và phương pháp thể hiện nghệ thuật</p>
                    </div>
                    <div className="knowledge-item">
                        <div className="knowledge-icon">🎭</div>
                        <h3>Cảm thụ</h3>
                        <p>Phát triển khả năng cảm nhận và đánh giá tác phẩm nghệ thuật</p>
                    </div>
                    <div className="knowledge-item">
                        <div className="knowledge-icon">✨</div>
                        <h3>Sáng tạo</h3>
                        <p>Ứng dụng kiến thức vào việc tạo ra tác phẩm của riêng mình</p>
                    </div>
                </div>
            </div>

            <div className="concept-card">
                <h2>💡 Gợi ý học tập</h2>
                <div className="tips-list">
                    <div className="tip-item">
                        <span className="tip-number">1</span>
                        <p>Quan sát kỹ các ví dụ và tác phẩm mẫu</p>
                    </div>
                    <div className="tip-item">
                        <span className="tip-number">2</span>
                        <p>Thực hành vẽ và tạo hình thường xuyên</p>
                    </div>
                    <div className="tip-item">
                        <span className="tip-number">3</span>
                        <p>Tham khảo thêm tài liệu và tác phẩm nghệ thuật</p>
                    </div>
                    <div className="tip-item">
                        <span className="tip-number">4</span>
                        <p>Chia sẻ và thảo luận với bạn bè, thầy cô</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InteractiveView({ lessonTitle }: { lessonTitle: string }) {
    const [selectedTool, setSelectedTool] = useState<'pencil' | 'brush' | 'eraser'>('pencil');
    const [selectedColor, setSelectedColor] = useState('#000000');

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
        '#800080', '#FFC0CB', '#A52A2A', '#808080'
    ];

    return (
        <div className="interactive-view">
            <div className="interactive-header">
                <h2>🎨 Không gian sáng tạo</h2>
                <p>Thực hành các kỹ thuật đã học trong bài {lessonTitle}</p>
            </div>

            <div className="drawing-tools">
                <div className="tool-section">
                    <h3>Công cụ</h3>
                    <div className="tools">
                        <button
                            className={`tool ${selectedTool === 'pencil' ? 'active' : ''}`}
                            onClick={() => setSelectedTool('pencil')}
                        >
                            ✏️ Bút chì
                        </button>
                        <button
                            className={`tool ${selectedTool === 'brush' ? 'active' : ''}`}
                            onClick={() => setSelectedTool('brush')}
                        >
                            🖌️ Cọ vẽ
                        </button>
                        <button
                            className={`tool ${selectedTool === 'eraser' ? 'active' : ''}`}
                            onClick={() => setSelectedTool('eraser')}
                        >
                            🧹 Tẩy
                        </button>
                    </div>
                </div>

                <div className="tool-section">
                    <h3>Màu sắc</h3>
                    <div className="color-palette">
                        {colors.map(color => (
                            <button
                                key={color}
                                className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="canvas-container">
                <canvas
                    id="drawing-canvas"
                    className="drawing-canvas"
                    width={800}
                    height={600}
                />
                <div className="canvas-overlay">
                    <p>🎨 Canvas vẽ sẽ được tích hợp ở đây</p>
                    <p className="hint">Sử dụng công cụ bên trên để bắt đầu sáng tạo</p>
                </div>
            </div>

            <div className="practice-exercises">
                <h3>📝 Bài tập thực hành</h3>
                <div className="exercise-cards">
                    <div className="exercise-card">
                        <h4>Bài tập 1</h4>
                        <p>Vẽ phác thảo cơ bản về chủ đề bài học</p>
                    </div>
                    <div className="exercise-card">
                        <h4>Bài tập 2</h4>
                        <p>Thực hành kỹ thuật tô màu và hoàn thiện</p>
                    </div>
                    <div className="exercise-card">
                        <h4>Bài tập 3</h4>
                        <p>Sáng tạo tác phẩm riêng theo phong cách cá nhân</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GalleryView({ lessonTitle }: { lessonTitle: string }) {
    const [selectedCategory, setSelectedCategory] = useState<'classic' | 'modern' | 'student'>('classic');

    return (
        <div className="gallery-view">
            <div className="gallery-header">
                <h2>🖼️ Thư viện tác phẩm</h2>
                <p>Khám phá các tác phẩm liên quan đến {lessonTitle}</p>
            </div>

            <div className="gallery-filters">
                <button
                    className={`filter ${selectedCategory === 'classic' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('classic')}
                >
                    🏛️ Tác phẩm kinh điển
                </button>
                <button
                    className={`filter ${selectedCategory === 'modern' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('modern')}
                >
                    🎨 Nghệ thuật hiện đại
                </button>
                <button
                    className={`filter ${selectedCategory === 'student' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('student')}
                >
                    ⭐ Tác phẩm học sinh
                </button>
            </div>

            <div className="gallery-grid">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="gallery-item">
                        <div className="gallery-image-placeholder">
                            <span className="placeholder-icon">🖼️</span>
                            <p>Tác phẩm {i}</p>
                        </div>
                        <div className="gallery-info">
                            <h4>Tên tác phẩm {i}</h4>
                            <p className="artist">Tác giả</p>
                            <p className="description">Mô tả ngắn về tác phẩm và ý nghĩa nghệ thuật</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gallery-tips">
                <h3>💡 Hướng dẫn thưởng thức</h3>
                <ul>
                    <li>Quan sát kỹ bố cục và cách sắp xếp các yếu tố trong tác phẩm</li>
                    <li>Chú ý đến cách sử dụng màu sắc và ánh sáng</li>
                    <li>Tìm hiểu về bối cảnh lịch sử và ý nghĩa của tác phẩm</li>
                    <li>So sánh các phong cách khác nhau giữa các tác phẩm</li>
                </ul>
            </div>
        </div>
    );
}
