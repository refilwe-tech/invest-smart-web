import { useState } from "react";
import { useDocumentTitle } from "@project/hooks";
import { Heading } from "@project/components";
import { PageLayout } from "@project/components/layouts";
import { Button } from "@project/components/ui/button";
import { Calendar } from "@project/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@project/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@project/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@project/components/ui/card";
import { useGenerateReport } from "@project/queries";
import { useUserStore } from "@project/store";
import config from "../../../../config";
const { hostUrl } = config;
const baseUrl = hostUrl.replace("/api", "");

export type Investment = {
  investment_id: number;
  investment_name: string;
  type_name: string;
  amount: number;
  risk_level: "Low" | "Medium" | "High";
};

export type Recommendation = {
  title: string;
  description: string;
};

export type Report = {
  download_url?: string;
  user_finances?: {
    net_salary?: number;
    monthly_expenses?: number;
    current_savings?: number;
  };
  user_investments?: Array<Investment>;
  recommendations?: Array<Recommendation>;
} | null;

export const UserReportPage = () => {
  useDocumentTitle("User Report");
  const { user } = useUserStore();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const { mutate: generateReport, isPending: isGenerating } =
    useGenerateReport();

  const [reportData, setReportData] = useState<Report>(null);

  const handleGenerateReport = () => {
    generateReport(
      {
        template_id: 2,
        user_id: Number(user?.id),
        period_start: dateRange.from?.toISOString() || new Date().toISOString(),
        period_end: dateRange.to?.toISOString() || new Date().toISOString(),
        filters: {},
      },
      {
        onSuccess: (data: Report) => {
          setReportData(data);
        },
      }
    );
  };

  const handleDownloadReport = () => {
    if (reportData?.download_url) {
      const link = document.createElement("a");
      link.href = `${baseUrl}${reportData.download_url}`;
      link.target = "_blank";
      link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <PageLayout>
      <Heading heading="Financials Report" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Check your data and see how your finances are set up
            </p>
          </div>
          <Button onClick={handleDownloadReport} disabled={!reportData}>
            {"Download PDF"}
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Date Range</p>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from
                          ? format(dateRange.from, "PPP")
                          : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) =>
                          setDateRange((prev) => ({ ...prev, from: date }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) =>
                          setDateRange((prev) => ({ ...prev, to: date }))
                        }
                        initialFocus
                        disabled={(date) =>
                          dateRange.from ? date < dateRange.from : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleGenerateReport}
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {reportData && (
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Report Has Been Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-4">
                  You can download your Financial report.
                </h3>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};
