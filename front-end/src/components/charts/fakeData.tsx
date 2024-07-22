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

export const pieChartData = {
    labels: ["First Zone", "Second Zone", "Third Zone", "Fourth Zone"],
    datasets: [
        {
            label: "Payment",
            data: [120, 60, 50, 20],
            backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(75, 192, 255, 0.9)",
            ],
            hoverOffSet: 4,
        },
    ],
};