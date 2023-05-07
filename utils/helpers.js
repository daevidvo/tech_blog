module.exports = {
    createdOnDate(){
        const currentDate = new Date()
        const day = currentDate.getDate()
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        return `${month}/${day}/${year}`
    },
}