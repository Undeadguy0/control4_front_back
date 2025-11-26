// src/modules/TechnologyForm/TechnologyForm.jsx
import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Paper,
    Alert,
    IconButton,
    Chip,
    Grid,
    FormHelperText
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        state: initialData.state || 'Не начато',
        deadline: initialData.deadline || '',
        resources: initialData.resources || ['']
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Валидация формы
    const validateForm = () => {
        const newErrors = {};


        if (!formData.name.trim()) {
            newErrors.name = 'Название технологии обязательно';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Название должно содержать минимум 2 символа';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Название не должно превышать 50 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Описание должно содержать минимум 10 символов';
        }


        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }


        formData.resources.forEach((resource, index) => {
            if (resource && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    // Валидация при каждом изменении формы
    useEffect(() => {
        validateForm();
    }, [formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({
            ...prev,
            resources: newResources
        }));
    };


    const addResourceField = () => {
        setFormData(prev => ({
            ...prev,
            resources: [...prev.resources, '']
        }));
    };

    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                resources: newResources
            }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            // Очищаем пустые ресурсы перед сохранением
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(resource => resource.trim() !== '')
            };
            onSave(cleanedData);
        }
    };

    const getStateIcon = (state) => {
        switch (state) {
            case 'Завершено': return '✅';
            case 'В процессе': return '🔄';
            default: return '⏳';
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 800,
                mx: 'auto',
                borderRadius: 2
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                align="center"
                color="primary"
                fontWeight="bold"
            >
                {initialData.name ? 'Редактирование технологии' : 'Добавление новой технологии'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {/* Поле названия */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Название технологии"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            placeholder="Например: React, Node.js, TypeScript"
                            required
                            variant="outlined"
                        />
                    </Grid>

                    {/* Поле описания */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Описание"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            placeholder="Опишите, что это за технология и зачем её изучать..."
                            multiline
                            rows={4}
                            required
                            variant="outlined"
                        />
                    </Grid>


                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Статус изучения</InputLabel>
                            <Select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                label="Статус изучения"
                            >
                                <MenuItem value="Не начато">⏳ Не начато</MenuItem>
                                <MenuItem value="В процессе">🔄 В процессе</MenuItem>
                                <MenuItem value="Завершено">✅ Завершено</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Категория</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Категория"
                            >
                                <MenuItem value="frontend">Frontend</MenuItem>
                                <MenuItem value="backend">Backend</MenuItem>
                                <MenuItem value="mobile">Mobile</MenuItem>
                                <MenuItem value="devops">DevOps</MenuItem>
                                <MenuItem value="database">Базы данных</MenuItem>
                                <MenuItem value="tools">Инструменты</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Уровень сложности</InputLabel>
                            <Select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                label="Уровень сложности"
                            >
                                <MenuItem value="beginner">Начинающий</MenuItem>
                                <MenuItem value="intermediate">Средний</MenuItem>
                                <MenuItem value="advanced">Продвинутый</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Поле дедлайна */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Планируемая дата освоения"
                            name="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                            error={!!errors.deadline}
                            helperText={errors.deadline}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>

                    {/* Статус формы */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Chip
                                label={`Статус: ${formData.state}`}
                                icon={<span>{getStateIcon(formData.state)}</span>}
                                color={
                                    formData.state === 'Завершено' ? 'success' :
                                        formData.state === 'В процессе' ? 'warning' : 'default'
                                }
                                variant="outlined"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Ресурсы для изучения
                        </Typography>

                        {formData.resources.map((resource, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'flex-start' }}>
                                <TextField
                                    fullWidth
                                    type="url"
                                    value={resource}
                                    onChange={(e) => handleResourceChange(index, e.target.value)}
                                    placeholder="https://example.com"
                                    error={!!errors[`resource_${index}`]}
                                    helperText={errors[`resource_${index}`]}
                                    variant="outlined"
                                    size="small"
                                />
                                {formData.resources.length > 1 && (
                                    <IconButton
                                        onClick={() => removeResourceField(index)}
                                        color="error"
                                        size="small"
                                        sx={{ mt: 0.5 }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}

                        <Button
                            startIcon={<AddIcon />}
                            onClick={addResourceField}
                            variant="outlined"
                            size="small"
                        >
                            Добавить ресурс
                        </Button>
                    </Grid>
                </Grid>

                {!isFormValid && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        Заполните все обязательные поля корректно
                    </Alert>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                        variant="outlined"
                        color="inherit"
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        startIcon={<SaveIcon />}
                        disabled={!isFormValid}
                        variant="contained"
                        size="large"
                    >
                        {initialData.name ? 'Обновить технологию' : 'Добавить технологию'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default TechnologyForm;