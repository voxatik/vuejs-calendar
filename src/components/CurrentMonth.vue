<template>
    <div>
        <div>{{ formattedDate }}</div>
        <button @click="inc">+</button>
        <button @click="dec">-</button>
    </div>
</template>

<script>
export default {
    methods: {
        inc() {
            this.$store.commit('changeMonth', {inc: true, moment: this.$moment})
        },
        dec() {
            this.$store.commit('changeMonth', {inc: false, moment: this.$moment})
        }
    },
    computed: {
        formattedDate() {
            return this.$moment(this.current).format('MMMM YYYY')
        },
        current() {
            return this.$store.state.currentMonth
        }
    }
}
</script>
