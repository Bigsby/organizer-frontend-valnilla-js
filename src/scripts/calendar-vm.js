class calendar extends vm {
    constructor(container, services) {
        super(container, services);
        this.service = this.getService("calendar");
        this.monthsContainer = this.getElement("#monthsContainer");
    }

    async getDayTemplate(dayText, css) {
        const dayTemplate = await this.getTemplate("calendar-day");
        if (dayText) {
            const dayItem = dayTemplate.querySelector(".day");
            dayItem.innerText = dayText;
            if (css) {
                if (Array.isArray(css)) {
                    css.forEach(c => dayItem.classList.add(c));
                } else if (typeof css === "string") {
                    dayItem.classList.add(css);
                }
            }
        }
        
        return dayTemplate;
    }

    async getMonthTemplate(month) {
            const monthTemplate = await this.getTemplate("calendar-month");
            monthTemplate.querySelector(".monthName").innerText = month.info.fullName;
            const daysContainer = monthTemplate.querySelector(".weeksContainer");
            const weekDaysContainer = monthTemplate.querySelector(".weekDaysContainer");

            for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
                for (let weekDayIndex = 0; weekDayIndex < this.service.weekDays.length; weekDayIndex++) {
                    const weekDay = this.service.weekDays[weekDayIndex];
                    const cssClasses = ["week"];
                    if (weekDay.isWeekend) {
                        cssClasses.push("weekend");
                    }
                    weekDaysContainer.appendChild(await this.getDayTemplate(weekDay.singleLetter, cssClasses));
                }
            }

            for (let dayIndex = 0; dayIndex < month.days[0].weekDay.index - 1; dayIndex++) {
                daysContainer.appendChild(await this.getDayTemplate());
            }

            for (let dayIndex = 0; dayIndex < month.days.length; dayIndex++) {
                const day = month.days[dayIndex];
                const cssClasses = [];
                if (day.isToday) {
                    cssClasses.push("today");
                }
                if (day.weekDay.isWeekend) {
                    cssClasses.push("weekend");
                }
                daysContainer.appendChild(await this.getDayTemplate(day.day, cssClasses));
            }
        return monthTemplate;
    }

    async innerInitialize() {
        const today = this.service.getToday();
        this.getElement("#todayContainer").innerText = `${today.year} ${today.month.fullName} ${today.day} ${today.weekDay.fullName}`;
        const months = await this.service.getYear(today.year);

        for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
            this.monthsContainer.appendChild(await this.getMonthTemplate(await months[monthIndex]));
        }
    }
}