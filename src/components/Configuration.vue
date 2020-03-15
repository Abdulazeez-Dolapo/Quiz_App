<template>
	<div id="app">
		<div id="form">
			<div class="form-row">
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

				<input v-model="numberOfQuestions" type="number" placeholder="Number of Questions">
				<button class="btn btn-primary" @click="confirm">CONFIRM</button>
				<p>
					{{ errorMessage }}
				</p>
			</div>
		</div>
        
  </div>
</template>

<script>
import Axios from 'axios'

export default {
	name: 'App',
	data() {
		return {
			apiData: [],
			difficulty: null,
			category: null,
			numberOfQuestions: null,
            url: '',
			errorMessage: null,
			categoryName: null
		}
	},

	methods: {
		selectDifficulty(event) {
			this.difficulty = event.target.value
		},
		selectCategory(event) {
			const categories = [
				[ 9,"General Knowledge"],
				[ 10, "Entertainment: Books"],
				[ 11, "Entertainment: Films"],
				[ 12, "Entertainment: Music"],
				[ 13, "Entertainment: Musicals and Theatres"],
				[ 14, "Entertainment: Television"],
				[ 15, "Entertainment: Video Games"],
				[ 16, "Entertainment: Board Games"],
				[ 17, "Science and Nature"],
				[ 18, "Science: Computers"],
				[ 19, "Science: Mathematics"],
				[ 20, "Mythology"],
				[ 21, "Sports"],
				[ 22, "Geography"],
				[ 23, "History"],
				[ 24, "Politics"],
				[ 25, "Arts"],
				[ 26, "Celebrities"],
				[ 27, "Animals"],
				[ 28, "Vehicles"],
				[ 29, "Entertainment: Comics"],
				[ 30, "Science: Gadgets"],
				[ 31, "Entertainment: Japanese Anime and Manga"],
				[ 32, "Entertainment: Cartoons and Animations"]
			]
			const category = event.target.value
			let categoryName
			
			categories.forEach(item => {
				if(item[0] == category) {
					categoryName = item[1]
				}
			})

			this.category = category
			this.categoryName = categoryName
		},
		confirm() {
			if (!this.difficulty || !this.numberOfQuestions || !this.category) {
				this.errorMessage = "Please select at least one value from each field"
			} else {
				if (this.difficulty == 'easy' && this.numberOfQuestions > 20) {
					this.errorMessage = 'Sorry! You cannot take more than 20 questions in this difficulty mode'
					return
				} else if (this.difficulty == 'medium' && this.numberOfQuestions > 30) {
					this.errorMessage = 'Sorry! You cannot take more than 30 questions in this difficulty mode'
					return
				} else if (this.difficulty == 'hard' && this.numberOfQuestions > 45) {
					this.errorMessage = 'Sorry! You cannot take more than 45 questions in this difficulty mode'
					return
				} else {
					this.url = `https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}&difficulty=${this.difficulty}&type=multiple`
					this.$store.state.numberOfQuestions = this.numberOfQuestions
					this.$store.state.category = this.categoryName
					this.$store.state.difficulty = this.difficulty				

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

						})
						.catch(err => { console.error(err) })
					
					this.$router.push('/Questions')
				}
			}
		}
	}
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#form {
	text-align: center;
	margin: 150px 199px;
	padding-top: 90px;
	height: 250px;
	box-shadow: -1px -1px 8px gray;
}

select, input, button {
	margin-left: 30px;
}

p {
	margin-top: 15px;
	margin-left: 30px;
	font-size: 30px;
	color: red;
}
</style>
