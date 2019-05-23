export default  class Bar{
    getDate(){
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours();
        let minu =date.getMinutes();
        let sec =date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (minu >= 0 && minu <= 9) {
            minu = "0" + minu;
        }
        if (sec >= 0 && sec <= 9) {
            sec = "0" + sec;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minu + seperator2 + sec;
        return currentdate;
    }
}