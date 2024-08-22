import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { IPayment, queryPayments } from "../../api/client";
import { useGlobalContext } from "../../context/GlobalContext";

export const MonthlyBarChart = () => {
  const { companies, shops } = useGlobalContext();

  // Fetch payments data
  const {
    data: paymentsData,
    isLoading,
    isError,
  } = useQuery("all-payments", () => queryPayments({}));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading payments.</p>;

  console.log("Payments Data:", paymentsData);

  const payments: IPayment[] = paymentsData ? paymentsData.payments : [];

  const companyPayments = companies.map((company) => {
    const companyPayments = payments.filter(
      (payment) => payment.company._id === company._id
    );

    const totalPayment = companyPayments.reduce(
      (sum, payment) => sum + payment.totalAmount,
      0
    );
    const paidPayment = companyPayments.reduce(
      (sum, payment) => sum + payment.paidAmount,
      0
    );
    const duePayment = companyPayments.reduce(
      (sum, payment) => sum + (payment.totalAmount - payment.paidAmount),
      0
    );

    return {
      companyName: company.name,
      totalPayment,
      paidPayment,
      duePayment,
    };
  });

  console.log("Company Payments:", companyPayments);

  const labels = companyPayments.map((company) => company.companyName);
  const totalPayments = companyPayments.map((company) => company.totalPayment);
  const paidPayments = companyPayments.map((company) => company.paidPayment);
  const duePayments = companyPayments.map((company) => company.duePayment);

  const monthlyBarChartData = {
    labels,
    datasets: [
      {
        label: "Total Payment",
        data: totalPayments,
        backgroundColor: "rgba(79, 195, 247, 0.9)",
        borderColor: "rgba(79, 195, 247, 1)",
        borderWidth: 1,
      },
      {
        label: "Paid Payment",
        data: paidPayments,
        backgroundColor: "rgba(54, 162, 235, 0.9)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Due Payment",
        data: duePayments,
        backgroundColor: "rgba(255, 206, 86, 0.9)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Payment",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return <Bar options={options} data={monthlyBarChartData} />;
};

export default MonthlyBarChart;
