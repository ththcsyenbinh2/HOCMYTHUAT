import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    MixedExam,
    ExamResult,
    Question,
    ExerciseType,
    ExerciseData,
    MultipleChoiceQuestion,
    DragDropExercise,
    MatchingExercise,
    OrderingExercise,
    ImageSelectionExercise
} from '@/types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(apiKey || 'placeholder-key');

// Generate mixed exam with all question types
export async function generateMixedExam(
    grade: number,
    topicTitle: string,
    lessonTitle: string
): Promise<MixedExam> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Bạn là chuyên gia giáo dục môn Mĩ thuật. Tạo đúng 15 đến 20 câu hỏi cho bài học "${lessonTitle}" lớp ${grade} ("Sách giáo khoa Mĩ thuật – Kết nối tri thức với cuộc sống").

Yêu cầu bắt buộc:
- Nội dung chính xác 100% theo SGK, không bịa đặt
- Tổng số câu: 15-20 câu
- Phân bổ theo mức độ nhận thức:
  * 8 câu nhận_biết (kiến thức cơ bản, ghi nhớ, nhận diện)
  * 7 câu thông_hiểu (giải thích, phân tích, so sánh)
  * 5 câu vận_dụng (áp dụng, sáng tạo, đánh giá)
- Trộn lẫn các dạng bài tập:
  * Trắc nghiệm (multiple-choice): 40-50%
  * Kéo thả (drag-drop): 15-20%
  * Ghép đôi (matching): 15-20%
  * Sắp xếp (ordering): 10-15%
  * Chọn hình (image-selection): 5-10%

Cấu trúc JSON trả về:
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "cognitiveLevel": "nhận_biết",
      "question": "Câu hỏi...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    },
    {
      "id": "q2",
      "type": "drag-drop",
      "cognitiveLevel": "thông_hiểu",
      "instruction": "Hướng dẫn...",
      "items": ["Item 1", "Item 2", "Item 3", "Item 4"],
      "dropZones": ["Zone 1", "Zone 2", "Zone 3", "Zone 4"],
      "correctMapping": {"0": 0, "1": 1, "2": 2, "3": 3}
    },
    {
      "id": "q3",
      "type": "matching",
      "cognitiveLevel": "thông_hiểu",
      "instruction": "Ghép các cặp...",
      "leftItems": ["Left 1", "Left 2", "Left 3"],
      "rightItems": ["Right 1", "Right 2", "Right 3"],
      "correctPairs": {"0": 0, "1": 1, "2": 2}
    },
    {
      "id": "q4",
      "type": "ordering",
      "cognitiveLevel": "vận_dụng",
      "instruction": "Sắp xếp theo thứ tự...",
      "items": ["Bước 1", "Bước 2", "Bước 3", "Bước 4"],
      "correctOrder": [2, 0, 3, 1]
    },
    {
      "id": "q5",
      "type": "image-selection",
      "cognitiveLevel": "vận_dụng",
      "instruction": "Chọn các hình ảnh...",
      "mainIdea": "Ý chính...",
      "images": [
        {"url": "placeholder", "description": "Mô tả hình 1"},
        {"url": "placeholder", "description": "Mô tả hình 2"},
        {"url": "placeholder", "description": "Mô tả hình 3"},
        {"url": "placeholder", "description": "Mô tả hình 4"}
      ],
      "correctIndices": [0, 2]
    }
  ]
}

QUAN TRỌNG: Chỉ trả về JSON thuần túy, không thêm markdown, text giải thích hay bất kỳ nội dung nào khác.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON found in response');
        }

        const data = JSON.parse(jsonMatch[0]);
        const questions = data.questions as Question[];

        // Calculate distribution
        const distribution = {
            nhận_biết: questions.filter(q => q.cognitiveLevel === 'nhận_biết').length,
            thông_hiểu: questions.filter(q => q.cognitiveLevel === 'thông_hiểu').length,
            vận_dụng: questions.filter(q => q.cognitiveLevel === 'vận_dụng').length
        };

        return {
            lessonTitle,
            topicTitle,
            grade,
            questions,
            totalScore: questions.length,
            distribution
        };
    } catch (error) {
        console.error('Error generating mixed exam:', error);
        // Return fallback exam
        return generateFallbackMixedExam(grade, topicTitle, lessonTitle);
    }
}

// Calculate exam score
export function calculateScore(
    exam: MixedExam,
    answers: Record<string, any>
): ExamResult {
    let correctCount = 0;

    exam.questions.forEach(question => {
        const userAnswer = answers[question.id];
        const isCorrect = checkAnswer(question, userAnswer);
        if (isCorrect) correctCount++;
    });

    const score = correctCount;
    const totalScore = exam.questions.length;
    const percentage = (score / totalScore) * 100;

    return {
        examId: `${exam.grade}-${exam.lessonTitle}`,
        studentId: '', // to be filled by caller
        answers,
        score,
        totalScore,
        percentage,
        completedAt: new Date().toISOString()
    };
}

// Check if answer is correct
function checkAnswer(question: Question, userAnswer: any): boolean {
    if (userAnswer === undefined || userAnswer === null) return false;

    switch (question.type) {
        case 'multiple-choice':
            return userAnswer === question.correctAnswer;
        case 'drag-drop':
            return JSON.stringify(userAnswer) === JSON.stringify(question.correctMapping);
        case 'matching':
            return JSON.stringify(userAnswer) === JSON.stringify(question.correctPairs);
        case 'ordering':
            return JSON.stringify(userAnswer) === JSON.stringify(question.correctOrder);
        case 'image-selection':
            const userIndices = Array.isArray(userAnswer) ? userAnswer.sort() : [];
            const correctIndices = question.correctIndices.sort();
            return JSON.stringify(userIndices) === JSON.stringify(correctIndices);
        default:
            return false;
    }
}

// Fallback exam if AI generation fails
function generateFallbackMixedExam(
    grade: number,
    topicTitle: string,
    lessonTitle: string
): MixedExam {
    const questions: Question[] = [
        {
            id: 'q1',
            type: 'multiple-choice',
            cognitiveLevel: 'nhận_biết',
            question: `Bài học "${lessonTitle}" thuộc chủ đề nào?`,
            options: [topicTitle, 'Chủ đề khác', 'Không thuộc chủ đề nào', 'Tất cả các đáp án'],
            correctAnswer: 0
        },
        {
            id: 'q2',
            type: 'multiple-choice',
            cognitiveLevel: 'nhận_biết',
            question: 'Mỹ thuật là gì?',
            options: [
                'Nghệ thuật tạo hình',
                'Nghệ thuật âm nhạc',
                'Nghệ thuật sân khấu',
                'Nghệ thuật điện ảnh'
            ],
            correctAnswer: 0
        },
        {
            id: 'q3',
            type: 'drag-drop',
            cognitiveLevel: 'thông_hiểu',
            instruction: 'Ghép các yếu tố mỹ thuật với đặc điểm tương ứng',
            items: ['Đường nét', 'Màu sắc', 'Hình khối', 'Kết cấu'],
            dropZones: ['Tạo hình dáng', 'Tạo cảm xúc', 'Tạo chiều sâu', 'Tạo bề mặt'],
            correctMapping: { 0: 0, 1: 1, 2: 2, 3: 3 }
        },
        {
            id: 'q4',
            type: 'matching',
            cognitiveLevel: 'thông_hiểu',
            instruction: 'Ghép các loại hình mỹ thuật với ví dụ',
            leftItems: ['Hội họa', 'Điêu khắc', 'Kiến trúc', 'Thủ công'],
            rightItems: ['Tranh vẽ', 'Tượng đài', 'Nhà cửa', 'Đồ gốm'],
            correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 }
        },
        {
            id: 'q5',
            type: 'ordering',
            cognitiveLevel: 'vận_dụng',
            instruction: 'Sắp xếp các bước vẽ tranh theo thứ tự đúng',
            items: [
                'Tô màu và hoàn thiện',
                'Phác thảo ý tưởng',
                'Vẽ chi tiết',
                'Tạo bố cục'
            ],
            correctOrder: [1, 3, 2, 0]
        }
    ];

    return {
        lessonTitle,
        topicTitle,
        grade,
        questions,
        totalScore: questions.length,
        distribution: {
            nhận_biết: 2,
            thông_hiểu: 2,
            vận_dụng: 1
        }
    };
}

// Legacy function for backward compatibility
export async function generateExercise(
    grade: number,
    topicName: string,
    lessonName: string,
    exerciseType: ExerciseType
): Promise<ExerciseData> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';

    switch (exerciseType) {
        case 'multiple-choice':
            prompt = `Bạn là một giáo viên Mỹ thuật THCS chuyên nghiệp. Hãy tạo 5 câu hỏi trắc nghiệm về chủ đề "${topicName}" - bài "${lessonName}" cho học sinh lớp ${grade}.

Mỗi câu hỏi cần:
- Câu hỏi rõ ràng, phù hợp với trình độ học sinh lớp ${grade}
- 4 đáp án (A, B, C, D)
- Chỉ 1 đáp án đúng
- Nội dung liên quan đến kiến thức mỹ thuật, lịch sử nghệ thuật, kỹ thuật vẽ, hoặc cảm thứ nghệ thuật

Trả về kết quả dưới dạng JSON với cấu trúc:
{
  "questions": [
    {
      "question": "Câu hỏi...",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctAnswer": 0
    }
  ]
}

Chỉ trả về JSON, không thêm text giải thích.`;
            break;

        case 'drag-drop':
            prompt = `Bạn là một giáo viên Mỹ thuật THCS chuyên nghiệp. Hãy tạo bài tập kéo thả về chủ đề "${topicName}" - bài "${lessonName}" cho học sinh lớp ${grade}.

Tạo bài tập với:
- Hướng dẫn rõ ràng
- 5-6 items cần kéo (ví dụ: tên họa sĩ, tên tác phẩm, kỹ thuật vẽ, màu sắc, v.v.)
- 5-6 drop zones tương ứng (ví dụ: thể loại, thời kỳ, đặc điểm, v.v.)
- Mapping chính xác giữa items và drop zones

Trả về JSON:
{
  "instruction": "Hướng dẫn...",
  "items": ["Item 1", "Item 2", ...],
  "dropZones": ["Zone 1", "Zone 2", ...],
  "correctMapping": {"0": 0, "1": 1, ...}
}

Chỉ trả về JSON, không thêm text giải thích.`;
            break;

        case 'matching':
            prompt = `Bạn là một giáo viên Mỹ thuật THCS chuyên nghiệp. Hãy tạo bài tập ghép đôi về chủ đề "${topicName}" - bài "${lessonName}" cho học sinh lớp ${grade}.

Tạo bài tập với:
- Hướng dẫn rõ ràng
- 5-6 items bên trái (ví dụ: tên tác phẩm, họa sĩ, khái niệm)
- 5-6 items bên phải (ví dụ: mô tả, thời kỳ, đặc điểm)
- Cặp ghép chính xác

Trả về JSON:
{
  "instruction": "Hướng dẫn...",
  "leftItems": ["Left 1", "Left 2", ...],
  "rightItems": ["Right 1", "Right 2", ...],
  "correctPairs": {"0": 0, "1": 1, ...}
}

Chỉ trả về JSON, không thêm text giải thích.`;
            break;

        case 'ordering':
            prompt = `Bạn là một giáo viên Mỹ thuật THCS chuyên nghiệp. Hãy tạo bài tập sắp xếp thứ tự về chủ đề "${topicName}" - bài "${lessonName}" cho học sinh lớp ${grade}.

Tạo bài tập với:
- Hướng dẫn rõ ràng
- 5-6 items cần sắp xếp (ví dụ: các bước vẽ tranh, thời kỳ lịch sử nghệ thuật, quy trình sáng tạo)
- Thứ tự đúng của các items

Trả về JSON:
{
  "instruction": "Hướng dẫn...",
  "items": ["Item 1", "Item 2", ...],
  "correctOrder": [2, 0, 3, 1, ...]
}

Trong đó correctOrder là thứ tự index đúng của items.
Chỉ trả về JSON, không thêm text giải thích.`;
            break;

        case 'image-selection':
            prompt = `Bạn là một giáo viên Mỹ thuật THCS chuyên nghiệp. Hãy tạo bài tập chọn hình theo ý chính về chủ đề "${topicName}" - bài "${lessonName}" cho học sinh lớp ${grade}.

Tạo bài tập với:
- Hướng dẫn rõ ràng
- Ý chính cần tìm
- 6 mô tả hình ảnh (vì không thể tạo hình thật, hãy mô tả chi tiết)
- 2-3 hình đúng với ý chính

Trả về JSON:
{
  "instruction": "Hướng dẫn...",
  "mainIdea": "Ý chính cần tìm...",
  "images": [
    {"url": "placeholder", "description": "Mô tả chi tiết hình ảnh 1"},
    {"url": "placeholder", "description": "Mô tả chi tiết hình ảnh 2"},
    ...
  ],
  "correctIndices": [0, 2, ...]
}

Chỉ trả về JSON, không thêm text giải thích.`;
            break;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON found in response');
        }

        const data = JSON.parse(jsonMatch[0]);

        // Return formatted exercise data
        switch (exerciseType) {
            case 'multiple-choice':
                return {
                    type: 'multiple-choice',
                    questions: data.questions as MultipleChoiceQuestion[]
                };
            case 'drag-drop':
                return {
                    type: 'drag-drop',
                    exercise: data as DragDropExercise
                };
            case 'matching':
                return {
                    type: 'matching',
                    exercise: data as MatchingExercise
                };
            case 'ordering':
                return {
                    type: 'ordering',
                    exercise: data as OrderingExercise
                };
            case 'image-selection':
                return {
                    type: 'image-selection',
                    exercise: data as ImageSelectionExercise
                };
        }
    } catch (error) {
        console.error('Error generating exercise:', error);

        // Return fallback exercise if AI fails
        return generateFallbackExercise(exerciseType, topicName, lessonName);
    }
}

// Fallback exercises if AI generation fails
function generateFallbackExercise(
    exerciseType: ExerciseType,
    topicName: string,
    lessonName: string
): ExerciseData {
    switch (exerciseType) {
        case 'multiple-choice':
            return {
                type: 'multiple-choice',
                questions: [
                    {
                        id: 'fallback-1',
                        type: 'multiple-choice',
                        cognitiveLevel: 'nhận_biết',
                        question: `Chủ đề "${topicName}" thuộc về lĩnh vực nào?`,
                        options: ['Mỹ thuật', 'Âm nhạc', 'Văn học', 'Thể dục'],
                        correctAnswer: 0
                    },
                    {
                        id: 'fallback-2',
                        type: 'multiple-choice',
                        cognitiveLevel: 'nhận_biết',
                        question: `Bài "${lessonName}" giúp em học được kỹ năng gì?`,
                        options: [
                            'Kỹ năng quan sát và sáng tạo',
                            'Kỹ năng tính toán',
                            'Kỹ năng thể thao',
                            'Kỹ năng nấu ăn'
                        ],
                        correctAnswer: 0
                    }
                ]
            };

        case 'drag-drop':
            return {
                type: 'drag-drop',
                exercise: {
                    instruction: 'Kéo các yếu tố mỹ thuật vào đúng nhóm',
                    items: ['Màu sắc', 'Đường nét', 'Hình khối', 'Ánh sáng', 'Bố cục'],
                    dropZones: ['Yếu tố tạo hình', 'Yếu tố màu sắc', 'Yếu tố không gian', 'Yếu tố ánh sáng', 'Yếu tố cấu trúc'],
                    correctMapping: { '0': 1, '1': 0, '2': 0, '3': 3, '4': 4 }
                }
            };

        case 'matching':
            return {
                type: 'matching',
                exercise: {
                    instruction: 'Ghép các khái niệm với định nghĩa phù hợp',
                    leftItems: ['Hội họa', 'Điêu khắc', 'Kiến trúc', 'Trang trí'],
                    rightItems: [
                        'Nghệ thuật tạo hình trên mặt phẳng',
                        'Nghệ thuật tạo hình khối 3D',
                        'Nghệ thuật xây dựng công trình',
                        'Nghệ thuật làm đẹp đồ vật'
                    ],
                    correctPairs: { '0': 0, '1': 1, '2': 2, '3': 3 }
                }
            };

        case 'ordering':
            return {
                type: 'ordering',
                exercise: {
                    instruction: 'Sắp xếp các bước vẽ tranh theo đúng thứ tự',
                    items: [
                        'Tô màu và hoàn thiện',
                        'Phác thảo ý tưởng',
                        'Vẽ chi tiết',
                        'Tạo bố cục',
                        'Đánh giá và điều chỉnh'
                    ],
                    correctOrder: [1, 3, 2, 0, 4]
                }
            };

        case 'image-selection':
            return {
                type: 'image-selection',
                exercise: {
                    instruction: 'Chọn các hình ảnh thể hiện đúng ý chính',
                    mainIdea: `Tác phẩm mỹ thuật về chủ đề ${topicName}`,
                    images: [
                        { url: 'placeholder', description: `Tranh vẽ về ${topicName}` },
                        { url: 'placeholder', description: 'Tranh phong cảnh thiên nhiên' },
                        { url: 'placeholder', description: `Tác phẩm điêu khắc về ${topicName}` },
                        { url: 'placeholder', description: 'Ảnh chụp động vật' },
                        { url: 'placeholder', description: `Thiết kế đồ họa về ${topicName}` },
                        { url: 'placeholder', description: 'Hình ảnh kiến trúc hiện đại' }
                    ],
                    correctIndices: [0, 2, 4]
                }
            };
    }
}

// Generate interactive simulation game
export async function generateInteractiveSimulation(
    grade: number,
    lessonTitle: string
): Promise<any> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Bạn là chuyên gia thiết kế game giáo dục mỹ thuật. Tạo một trò chơi/mô phỏng tương tác cho bài học "${lessonTitle}" lớp ${grade} (SGK Mỹ thuật - Kết nối tri thức).

Yêu cầu:
- Tạo game tương tác phù hợp với nội dung bài học
- Game phải có tính giáo dục cao, giúp học sinh hiểu sâu về bài học
- Có các hoạt động tương tác cụ thể (vẽ, tô màu, sắp xếp, ghép hình, v.v.)
- Có hướng dẫn rõ ràng và phản hồi tức thì

Trả về JSON với cấu trúc:
{
  "gameType": "drawing" | "coloring" | "puzzle" | "matching" | "quiz",
  "title": "Tên game",
  "description": "Mô tả game",
  "learningObjectives": ["Mục tiêu 1", "Mục tiêu 2", "Mục tiêu 3"],
  "instructions": ["Bước 1", "Bước 2", "Bước 3"],
  "gameData": {
    // Dữ liệu cụ thể cho từng loại game
    // Ví dụ với drawing game:
    "canvas": {
      "width": 800,
      "height": 600,
      "backgroundColor": "#ffffff"
    },
    "tools": [
      {"name": "Bút chì", "type": "pencil", "color": "#000000", "size": 2},
      {"name": "Cọ vẽ", "type": "brush", "color": "#000000", "size": 5},
      {"name": "Tẩy", "type": "eraser", "size": 10}
    ],
    "colorPalette": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", "#FFFFFF"],
    "referenceImage": {
      "description": "Mô tả hình mẫu",
      "hints": ["Gợi ý 1", "Gợi ý 2"]
    },
    "challenges": [
      {
        "title": "Thử thách 1",
        "description": "Mô tả thử thách",
        "criteria": ["Tiêu chí 1", "Tiêu chí 2"]
      }
    ]
  },
  "feedback": {
    "onProgress": ["Phản hồi khi đang làm"],
    "onComplete": ["Phản hồi khi hoàn thành"]
  }
}

Hãy sáng tạo game phù hợp với nội dung bài học cụ thể.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const gameData = JSON.parse(jsonMatch[0]);
            return gameData;
        }

        // Fallback game
        return createFallbackSimulation(lessonTitle);
    } catch (error) {
        console.error('Error generating simulation:', error);
        return createFallbackSimulation(lessonTitle);
    }
}

function createFallbackSimulation(lessonTitle: string): any {
    return {
        gameType: 'drawing',
        title: `Thực hành vẽ: ${lessonTitle}`,
        description: 'Thực hành kỹ năng vẽ và sáng tạo nghệ thuật',
        learningObjectives: [
            'Rèn luyện kỹ năng vẽ cơ bản',
            'Phát triển khả năng quan sát và sáng tạo',
            'Hiểu và áp dụng các nguyên tắc mỹ thuật'
        ],
        instructions: [
            'Chọn công cụ vẽ từ thanh công cụ',
            'Chọn màu sắc từ bảng màu',
            'Vẽ trên canvas theo chủ đề bài học',
            'Sử dụng các gợi ý để hoàn thiện tác phẩm'
        ],
        gameData: {
            canvas: {
                width: 800,
                height: 600,
                backgroundColor: '#ffffff'
            },
            tools: [
                { name: 'Bút chì', type: 'pencil', color: '#000000', size: 2 },
                { name: 'Cọ vẽ nhỏ', type: 'brush', color: '#000000', size: 5 },
                { name: 'Cọ vẽ lớn', type: 'brush', color: '#000000', size: 10 },
                { name: 'Tẩy', type: 'eraser', size: 15 }
            ],
            colorPalette: [
                '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
                '#0000FF', '#4B0082', '#9400D3', '#FF1493',
                '#000000', '#808080', '#FFFFFF', '#8B4513'
            ],
            referenceImage: {
                description: `Tham khảo các tác phẩm mỹ thuật liên quan đến ${lessonTitle}`,
                hints: [
                    'Chú ý đến cấu đồ và bố cục',
                    'Sử dụng màu sắc hài hòa',
                    'Thể hiện cảm xúc và ý tưởng cá nhân'
                ]
            },
            challenges: [
                {
                    title: 'Thử thách cơ bản',
                    description: 'Vẽ một tác phẩm đơn giản theo chủ đề',
                    criteria: [
                        'Có bố cục rõ ràng',
                        'Sử dụng ít nhất 3 màu sắc',
                        'Thể hiện được chủ đề bài học'
                    ]
                },
                {
                    title: 'Thử thách nâng cao',
                    description: 'Tạo tác phẩm sáng tạo với kỹ thuật phức tạp',
                    criteria: [
                        'Bố cục phức tạp và cân đối',
                        'Sử dụng nhiều màu sắc hài hòa',
                        'Thể hiện sự sáng tạo độc đáo'
                    ]
                }
            ]
        },
        feedback: {
            onProgress: [
                'Bạn đang làm rất tốt!',
                'Hãy tiếp tục sáng tạo!',
                'Thử nghiệm với nhiều màu sắc hơn!'
            ],
            onComplete: [
                'Tuyệt vời! Bạn đã hoàn thành tác phẩm!',
                'Tác phẩm của bạn rất ấn tượng!',
                'Hãy chia sẻ tác phẩm với bạn bè!'
            ]
        }
    };
}
