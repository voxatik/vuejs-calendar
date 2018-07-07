<template>
    <div @click="captureClick"
         :class="getClasses">{{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events"
                :key="event.id"
            >{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['day'],
    methods: {
        captureClick(e) {
            this.$store.commit('setEventFormPos', {x: e.clientX, y: e.clientY})
            this.$store.commit('setEventFormActive', true)
            this.$store.commit('setSelectedDay', this.day)
        }
    },
    computed: {
        getClasses() {
            let currentDay = this.$moment(),
                today = this.day.isSame(currentDay, 'day'),
                formActive = this.$store.state.eventFormActive
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(currentDay, 'day') && ! today,
                active:this.$store.state.selectedDay.isSame(this.day) && formActive ,
                'not-current-month': ! this.day.isSame(this.current, 'month') 
            }
        },
        current() {
            return this.$moment(this.$store.state.currentMonth)
        },
        events() {
            return this.$store.state.events.filter(event => this.day.isSame(this.$moment(event.date)))
        }
    }
    

}
</script>

