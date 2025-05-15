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
import {
  useDownloadReport,
  useGenerateReport,
  useInvestmentGoals,
} from "@project/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@project/components/ui/table";
import { useUserStore } from "@project/store";
import config from '../../../../config';
const { hostUrl } = config;
const baseUrl = hostUrl.replace("/api", "");

export const UserReportPage = () => {
  useDocumentTitle("User Report");
  const {user} = useUserStore()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedGoal, setSelectedGoal] = useState<number>(1);

  // Fetch available investment goals
  const { data: goalsData, isLoading: goalsLoading } = useInvestmentGoals();

  // Report generation
  const { mutate: generateReport, isPending: isGenerating } =
    useGenerateReport();
  const { mutate: downloadReport, isPending: isDownloading } =
    useDownloadReport();

  // Sample report data - replace with actual data from your API
  const [reportData, setReportData] = useState<any>(null);

  const handleGenerateReport = () => {
    generateReport(
      {
        template_id: 2, // Assuming 2 is the user detailed report
        user_id: Number(user?.id), // Replace with actual user ID
        period_start: dateRange.from?.toISOString() || new Date().toISOString(),
        period_end: dateRange.to?.toISOString() || new Date().toISOString(),
        filters: {},
      },
      {
        onSuccess: (data) => {
          setReportData(data);
        },
      }
    );
  };

  const handleDownloadReport = () => {
    if (reportData?.download_url) {
        // Create a hidden anchor element
        const link = document.createElement("a");
        link.href = `${baseUrl}${reportData.download_url}`;
        link.target = '_blank'
        console.log(`${baseUrl}${reportData.download_url}`)
        // Suggest a filename for the download
        link.download = `financial-report-${new Date().toISOString().slice(0, 10)}.pdf`;

        // Append to the DOM (required for Firefox)
        document.body.appendChild(link);

        // Trigger the click
        link.click();
  };
}

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading heading="User Report" />
            <p className="text-sm text-muted-foreground">
              Check your data and see how your finances are set up
            </p>
          </div>
          <Button
            onClick={handleDownloadReport}
            disabled={!reportData || isDownloading}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Range Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
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

              {/* Generate Report Button */}
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

        {/* Report Display Section */}
        {reportData && (
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Report</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Financial Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Financial Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Net Salary</p>
                    <p className="text-xl font-semibold">
                      R
                      {reportData.user_finances?.net_salary?.toLocaleString() ||
                        "0.00"}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Monthly Expenses
                    </p>
                    <p className="text-xl font-semibold">
                      R
                      {reportData.user_finances?.monthly_expenses?.toLocaleString() ||
                        "0.00"}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Current Savings
                    </p>
                    <p className="text-xl font-semibold">
                      R
                      {reportData.user_finances?.current_savings?.toLocaleString() ||
                        "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Investment Portfolio */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Investment Portfolio
                </h3>
                {reportData.user_investments?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Investment</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Risk Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.user_investments.map((investment: any) => (
                        <TableRow key={investment.investment_id}>
                          <TableCell>{investment.investment_name}</TableCell>
                          <TableCell>{investment.type_name}</TableCell>
                          <TableCell>
                            ${investment.amount?.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                investment.risk_level === "High"
                                  ? "bg-red-100 text-red-800"
                                  : investment.risk_level === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {investment.risk_level}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No investments found</p>
                )}
              </div>

              {/* Recommendations */}
              {reportData.recommendations?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {reportData.recommendations.map(
                      (rec: any, index: number) => (
                        <div
                          key={rec.title}
                          className="border-l-4 border-primary pl-4 py-2"
                        >
                          <h4 className="font-medium">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {rec.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};
