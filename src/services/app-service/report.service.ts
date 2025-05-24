import axios from "axios";
import config from "../../../config";

const { hostUrl } = config;
const baseUrl = `${hostUrl}/reports`;

const ReportsUrls = {
  templates: `${baseUrl}/templates`,
  generate: `${baseUrl}/generate`,
  detailed: `${baseUrl}/detailed`,
  download: (id: string | number) => `${baseUrl}/download/${id}`,
};

const get = (url: string) => {
  return axios
    .get(url, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.data);
};

const post = (url: string, data: any) => {
  return axios
    .post(url, data, {
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export interface ReportTemplate {
  id: number;
  name: string;
  description?: string;
  // Add other template properties as needed
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
  // Get all available report templates for the user's role
  getTemplates: (): Promise<ReportTemplate[]> => get(ReportsUrls.templates),

  // Generate a new report
  generateReport: (data: ReportRequest): Promise<{ report_id: number }> =>
    post(ReportsUrls.generate, data),

  // Download a generated report
  downloadReport: (id: number): Promise<{ download_url: string }> => {
    return axios
      .get(ReportsUrls.download(id), {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => response.data);
  },

  detailedReport: (data: ReportRequest) => post(ReportsUrls.detailed, data),
};
