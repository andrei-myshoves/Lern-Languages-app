import { useState } from 'react'
import styles from './HomePage.module.css'
import WordTrainer from '../../components/WordTrainer/WordTrainer'
import Button from '../../components/UI/Button/Button.jsx'

export default function HomePage() {
    const [isLearning, setIsLearning] = useState(false)

    const handleStartLearning = () => {
        setIsLearning(true)
    }

    return (
        <div className={styles.container}>
            {!isLearning && (
                <Button className={`${styles.startBtn}`} onClick={handleStartLearning}>
                    Начать изучение
                </Button>
            )}

            {isLearning && (
                <div className={styles.learningBlock}>
                    <h2>Режим изучения слов</h2>
                    <WordTrainer />
                </div>
            )}
        </div>
    )
}
