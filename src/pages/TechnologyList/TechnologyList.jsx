import './TechnologyList.css';
import TechnologyCard from "../../modules/TechnologyCard/TechnologyCard";
import SearchBox from "../../modules/SearchBox/SearchBox";
import { useState } from 'react'; // ← ДОБАВЬ ЭТУ СТРОКУ

function TechnologyList({ technologies, onStateChange }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTechnologies = technologies.filter(tech => {

        if (!tech || tech.name === undefined || tech.name === null) {
            return false;
        }

        const searchLower = searchQuery.toLowerCase();
        const nameLower = tech.name.toLowerCase();

        return nameLower.includes(searchLower);
    });

    return (
        <div className="technology-list">
            <div className="page-header">
                <h1>📚 Все технологии</h1>
                <p>Управляйте своим прогрессом изучения</p>
            </div>

            <SearchBox
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="list-container">
                {filteredTechnologies.map((tech) => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        name={tech.name}
                        state={tech.state}
                        onStateChange={() => onStateChange(tech.id)}
                    />
                ))}

                {filteredTechnologies.length === 0 && searchQuery && (
                    <div className="no-results">
                        <h3>🔍 Технологии не найдены</h3>
                        <p>Попробуйте изменить поисковый запрос</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="clear-all-search"
                        >
                            Очистить поиск
                        </button>
                    </div>
                )}

                {filteredTechnologies.length === 0 && !searchQuery && (
                    <div className="no-results">
                        <h3>📝 Технологий пока нет</h3>
                        <p>Добавьте первую технологию для отслеживания прогресса</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TechnologyList;