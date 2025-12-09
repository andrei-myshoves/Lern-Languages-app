import { useState } from 'react'
import styles from './ProfilePage.module.css'
import Button from '../../components/UI/Button/Button'

export default function ProfilePage() {
    const [user, setUser] = useState({
        firstName: 'Andrei',
        lastName: 'Mushovets',
        birthday: '1998-06-15',
    })

    const [isEditing, setIsEditing] = useState(false)

    const [form, setForm] = useState(user)

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const saveChanges = () => {
        setUser(form)
        setIsEditing(false)
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Профиль пользователя</h2>

            {!isEditing && (
                <div className={styles.info}>
                    <p>
                        <strong>Имя:</strong> {user.firstName}
                    </p>
                    <p>
                        <strong>Фамилия:</strong> {user.lastName}
                    </p>
                    <p>
                        <strong>Дата рождения:</strong> {user.birthday}
                    </p>

                    <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
                </div>
            )}

            {isEditing && (
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
                        <input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
                    </label>

                    <div className={styles.actions}>
                        <Button onClick={saveChanges}>Сохранить</Button>
                        <Button onClick={() => setIsEditing(false)}>Отмена</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
