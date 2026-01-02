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
export interface Lesson {
    id: number;
    title: string;
}

export interface Topic {
    id: string;
    title: string;
    subject: string;
    lessons: Lesson[];
}

export interface GradeCurriculum {
    grade: 6 | 7 | 8 | 9;
    topics: Topic[];
}

// Legacy types for backward compatibility
export interface LessonType {
    id: string;
    name: string;
    description: string;
}

// ===== COGNITIVE LEVEL TYPES =====
export type CognitiveLevel = 'nhận_biết' | 'thông_hiểu' | 'vận_dụng';

// ===== EXERCISE TYPES =====
export type ExerciseType =
    | 'multiple-choice'
    | 'drag-drop'
    | 'matching'
    | 'ordering'
    | 'image-selection';

export type LessonMode = 'questions' | 'simulation';

// Base question interface with cognitive level
export interface BaseQuestion {
    id: string;
    cognitiveLevel: CognitiveLevel;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple-choice';
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface DragDropQuestion extends BaseQuestion {
    type: 'drag-drop';
    instruction: string;
    items: string[];
    dropZones: string[];
    correctMapping: Record<number, number>;
}

export interface MatchingQuestion extends BaseQuestion {
    type: 'matching';
    instruction: string;
    leftItems: string[];
    rightItems: string[];
    correctPairs: Record<number, number>;
}

export interface OrderingQuestion extends BaseQuestion {
    type: 'ordering';
    instruction: string;
    items: string[];
    correctOrder: number[];
}

export interface ImageSelectionQuestion extends BaseQuestion {
    type: 'image-selection';
    instruction: string;
    mainIdea: string;
    images: {
        url: string;
        description: string;
    }[];
    correctIndices: number[];
}

export type Question =
    | MultipleChoiceQuestion
    | DragDropQuestion
    | MatchingQuestion
    | OrderingQuestion
    | ImageSelectionQuestion;

// Mixed exam structure
export interface MixedExam {
    lessonTitle: string;
    topicTitle: string;
    grade: number;
    questions: Question[];
    totalScore: number;
    distribution: {
        nhận_biết: number;
        thông_hiểu: number;
        vận_dụng: number;
    };
}

export interface ExamResult {
    examId: string;
    studentId: string;
    answers: Record<string, any>;
    score: number;
    totalQuestions: number;
    totalScore: number;
    percentage: number;
    byLevel?: Record<string, { correct: number; total: number }>;
    completedAt: string;
}

// Legacy types for backward compatibility
export interface DragDropExercise {
    instruction: string;
    items: string[];
    dropZones: string[];
    correctMapping: Record<number, number>;
}

export interface MatchingExercise {
    instruction: string;
    leftItems: string[];
    rightItems: string[];
    correctPairs: Record<number, number>;
}

export interface OrderingExercise {
    instruction: string;
    items: string[];
    correctOrder: number[];
}

export interface ImageSelectionExercise {
    instruction: string;
    mainIdea: string;
    images: {
        url: string;
        description: string;
    }[];
    correctIndices: number[];
}

export type ExerciseData =
    | { type: 'multiple-choice'; questions: MultipleChoiceQuestion[] }
    | { type: 'drag-drop'; exercise: DragDropExercise }
    | { type: 'matching'; exercise: MatchingExercise }
    | { type: 'ordering'; exercise: OrderingExercise }
    | { type: 'image-selection'; exercise: ImageSelectionExercise };

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
