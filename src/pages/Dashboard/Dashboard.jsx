import './Dashboard.css';

function Dashboard({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(t => t.state === "Завершено").length;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>📊 Статистика</h1>
                <p>Аналитика вашего прогресса</p>
            </div>

            <div className="stats-cards">
                <div className="stat-card">
                    <h3>📈 Общий прогресс</h3>
                    <div className="progress-number">{Math.round(progress)}%</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="stat-card">
                    <h3>🎯 Технологий изучено</h3>
                    <div className="stat-number">{completed} / {total}</div>
                </div>
            </div>

            <div className="coming-soon">
                <h2>📈 Подробная аналитика скоро!</h2>
                <p>Графики и детальная статистика в разработке</p>
            </div>
        </div>
    );
}

export default Dashboard;