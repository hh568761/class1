
import { Lesson } from './types';
import { lesson1 } from './lessons/lesson1';
import { lesson2 } from './lessons/lesson2';
import { lesson3 } from './lessons/lesson3';
import { lesson4 } from './lessons/lesson4';
import { lesson5 } from './lessons/lesson5';
import { lesson6 } from './lessons/lesson6';
import { lesson7 } from './lessons/lesson7';
import { lesson8 } from './lessons/lesson8';
import { lesson9 } from './lessons/lesson9';
import { lesson10 } from './lessons/lesson10';
import { lesson11 } from './lessons/lesson11';
import { lesson12 } from './lessons/lesson12';
import { lesson13 } from './lessons/lesson13';
import { lesson14 } from './lessons/lesson14';
import { lesson15 } from './lessons/lesson15';
import { lesson16 } from './lessons/lesson16';
import { lesson17 } from './lessons/lesson17';
import { lesson18 } from './lessons/lesson18';
import { lesson19 } from './lessons/lesson19';
import { lesson20 } from './lessons/lesson20';
import { lesson21 } from './lessons/lesson21';
import { lesson22 } from './lessons/lesson22';
import { lesson23 } from './lessons/lesson23';

// 最高宪法自查：确保数组包含所有已定义的 lesson 变量
export const LESSONS: Lesson[] = [
  lesson1, lesson2, lesson3, lesson4, lesson5,
  lesson6, lesson7, lesson8, lesson9, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20,
  lesson21, lesson22, lesson23
];

export interface ChapterGroup {
  chapter: string;
  lessons: Lesson[];
}

export const getOrderedChapters = (): ChapterGroup[] => {
  // 必须与 lesson 文件中的 chapter 字段严格一一对应
  const chapterOrder = [
    '第一阶段：终端渗透与系统基础',
    '第二阶段：网络协议与数据侦听',
    '第三阶段：加密解密与安全算法',
    '第四阶段：实战演习与大师项目'
  ];

  return chapterOrder.map(chapterName => ({
    chapter: chapterName,
    lessons: LESSONS.filter(l => l.chapter.trim() === chapterName.trim())
  })).filter(group => group.lessons.length > 0);
};
