export type QuestionRequest = {
  question: string;
  session_id?: string;
};

export type AgentTraceStep = {
  name: string;
  status: string;
  details: Record<string, unknown>;
};

export type EvidenceCitation = {
  source?: string;
  title?: string;
  content?: string;
  score?: number;
  metadata?: Record<string, unknown>;
};

export type AnswerResponse = {
  answer: string;
  citations: EvidenceCitation[];
  trace: AgentTraceStep[];
  tools_used: string[];
  memory_used: string[];
  execution_time_ms: number;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  citations?: EvidenceCitation[];
  trace?: AgentTraceStep[];
  toolsUsed?: string[];
  memoryUsed?: string[];
  executionTimeMs?: number;
};

export type SessionSummary = {
  id: string;
  title: string;
  updatedAt: string;
};
