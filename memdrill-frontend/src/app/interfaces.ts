export interface APIResponse<T = any> {
  success: boolean;
  error?: string;
  value?: T;
}
