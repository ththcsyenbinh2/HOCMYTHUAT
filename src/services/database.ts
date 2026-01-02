import { supabase } from '@/lib/supabase';
import { Student, Teacher, ExerciseResult, ExerciseType } from '@/types';

// ===== STUDENT OPERATIONS =====

export async function createStudent(name: string, grade: 6 | 7 | 8 | 9): Promise<Student | null> {
    try {
        const { data, error } = await supabase
            .from('students')
            .insert([{ name, grade }])
            .select()
            .single();

        if (error) throw error;
        return data as Student;
    } catch (error) {
        console.error('Error creating student:', error);
        return null;
    }
}

export async function getStudentById(id: string): Promise<Student | null> {
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Student;
    } catch (error) {
        console.error('Error fetching student:', error);
        return null;
    }
}

export async function getAllStudents(): Promise<Student[]> {
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Student[];
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

// ===== TEACHER OPERATIONS =====

export async function getTeacherByEmail(email: string): Promise<Teacher | null> {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw error;
        return data as Teacher;
    } catch (error) {
        console.error('Error fetching teacher:', error);
        return null;
    }
}

export async function createTeacher(email: string, name: string, passwordHash: string): Promise<Teacher | null> {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .insert([{ email, name, password_hash: passwordHash }])
            .select()
            .single();

        if (error) throw error;
        return data as Teacher;
    } catch (error) {
        console.error('Error creating teacher:', error);
        return null;
    }
}

// ===== EXERCISE RESULT OPERATIONS =====

export async function saveExerciseResult(
    studentId: string,
    grade: number,
    topic: string,
    lessonType: string,
    exerciseType: ExerciseType,
    score: number,
    totalQuestions: number,
    answers: any
): Promise<ExerciseResult | null> {
    try {
        const { data, error } = await supabase
            .from('exercise_results')
            .insert([{
                student_id: studentId,
                grade,
                topic,
                lesson_type: lessonType,
                exercise_type: exerciseType,
                score,
                total_questions: totalQuestions,
                answers
            }])
            .select()
            .single();

        if (error) throw error;
        return data as ExerciseResult;
    } catch (error) {
        console.error('Error saving exercise result:', error);
        return null;
    }
}

export async function getStudentResults(studentId: string): Promise<ExerciseResult[]> {
    try {
        const { data, error } = await supabase
            .from('exercise_results')
            .select('*')
            .eq('student_id', studentId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ExerciseResult[];
    } catch (error) {
        console.error('Error fetching student results:', error);
        return [];
    }
}

export async function getAllResults(): Promise<ExerciseResult[]> {
    try {
        const { data, error } = await supabase
            .from('exercise_results')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ExerciseResult[];
    } catch (error) {
        console.error('Error fetching all results:', error);
        return [];
    }
}

export async function getResultsByGrade(grade: number): Promise<ExerciseResult[]> {
    try {
        const { data, error } = await supabase
            .from('exercise_results')
            .select('*')
            .eq('grade', grade)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ExerciseResult[];
    } catch (error) {
        console.error('Error fetching results by grade:', error);
        return [];
    }
}

export async function getResultsByTopic(topic: string): Promise<ExerciseResult[]> {
    try {
        const { data, error } = await supabase
            .from('exercise_results')
            .select('*')
            .eq('topic', topic)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as ExerciseResult[];
    } catch (error) {
        console.error('Error fetching results by topic:', error);
        return [];
    }
}

// ===== UTILITY FUNCTIONS =====

export function calculatePercentage(score: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
}

export function getGradeLabel(score: number, total: number): string {
    const percentage = calculatePercentage(score, total);

    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 80) return 'Giỏi';
    if (percentage >= 70) return 'Khá';
    if (percentage >= 50) return 'Trung bình';
    return 'Cần cố gắng';
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
