import { useState } from 'react';
import './DataManager.css';

function DataManager({ technologies, onImportData }) {
    const [importError, setImportError] = useState('');
    const [importSuccess, setImportSuccess] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Экспорт данных в JSON
    const handleExport = () => {
        const exportData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            app: 'Technology Tracker',
            technologies: technologies,
            statistics: {
                total: technologies.length,
                completed: technologies.filter(t => t.state === 'Завершено').length,
                inProgress: technologies.filter(t => t.state === 'В процессе').length,
                notStarted: technologies.filter(t => t.state === 'Не начато').length
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setImportSuccess(`✅ Данные экспортированы (${technologies.length} технологий)`);
        setTimeout(() => setImportSuccess(''), 3000);
    };

    const validateImportData = (data) => {
        if (!data || typeof data !== 'object') {
            throw new Error('Неверный формат файла');
        }

        if (!data.technologies || !Array.isArray(data.technologies)) {
            throw new Error('Файл должен содержать массив technologies');
        }

        if (data.technologies.length === 0) {
            throw new Error('Файл не содержит технологий');
        }

        const sampleTech = data.technologies[0];
        if (!sampleTech.name || !sampleTech.state) {
            throw new Error('Технологии должны содержать поля name и state');
        }

        return true;
    };

    const handleFileImport = (file) => {
        setImportError('');
        setImportSuccess('');

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const fileContent = e.target.result;
                const importedData = JSON.parse(fileContent);

                validateImportData(importedData);
                const userConfirmed = window.confirm(
                    `Импортировать ${importedData.technologies.length} технологий?\n` +
                    'Текущие данные будут заменены.'
                );

                if (userConfirmed) {
                    onImportData(importedData.technologies);
                    setImportSuccess(`✅ Успешно импортировано ${importedData.technologies.length} технологий`);
                    setTimeout(() => setImportSuccess(''), 5000);
                }

            } catch (error) {
                setImportError(`Ошибка импорта: ${error.message}`);
            }
        };

        reader.onerror = () => {
            setImportError('Ошибка чтения файла');
        };

        reader.readAsText(file);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                handleFileImport(file);
            } else {
                setImportError('Поддерживаются только JSON файлы');
            }
        }
        // кидаем, иначе тот де выбрать не получается НЕ ФИКСИТЬ
        e.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileImport(file);
        }
    };

    const downloadTemplate = () => {
        const template = {
            version: '1.0',
            app: 'Technology Tracker',
            technologies: [
                {
                    id: 1,
                    name: "Пример технологии",
                    description: "Описание технологии",
                    category: "frontend",
                    difficulty: "beginner",
                    state: "Не начато",
                    resources: ["https://example.com"],
                    notes: "",
                    progress: 0,
                    createdAt: new Date().toISOString()
                }
            ]
        };

        const dataStr = JSON.stringify(template, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'tech-tracker-template.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="data-manager">
            <h3>📁 Управление данными</h3>

            <div className="data-actions">
                {/* Экспорт */}
                <div className="action-group">
                    <h4>📤 Экспорт данных</h4>
                    <p>Скачайте резервную копию ваших технологий</p>
                    <button
                        onClick={handleExport}
                        disabled={technologies.length === 0}
                        className="btn btn-primary"
                    >
                        💾 Экспорт в JSON ({technologies.length})
                    </button>
                </div>

                {/* Импорт */}
                <div className="action-group">
                    <h4>📥 Импорт данных</h4>
                    <p>Загрузите данные из JSON файла</p>

                    <div
                        className={`drop-zone ${isDragging ? 'dragging' : ''} ${importError ? 'error' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="drop-zone-content">
                            <p>📎 Перетащите JSON файл сюда или</p>
                            <input
                                type="file"
                                accept=".json,application/json"
                                onChange={handleFileSelect}
                                id="file-input"
                                className="file-input"
                            />
                            <label htmlFor="file-input" className="btn btn-secondary">
                                Выберите файл
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={downloadTemplate}
                        className="btn btn-outline"
                    >
                        📋 Скачать шаблон
                    </button>
                </div>
            </div>

            {/* Сообщения */}
            {importError && (
                <div className="message error">
                    ❌ {importError}
                </div>
            )}

            {importSuccess && (
                <div className="message success">
                    {importSuccess}
                </div>
            )}

            {/* Информация */}
            <div className="import-info">
                <h4>ℹ️ Формат файла:</h4>
                <ul>
                    <li>Формат: JSON</li>
                    <li>Обязательные поля: <code>name</code>, <code>state</code></li>
                    <li>Поддерживаемые состояния: "Не начато", "В процессе", "Завершено"</li>
                    <li>Дополнительные поля: description, category, difficulty, resources, notes</li>
                </ul>
            </div>

            {/* Статистика */}
            {technologies.length > 0 && (
                <div className="data-stats">
                    <h4>📊 Статистика данных:</h4>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">{technologies.length}</span>
                            <span className="stat-label">Всего технологий</span>
                        </div>
                        <div className="stat-item">
              <span className="stat-number">
                {technologies.filter(t => t.state === 'Завершено').length}
              </span>
                            <span className="stat-label">Завершено</span>
                        </div>
                        <div className="stat-item">
              <span className="stat-number">
                {technologies.filter(t => t.state === 'В процессе').length}
              </span>
                            <span className="stat-label">В процессе</span>
                        </div>
                        <div className="stat-item">
              <span className="stat-number">
                {technologies.filter(t => t.state === 'Не начато').length}
              </span>
                            <span className="stat-label">Не начато</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataManager;