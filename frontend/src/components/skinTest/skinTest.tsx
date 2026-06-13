import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchQuestions, submitTest, resetTest } from '../../store/slices/testSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import './style.scss'

const API_URL = import.meta.env.DEV 
    ? 'http://127.0.0.1:8000' 
    : 'https://kodzuken.pythonanywhere.com';

const SkinTest = () => {
    const dispatch = useAppDispatch();
    const { questions, result, loading } = useTypedSelector((state) => state.test);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    // Сохраняем ответы
    const handleAnswerSelect = (questionIndex: number, value: number) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: value
        }));
    };

    // Отправка теста
    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length !== 10) {
            alert('Пожалуйста, ответьте на все 10 вопросов');
            return;
        }
        
        const answersArray = Object.values(selectedAnswers);
        console.log('Отправляемые ответы:', answersArray);
        dispatch(submitTest(answersArray)).then((res) => {
            console.log('Результат от сервера:', res.payload);
        });
    };

    // Сброс теста
    const handleReset = () => {
        setSelectedAnswers({});
        dispatch(resetTest());
    };

    if (loading && !questions.length) {
        return <div className="test-loading">Загрузка теста...</div>;
    }

    // Функция для получения полного URL картинки
    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '/placeholder.png';
        if (imagePath.startsWith('http')) return imagePath;
        return `${API_URL}${imagePath}`;
    };

    return (
        <div className="skin-test-page">
            <h1 className="test-title">Узнай свой тип кожи</h1>
            <p className="test-subtitle">
                Пройдите небольшой тест, чтобы определить ваш тип кожи и получить персональные рекомендации по уходу.
            </p>

            <div className="test-questions-list">
                {questions.map((question: any, idx: number) => (
                    <div key={question.id} className="test-question-block">
                        <h3 className="question-text">
                            {idx + 1}. {question.text}
                        </h3>
                        <div className="answers-list">
                            {question.answers.map((answer: any) => (
                                <label key={answer.id} className="answer-option">
                                    <input
                                        type="radio"
                                        name={`question_${idx}`}
                                        value={answer.value}
                                        checked={selectedAnswers[idx] === answer.value}
                                        onChange={() => handleAnswerSelect(idx, answer.value)}
                                    />
                                    <span className="answer-text">{answer.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="test-submit-wrapper">
                <button 
                    onClick={handleSubmit} 
                    className="test-submit-btn"
                    disabled={Object.keys(selectedAnswers).length !== 10}
                >
                    Узнать свой тип кожи
                </button>
            </div>

            {result && result.skin_type && (
                <div className="test-result-block">
                    <h2>Ваш тип кожи: {result.skin_type.name}</h2>
                    <p className="skin-description">{result.skin_type.description}</p>

                    <h3>Рекомендуемые товары</h3>
                    <div className="recommendations-list">
                        {result.recommendations && result.recommendations.map((rec: any) => (
                            <div key={rec.id} className="rec-product-card">
                                <img 
                                    src={getImageUrl(rec.product.image)} 
                                    alt={rec.product.name}
                                    className="rec-product-image"
                                    onError={(e) => {
                                        e.currentTarget.src = '/placeholder.png';
                                    }}
                                />
                                <div className="rec-product-info">
                                    <h4>{rec.product.name}</h4>
                                    <p className="rec-price">{rec.product.price} ₽</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleReset} className="test-reset-btn">
                        Пройти тест заново
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkinTest;