import { request } from './client';
import type { AnswerResponse, QuestionRequest } from '../types/api';

const candidateEndpoints = ['/ask', '/chat', '/question', '/query'];

export async function submitQuestion(payload: QuestionRequest): Promise<AnswerResponse> {
  let lastError: unknown = null;

  for (const endpoint of candidateEndpoints) {
    try {
      return await request<AnswerResponse>({
        method: 'POST',
        url: endpoint,
        data: payload,
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Assistant request failed.');
}
