import TuneIcon from '@mui/icons-material/Tune';
import { IconButton } from '@mui/material';
import { useUI } from '../../../hooks'

export const FilterButton = () => {

    const { startChangeStatusModal } = useUI();
  
    return (
  
        <IconButton
            aria-label="filter"
            size="large"
            sx={{
                color: 'primary.main',
            }}
            onClick={startChangeStatusModal}
        >
            <TuneIcon />
        </IconButton>
  
    )
}
