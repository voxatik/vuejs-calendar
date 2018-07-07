<template>
    <div id="event-form" :class="{active: active}" :style="currentPos">
        <h4>Add event:</h4>
        <p>{{ eventDay }}</p>
        <div class="text">
            <input v-focus 
                   id="event-input" 
                   @keyup.enter="create"
                   type="text" 
                   v-model="event"
            />
        </div>
        <div class="buttons">
            <button @click="create">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005;</button>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$store.commit('setEventFormActive', false)
        },
        create() {
            let payload = {
                description: this.event, 
                date: this.selectedDay.format('YYYY-MM-DD')
            }
            this.$store.commit('addEvent', payload)
            this.close()
            this.event = ''
        }
    },
    data() {
        return {
            event: ''
        }
    },
    computed: {
        active() {
            return this.$store.state.eventFormActive
        },
        currentPos() {
            const pos = this.$store.state.eventFormPos
            return {
                top: `${pos.y}px`,
                left: `${pos.x}px`
            }
        },
        selectedDay() {
            return this.$store.state.selectedDay
        },
        eventDay() {
            if(! this.selectedDay)
                return

            return this.selectedDay.format('dddd, MMMM Do')
        }
    },
    directives: {
        focus:{
            update(el) {
                el.focus()
            }
        }
    }
}
</script>
