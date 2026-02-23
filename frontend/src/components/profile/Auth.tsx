import { useState, type FC, type FormEventHandler } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './style.scss';

interface ServerError {
  [key: string]: string | string[];
}

const Auth: FC = () => {

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

    // const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    //     e.preventDefault();
    //     console.log("Отправляемые данные для входа:", formData);
    
    //     if (isLoading) return;
    //     setIsLoading(true);
    //     setError(null);

    // try {
    //     const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
    //     console.log("Успешный вход!", response.data);
    //     setSuccessMessage("Вы успешно вошли в аккаунт!");
        
        
    //     localStorage.setItem('access_token', response.data.tokens.access);
    //     localStorage.setItem('refresh_token', response.data.tokens.refresh);
        
        
    //     localStorage.setItem('user', JSON.stringify({
    //         id: response.data.id,
    //         name: response.data.username,
    //         email: response.data.email,
    //         surname: response.data.surname,
    //         nickname: response.data.nickname,
    //         phone: response.data.phone,
    //         gender: response.data.gender,
    //     }));
        
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokens.access}`;
        
    //     setTimeout(() => {
    //         navigate('/account'); 
    //     }, 1500);
        
    //     } catch (error) {
    //         console.log("Ошибка при входе!", error.response?.data || error.message);
    //         if (error.response && error.response.data) {
                
    //             const errorData = error.response.data;
                
                
    //             if (typeof errorData === 'string') {
    //                 setError(errorData);
    //             }
                
    //             else if (typeof errorData === 'object') {
                    
    //                 const firstErrorKey = Object.keys(errorData)[0];
    //                 const firstErrorMessage = errorData[firstErrorKey];
                    
    //                 if (Array.isArray(firstErrorMessage)) {
    //                     setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
    //                 } else {
    //                     setError(`${firstErrorKey}: ${firstErrorMessage}`);
    //                 }
    //             }
    //         } else if (error.request) {
    //             setError("Не удалось подключиться к серверу. Проверьте подключение к интернету.");
    //         } else {
    //             setError("Произошла ошибка. Попробуйте позже.");
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    
    
   
//     const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
//     console.log("Отправляемые данные для входа:", formData);

//     if (isLoading) return;
//     setIsLoading(true);
//     setError(null); // null - ок
//     setSuccessMessage(null); // null - ок

//         try {
//          const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//              phone: formData.phone  // только телефон
             
//         });
        
//         console.log("Успешный вход!", response.data);
//         setSuccessMessage("Вы успешно вошли в аккаунт!"); // строка - ок (successMessage принимает строку)
        
//         localStorage.setItem('access_token', response.data.tokens.access);
//         localStorage.setItem('refresh_token', response.data.tokens.refresh);
        
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data));
        
        
            
//         localStorage.setItem('user', JSON.stringify({
//             id: response.data.id,
//             name: response.data.username,
//             email: response.data.email,
//             surname: response.data.surname,
//             nickname: response.data.nickname,
//             phone: response.data.phone,
//             gender: response.data.gender,
//         }));
        
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokens.access}`;
        
//         setTimeout(() => {
//             navigate('/profile'); 
//         }, 1500);
        
//     } catch (error: any) { // временное решение - any
//         console.log("Ошибка при входе!", error.response?.data || error.message);
        
//         if (error.response && error.response.data) {
//             const errorData = error.response.data;
            
//             if (typeof errorData === 'string') {
//                 setError(errorData); // строка
//             } else if (typeof errorData === 'object') {
//                 const firstErrorKey = Object.keys(errorData)[0];
//                 const firstErrorMessage = errorData[firstErrorKey];
                
//                 if (Array.isArray(firstErrorMessage)) {
//                     setError(`${firstErrorKey}: ${firstErrorMessage[0]}`); // строка
//                 } else {
//                     setError(`${firstErrorKey}: ${firstErrorMessage}`); // строка
//                 }
//             }
//         } else if (error.request) {
//             setError("Не удалось подключиться к серверу. Проверьте подключение к интернету."); // строка
//         } else {
//             setError("Произошла ошибка. Попробуйте позже."); // строка
//         }
//     } finally {
//         setIsLoading(false);
//     }
// };


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
        
        console.log("✅ Данные ответа:", response.data);
        
        setSuccessMessage("Вы успешно вошли в аккаунт!");
        
        // Сохраняем токен (в зависимости от структуры ответа)
        if (response.data.tokens && response.data.tokens.access) {
            // Структура с tokens.access
            localStorage.setItem('access_token', response.data.tokens.access);
            localStorage.setItem('refresh_token', response.data.tokens.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokens.access}`;
        } else if (response.data.access) {
            // Структура с прямым access
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        } else if (response.data.token) {
            // Структура с одним token
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        // Сохраняем данные пользователя
        // Определяем, как сохранить пользователя в зависимости от структуры
        const userData = response.data.user || response.data.profile || response.data;
        
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            name: userData.name || userData.username || '',
            surname: userData.surname || '',
            email: userData.email || '',
            nickname: userData.nickname || formData.nickname,
            phone: userData.phone || formData.phone,
            gender: userData.gender || '',
        }));
        
        setTimeout(() => {
            navigate('/profile'); 
        }, 1500);
        
    } catch (error: any) {
        console.log("❌ Ошибка при входе!", error);
        
        if (error.response && error.response.data) {
            const errorData = error.response.data;
            
            if (typeof errorData === 'string') {
                setError(errorData);
            } else if (typeof errorData === 'object') {
                const firstErrorKey = Object.keys(errorData)[0];
                const firstErrorMessage = errorData[firstErrorKey];
                
                if (Array.isArray(firstErrorMessage)) {
                    setError(`${firstErrorKey}: ${firstErrorMessage[0]}`);
                } else {
                    setError(`${firstErrorKey}: ${firstErrorMessage}`);
                }
            }
        } else if (error.request) {
            setError("Не удалось подключиться к серверу. Проверьте подключение к интернету.");
        } else {
            setError("Произошла ошибка. Попробуйте позже.");
        }
    } finally {
        setIsLoading(false);
    }
};
    return (
        <>
            <div className="block-input">
                <h1>Вход в аккаунт</h1>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form className="form-board" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя пользователя</label> <br />
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
                    <label>Номер телефона</label> <br />
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
            
        </>
    )
}

export default Auth;