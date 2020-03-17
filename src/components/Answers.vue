<template>
    <div class="container">
        <div id="answers">
            <ul>
                <li v-for="(value, index) in questions" :key="index"> 
                    <p><span id="que">QUESTION:</span> {{ value.question }}</p>
                    <p><span id="ans">ANSWER:</span> {{ value.correctAnswer }}</p>
                </li>
            </ul>
            <button class="btn btn-primary" @click="restart">TAKE ANOTHER QUIZ</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Answers',
    computed: {
        questions() {
            return this.$store.state.apiData
        }
    },
    methods: {

        // Restart Quiz and reset all values to the initial state
        restart() {
            this.$store.state.apiData = []
            this.$store.state.numberOfQuestions = null
            this.$store.state.category = null
            this.$store.state.difficulty = null
            this.$store.state.result = null
            this.$store.state.numberOfQuestionsAnswered = null
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
li {
    font-size: 20px;
    font-family: cursive, Helvetica, Arial, sans-serif;
    list-style-type: none;
}

#answers {
    width: 60rem;
    background-color: whitesmoke;
    margin-left: 5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 2rem;
    box-shadow: 1px 2px 2vmin grey;
}

button {
    margin-left: 25rem;
    margin-bottom: 1rem;
    height: 45px;
}

#que {
    display: inline-block;
    color: rgb(136, 27, 27);
}

#ans {
    display: inline-block;
    color: rgb(221, 101, 101);
}

</style>