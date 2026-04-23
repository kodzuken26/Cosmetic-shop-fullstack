import { useState, type FC, type FormEventHandler } from "react";
import axios from "axios";
// import type { IUser } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import './style.scss';

interface ServerError {
    [key: string]: string | string[];
}

const Registration: FC = () => {
    const [formData, setFormData] = useState({
        user: "",
        nickname: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        gender: "none-gender",
        privacyPolicy: false,
        personalData: false,
    });

    const formatPhoneNumber = (value: string) => {
        let phone = value.replace(/\D/g, '');

        if (phone.length > 0) {
            if (phone[0] !== '8' && phone[0] !== '7') {
                phone = '8' + phone;
            }
            phone = phone.substring(0, 11);

            let formatted = phone[0] || '8';
            if (phone.length > 1) formatted += '(' + phone.substring(1, 4);
            if (phone.length > 4) formatted += ')' + phone.substring(4, 7);
            if (phone.length > 7) formatted += '-' + phone.substring(7, 9);
            if (phone.length > 9) formatted += '-' + phone.substring(9, 11);

            return formatted;
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === 'phone') {

            setFormData({
                ...formData,
                [name]: formatPhoneNumber(value),
            });
        } else if (type === 'checkbox') {

            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {

            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("Отправляемые данные:", formData);

        if (isLoading) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("email: Введите корректный email адрес");
            return;
        }

        if (!formData.privacyPolicy) {
            setError("Вы должны согласиться с Политикой конфиденциальности");
            return;
        }

        if (!formData.personalData) {
            setError("Вы должны дать согласие на обработку персональных данных");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://kodzuken.pythonanywhere.com/api/register/", formData);
            console.log("Success!", response.data);
            setSuccessMessage("Регистрация успешна! Вы будете перенаправлены...");

            if (response.data.tokens) {
                localStorage.setItem('access_token', response.data.tokens.access);
                localStorage.setItem('refresh_token', response.data.tokens.refresh);
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            setTimeout(() => {
                navigate('/auth');
            }, 2000);

        } catch (error) {
            console.log("Error during registration!", error);
            if (axios.isAxiosError(error)) {
                const serverError = error.response?.data as ServerError;

                if (serverError) {
                    const firstErrorKey = Object.keys(serverError)[0];
                    const firstErrorMessage = serverError[firstErrorKey];

                    if (Array.isArray(firstErrorMessage)) {
                        setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
                    } else {
                        setError(`${firstErrorKey}: ${firstErrorMessage}`);
                    }
                } else {
                    setError(error.message || "Ошибка сервера");
                }
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ошибка сервера. Попробуйте позже.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="block-forms">
                <div className="block-input">
                    <h1 className="title-block">Регистрация</h1>

                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className="title-input">Имя </label> <br />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Введите имя"
                                required
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="title-input">Фамилия </label> <br />
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="Введите фамилию"
                                required
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="title-input">Никнейм </label> <br />
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                placeholder="Введите никнейм"
                                required
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="title-input">Эл. почта </label> <br />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Введите эл.почту"
                                required
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="title-input">Телефон </label> <br />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Введите номер телефона"
                                pattern="8\(\d{3}\)\d{3}-\d{2}-\d{2}"
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label className="title-input">Пол </label> <br />
                            <div className="radio-group">
                                <label className="radio-input">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="woman"
                                        checked={formData.gender === 'woman'}
                                        onChange={handleChange}
                                        className="input-checkbox"
                                    />
                                    Женский
                                </label> <br />
                                <label className="radio-input">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="man"
                                        checked={formData.gender === 'man'}
                                        onChange={handleChange}
                                        className="input-checkbox"
                                    />
                                    Мужской
                                </label> <br />
                                <label className="radio-input">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="none-gender"
                                        checked={formData.gender === 'none-gender'}
                                        onChange={handleChange}
                                        className="input-checkbox"
                                    />
                                    Не указан
                                </label>
                            </div>
                        </div>
                        <br />

                        <div className="form-group required-checkbox-group">
                            <label className="required-checkbox title-input" >
                                <input
                                    type="checkbox"
                                    name="privacyPolicy"
                                    checked={formData.privacyPolicy}
                                    onChange={handleChange}
                                    className="input-checkbox"
                                />
                                Я соглашаюсь с правилами "Политики конфиденциальности"
                            </label>
                        </div>

                        <div className="form-group required-checkbox-group">
                            <label className="required-checkbox title-input">
                                <input
                                    type="checkbox"
                                    name="personalData"
                                    checked={formData.personalData}
                                    onChange={handleChange}
                                    className="input-checkbox"
                                />
                                Я даю согласие на обработку персональных данных
                            </label>
                        </div>
                        <br />
                        <br />

                        <button type="submit" disabled={isLoading} className="submit-btn">
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </form>

                    <p className="login-link">
                        Уже есть аккаунт? <Link to="/auth">Войти</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Registration;