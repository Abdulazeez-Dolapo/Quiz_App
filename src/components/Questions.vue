<template>
	<div id="questions">
		<p>{{ question }}</p>

		<ul v-for="(value, index) in options" :key="value">
			<li> <input type="radio" :value="value" v-model="chosenAnswer" name="" id=""> {{ value }}: {{ index }}</li>
		</ul>

		<button @click="nextQuestion" :disabled="disableNxt" v-if="show">Next</button><br>
		<button @click="previousQuestion" :disabled="disablePrev" v-if="show">Previous</button><br>
		<button @click="submit" v-if="show">Submit</button>
		<button @click="start" v-else>Start Quiz</button>
		<p>
			{{ correctAnswersGot }}
		</p>
		{{ chosenAnswer }}
		<p> {{ correctAnswer }} </p>
		<p>
			{{ answersChosen }}
		</p>
		<p>
			{{counter}}
		</p>

	</div>
</template>

<script>
export default {
	name: 'Questions',
	data() {
		return {
			show: false,
			counter: -1,
			question: null,
			options: null,
			chosenAnswer: null,
			correctAnswersGot: 0,
			answersChosen: [],
			correctAnswersChosen: [],
			disableNxt: false,
			disablePrev: false
		}
	},
	created() {
		this.disablePrev = true
	},
	updated() {
		this.question = this.$store.state.apiData[this.counter]["question"]
		this.options = this.$store.state.apiData[this.counter]["allOptions"]
	},
	computed: {
		apiData() {
			return this.$store.state.apiData
		}
	},
	methods: {
		start() {
			this.counter++
			this.show = true
		},
		nextQuestion() {
			this.show = true
			this.counter++
			this.question = this.apiData[this.counter]["question"]
			this.options = this.apiData[this.counter]["allOptions"]
			
			if(this.chosenAnswer === this.correctAnswer) {
				this.correctAnswersGot++
			}
			this.correctAnswersChosen[this.counter] = this.correctAnswersGot
			this.chosenAnswer = this.answersChosen[this.counter]
		},
		previousQuestion() {
			this.counter--
			this.question = this.apiData[this.counter]["question"]
			this.options = this.apiData[this.counter]["allOptions"]
			
			this.chosenAnswer = this.answersChosen[this.counter]
			this.correctAnswersGot = this.correctAnswersChosen[this.counter]
			if (this.counter == 0) {
				this.correctAnswersGot = 0
			}
		},
		submit() {
			if(this.chosenAnswer == this.correctAnswer) {
				this.correctAnswersGot++
			}
			alert(`${this.correctAnswersGot}`)
		}
	},
	watch: {
		chosenAnswer: function() {
			this.correctAnswer = this.apiData[this.counter]["correctAnswer"]

			this.answersChosen[this.counter] = this.chosenAnswer
		},
		counter: function() {
			if (this.counter <= 0 ) {
				this.disablePrev = true
			} else {
				this.disablePrev = false
			} 
			if (this.counter == this.$store.state.numberOfQuestions - 1 ) {
				this.disableNxt = true
			} else {
				this.disableNxt = false
			}
		},
	}
}
</script>

<style>
	li {
		list-style-type: none;
	}
</style>