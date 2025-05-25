import type { Report } from "@project/components";
import { authNetService } from "../network-service";

const baseUrl = "/reports";

const ReportsUrls = {
  templates: `${baseUrl}/templates`,
  generate: `${baseUrl}/generate`,
  detailed: `${baseUrl}/detailed`,
  download: (id: string | number) => `${baseUrl}/download/${id}`,
};

const get = async (url: string) => {
  return authNetService.get(url).then((response) => response.data);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const post = async (url: string, data: any) => {
  return authNetService.post(url, data).then((response) => response.data);
};

export interface ReportTemplate {
  id: number;
  name: string;
  description?: string;
}

export interface ReportRequest {
  template_id: number;
  period_start: string; // ISO format date "YYYY-MM-DD"
  period_end: string;
  user_id: number; // ISO format date "YYYY-MM-DD"
  filters: {
    investment_type?: string;
    // Add other filter options as needed
  };
}

export default {
  getTemplates: (): Promise<ReportTemplate[]> => get(ReportsUrls.templates),
  generateReport: (data: ReportRequest): Promise<Report> =>
    post(ReportsUrls.generate, data),
  downloadReport: async (id: number): Promise<{ download_url: string }> => {
    return authNetService
      .get(ReportsUrls.download(id))
      .then((response) => response.data);
  },
  detailedReport: (data: ReportRequest) => post(ReportsUrls.detailed, data),
};
