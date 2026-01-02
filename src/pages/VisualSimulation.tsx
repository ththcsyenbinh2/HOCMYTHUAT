import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '@/data/curriculum';
import { generateInteractiveSimulation } from '@/lib/gemini';
import { Button } from '@/components/UI/Button';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import './VisualSimulation.css';

export default function VisualSimulation() {
    const { grade, lessonId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'concept' | 'interactive' | 'gallery'>('concept');
    const [selectedTool, setSelectedTool] = useState<string>('pencil');
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

    const gradeNum = parseInt(grade || '6') as 6 | 7 | 8 | 9;
    const lessonIdNum = parseInt(lessonId || '1');
    const lessonData = getLessonById(gradeNum, lessonIdNum);

    useEffect(() => {
        if (!lessonData) return;

        const loadGame = async () => {
            setIsLoading(true);
            try {
                const game = await generateInteractiveSimulation(
                    gradeNum,
                    lessonData.lesson.title
                );
                setGameData(game);
            } catch (error) {
                console.error('Error loading game:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadGame();
    }, [lessonData, gradeNum]);

    useEffect(() => {
        if (activeTab === 'interactive' && gameData?.gameType === 'drawing') {
            const canvas = document.getElementById('drawing-canvas') as HTMLCanvasElement;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    setCanvasContext(ctx);
                    ctx.fillStyle = gameData.gameData.canvas.backgroundColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
    }, [activeTab, gameData]);

    if (!lessonData) {
        return null;
    }

    const { lesson, topic } = lessonData;

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasContext) return;
        setIsDrawing(true);
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasContext) return;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tool = gameData.gameData.tools.find((t: any) => t.type === selectedTool);
        if (!tool) return;

        if (selectedTool === 'eraser') {
            canvasContext.globalCompositeOperation = 'destination-out';
            canvasContext.lineWidth = tool.size;
        } else {
            canvasContext.globalCompositeOperation = 'source-over';
            canvasContext.strokeStyle = selectedColor;
            canvasContext.lineWidth = tool.size;
        }

        canvasContext.lineCap = 'round';
        canvasContext.lineTo(x, y);
        canvasContext.stroke();
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (!canvasContext || !gameData) return;
        const canvas = document.getElementById('drawing-canvas') as HTMLCanvasElement;
        canvasContext.fillStyle = gameData.gameData.canvas.backgroundColor;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    };

    if (isLoading) {
        return (
            <div className="simulation-page">
                <header className="simulation-header">
                    <div className="container">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            ← Quay lại
                        </Button>
                        <div className="simulation-info">
                            <h1>{lesson.title}</h1>
                            <p className="text-secondary">{topic.title}</p>
                        </div>
                    </div>
                </header>
                <main className="simulation-main container">
                    <LoadingSpinner size="lg" text="AI đang tạo game mô phỏng tương tác cho bạn..." />
                </main>
            </div>
        );
    }

    if (!gameData) {
        return (
            <div className="simulation-page">
                <header className="simulation-header">
                    <div className="container">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            ← Quay lại
                        </Button>
                    </div>
                </header>
                <main className="simulation-main container">
                    <div className="error-message">
                        <h2>Không thể tạo game mô phỏng</h2>
                        <p>Vui lòng thử lại sau.</p>
                        <Button onClick={() => navigate(-1)}>Quay lại</Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="simulation-page">
            <header className="simulation-header">
                <div className="container">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        ← Quay lại
                    </Button>
                    <div className="simulation-info">
                        <h1>{gameData.title}</h1>
                        <p className="text-secondary">{gameData.description}</p>
                    </div>
                </div>
            </header>

            <main className="simulation-main container">
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
                        🖼️ Thư viện
                    </button>
                </div>

                <div className="simulation-content">
                    {activeTab === 'concept' && (
                        <div className="concept-tab">
                            <div className="learning-objectives">
                                <h2>Mục tiêu học tập</h2>
                                <ul>
                                    {gameData.learningObjectives.map((obj: string, idx: number) => (
                                        <li key={idx}>{obj}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="instructions">
                                <h2>Hướng dẫn</h2>
                                <ol>
                                    {gameData.instructions.map((instruction: string, idx: number) => (
                                        <li key={idx}>{instruction}</li>
                                    ))}
                                </ol>
                            </div>

                            {gameData.gameData.referenceImage && (
                                <div className="reference-section">
                                    <h2>Tham khảo</h2>
                                    <p>{gameData.gameData.referenceImage.description}</p>
                                    <div className="hints">
                                        <h3>Gợi ý:</h3>
                                        <ul>
                                            {gameData.gameData.referenceImage.hints.map((hint: string, idx: number) => (
                                                <li key={idx}>{hint}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'interactive' && gameData.gameType === 'drawing' && (
                        <div className="interactive-tab">
                            <div className="drawing-tools">
                                <div className="tools-section">
                                    <h3>Công cụ</h3>
                                    <div className="tools-grid">
                                        {gameData.gameData.tools.map((tool: any, idx: number) => (
                                            <button
                                                key={idx}
                                                className={`tool-btn ${selectedTool === tool.type ? 'active' : ''}`}
                                                onClick={() => setSelectedTool(tool.type)}
                                            >
                                                {tool.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="colors-section">
                                    <h3>Màu sắc</h3>
                                    <div className="colors-grid">
                                        {gameData.gameData.colorPalette.map((color: string, idx: number) => (
                                            <button
                                                key={idx}
                                                className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setSelectedColor(color)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <Button variant="secondary" onClick={clearCanvas}>
                                    Xóa toàn bộ
                                </Button>
                            </div>

                            <div className="canvas-container">
                                <canvas
                                    id="drawing-canvas"
                                    width={gameData.gameData.canvas.width}
                                    height={gameData.gameData.canvas.height}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                />
                            </div>

                            <div className="challenges-section">
                                <h2>Thử thách</h2>
                                {gameData.gameData.challenges.map((challenge: any, idx: number) => (
                                    <div key={idx} className="challenge-card">
                                        <h3>{challenge.title}</h3>
                                        <p>{challenge.description}</p>
                                        <h4>Tiêu chí:</h4>
                                        <ul>
                                            {challenge.criteria.map((criterion: string, cIdx: number) => (
                                                <li key={cIdx}>{criterion}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div className="gallery-tab">
                            <h2>Thư viện tác phẩm</h2>
                            <p className="gallery-description">
                                Khám phá các tác phẩm nghệ thuật liên quan đến bài học
                            </p>
                            <div className="gallery-grid">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="gallery-item">
                                        <div className="gallery-placeholder">
                                            Tác phẩm {item}
                                        </div>
                                        <p>Mô tả tác phẩm {item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
