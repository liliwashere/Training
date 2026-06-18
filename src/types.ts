export type SessionType = 'session1' | 'session2' | 'demolab';

export interface PromptIngredient {
  label: string;
  description: string;
  example: string;
}

export interface DemoScenario {
  title: string;
  description: string;
  messyDraft: string;
  targetOutcome: string;
  prompt: string;
}

export interface HallucinationCase {
  title: string;
  statement: string;
  isHallucination: boolean;
  explanation: string;
}
