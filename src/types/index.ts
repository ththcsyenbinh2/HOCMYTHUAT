// ===== USER TYPES =====
export interface Student {
    id: string;
    name: string;
    grade: 6 | 7 | 8 | 9;
    created_at: string;
}

export interface Teacher {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

// ===== CURRICULUM TYPES =====
export interface LessonType {
    id: string;
    name: string;
    description: string;
}

export interface Topic {
    id: string;
    name: string;
    description: string;
    lessonTypes: LessonType[];
}

export interface GradeCurriculum {
    grade: 6 | 7 | 8 | 9;
    topics: Topic[];
}

// ===== EXERCISE TYPES =====
export type ExerciseType =
    | 'multiple-choice'
    | 'drag-drop'
    | 'matching'
    | 'ordering'
    | 'image-selection'
    | 'comprehensive';

export type QuestionDifficulty = 'nhận_biết' | 'thông_hiểu' | 'vận_dụng';

export interface BaseQuestion {
    id: string; // unique id for key
    type: ExerciseType;
    difficulty: QuestionDifficulty;
    points: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple-choice';
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
}

export interface DragDropQuestion extends BaseQuestion {
    type: 'drag-drop';
    instruction: string;
    items: string[];
    dropZones: string[];
    correctMapping: Record<number, number>; // item index -> drop zone index
}

export interface MatchingQuestion extends BaseQuestion {
    type: 'matching';
    instruction: string;
    leftItems: string[];
    rightItems: string[];
    correctPairs: Record<number, number>; // left index -> right index
}

export interface OrderingQuestion extends BaseQuestion {
    type: 'ordering';
    instruction: string;
    items: string[];
    correctOrder: number[]; // correct indices order
}

export interface ImageSelectionQuestion extends BaseQuestion {
    type: 'image-selection';
    instruction: string;
    mainIdea: string;
    images: {
        url: string;
        description: string;
    }[];
    correctIndices: number[]; // indices of correct images
}

export type QuestionData =
    | MultipleChoiceQuestion
    | DragDropQuestion
    | MatchingQuestion
    | OrderingQuestion
    | ImageSelectionQuestion;

export interface ComprehensiveExerciseData {
    questions: QuestionData[];
    totalPoints: number;
}

// ===== RESULT TYPES =====
export interface ExerciseResult {
    id: string;
    student_id: string;
    grade: number;
    topic: string;
    lesson_type: string;
    exercise_type: ExerciseType;
    score: number;
    total_questions: number;
    answers: any; // JSON field storing student's answers
    created_at: string;
}

// ===== UI TYPES =====
export interface AuthContextType {
    student: Student | null;
    teacher: Teacher | null;
    login: (user: Student | Teacher, role: 'student' | 'teacher') => void;
    logout: () => void;
    isAuthenticated: boolean;
    role: 'student' | 'teacher' | null;
}
