
export enum Difficulty {
  EASY = '入门',
  MEDIUM = '进阶',
  HARD = '挑战'
}

export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  role: UserRole;
  name: string;
}

export interface Slide {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface Lesson {
  id: string;
  chapter: string; // 新增：用于章节分类，如 "第一阶段：初入江湖"
  title: string;
  description: string;
  difficulty: Difficulty;
  slides: Slide[];
  initialCode: string;
  skeletonCode: string;
  thumbnail: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
