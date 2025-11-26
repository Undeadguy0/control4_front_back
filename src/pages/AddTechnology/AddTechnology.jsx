// src/pages/AddTechnology/AddTechnology.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Alert,
    Breadcrumbs,
    Link
} from '@mui/material';
import { Home as HomeIcon, Add as AddIcon } from '@mui/icons-material';
import TechnologyForm from '../../modules/TechnologyForm/TechnologyForm';

function AddTechnology({ onAddTechnology }) {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveTechnology = (techData) => {
        onAddTechnology(techData);
        setShowSuccess(true);

        setTimeout(() => {
            navigate('/technologies');
        }, 2000);
    };

    const handleCancel = () => {
        navigate('/technologies');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Хлебные крошки */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    color="inherit"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Главная
                </Link>
                <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AddIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Добавить технологию
                </Typography>
            </Breadcrumbs>

            {/* Заголовок */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    Добавить новую технологию
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Заполните информацию о технологии, которую хотите изучить
                </Typography>
            </Box>

            {/* Сообщение об успехе */}
            {showSuccess && (
                <Alert
                    severity="success"
                    sx={{ mb: 3 }}
                    action={
                        <Link
                            href="/technologies"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/technologies');
                            }}
                            sx={{ cursor: 'pointer' }}
                        >
                            Перейти сейчас
                        </Link>
                    }
                >
                    ✅ Технология успешно добавлена! Перенаправляем...
                </Alert>
            )}

            {/* Форма */}
            <TechnologyForm
                onSave={handleSaveTechnology}
                onCancel={handleCancel}
            />
        </Container>
    );
}

export default AddTechnology;