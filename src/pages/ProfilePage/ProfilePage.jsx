import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './ProfilePage.module.css'
import Button from '../../components/UI/Button/Button'
import LearnedWordsList from '../../components/LearnedWordList/LearnedWordList.jsx'
export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await axios.get('http://localhost:8000/profile')
                setUser(res.data)
                setForm(res.data)
            } catch {
                console.error('Ошибка загрузки профиля')
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    const handleChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const saveChanges = async () => {
        try {
            const res = await axios.patch('http://localhost:8000/profile', form)
            setUser(res.data)
            setIsEditing(false)
        } catch {
            console.error('Ошибка сохранения профиля')
        }
    }

    if (loading) return <div>Загрузка...</div>

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Профиль пользователя</h2>

            {!isEditing ? (
                <div className={styles.info}>
                    <p>
                        <strong>Имя:</strong> {user.firstName}
                    </p>
                    <p>
                        <strong>Фамилия:</strong> {user.lastName}
                    </p>
                    <p>
                        <strong>Дата рождения:</strong> {user.birthDate}
                    </p>
                    <p>
                        <strong>Возраст:</strong> {user.age}
                    </p>

                    <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
                </div>
            ) : (
                <div className={styles.form}>
                    <label>
                        Имя:
                        <input name="firstName" value={form.firstName} onChange={handleChange} />
                    </label>

                    <label>
                        Фамилия:
                        <input name="lastName" value={form.lastName} onChange={handleChange} />
                    </label>

                    <label>
                        Дата рождения:
                        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
                    </label>

                    <label>
                        Возраст:
                        <input type="number" name="age" value={form.age} onChange={handleChange} />
                    </label>

                    <div className={styles.actions}>
                        <Button onClick={saveChanges}>Сохранить</Button>
                        <Button onClick={() => setIsEditing(false)}>Отмена</Button>
                    </div>
                </div>
            )}

            <div className={styles.learnedWordsSection}>
                <LearnedWordsList />
            </div>
        </div>
    )
}
