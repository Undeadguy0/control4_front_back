import { useState, useEffect } from 'react';

const MOCK_ROADMAPS = {
    frontend: {
        name: 'Frontend Developer Roadmap',
        technologies: [
            {
                id: 1001,
                name: 'HTML5 & Semantic Web',
                description: 'Изучение современной HTML-разметки и семантических тегов',
                category: 'frontend',
                difficulty: 'beginner',
                state: 'Не начато',
                resources: ['https://html.spec.whatwg.org/', 'https://developer.mozilla.org/ru/docs/Web/HTML']
            },
            {
                id: 1002,
                name: 'CSS3 & Flexbox/Grid',
                description: 'Освоение современных методов верстки и CSS-модулей',
                category: 'frontend',
                difficulty: 'beginner',
                state: 'Не начато',
                resources: ['https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'https://grid.malven.co/']
            },
            {
                id: 1003,
                name: 'JavaScript ES6+',
                description: 'Современный JavaScript: стрелочные функции, деструктуризация, модули',
                category: 'frontend',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://learn.javascript.ru/', 'https://developer.mozilla.org/ru/docs/Web/JavaScript']
            },
            {
                id: 1004,
                name: 'React & Hooks',
                description: 'Библиотека React и современные хуки для управления состоянием',
                category: 'frontend',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://react.dev/', 'https://ru.reactjs.org/']
            },
            {
                id: 1005,
                name: 'State Management (Redux/Zustand)',
                description: 'Управление состоянием приложения в больших проектах',
                category: 'frontend',
                difficulty: 'advanced',
                state: 'Не начато',
                resources: ['https://redux.js.org/', 'https://zustand-demo.pmnd.rs/']
            }
        ]
    },
    backend: {
        name: 'Backend Developer Roadmap',
        technologies: [
            {
                id: 2001,
                name: 'Node.js & Express',
                description: 'Создание серверных приложений на JavaScript',
                category: 'backend',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://nodejs.org/', 'https://expressjs.com/']
            },
            {
                id: 2002,
                name: 'REST API Design',
                description: 'Проектирование и разработка RESTful API',
                category: 'backend',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://restfulapi.net/', 'https://swagger.io/']
            },
            {
                id: 2003,
                name: 'Database Design (SQL/NoSQL)',
                description: 'Работа с реляционными и нереляционными базами данных',
                category: 'backend',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://www.postgresql.org/', 'https://www.mongodb.com/']
            },
            {
                id: 2004,
                name: 'Authentication & Authorization',
                description: 'Системы аутентификации и управления доступом',
                category: 'backend',
                difficulty: 'advanced',
                state: 'Не начато',
                resources: ['https://jwt.io/', 'https://oauth.net/']
            }
        ]
    },
    fullstack: {
        name: 'Fullstack Developer Roadmap',
        technologies: [
            {
                id: 3001,
                name: 'Next.js Framework',
                description: 'Fullstack фреймворк для React с SSR и API routes',
                category: 'fullstack',
                difficulty: 'intermediate',
                state: 'Не начато',
                resources: ['https://nextjs.org/', 'https://nextjs.org/docs']
            },
            {
                id: 3002,
                name: 'GraphQL & Apollo',
                description: 'Альтернатива REST API для эффективной работы с данными',
                category: 'fullstack',
                difficulty: 'advanced',
                state: 'Не начато',
                resources: ['https://graphql.org/', 'https://www.apollographql.com/']
            }
        ]
    }
};

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFromStorage = () => {
            try {
                const saved = localStorage.getItem('techTrackerData');
                if (saved) {
                    const parsedData = JSON.parse(saved);
                    setTechnologies(parsedData);
                }
            } catch (err) {
                setError('Ошибка загрузки данных из хранилища');
                console.error('Storage load error:', err);
            }
        };

        loadFromStorage();
    }, []);

    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        }
    }, [technologies]);

    const importRoadmap = async (roadmapType) => {
        setLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const roadmap = MOCK_ROADMAPS[roadmapType];

            if (!roadmap) {
                throw new Error(`Дорожная карта "${roadmapType}" не найдена`);
            }

            const newTechnologies = roadmap.technologies.filter(newTech =>
                !technologies.some(existingTech => existingTech.id === newTech.id)
            );

            if (newTechnologies.length === 0) {
                throw new Error('Все технологии из этой дорожной карты уже добавлены');
            }

            setTechnologies(prev => [...prev, ...newTechnologies]);

            return {
                success: true,
                importedCount: newTechnologies.length,
                roadmapName: roadmap.name,
                message: `Успешно импортировано ${newTechnologies.length} технологий из "${roadmap.name}"`
            };

        } catch (err) {
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        } finally {
            setLoading(false);
        }
    };

    const addTechnology = (techData) => {
        const newTechnology = {
            id: Date.now(),
            ...techData,
            createdAt: new Date().toISOString(),
            notes: '',
            progress: 0
        };

        setTechnologies(prev => [...prev, newTechnology]);
        return newTechnology;
    };

    // Обновление технологии
    const updateTechnology = (techId, updates) => {
        if (updates._delete) {
            setTechnologies(prev => prev.filter(tech => tech.id !== techId));
        } else {
            setTechnologies(prev =>
                prev.map(tech =>
                    tech.id === techId ? { ...tech, ...updates } : tech
                )
            );
        }
    };

    const updateTechnologyState = (techId) => {
        setTechnologies(prev =>
            prev.map(tech => {
                if (tech.id === techId) {
                    const states = ['Не начато', 'В процессе', 'Завершено'];
                    const currentIndex = states.indexOf(tech.state);
                    const nextState = states[(currentIndex + 1) % states.length];
                    return { ...tech, state: nextState };
                }
                return tech;
            })
        );
    };

    const getAvailableRoadmaps = () => {
        return Object.keys(MOCK_ROADMAPS).map(key => ({
            id: key,
            name: MOCK_ROADMAPS[key].name,
            technologyCount: MOCK_ROADMAPS[key].technologies.length
        }));
    };

    return {
        technologies,
        loading,
        error,
        addTechnology,
        updateTechnology,
        updateTechnologyState,
        importRoadmap,
        getAvailableRoadmaps,
        clearError: () => setError(null),
        setTechnologies
    };
}

export default useTechnologiesApi;