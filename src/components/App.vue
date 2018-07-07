<template>
<div>
    <div id="header">
        <div>
            <h1>
                <img src="../assets/logo.png" width="50px" height="50px" alt="Logo">
                Vue.js Calendar <small>Matt Edition</small>
            </h1>
        </div>
        <div>
            <current-month></current-month>
        </div>
    </div>
    <div id="day-bar">
        <div v-for="day in dayBar" :key="day">{{ day }}</div>
    </div>
    <div id="calendar">
        <div v-for="week in weeks" :key="week" class="calendar-week">
            <calendar-day v-for="day in week" 
                          :key="day"
                          :day="day">
            </calendar-day>
        </div>
    </div>
    <event-form></event-form>
</div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue"
import CurrentMonth from "./CurrentMonth.vue"
import EventForm from "./EventForm.vue"

export default {
    data() {
        return {
            dayBar: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    },
    methods: {
        isToday(day) {
            return day.isSame(this.today, 'days')
        }
    },
    computed: {
        current() {
            return this.$store.state.currentMonth
        },
        days() {
            let days = [],
                currentDay = this.$moment(this.current)

            const MONDAY = 1,
                  SUNDAY = 0,
                  month = this.$moment(this.current)

            //get days in the curent month
            while(currentDay.month() === month.month()) {
                days.push(currentDay)
                currentDay = this.$moment(currentDay).add(1, 'days')
            }

            //prepend days from previous month to MONDAY
            currentDay = this.$moment(days[0])
            while(currentDay.day() !== MONDAY) {
                currentDay = this.$moment(currentDay).subtract(1, 'days')
                days.unshift(currentDay)
            }
            
            //append days from next month to SUNDAY
            currentDay = this.$moment(days[days.length - 1])
            while(currentDay.day() !== SUNDAY) {
                currentDay = this.$moment(currentDay).add(1, 'days')
                days.push(currentDay)
            }
            
            return days
        },
        weeks() {
            let weeks = [], 
                days = this.days.splice(0)
    
            while (days.length) {
                weeks.push(days.splice(0, 7))
            }
    
            return weeks;
        },
    },
    components: {
        CalendarDay,
        CurrentMonth,
        EventForm
    }
}
</script>

<style scoped>
    #header small {
        opacity: .3;
        font-size: 0.875rem;
    }
</style>
