// src/modules/SearchBox/SearchBox.jsx
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

function SearchBox({ searchQuery, onSearchChange }) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="primary" />
                    </InputAdornment>
                ),
                endAdornment: searchQuery && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => onSearchChange('')}
                            edge="end"
                            size="small"
                        >
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.paper'
                }
            }}
        />
    );
}

export default SearchBox;