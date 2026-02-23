import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../types/types";

const Profile: FC = () => {
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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Ошибка парсинга данных пользователя:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
        <div className="info-container">
                    <div className="info">
                        <p>{user?.name} {user?.surname}</p>
                        <p><strong>Ник:</strong> {user?.nickname}</p>
                        
                    <div>
                        <button
                onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}
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