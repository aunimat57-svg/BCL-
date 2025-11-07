
export type PostType = 'topik' | 'softselling' | 'sembang' | 'kewangan';

export interface SoftSellingState {
  hook: string;
  problem: string;
  solution: string;
  cta: string;
}

export interface ExtraTopicState {
  topic: string;
}
