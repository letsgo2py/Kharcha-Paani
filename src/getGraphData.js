function getGraphData(allData, filter){
    console.log("All data: ", allData)
    let formattedData = [];

    if(filter === 'Last 30 Days'){
        const today = new Date();
        const dates = [];
        
        // Step 1: 30 days dates
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const isoDate = d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            dates.push(isoDate);
        }

        // Step 2: Create a map for daily totals
        const netIncomeByDate = {};
        dates.forEach(date => {
            netIncomeByDate[date] = 0;
        });

        // Step - 3
        allData.forEach(entry => {
            const entryDate = new Date(entry.date).toISOString().split('T')[0];
            if (netIncomeByDate.hasOwnProperty(entryDate)) {
            const amount = entry.type === 'income' ? entry.amount : -entry.amount;
            netIncomeByDate[entryDate] += amount;
            }
        });

        // Step 4: Format for charting
        formattedData = dates.map(date => ({
            date,
            income: netIncomeByDate[date],
        }));
    }
    
    else if(filter === 'Last 6 months'){
        console.log("Months called")
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const monthKeys = [];

        // Step 1: Generate last 6 month keys like "Jan 2025"
        for (let i = 5; i >= 0; i--) {
            const d = new Date(currentYear, currentMonth - i, 1);
            const month = d.toLocaleString('default', { month: 'short' });
            const year = d.getFullYear();
            monthKeys.push(`${month} ${year}`);
        }

        const netIncomeByMonth = {};
        monthKeys.forEach(key => {
            netIncomeByMonth[key] = 0;
        });

        allData.forEach(entry => {
        const date = new Date(entry.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (netIncomeByMonth.hasOwnProperty(key)) {
            const amount = entry.type === 'income' ? entry.amount : -entry.amount;
            netIncomeByMonth[key] += amount;
        }
        });

        formattedData = monthKeys.map(key => ({
            month: key,
            income: netIncomeByMonth[key],
        }));
    }
    
    else if(filter === 'This year'){
        const currentYear = new Date().getFullYear();

        const netIncomeByMonth = {};
        const monthKeys = [];

        for (let i = 0; i < 12; i++) {
            const month = new Date(currentYear, i, 1).toLocaleString('default', { month: 'short' });
            const key = `${month} ${currentYear}`;
            monthKeys.push(key);
            netIncomeByMonth[key] = 0;
        }

        allData.forEach(entry => {
            const date = new Date(entry.date);
            const year = date.getFullYear();
            if (year === currentYear) {
                const month = date.toLocaleString('default', { month: 'short' });
                const key = `${month} ${year}`;
                if (netIncomeByMonth.hasOwnProperty(key)) {
                    const amount = entry.type === 'income' ? entry.amount : -entry.amount;
                    netIncomeByMonth[key] += amount;
                }
            }
        });

        formattedData = monthKeys.map(key => ({
            month: key,
            income: netIncomeByMonth[key],
        }));
    }

    else if(filter === 'Last year'){
        const lastYear = new Date().getFullYear() - 1;

        const netIncomeByMonth = {};
        const monthKeys = [];

        for (let i = 0; i < 12; i++) {
            const month = new Date(lastYear, i, 1).toLocaleString('default', { month: 'short' });
            const key = `${month} ${lastYear}`;
            monthKeys.push(key);
            netIncomeByMonth[key] = 0;
        }

        allData.forEach(entry => {
            const date = new Date(entry.date);
            const year = date.getFullYear();
            if (year === lastYear) {
                const month = date.toLocaleString('default', { month: 'short' });
                const key = `${month} ${year}`;
                if (netIncomeByMonth.hasOwnProperty(key)) {
                    const amount = entry.type === 'income' ? entry.amount : -entry.amount;
                    netIncomeByMonth[key] += amount;
                }
            }
        });

        formattedData = monthKeys.map(key => ({
            month: key,
            income: netIncomeByMonth[key],
        }));
    }

    return formattedData;
}

export default getGraphData