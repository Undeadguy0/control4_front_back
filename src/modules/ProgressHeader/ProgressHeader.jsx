import App from "../../App";
import './ProgressHeader.css'
import { LinearProgress, Box, Typography, Paper } from '@mui/material';

function ProgressHeader({ technologies, filteredCount, totalCount }) {
    const total = technologies.length;
    const completed = technologies.filter(t => t.state === "Завершено").length;
    const inProgress = technologies.filter(t => t.state === "В процессе").length;
    const notStarted = technologies.filter(t => t.state === "Не начато").length;
    const progress = total > 0 ? (completed / total) * 100 : 0;

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Общий прогресс</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                />
                <Typography variant="h6" color="primary">{progress}%</Typography>
            </Box>
        </Paper>
    );
}

export default ProgressHeader;