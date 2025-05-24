import { financialService, reportService } from "@project/services";
import { useQuery, useMutation } from "@tanstack/react-query";
import config from "../../config";
import toast from "react-hot-toast";
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
  });
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: reportService.generateReport,
    onSuccess: () => {
      toast.success("Report generated successfully!");
    },
  });
};

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: reportService.downloadReport,
    onSuccess: (data) => {
      if (data?.download_url) {
        const link = document.createElement("a");
        link.href = `${baseUrl}.${data?.download_url}.pdf`;
        link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
  });
};

export const useDetailedReport = () => {
  return useMutation({
    mutationFn: reportService.detailedReport,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
