<template>
  <div id="app">
		<select name="difficulty" @change="selectDifficulty">
			<option selected disabled>Select Difficulty</option>
			<option value="easy">Easy</option>
			<option value="medium">Medium</option>
			<option value="hard">Hard</option>
		</select>

		<select name="category" id="" @change="selectCategory">
			<option selected disabled>Category</option>
			<option value="9">General Knowledge</option>
			<option value="10">Entertainment: Books</option>
			<option value="11">Entertainment: Films</option>
			<option value="12">Entertainment: Music</option>
			<option value="13">Entertainment: Musicals and Theatres</option>
			<option value="14">Entertainment: Television</option>
			<option value="15">Entertainment: Video Games</option>
			<option value="16">Entertainment: Board Games</option>
			<option value="17">Science and Nature </option>
			<option value="18">Science: Computers</option>
			<option value="19">Science: Mathematics</option>
			<option value="20">Mythology</option>
			<option value="21">Sports</option>
			<option value="22">Geography</option>
			<option value="23">History</option>
			<option value="24">Politics</option>
			<option value="25">Arts</option>
			<option value="26">Celebrities</option>
			<option value="27">Animals</option>
			<option value="28">Vehicles</option>
			<option value="29">Entertainment: Comics</option>
			<option value="30">Science: Gadgets</option>
			<option value="31">Entertainment: Japanese Anime and Manga</option>
			<option value="32">Entertainment: Cartoons and Animations</option>
		</select>

		<input v-model="numberOfQuestions" type="number">
		<button @click="startQuiz"><router-link to="/Questions">Confirm</router-link></button><br>

		<p>{{difficulty}}
		{{category}}
		{{numberOfQuestions}}</p>
		<p>{{url}}</p>
		<p>{{apiData}}</p>
		<hr>
		<!-- <Questions :numberOfQuestions="numberOfQuestions" :apiData="apiData"/> -->
		<router-view></router-view>
  </div>
</template>

<script>
import Axios from 'axios'
// import Questions from './components/Questions'

export default {
	name: 'App',
	data() {
		return {
			apiData: [],
			difficulty: null,
			category: null,
			numberOfQuestions: null,
			url: '',
		}
	},
	components: {
		// Questions
	},

	methods: {
		selectDifficulty(event) {
			this.difficulty = event.target.value
		},
		selectCategory(event) {
			this.category = event.target.value
		},
		startQuiz() {
			if (this.difficulty == 'easy' && this.numberOfQuestions > 20) {
				alert('Sorry, but you cannot take more than 20 questions in this difficulty mode. Kindly reduce your number of questions to 20 or below')
				return
			} else if (this.difficulty == 'medium' && this.numberOfQuestions > 30) {
				alert('Sorry, but you cannot take more than 30 questions in this difficulty mode. Kindly reduce your number of questions to 30 or below')
				return
			} else if (this.difficulty == 'hard' && this.numberOfQuestions > 45) {
				alert('Sorry, but you cannot take more than 45 questions in this difficulty mode. Kindly reduce your number of questions to 45 or below')
				return
			} else {
				this.url = `https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`
				
				Axios.get(this.url)
					.then(res => {
						let data = res["data"]["results"]
						
						data.forEach(item => {
							let options = []
							item.incorrect_answers.forEach(value => {
								options.push(value)
							})
							let random = Math.floor(Math.random() * 4)

							options.splice(random, 0, item.correct_answer)

							this.$store.state.apiData.push({
								question: item.question,
								correctAnswer: item.correct_answer,
								allOptions: options
							})
						})

						this.$store.state.numberOfQuestions = this.numberOfQuestions
					})
					.catch(err => { console.error(err) })
			}
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
