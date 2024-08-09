import { useGlobalContext } from "../../context/GlobalContext";
import { queryPayments, IPayment } from "../../api/client";
import { useEffect, useState } from "react";

export const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ], //x - axis
    datasets: [
        {
            label: "Method",
            data: [3000, 5000, 4000, 6000, 8000, 7000, 9000], //y - axis
            borderColor: "rgb(75, 192, 192)",
        },
        {
            label: "Steps",
            data: [3000, 2000, 5000, 4000, 6000, 9000, 7000], //y - axis
            borderColor: "red",
        },
    ],
};

export const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    datasets: [
        {
            label: "Total Payment",
            data: [430, 500, 400, 520, 220, 400, 200, 430, 500, 400, 520, 220],
            backgroundColor: [
                "rgba(79, 195, 247, 0.9)",
            ],
            borderColor: [
                "rgba(79, 195, 247, 1)"
            ],
            borderWidth: 1,
        },
        {
            label: "Paid",
            data: [310, 250, 370, 450, 200, 360, 390, 430, 500, 400, 520, 220],
            backgroundColor: [
                "rgba(54, 162, 235, 0.9)",
            ],
            borderColor: [
                "rgba(54, 162, 235, 1)"
            ],
            borderWidth: 1,
        },
        {
            label: "Due",
            data: [320, 450, 360, 500, 180, 370, 170, 430, 500, 400, 520, 220],
            backgroundColor: [
                "rgba(255, 206, 86, 0.9)",
            ],
            borderColor: [
                "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1,
        },
    ],
};

export const monthlyBarChartData = {
    labels: ["ABC", "Adrian", "ASD", "CGS", "FRS", "FSD", "HIJ", "IJK", "JKN"],
    datasets: [
        {
            label: "Total Payment",
            data: [430, 500, 400, 520, 220, 400, 200, 430, 500],
            backgroundColor: [
                "rgba(79, 195, 247, 0.9)",
            ],
            borderColor: [
                "rgba(79, 195, 247, 1)"
            ],
            borderWidth: 1,
        },
        {
            label: "Paid",
            data: [310, 250, 370, 450, 200, 360, 390, 430, 500],
            backgroundColor: [
                "rgba(54, 162, 235, 0.9)",
            ],
            borderColor: [
                "rgba(54, 162, 235, 1)"
            ],
            borderWidth: 1,
        },
        {
            label: "Due",
            data: [320, 450, 360, 500, 180, 370, 170, 430, 500],
            backgroundColor: [
                "rgba(255, 206, 86, 0.9)",
            ],
            borderColor: [
                "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1,
        },
    ],
};

// const MyComponent = () => {

//   const [payments, setPayments] = useState<IPayment[]>([]);
//     const [areas, setAreas] = useState([]);
  
//     useEffect(() => {
//       // Fetch all payments data
//       const fetchPayments = async () => {
//         try {
//           const { payments } = await queryPayments({});
//           setPayments(payments);
//         } catch (error) {
//           console.error("Error fetching payments:", error);
//         }
//       };
  
//       fetchPayments();
//     }, []);
  
//     // Aggregate payments by area
//     const paymentDataByArea = payments.reduce((acc, payment) => {
//       const areaName = payment.area.name;
//       if (!acc[areaName]) {
//         acc[areaName] = 0;
//       }
//       acc[areaName] += payment.totalAmount;
//       return acc;
//     }, {}as { [key: string]: number });
  
//     const areaNames = Object.keys(paymentDataByArea);
//     const paymentData = Object.values(paymentDataByArea);
  
//     const pieChartData = {
//       labels: areaNames,
//       datasets: [
//         {
//           label: "Total Payment",
//           data: paymentData,
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.9)",
//             "rgba(255, 206, 86, 0.9)",
//             "rgba(153, 102, 255, 0.9)",
//             "rgba(75, 192, 255, 0.9)",
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };
// }