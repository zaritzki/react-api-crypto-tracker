export const  HistoryOptions = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 4,
    },
    
    animation: {
        duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [
            {
                type: "time",
                distribution: "linear",
            },
        ],
        x: {
            grid: {
                color: '#333',
                borderColor: '#333'
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#333',
                borderColor: '#333'
            }
        }
    }
};