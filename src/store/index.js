import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentMonth: '',
        eventFormPos: {
            x: 0, y: 0
        },
        eventFormActive: false,
        events: [
            {id: 1, description: 'Event 1', date: '2018-07-02'},
            {id: 2, description: 'Event 2', date: '2018-07-04'},
            {id: 3, description: 'Event 3', date: '2018-07-04'},
            {id: 4, description: 'Event 4', date: '2018-07-06'},
            {id: 5, description: 'Event 5', date: '2018-07-09'},
        ],
        selectedDay: ''
    },
    mutations: {
        addEvent(state, event) {
            event.id = state.events[state.events.length - 1].id + 1
            state.events.push(event)
        },
        setCurrentMonth(state, date) {
            state.currentMonth = date
        },
        setEventFormActive(state, active) {
            state.eventFormActive = active
        },
        setEventFormPos(state, pos) {
            state.eventFormPos = pos
        },
        setSelectedDay(state, day) {
            state.selectedDay = day
        },
        changeMonth(state, {inc, moment}) {
            let date = moment(state.currentMonth)
            if(inc) {
                date.add(1, 'month')
            } else {
                date.subtract(1, 'month')
            }
            
            state.eventFormActive = false
            state.currentMonth = date.format('YYYY-MM-DD')
        }
    }
})
