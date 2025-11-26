import { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter({ onImportRoadmap, loading, availableRoadmaps }) {
    const [selectedRoadmap, setSelectedRoadmap] = useState('');
    const [importResult, setImportResult] = useState(null);

    const handleImport = async () => {
        if (!selectedRoadmap) return;

        const result = await onImportRoadmap(selectedRoadmap);
        setImportResult(result);

        if (result.success) {
            setTimeout(() => {
                setImportResult(null);
                setSelectedRoadmap('');
            }, 5000);
        }
    };

    const getRoadmapIcon = (roadmapId) => {
        switch (roadmapId) {
            case 'frontend': return '🎨';
            case 'backend': return '⚙️';
            case 'fullstack': return '🔗';
            default: return '🗺️';
        }
    };

    return (
        <div className="roadmap-importer">
            <h3>🗺️ Импорт дорожной карты</h3>
            <p className="importer-description">
                Загрузите готовую дорожную карту для быстрого старта
            </p>

            <div className="roadmap-selection">
                <select
                    value={selectedRoadmap}
                    onChange={(e) => setSelectedRoadmap(e.target.value)}
                    disabled={loading}
                    className="roadmap-select"
                >
                    <option value="">Выберите дорожную карту...</option>
                    {availableRoadmaps.map(roadmap => (
                        <option key={roadmap.id} value={roadmap.id}>
                            {getRoadmapIcon(roadmap.id)} {roadmap.name} ({roadmap.technologyCount} технологий)
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleImport}
                    disabled={!selectedRoadmap || loading}
                    className="import-btn"
                >
                    {loading ? '⏳ Загрузка...' : '🚀 Импортировать'}
                </button>
            </div>

            {/* Результат импорта */}
            {importResult && (
                <div className={`import-result ${importResult.success ? 'success' : 'error'}`}>
                    {importResult.success ? (
                        <>
                            <span className="result-icon">✅</span>
                            <div className="result-content">
                                <strong>{importResult.message}</strong>
                                <div className="result-details">
                                    Импортировано технологий: {importResult.importedCount}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="result-icon">❌</span>
                            <div className="result-content">
                                <strong>Ошибка импорта</strong>
                                <div className="result-details">{importResult.error}</div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Информация о дорожных картах */}
            <div className="roadmaps-info">
                <h4>Доступные дорожные карты:</h4>
                <div className="roadmaps-grid">
                    {availableRoadmaps.map(roadmap => (
                        <div key={roadmap.id} className="roadmap-info-card">
                            <span className="roadmap-icon">{getRoadmapIcon(roadmap.id)}</span>
                            <div className="roadmap-details">
                                <strong>{roadmap.name}</strong>
                                <span>{roadmap.technologyCount} технологий</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoadmapImporter;