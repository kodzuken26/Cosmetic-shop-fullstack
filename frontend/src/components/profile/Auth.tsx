import { useState, type FC, type FormEventHandler } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './style.scss';


interface ServerError {
    [key: string]: string | string[];
}

const Auth: FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'user']);

    const [formData, setFormData] = useState({
        nickname: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("Отправляемые данные для входа:", formData);

        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                phone: formData.phone
            });

            console.log(" Успешный вход!", response.data);
            setSuccessMessage("Вы успешно вошли в аккаунт!");
            setCookie('access_token', response.data.token, { path: '/' });

            setCookie('user', JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                surname: response.data.surname,
                nickname: response.data.nickname,
                email: response.data.email,
                phone: response.data.phone,
                gender: response.data.gender,
            }), { path: '/' });

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            setTimeout(() => {
                navigate('/profile');
            }, 1500);

        } catch (error: any) {
            console.log("Ошибка при входе!", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="block-forms">
                <div className="block-input">
                    <h1 className="title-block">Вход в аккаунт</h1>

                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <form className="form-board" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="title-input">Имя пользователя</label> <br />
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                                placeholder="Введите ваш никнейм"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="title-input">Номер телефона</label> <br />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Введите ваш номер"
                            />
                        </div>
                        <br />

                        <button type="submit" disabled={isLoading} className="submit-btn">
                            {isLoading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>

                    <p className="register-link">
                        Нет аккаунта? <Link to="/registration">Зарегистрируйтесь</Link>
                    </p>
                </div>
            </div>


        </>
    )
}

export default Auth;