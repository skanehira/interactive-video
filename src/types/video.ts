export interface VideoSegment {
  id: string;
  src: string;
  title: string;
  description?: string;
}

export interface Choice {
  id: string;
  text: string;
  nextSegmentId: string;
  icon: string;
}

export interface InteractionPoint {
  id: string;
  segmentId: string;
  timestamp: number;
  duration: number;
  choices: Choice[];
  pauseOnShow?: boolean;
  timeoutSeconds?: number; // タイムアウト時間（秒）
  defaultChoiceId?: string; // タイムアウト時のデフォルト選択
}

export interface VideoScenario {
  id: string;
  title: string;
  segments: VideoSegment[];
  interactions: InteractionPoint[];
  startSegmentId: string;
}
