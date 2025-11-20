interface ApiResponse<T> {
  data: T;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  class?: string;
}

interface TimetableEntry {
  _id: string;
  class: string;
  subject: string;
  day: string;
  time: string;
  teacher?: { name: string };
}

interface Fee {
  _id: string;
  student?: { name: string };
  amount: number;
  dueDate: string;
  status: string;
}

interface Result {
  _id: string;
  student?: { name: string };
  subject: string;
  marks: number;
  examType: string;
}

interface SystemHealth {
  status: string;
  uptime: string;
  database: string;
  memory?: { rss: number };
  timestamp: string;
}

interface Api {
  get: (endpoint: string) => Promise<ApiResponse<any>>;
  put: (endpoint: string, data?: any) => Promise<ApiResponse<any>>;
  delete: (endpoint: string) => Promise<ApiResponse<any>>;
  getUsers: (params?: any) => Promise<ApiResponse<User[]>>;
  getTimetable: (params?: any) => Promise<ApiResponse<TimetableEntry[]>>;
  getFees: (params?: any) => Promise<ApiResponse<Fee[]>>;
  getResults: (params?: any) => Promise<ApiResponse<Result[]>>;
  getSystemHealth: () => Promise<ApiResponse<SystemHealth>>;
  getActivityLogs: () => Promise<ApiResponse<any>>;
  getAdvancedReports: () => Promise<ApiResponse<any>>;
}

declare const api: Api;
export default api;
