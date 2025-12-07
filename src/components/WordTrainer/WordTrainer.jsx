import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './WordTrainer.module.css'

export default function WordTrainer() {
    const [word, setWord] = useState(null)
    const [answer, setAnswer] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const loadWord = async () => {
        try {
            setLoading(true)
            const res = await axios.get('http://localhost:8000/words/random')
            setWord(res.data)
            setAnswer('')
            setResult(null)
        } catch (err) {
            console.error('Ошибка загрузки слова:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadWord()
    }, [])

    const checkWord = async e => {
        e.preventDefault()

        if (!word) return

        try {
            const res = await axios.post('http://localhost:8000/words/check', {
                wordId: word.id,
                english: answer,
            })

            setResult(res.data.success ? 'correct' : 'wrong')

            if (res.data.success) {
                setTimeout(() => {
                    loadWord()
                }, 1000)
            }
        } catch (err) {
            console.error('Ошибка проверки:', err)
            setResult('wrong')
        }
    }

    if (loading || !word) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.question}>Переведи слово:</h2>
            <div className={styles.word}>{word.russian}</div>

            <form onSubmit={checkWord} className={styles.form}>
                <input
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    className={styles.input}
                    placeholder="Введите перевод"
                />
                <button className={styles.button}>Проверить</button>
            </form>

            {result === 'correct' && <div className={styles.correct}> Правильно!</div>}
            {result === 'wrong' && <div className={styles.wrong}> Неправильно</div>}
        </div>
    )
}
