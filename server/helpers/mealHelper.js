const mealHelper ={
    getWeekStart(){
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - currentDate.getDay());
        return startDate;
    },
    getWeekEnd(startDate){
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        return endDate;
    }
}

module.exports = mealHelper;