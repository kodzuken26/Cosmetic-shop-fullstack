import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useCookies } from 'react-cookie';

const Profile: FC = () => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['user', 'access_token']);
    
    const { data: user, loading, error } = useTypedSelector((state) => state.user);
    const { fetchUserProfile } = useActions();

    useEffect(() => {
        if (!user && !loading) {
            fetchUserProfile();
        }
    }, [user, loading, fetchUserProfile]);

    const handleLogout = () => {
        removeCookie('access_token', { path: '/' });
        removeCookie('user', { path: '/' });
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Загрузка профиля...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки профиля: {error}</div>;
    }

    if (!user) {
        return <div className="info-container">Пользователь не найден</div>;
    }

    return (
        <div className="info-container">
            <div className="info">
                <p>{user.name} {user.surname}</p>
                <p><strong>Ник:</strong> {user.nickname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Пол:</strong> {user.gender === 'woman' ? 'Женский' : 
                                        user.gender === 'man' ? 'Мужской' : 'Не указан'}</p>
                <div>
                    <button onClick={handleLogout} className="logout-btn">
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;