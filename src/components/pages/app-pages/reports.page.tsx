import { Button, Heading } from "@project/components/common";
import { PageLayout } from "@project/components/layouts";
import { useDocumentTitle } from "@project/hooks";
import { useDetailedReport } from "@project/queries";

export const ReportsPage = () => {
    useDocumentTitle('Detailed Report');
    const {mutateAsync: detailedReportAsyn} = useDetailedReport();
    const handleDetailedReport = async () => {
        try {
            const response = await detailedReportAsyn({
                template_id: 1,
                period_start: "2023-01-01",
                period_end: "2023-12-31",
                user_id: 1,
                filters: {
                    investment_type: "stocks",
                },
            });
            console.log(response);
        } catch (error) {
            console.error("Error generating detailed report:", error);
        }
    };

    return (
        <PageLayout>
            <Heading heading="Reports" />
        <p className="text-xs font-semibold">Here's a Detailed Report for InvestSmart</p>
        <Button variant="solid" onClick={handleDetailedReport}>Generate Report</Button>
        </PageLayout>
    );
    }