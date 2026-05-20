export interface PromptIngredient {
  label: string;
  value: string;
  example: string;
}

export interface PromptConfig {
  roles: PromptIngredient[];
  tasks: PromptIngredient[];
  contexts: PromptIngredient[];
}

export interface GemItem {
  name: string;
  role: string;
  instructions: string;
  preview: string;
}

export interface HallucinationQuizItem {
  title: string;
  statement: string;
  isHallucination: boolean;
  explanation: string;
}

export interface WorkspaceAppInfo {
  app: 'Gmail' | 'Docs' | 'Sheets' | 'Slides';
  icon: string;
  useCase: string;
  link: string;
  demoData: string;
  demoPrompt: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  notes: string;
  isDemo?: boolean;
  copyText?: string;
  promptText?: string;
}

export interface DeepResearchItem {
  label: string;
  query: string;
  benefit: string;
}
