export interface APIResponse<T = any> {
  success: boolean;
  error?: string;
  value?: T;
}

export interface Stat {
  correctCalculations: number;
  totalCalculations: number;
  totalScore: number;
}

export interface QuestionResponse {
  factorA: number;
  factorB: number;
  operator: string;
  difficulty: string;
  signature: string;
}

export interface AnswerForm {
  calculation: {
    factorA: number;
    factorB: number;
    operator: string;
    difficulty: string;
    signature: string;
    answer: number;
  };
}
