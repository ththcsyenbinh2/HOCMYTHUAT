import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    ExerciseType,
    QuestionDifficulty,
    ComprehensiveExerciseData
} from '@/types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(apiKey || 'placeholder-key');

// Generate comprehensive exercises using Gemini AI
export async function generateExercise(
    grade: number,
    topicName: string,
    lessonName: string
): Promise<ComprehensiveExerciseData> {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Bạn là một chuyên gia giáo dục Mỹ thuật THCS. Hãy tạo một bài kiểm tra tổng hợp gồm 15 câu hỏi cho học sinh lớp ${grade} với chủ đề "${topicName}" - bài "${lessonName}".

Yêu cầu bắt buộc:
1. Nội dung chính xác 100% theo SGK "Kết nối tri thức với cuộc sống".
2. Tổng số câu: 15 câu.
3. Phân loại độ khó:
   - 5 câu nhận biết
   - 5 câu thông hiểu
   - 5 câu vận dụng
4. Phân loại hình thức câu hỏi (đảm bảo mỗi loại có 3 câu):
   - 3 câu trắc nghiệm (multiple-choice)
   - 3 câu kéo thả (drag-drop)
   - 3 câu ghép đôi (matching)
   - 3 câu sắp xếp (ordering)
   - 3 câu chọn hình (image-selection) - vì không có hình thật, hãy mô tả chi tiết hình ảnh.

Trả về kết quả dưới dạng JSON duy nhất với cấu trúc sau:
{
  "questions": [
    {
      "id": "unique_id_1",
      "type": "multiple-choice",
      "difficulty": "nhận_biết",
      "points": 10,
      "question": "Nội dung câu hỏi...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    },
    {
      "id": "unique_id_2",
      "type": "drag-drop",
      "difficulty": "thông_hiểu",
      "points": 10,
      "instruction": "Hướng dẫn...",
      "items": ["Item 1", "Item 2", ...],
      "dropZones": ["Zone 1", "Zone 2", ...],
      "correctMapping": {"0": 1, "1": 0, ...}
    },
    {
      "id": "unique_id_3",
      "type": "matching",
      "difficulty": "vận_dụng",
      "points": 10,
      "instruction": "Hướng dẫn...",
      "leftItems": ["Left 1", "Left 2", ...],
      "rightItems": ["Right 1", "Right 2", ...],
      "correctPairs": {"0": 1, ...}
    },
    {
      "id": "unique_id_4",
      "type": "ordering",
      "difficulty": "nhận_biết",
      "points": 10,
      "instruction": "Hướng dẫn...",
      "items": ["Item 1", "Item 2", ...],
      "correctOrder": [1, 0, 2, ...] // index
    },
    {
      "id": "unique_id_5",
      "type": "image-selection",
      "difficulty": "thông_hiểu",
      "points": 10,
      "instruction": "Hướng dẫn...",
      "mainIdea": "Ý chính...",
      "images": [
        {"url": "placeholder", "description": "Mô tả 1"},
        {"url": "placeholder", "description": "Mô tả 2"},
        ...
      ],
      "correctIndices": [0, 2]
    },
    ...
  ],
  "totalPoints": 150
}

Lưu ý:
- "correctAnswer" cho trắc nghiệm là index (0-3).
- "correctMapping", "correctPairs", "correctOrder", "correctIndices" đều dùng index (bắt đầu từ 0).
- KHÔNG thêm bất kỳ text nào ngoài JSON.`;

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

        // Validate structure slightly (optional but good practice)
        if (!data.questions || !Array.isArray(data.questions)) {
            throw new Error('Invalid JSON structure: missing questions array');
        }

        return data as ComprehensiveExerciseData;

    } catch (error) {
        console.error('Error generating exercise:', error);
        return generateFallbackExercise(grade, topicName, lessonName);
    }
}

// Fallback exercises separate by grade/topic is complex, so we provide a generic structure
function generateFallbackExercise(
    grade: number,
    topicName: string,
    lessonName: string
): ComprehensiveExerciseData {
    return {
        totalPoints: 150,
        questions: [
            // 3 Multiple choice
            {
                id: 'fb_mc_1',
                type: 'multiple-choice',
                difficulty: 'nhận_biết',
                points: 10,
                question: `Chủ đề "${topicName}" thuộc chương trình lớp mấy?`,
                options: ['Lớp 6', `Lớp ${grade}`, 'Lớp 8', 'Lớp 9'],
                correctAnswer: 1
            },
            {
                id: 'fb_mc_2',
                type: 'multiple-choice',
                difficulty: 'nhận_biết',
                points: 10,
                question: 'Màu cơ bản gồm những màu nào?',
                options: ['Đỏ, Vàng, Xanh lam', 'Cam, Tím, Xanh lá', 'Trắng, Đen, Xám', 'Nâu, Hồng, Be'],
                correctAnswer: 0
            },
            {
                id: 'fb_mc_3',
                type: 'multiple-choice',
                difficulty: 'thông_hiểu',
                points: 10,
                question: 'Mục đích chính của bài học này là gì?',
                options: ['Giải trí', 'Học kỹ năng mới', 'Ngủ', 'Ăn uống'],
                correctAnswer: 1
            },
            // 3 Drag Drop
            {
                id: 'fb_dd_1',
                type: 'drag-drop',
                difficulty: 'vận_dụng',
                points: 10,
                instruction: 'Kéo các yếu tố vào đúng nhóm tương ứng.',
                items: ['Màu nóng', 'Màu lạnh'],
                dropZones: ['Đỏ, Cam, Vàng', 'Xanh lam, Tím, Xanh lá'],
                correctMapping: { 0: 0, 1: 1 }
            },
            {
                id: 'fb_dd_2',
                type: 'drag-drop',
                difficulty: 'thông_hiểu',
                points: 10,
                instruction: 'Phân loại công cụ vẽ.',
                items: ['Cọ vẽ', 'Bút chì'],
                dropZones: ['Dùng cho màu nước', 'Dùng để phác thảo'],
                correctMapping: { 0: 0, 1: 1 }
            },
            {
                id: 'fb_dd_3',
                type: 'drag-drop',
                difficulty: 'nhận_biết',
                points: 10,
                instruction: 'Ghép tên gọi.',
                items: ['Họa sĩ', 'Nhà điêu khắc'],
                dropZones: ['Vẽ tranh', 'Tạc tượng'],
                correctMapping: { 0: 0, 1: 1 }
            },
            // 3 Matching
            {
                id: 'fb_m_1',
                type: 'matching',
                difficulty: 'nhận_biết',
                points: 10,
                instruction: 'Ghép đôi tương ứng.',
                leftItems: ['A', 'B'],
                rightItems: ['A', 'B'],
                correctPairs: { 0: 0, 1: 1 }
            },
            {
                id: 'fb_m_2',
                type: 'matching',
                difficulty: 'thông_hiểu',
                points: 10,
                instruction: 'Ghép màu bổ túc.',
                leftItems: ['Đỏ', 'Vàng'],
                rightItems: ['Xanh lá', 'Tím'],
                correctPairs: { 0: 0, 1: 1 }
            },
            {
                id: 'fb_m_3',
                type: 'matching',
                difficulty: 'vận_dụng',
                points: 10,
                instruction: 'Ghép tác phẩm với tác giả.',
                leftItems: ['Tô Ngọc Vân', 'Bùi Xuân Phái'],
                rightItems: ['Thiếu nữ bên hoa huệ', 'Phố Phái'],
                correctPairs: { 0: 0, 1: 1 }
            },
            // 3 Ordering
            {
                id: 'fb_o_1',
                type: 'ordering',
                difficulty: 'nhận_biết',
                points: 10,
                instruction: 'Sắp xếp quy trình vẽ.',
                items: ['Phác thảo', 'Tô màu', 'Hoàn thiện'],
                correctOrder: [0, 1, 2]
            },
            {
                id: 'fb_o_2',
                type: 'ordering',
                difficulty: 'thông_hiểu',
                points: 10,
                instruction: 'Sắp xếp độ đậm nhạt.',
                items: ['Đen', 'Xám', 'Trắng'],
                correctOrder: [0, 1, 2]
            },
            {
                id: 'fb_o_3',
                type: 'ordering',
                difficulty: 'vận_dụng',
                points: 10,
                instruction: 'Sắp xếp thời gian.',
                items: ['Sáng', 'Trưa', 'Chiều'],
                correctOrder: [0, 1, 2]
            },
            // 3 Image Selection
            {
                id: 'fb_is_1',
                type: 'image-selection',
                difficulty: 'nhận_biết',
                points: 10,
                instruction: 'Chọn hình hình tròn.',
                mainIdea: 'Hình tròn',
                images: [{ url: 'p', description: 'Hình tròn' }, { url: 'p', description: 'Hình vuông' }],
                correctIndices: [0]
            },
            {
                id: 'fb_is_2',
                type: 'image-selection',
                difficulty: 'thông_hiểu',
                points: 10,
                instruction: 'Chọn màu nóng.',
                mainIdea: 'Màu nóng',
                images: [{ url: 'p', description: 'Màu đỏ' }, { url: 'p', description: 'Màu xanh' }],
                correctIndices: [0]
            },
            {
                id: 'fb_is_3',
                type: 'image-selection',
                difficulty: 'vận_dụng',
                points: 10,
                instruction: 'Chọn bố cục cân đối.',
                mainIdea: 'Cân đối',
                images: [{ url: 'p', description: 'Cân đối' }, { url: 'p', description: 'Lệch' }],
                correctIndices: [0]
            }
        ]
    };
}
