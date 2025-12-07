import { useState } from 'react'
import styles from './HomePage.module.css'

export default function HomePage() {
    const [isLearning, setIsLearning] = useState(false)

    const handleStartLearning = () => {
        setIsLearning(true)
    }

    return (
        <div className={styles.container}>
            {!isLearning && (
                <button className={styles.startBtn} onClick={handleStartLearning}>
                    Начать изучение
                </button>
            )}

            {isLearning && (
                <div className={styles.learningBlock}>
                    <h2>Режим изучения слов</h2>
                    <p>Здесь будут слова для изучения...</p>
                </div>
            )}
        </div>
    )
}
