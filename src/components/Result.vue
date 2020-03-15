<template>
    <div id="result">
        <div id="details">
            <ul>
                <li><span>CATEGORY:</span> {{ category }} </li>
                <li><span>DIFFICULTY:</span> {{ difficulty }} </li>
                <li><span>TOTAL NUMBER OF QUESTIONS:</span> {{ numberOfQuestions }} </li>
                <li><span>TOTAL NUMBER OF QUESTIONS ANSWERED:</span> {{ numberOfQuestionsAnswered }} </li>
                <li><span>NUMBER OF CORRECT ANSWERS:</span> {{ result }} </li>
            </ul>

            <button id="start" class="btn btn-primary" @click="start">TAKE ANOTHER QUIZ</button>
            <router-link to="/Answers"><button id="see" class="btn btn-primary">SEE CORRECT ANSWERS</button></router-link>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Result',
    computed: {
        category() {
            return this.$store.state.category
        },
        difficulty() {
            return this.$store.state.difficulty
        },
        numberOfQuestions() {
            return this.$store.state.numberOfQuestions
        },
        numberOfQuestionsAnswered() {
            return this.$store.state.numberOfQuestionsAnswered
        },
        result() {
            return this.$store.state.result
        },
    },
    methods: {
        start() {
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
#result {
    margin: 0 auto;
    font-size: 28px;
}

#details {
    text-align: left;
    margin: 3% 20%;
    height: 500px;
    background-color: whitesmoke;
    box-shadow: 1px 2px 2vmin grey;
} 

li {
    list-style-type: none;
    line-height: 75px;
}

button {
    height: 50px;
    margin-top: 20px;
    margin-left: 30px;
}

#see {
    margin-left: 250px;
}

span {
    display: inline-block;
    color: rgb(136, 27, 27);
}
</style>