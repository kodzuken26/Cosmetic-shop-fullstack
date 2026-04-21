import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../types/types";
import { useCookies } from 'react-cookie';

const Profile: FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'access_token']);
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     } else {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         try {
    //             const parsedUser = JSON.parse(storedUser);
    //             setUser(parsedUser);
    //         } catch (error) {
    //             console.error('Ошибка парсинга данных пользователя:', error);
    //             navigate('/login');
    //         }
    //     } else {
    //         navigate('/login');
    //     }
    // }, [navigate]);


    useEffect(() => {
        // 👇 Достаём пользователя из куки (он уже распарсен)
        const userData = cookies.user;

        if (userData) {
            // Если данные пришли строкой (на всякий случай)
            if (typeof userData === 'string') {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    console.error('Ошибка парсинга пользователя');
                    navigate('/login');
                }
            } else {
                // Если это уже объект
                setUser(userData);
            }
        } else {
            // Нет пользователя в куки — отправляем на логин
            navigate('/auth');
        }
    }, [cookies, navigate]);

    

    const handleLogout = () => {
        removeCookie('access_token', { path: '/' });
        removeCookie('user', { path: '/' });
        navigate('/');
    };

    return (
        <>
            <div className="info-container">
                <div className="info">
                    <p>{user?.name} {user?.surname}</p>
                    <p><strong>Ник:</strong> {user?.nickname}</p>

                    <div>
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Выйти
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile;

function removeCookie(arg0: string, arg1: { path: string; }) {
    throw new Error("Function not implemented.");
}
