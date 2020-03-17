<template>
	<div class="questions-page">
		<div id="container">
			<div id="question">
				<p :class="[color ? 'style' : 'timer']" id="timer" v-if="show">
					{{ minute }}: {{ seconds }}
				</p>

				<p>{{ question }}</p>

				<ul v-for="value in options" :key="value">
					<li> <input type="radio" :value="value" v-model="selectedAnswer" name="" id=""> {{ value }}</li>
				</ul>
			</div>

			<button id="previous-btn" class="btn btn-primary" @click="previousQuestion" :disabled="disablePrev" v-if="show">PREVIOUS</button>
			<button id="next-btn" class="btn btn-primary" @click="nextQuestion" :disabled="disableNxt" v-if="show">NEXT</button><br>
			<button id="submit-btn" class="btn btn-primary" @click="submit" v-if="show">SUBMIT</button>
			<button id="start-btn" class="btn btn-primary" @click="start" v-else>START QUIZ</button>
		</div>
	
	</div>
</template>

<script>
export default {
	name: 'Questions',
	data() {
		return {
			minute: 20,
			seconds: 0,
			show: false,
			counter: -1,
			question: null,
			options: null,
			selectedAnswer: null,
			allSelectedAnswers: [],
			disableNxt: false,
			disablePrev: false,
			allCorrectAnswers: [],
			color: false,
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
		},
		numberOfQuestions() {
			return this.$store.state.numberOfQuestions
		},
	},
	watch: {
		selectedAnswer: function() {
			this.correctAnswer = this.apiData[this.counter]["correctAnswer"]

			this.allSelectedAnswers[this.counter] = this.selectedAnswer
		},
		counter: function() {
			if (this.counter <= 0 ) {
				this.disablePrev = true
			} else {
				this.disablePrev = false
			} 
			if (this.counter == this.numberOfQuestions - 1 ) {
				this.disableNxt = true
			} else {
				this.disableNxt = false
			}
		},
		minute: function() {
			if (this.minute === 4) {
				this.color = true
			}
		}
	},
	methods: {
		start() {

			// Start the countdown timer
			const interval = setInterval(()=> {
				this.seconds--
				if(this.seconds === -1) {
					this.minute--
					this.seconds = 59
				}
				if (this.minute === 0 && this.seconds === 0) {
					this.submit()
					clearInterval(interval)
				}
			}, 1000)

			this.show = true
			this.nextQuestion()
			this.apiData.forEach( item => {
			this.allCorrectAnswers.push(item["correctAnswer"])			

		})
		},
		nextQuestion() {
			this.counter++
			this.question = this.apiData[this.counter]["question"]
			this.options = this.apiData[this.counter]["allOptions"]
			this.selectedAnswer = this.allSelectedAnswers[this.counter]
		},
		previousQuestion() {
			this.counter--
			this.question = this.apiData[this.counter]["question"]
			this.options = this.apiData[this.counter]["allOptions"]
			this.selectedAnswer = this.allSelectedAnswers[this.counter]
		},
		submit() {

			// Check if the chosen answers are correct
			const correct = []
			const wrong = []
			for(let i = 0; i < this.numberOfQuestions; i++) {
				if(!this.allSelectedAnswers.length) {
					correct.length = 0
				} else {
					if(this.allSelectedAnswers[i] == this.allCorrectAnswers[i]) {
						correct.push(true)
					} else {
						wrong.push(false)
					}
				}
			}

			function length(array) {
				let number = 0
				array.forEach(item => {
					if(item != null) {
						number++
					}
				})
				return number
			}

			this.$store.state.result = correct.length
			this.$store.state.numberOfQuestionsAnswered = length(this.allSelectedAnswers)
			this.$router.push('/Result')
		}
	},
	
}

</script>

<style scoped>
	.questions-page {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	
	}

	#container {
		text-align: center;
		margin-top: 90px;
		margin-left: 140px;
		background-color: whitesmoke;
		box-shadow: 1px 2px 1.5vmin grey;
		width: 1000px;
		font-size: 20px;
		padding: 3px 20px;
	}

	#previous-btn {
		margin-right: 500px
	}

	#submit-btn {
		margin-bottom: 10px;
	}

	#start-btn {
		margin-bottom: 40px;
		height: 50px;
	}

	li {
		list-style-type: none;
	}

	#timer {
		margin-top: 15px;
		margin-left: 800px;
		font-size: 25px;
	}

	.style {
		color: red;
		font-size: 50px;
	}

	.timer {
		color: black
	}
</style>