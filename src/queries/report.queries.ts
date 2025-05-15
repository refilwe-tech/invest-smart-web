import { financialService, reportService } from "@project/services";
import { useQuery, useMutation } from "@tanstack/react-query";
import config from '../../config';
const { hostUrl } = config;
const baseUrl = hostUrl.replace("api", "reports");
export const useInvestmentGoals = () => {
  return useQuery({
    queryKey: ["investmentGoals"],
    queryFn: financialService.getInvestmentGoals,
  });
};

export const useReportTemplates = () => {
  return useQuery({
    queryKey: ["reportTemplates"],
    queryFn: reportService.getTemplates,
    onSuccess: (data) => {
      // You can add any success handling here
    },
  });
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: reportService.generateReport,
    onSuccess: (data) => {
      // You can add any success handling here
    },
  });
};

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: reportService.downloadReport,
    onSuccess: (data) => {
      if (data?.download_url) {
        // Create a hidden anchor element
        const link = document.createElement("a");
        link.href = `${baseUrl}.${data.download_url}.pdf`;
        console.log(`${baseUrl}.${data.download_url}.pdf`)
        // Suggest a filename for the download
        link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.pdf`;

        // Append to the DOM (required for Firefox)
        document.body.appendChild(link);

        // Trigger the click
        link.click();

        // Clean up
        document.body.removeChild(link);
      }
    },
  });
};

export const useDetailedReport = () => {
  return useMutation({
    mutationFn: reportService.detailedReport,
    onSuccess: (data) => {
      console.log(data)
      // You can add any success handling here
    },
  });
};
