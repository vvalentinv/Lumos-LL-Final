
import './preview-card.styles.scss'
import Box from '@mui/material/Box';
import { maxHeight } from "@mui/system";

const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <div className="q-a">
            
            <div className="container-q">
                <Box
                    component="div"
                    sx={{
                    display: 'flow',
                    p: 0.5,
                    m: 0.5,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#292f41' : '#292f41'),
                    color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffff' : '#ffff',
                    border: '0.6px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#292f41' : '#292f41',
                    borderRadius: 1.2,
                    fontSize: '0.875rem',
                    height: maxHeight,
                    }}
                >
                    {definition}
                </Box>
            </div>
            <div className="vertical"></div>
            <div className="container-a">
                <Box
                    component="div"
                    sx={{
                    display: 'block',
                    p: 0.5,
                    m: 0.5,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#292f41' : '#292f41'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? '#ffff' : '#ffff',
                    border: '0.6px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#292f41' : '#292f41',
                    borderRadius: 1.2,
                    fontSize: '0.875rem',
                    }}
                >
                    {term}
                </Box>
            </div>
        </div>
    )


}

export default PreviewCard;
