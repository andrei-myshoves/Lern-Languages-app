import { useEffect, useState } from 'react'
import { api } from '../../api/axios.js'
import styles from './LearnedWordList.module.css'

export default function LearnedWordsList() {
    const [words, setWords] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const loadWords = async () => {
            try {
                const res = await api.get('/words')
                setWords(res.data)
            } catch {
                console.error('Ошибка загрузки слов')
            }
        }

        loadWords()
    }, [])

    const filteredWords = words.filter(word => {
        if (filter === 'correct') return word.isGuessed === true
        if (filter === 'wrong') return word.isGuessed === false
        return true
    })

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Изученные слова</h3>

            <div className={styles.filters}>
                <button className={filter === 'all' ? styles.active : ''} onClick={() => setFilter('all')}>
                    Все
                </button>

                <button className={filter === 'correct' ? styles.active : ''} onClick={() => setFilter('correct')}>
                    Правильные
                </button>

                <button className={filter === 'wrong' ? styles.active : ''} onClick={() => setFilter('wrong')}>
                    Неправильные
                </button>
            </div>

            <div className={styles.list}>
                {filteredWords.map(word => (
                    <div className={styles.card} key={word.id}>
                        <p>
                            <strong>RU:</strong> {word.russian}
                        </p>
                        <p>
                            <strong>EN:</strong> {word.english}
                        </p>

                        <span className={word.isGuessed ? styles.correct : styles.wrong}>
                            {word.isGuessed ? 'Правильно' : 'Неправильно'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
