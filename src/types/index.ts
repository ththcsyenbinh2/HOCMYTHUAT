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
    | 'image-selection';

export interface MultipleChoiceQuestion {
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
}

export interface DragDropExercise {
    instruction: string;
    items: string[];
    dropZones: string[];
    correctMapping: Record<number, number>; // item index -> drop zone index
}

export interface MatchingExercise {
    instruction: string;
    leftItems: string[];
    rightItems: string[];
    correctPairs: Record<number, number>; // left index -> right index
}

export interface OrderingExercise {
    instruction: string;
    items: string[];
    correctOrder: number[]; // correct indices order
}

export interface ImageSelectionExercise {
    instruction: string;
    mainIdea: string;
    images: {
        url: string;
        description: string;
    }[];
    correctIndices: number[]; // indices of correct images
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
