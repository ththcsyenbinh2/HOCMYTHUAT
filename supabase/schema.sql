-- Art Education App Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercise results table
CREATE TABLE IF NOT EXISTS exercise_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  grade INTEGER NOT NULL,
  topic TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  exercise_type TEXT NOT NULL CHECK (exercise_type IN ('multiple-choice', 'drag-drop', 'matching', 'ordering', 'image-selection')),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade);
CREATE INDEX IF NOT EXISTS idx_exercise_results_student_id ON exercise_results(student_id);
CREATE INDEX IF NOT EXISTS idx_exercise_results_grade ON exercise_results(grade);
CREATE INDEX IF NOT EXISTS idx_exercise_results_topic ON exercise_results(topic);
CREATE INDEX IF NOT EXISTS idx_exercise_results_created_at ON exercise_results(created_at DESC);

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_results ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for students (simple auth)
CREATE POLICY "Allow public access to students" ON students
  FOR ALL USING (true);

-- Allow public read for teachers
CREATE POLICY "Allow public read access to teachers" ON teachers
  FOR SELECT USING (true);

-- Allow public access to exercise_results
CREATE POLICY "Allow public access to exercise_results" ON exercise_results
  FOR ALL USING (true);

-- Insert sample teacher account
-- Password: "teacher123" (in production, use proper password hashing)
INSERT INTO teachers (email, name, password_hash)
VALUES ('teacher@example.com', 'Giáo viên mẫu', 'teacher123')
ON CONFLICT (email) DO NOTHING;

-- Sample data for testing (optional)
-- Uncomment to add sample students and results

-- INSERT INTO students (name, grade) VALUES
--   ('Nguyễn Văn A', 6),
--   ('Trần Thị B', 7),
--   ('Lê Văn C', 8),
--   ('Phạm Thị D', 9);
