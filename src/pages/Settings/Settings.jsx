// src/pages/Settings/Settings.jsx
import RoadmapImporter from "../../modules/RoadmapImporter/RoadmapImporter";
import DataManager from "../../modules/DataManager/DataManager";
import './Settings.css';

function Settings({ technologies, onImportData, onImportRoadmap, loading, availableRoadmaps }) {
    const clearAllData = () => {
        if (window.confirm('Вы уверены что хотите удалить ВСЕ данные? Это действие нельзя отменить.')) {
            localStorage.removeItem('techTrackerData');
            window.location.reload();
        }
    };

    return (
        <div className="settings">
            <div className="page-header">
                <h1>⚙️ Настройки</h1>
                <p>Управление данными и настройками приложения</p>
            </div>

            <div className="settings-section">
                <h2>Импорт дорожных карт</h2>
                <RoadmapImporter
                    onImportRoadmap={onImportRoadmap}
                    loading={loading}
                    availableRoadmaps={availableRoadmaps}
                />
            </div>

            <div className="settings-section">
                <h2>📁 Управление данными</h2>
                <DataManager
                    technologies={technologies}
                    onImportData={onImportData}
                />
            </div>

            <div className="settings-section danger-zone">
                <h2>⚠️ Опасная зона</h2>
                <p>Эти действия нельзя отменить</p>
                <button onClick={clearAllData} className="btn btn-danger">
                    🗑️ Удалить все данные
                </button>
            </div>
        </div>
    );
}

export default Settings;