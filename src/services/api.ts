// API Configuration
export const API_CONFIG = {
  baseURL: (import.meta as any).env?.PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
};

// Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiError extends Error {
  status: number;
  code?: string;
  field?: string;

  constructor(options: { message: string; status: number; code?: string; field?: string }) {
    super(options.message);
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
    this.field = options.field;
  }
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request options
export interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  requireAuth?: boolean;
}

// API Client class
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Build headers with auth if required
  private buildHeaders(options: RequestOptions): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...options.headers };
    
    if (options.requireAuth !== false) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return headers;
  }

  // Sleep utility for retries
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Make HTTP request with retries
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      body,
      timeout = API_CONFIG.timeout,
      retries = API_CONFIG.retries
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let lastError: Error = new Error('Request failed');

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const fetchOptions: RequestInit = {
          method,
          headers,
          signal: controller.signal,
        };

        if (body && method !== 'GET') {
          fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          await this.sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    clearTimeout(timeoutId);
    throw new ApiError({
      message: lastError?.message || 'Request failed',
      status: 0,
      code: 'NETWORK_ERROR'
    });
  }

  // GET request
  async get<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'POST', body });
  }

  // PUT request
  async put<T>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PUT', body });
  }

  // DELETE request
  async delete<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // PATCH request
  async patch<T>(endpoint: string, body?: any, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = this.buildHeaders({ ...options, headers: {} });
    delete headers['Content-Type']; // Let browser set multipart boundary

    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError({
        message: `Upload failed: ${response.statusText}`,
        status: response.status
      });
    }

    return response.json();
  }
}

// Create default API client instance
export const apiClient = new ApiClient();

// Convenience functions
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.get<T>(endpoint, options),
  
  post: <T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.post<T>(endpoint, body, options),
  
  put: <T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.put<T>(endpoint, body, options),
  
  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.delete<T>(endpoint, options),
  
  patch: <T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.patch<T>(endpoint, body, options),
  
  upload: <T>(endpoint: string, file: File, options?: Omit<RequestOptions, 'method' | 'body'>) => 
    apiClient.upload<T>(endpoint, file, options),
};

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Authentication helpers
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
};

export const setAuthToken = (token: string, refreshToken?: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
};