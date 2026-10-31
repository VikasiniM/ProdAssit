import { useMutation } from '@tanstack/react-query';
import { submitQuestion } from '../api/assistant';
import type { QuestionRequest } from '../types/api';

export function useAssistantMutation() {
  return useMutation({
    mutationFn: (payload: QuestionRequest) => submitQuestion(payload),
  });
}
