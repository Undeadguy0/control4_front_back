import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TechnologyDetail.css';

function TechnologyDetail({ technologies, onUpdateTechnology }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [technology, setTechnology] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [notes, setNotes] = useState('');

    // Загрузка технологии по ID
    useEffect(() => {
        const tech = technologies.find(t => t.id === parseInt(id));
        if (tech) {
            setTechnology(tech);
            setEditForm({
                name: tech.name,
                description: tech.description,
                category: tech.category,
                difficulty: tech.difficulty,
                state: tech.state
            });
            setNotes(tech.notes || '');
        }
    }, [id, technologies]);

    // Сохранение заметок
    useEffect(() => {
        if (technology && notes !== technology.notes) {
            const saveNotes = setTimeout(() => {
                onUpdateTechnology(technology.id, { notes });
            }, 1000);
            return () => clearTimeout(saveNotes);
        }
    }, [notes, technology, onUpdateTechnology]);

    const handleSave = () => {
        onUpdateTechnology(technology.id, editForm);
        setTechnology(prev => ({ ...prev, ...editForm }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm({
            name: technology.name,
            description: technology.description,
            category: technology.category,
            difficulty: technology.difficulty,
            state: technology.state
        });
        setIsEditing(false);
    };

    const handleStateChange = () => {
        const states = ['Не начато', 'В процессе', 'Завершено'];
        const currentIndex = states.indexOf(technology.state);
        const nextState = states[(currentIndex + 1) % states.length];
        onUpdateTechnology(technology.id, { state: nextState });
        setTechnology(prev => ({ ...prev, state: nextState }));
    };

    const handleDelete = () => {
        if (window.confirm('Удалить эту технологию?')) {
            onUpdateTechnology(technology.id, { _delete: true });
            navigate('/technologies');
        }
    };

    if (!technology) {
        return (
            <div className="technology-detail">
                <div className="not-found">
                    <h1>🔍 Технология не найдена</h1>
                    <p>Технология с ID {id} не существует.</p>
                    <Link to="/technologies" className="btn btn-primary">
                        ← Назад к списку
                    </Link>
                </div>
            </div>
        );
    }

    const getStateIcon = (state) => {
        switch (state) {
            case 'Завершено': return '✅';
            case 'В процессе': return '🔄';
            default: return '⏳';
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return '#22c55e';
            case 'intermediate': return '#eab308';
            case 'advanced': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div className="technology-detail">
            <div className="detail-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <div className="header-actions">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-secondary"
                    >
                        {isEditing ? 'Отмена' : '✏️ Редактировать'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                    >
                        🗑️ Удалить
                    </button>
                </div>
            </div>

            {/* Основная информация */}
            <div className="detail-content">
                <div className="main-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="edit-input large"
                            placeholder="Название технологии"
                        />
                    ) : (
                        <h1>{technology.name}</h1>
                    )}

                    <div className="tech-meta">
                        <div className="meta-item">
                            <span className="meta-label">Статус:</span>
                            {isEditing ? (
                                <select
                                    value={editForm.state}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                                    className="edit-select"
                                >
                                    <option value="Не начато">⏳ Не начато</option>
                                    <option value="В процессе">🔄 В процессе</option>
                                    <option value="Завершено">✅ Завершено</option>
                                </select>
                            ) : (
                                <span
                                    className={`status status-${technology.state.toLowerCase().replace(' ', '-')}`}
                                    onClick={handleStateChange}
                                >
                                    {getStateIcon(technology.state)} {technology.state}
                                </span>
                            )}
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Категория:</span>
                            {isEditing ? (
                                <select
                                    value={editForm.category}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                    className="edit-select"
                                >
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="devops">DevOps</option>
                                    <option value="database">Базы данных</option>
                                    <option value="tools">Инструменты</option>
                                </select>
                            ) : (
                                <span className="category">{technology.category}</span>
                            )}
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Сложность:</span>
                            {isEditing ? (
                                <select
                                    value={editForm.difficulty}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, difficulty: e.target.value }))}
                                    className="edit-select"
                                >
                                    <option value="beginner">Начинающий</option>
                                    <option value="intermediate">Средний</option>
                                    <option value="advanced">Продвинутый</option>
                                </select>
                            ) : (
                                <span
                                    className="difficulty"
                                    style={{ color: getDifficultyColor(technology.difficulty) }}
                                >
                                    {technology.difficulty}
                                </span>
                            )}
                        </div>

                        {technology.createdAt && (
                            <div className="meta-item">
                                <span className="meta-label">Добавлена:</span>
                                <span className="date">
                                    {new Date(technology.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Описание */}
                <div className="description-section">
                    <h3>📝 Описание</h3>
                    {isEditing ? (
                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                            className="edit-textarea"
                            rows="4"
                            placeholder="Описание технологии..."
                        />
                    ) : (
                        <p>{technology.description}</p>
                    )}
                </div>

                {/* Заметки */}
                <div className="notes-section">
                    <h3>📓 Мои заметки</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="notes-textarea"
                        rows="6"
                        placeholder="Записывайте сюда важные моменты, ссылки, идеи..."
                    />
                    <div className="notes-hint">
                        {notes.length > 0 ? `Сохранено (${notes.length} символов)` : 'Добавьте заметки...'}
                    </div>
                </div>

                {/* Ресурсы */}
                {technology.resources && technology.resources.length > 0 && (
                    <div className="resources-section">
                        <h3>🔗 Ресурсы для изучения</h3>
                        <div className="resources-list">
                            {technology.resources.map((resource, index) => (
                                <a
                                    key={index}
                                    href={resource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    🌐 {resource}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Дедлайн */}
                {technology.deadline && (
                    <div className="deadline-section">
                        <h3>📅 Планируемая дата освоения</h3>
                        <p>{new Date(technology.deadline).toLocaleDateString('ru-RU')}</p>
                    </div>
                )}

                {/* Кнопки сохранения при редактировании */}
                {isEditing && (
                    <div className="edit-actions">
                        <button onClick={handleSave} className="btn btn-primary">
                            💾 Сохранить изменения
                        </button>
                        <button onClick={handleCancel} className="btn btn-secondary">
                            ❌ Отменить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TechnologyDetail;