
import { financialService, reportService } from "@project/services";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useInvestmentGoals = () => {
  return useQuery({
      queryKey: ["investmentGoals"],
      queryFn: financialService.getInvestmentGoals,
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
      // Trigger download automatically when successful
      if (data?.download_url) {
        window.open(data.download_url, '_blank');
      }
    },
  });
};