class CalendarService {
    constructor() {
        this.weekDays = [
            this.weekDay(1, "Sunday", "Sun", "S", true),
            this.weekDay(2, "Monday", "Mon", "M"),
            this.weekDay(3, "Tuesday", "Tue", "T"),
            this.weekDay(4, "Wednesdau", "Wed", "W"),
            this.weekDay(5, "Thursday", "Thu", "T"),
            this.weekDay(6, "Friday", "Fri", "F"),
            this.weekDay(7, "Saturday", "Sat", "S", true)
        ];
    
        this.months = [
            this.month(1, "January", "Jan"),
            this.month(2, "February", "Feb"),
            this.month(3, "March", "Mar"),
            this.month(4, "April", "Apr"),
            this.month(5, "May", "May"),
            this.month(6, "June", "Jun"),
            this.month(7, "July", "Jul"),
            this.month(8, "August", "Aug"),
            this.month(9, "September", "Sep"),
            this.month(10, "October", "Oct"),
            this.month(11, "November", "Nov"),
            this.month(12, "December", "Dec")
        ];
    }

    weekDay(index, fullName, threeLetter, singleLetter, isWeekend) {
        return {
            index: index,
            fullName: fullName,
            threeLetter: threeLetter,
            singleLetter: singleLetter,
            isWeekend: !!isWeekend
        }
    }

    month(index, fullName, threeLetter) {
        return {
            index: index,
            fullName: fullName,
            threeLetter: threeLetter
        }
    }

    getDaysInMonth(year, month) {
        return 32 - new Date(year, month - 1, 32).getDate();
    }

    isToday(date) {
        const today = new Date();
        return date.getFullYear() === today.getFullYear()
            &&
            date.getMonth() === today.getMonth()
            &&
            date.getDate() === today.getDate();
    }

    getDateInfo(date) {
        const dayInfo = {
            year: date.getFullYear(),
            month: this.months[date.getMonth()],
            day: date.getDate(),
            weekDay: this.weekDays[date.getDay()],
            date: date
        };

        dayInfo.isToday = this.isToday(date);
        return dayInfo;
    }

    getToday() {
        return this.getDateInfo(new Date());
    }

    getMonth(year, month) {
        return new Promise(resolve => {
            const days = [];
            for (let day = 1; day <= this.getDaysInMonth(year, month); day++) {
                days.push(this.getDateInfo(new Date(year, month - 1, day)))
            }
            resolve({
                info: this.months[month - 1],
                days: days
            });
        });
    }

    getYear(year) {
        return new Promise(resolve => {
            const monthPromises = [];
            for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                monthPromises.push(this.getMonth(year, monthIndex + 1));
            }
            resolve(monthPromises);
        });
    }
}

window.services.calendar = new CalendarService();
// (function () {
//     function calendarService() {
//         function weekDay(index, fullName, threeLetter, singleLetter, isWeekend) {
//             return {
//                 index: index,
//                 fullName: fullName,
//                 threeLetter: threeLetter,
//                 singleLetter: singleLetter,
//                 isWeekend: !!isWeekend
//             }
//         }

//         function month(index, fullName, threeLetter) {
//             return {
//                 index: index,
//                 fullName: fullName,
//                 threeLetter: threeLetter
//             }
//         }

//         const weekDays = [
//             weekDay(1, "Sunday", "Sun", "S", true),
//             weekDay(2, "Monday", "Mon", "M"),
//             weekDay(3, "Tuesday", "Tue", "T"),
//             weekDay(4, "Wednesdau", "Wed", "W"),
//             weekDay(5, "Thursday", "Thu", "T"),
//             weekDay(6, "Friday", "Fri", "F"),
//             weekDay(7, "Saturday", "Sat", "S", true)
//         ];

//         const months = [
//             month(1, "January", "Jan"),
//             month(2, "February", "Feb"),
//             month(3, "March", "Mar"),
//             month(4, "April", "Apr"),
//             month(5, "May", "May"),
//             month(6, "June", "Jun"),
//             month(7, "July", "Jul"),
//             month(8, "August", "Aug"),
//             month(9, "September", "Sep"),
//             month(10, "October", "Oct"),
//             month(11, "November", "Nov"),
//             month(12, "December", "Dec")
//         ];

//         function getDaysInMonth(year, month) {
//             return 32 - new Date(year, month - 1, 32).getDate();
//         }

//         this.isToday = function (date) {
//             const today = new Date();
//             return date.getFullYear() === today.getFullYear()
//                 &&
//                 date.getMonth() === today.getMonth()
//                 &&
//                 date.getDate() === today.getDate();
//         }

//         this.getDateInfo = function (date) {
//             const dayInfo = {
//                 year: date.getFullYear(),
//                 month: months[date.getMonth()],
//                 day: date.getDate(),
//                 weekDay: weekDays[date.getDay()],
//                 date: date
//             };

//             dayInfo.isToday = this.isToday(date);
//             return dayInfo;
//         }

//         this.weekDays = weekDays;

//         this.getToday = function () {
//             return this.getDateInfo(new Date());
//         }

//         this.getMonth = function (year, month) {
//             return new Promise(resolve => {
//                 const days = [];
//                 for (let day = 1; day <= getDaysInMonth(year, month); day++) {
//                     days.push(this.getDateInfo(new Date(year, month - 1, day)))
//                 }
//                 resolve({
//                     info: months[month - 1],
//                     days: days
//                 });
//             });
//         }

//         this.getYear = function (year) {
//             return new Promise(resolve => {
//                 const monthPromises = [];
//                 for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
//                     monthPromises.push(this.getMonth(year, monthIndex + 1));
//                 }
//                 resolve(monthPromises);
//             });
//         }
//     }

//     window.services.calendar = new calendarService();
// })();