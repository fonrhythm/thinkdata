// 用户类型
export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

// 剧集类型
export interface Drama {
  id: string;
  userId: string;
  title: string;
  year: number;
  platform: string;
  historicalPeriod: string;
  episodes: number;
  currentEpisode: number;
  createdAt: Date;
  updatedAt: Date;
}

// 笔记类型
export interface Note {
  id: string;
  userId: string;
  dramaId: string;
  episode: number;
  timestamp: string; // 剧集中的时间码
  layerId: number;
  theoryId?: string;
  sceneDescription: string;
  myThoughts: string;
  selectedQuestions: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 分析结果类型
export interface Analysis {
  id: string;
  userId: string;
  dramaId: string;
  layerId: number;
  theoryId?: string;
  sceneId?: string;
  content: string;
  perspectives: {
    theory: string;
    insight: string;
  }[];
  createdAt: Date;
}

// 最终文章类型
export interface FinalArticle {
  id: string;
  userId: string;
  dramaId: string;
  title: string;
  sections: {
    title: string;
    content: string;
  }[];
  metadata: {
    wordCount: number;
    createdAt: Date;
    lastModified: Date;
  };
}
