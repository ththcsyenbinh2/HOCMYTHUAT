import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    ExerciseType,
    MultipleChoiceQuestion,
    DragDropExercise,
    MatchingExercise,
    OrderingExercise,
    ImageSelectionExercise,
    ExerciseData
} from '@/types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(apiKey || 'placeholder-key');

// Generate exercises using Gemini AI
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
                        question: `Chủ đề "${topicName}" thuộc về lĩnh vực nào?`,
                        options: ['Mỹ thuật', 'Âm nhạc', 'Văn học', 'Thể dục'],
                        correctAnswer: 0
                    },
                    {
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
