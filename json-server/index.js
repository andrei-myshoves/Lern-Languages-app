const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
	await new Promise(res => {
		setTimeout(res, 800)
	})
	next()
})

// Вспомогательная функция для чтения БД
const readDB = () => {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
}

// Вспомогательная функция для записи в БД
const writeDB = db => {
	fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, '\t'))
}

// 1. Эндпоинт для получения случайного слова с isGuessed: false
server.get('/words/random', (req, res) => {
	try {
		const db = readDB()
		const { words = [] } = db

		const unguessedWords = words.filter(word => !word.isGuessed)

		if (unguessedWords.length === 0) {
			return res.status(404).json({ message: 'No unguessed words available' })
		}

		const randomIndex = Math.floor(Math.random() * unguessedWords.length)
		const randomWord = unguessedWords[randomIndex]

		return res.json(randomWord)
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

// 2. Эндпоинт для проверки ответа и обновления isGuessed
server.post('/words/check', (req, res) => {
	try {
		const { wordId, english } = req.body

		if (!wordId || !english) {
			return res.status(400).json({ message: 'wordId and english are required' })
		}

		const db = readDB()
		const { words = [] } = db

		const word = words.find(w => w.id === String(wordId))

		if (!word) {
			return res.status(404).json({ message: 'Word not found' })
		}

		// Проверяем, совпадает ли ответ (без учета регистра)
		const isCorrect = word.english.toLowerCase().trim() === english.toLowerCase().trim()

		if (isCorrect && !word.isGuessed) {
			word.isGuessed = true
			writeDB(db)
			return res.json({
				success: true,
				message: 'Correct answer!',
				word: word,
			})
		}

		if (isCorrect && word.isGuessed) {
			return res.json({
				success: true,
				message: 'Correct answer, but word was already guessed',
				word: word,
			})
		}

		return res.json({
			success: false,
			message: 'Incorrect answer',
			word: word,
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

// 3. Эндпоинт для сброса всех isGuessed в false
server.post('/words/reset', (req, res) => {
	try {
		const db = readDB()
		const { words = [] } = db

		words.forEach(word => {
			word.isGuessed = false
		})

		writeDB(db)

		return res.json({
			success: true,
			message: 'All words reset successfully',
			resetCount: words.length,
		})
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

// 4. Эндпоинт для получения всех слов с isGuessed: true
server.get('/words/guessed', (req, res) => {
	try {
		const db = readDB()
		const { words = [] } = db

		const guessedWords = words.filter(word => word.isGuessed === true)

		return res.json(guessedWords)
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

// 5. Эндпоинт для обновления профиля
server.patch('/profile', (req, res) => {
	try {
		const { firstName, lastName, age } = req.body

		const db = readDB()

		if (!db.profile) {
			return res.status(404).json({ message: 'Profile not found' })
		}

		// Обновляем только переданные поля
		if (firstName !== undefined) {
			db.profile.firstName = firstName
		}
		if (lastName !== undefined) {
			db.profile.lastName = lastName
		}
		if (age !== undefined) {
			db.profile.age = age
		}

		writeDB(db)

		return res.json(db.profile)
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
// server.use((req, res, next) => {
// 	if (!req.headers.authorization) {
// 		return res.status(403).json({ message: 'AUTH ERROR' })
// 	}

// 	next()
// })

server.use(router)

// запуск сервера
server.listen(8000, () => {
	console.log('server is running on 8000 port')
})
