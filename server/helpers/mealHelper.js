const mealHelper ={
    getWeekStart(){
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - currentDate.getDay() -1 );
        startDate.setUTCHours(0,0,0,0);
        return startDate;
    },
    getWeekEnd(startDate){
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 8);
        return endDate;
    }
}

module.exports = mealHelper;