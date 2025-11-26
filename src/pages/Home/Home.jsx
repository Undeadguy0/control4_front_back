// src/pages/Home/Home.jsx
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import {
    RocketLaunch as RocketIcon,
    Search as SearchIcon,
    Add as AddIcon
} from '@mui/icons-material';
import './Home.css';
import ProgressHeader from "../../modules/ProgressHeader/ProgressHeader";
import TechnologyCard from "../../modules/TechnologyCard/TechnologyCard";
import SearchBox from "../../modules/SearchBox/SearchBox";

function Home({ technologies, onStateChange }) {
    const [searchQuery, setSearchQuery] = useState('');


    const filteredTechnologies = technologies.filter(tech => {
        if (!tech || !tech.name) return false;
        const searchLower = (searchQuery || '').toLowerCase();
        const nameLower = tech.name.toLowerCase();
        return nameLower.includes(searchLower);
    });

    return (
        <div className="home">
            {/* Hero секция с MUI кнопкой */}
            <div className="hero-section">
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <RocketIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                        🚀 Трекер изучения технологий
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Отслеживайте свой прогресс в изучении новых технологий
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        href="/add-technology"
                        sx={{
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Добавить технологию
                    </Button>
                </Box>
            </div>

            <ProgressHeader technologies={technologies} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                <SearchIcon color="primary" />
                <SearchBox
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            </Box>

            <div className="technologies-grid">
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
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            🔍 Технологии не найдены
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Попробуйте изменить поисковый запрос
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => setSearchQuery('')}
                            sx={{ mt: 2 }}
                        >
                            Очистить поиск
                        </Button>
                    </div>
                )}

                {filteredTechnologies.length === 0 && !searchQuery && (
                    <div className="no-results">
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            📝 Технологий пока нет
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Добавьте первую технологию для отслеживания прогресса
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            href="/add-technology"
                            sx={{ mt: 2 }}
                        >
                            Добавить первую технологию
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;