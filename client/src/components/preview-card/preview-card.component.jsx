
import './preview-card.styles.scss'
import Box from '@mui/material/Box';
import { maxHeight } from "@mui/system";

const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <div className="q-a">
            {/* <div className="container-q"> */}
                <div className='answer'>
                {/* <Box
                    component="div"
                    sx={{
                    display: 'flow',
                    // p: 0.5,
                    m: 0.5,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#292f41' : '#292f41'),
                    color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffff' : '#ffff',
                    border: '0.6px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#292f41' : '#292f41',
                    borderRadius: 1.2,
                    fontSize: '1.8vw',
                    height: maxHeight,
                    }}
                > */}
                        {definition}
                    {/* </div> */}
                {/* </Box> */}
            </div>
            <div className="vertical"></div>
            {/* <div className="container-a"> */}
                <div className='question'>
                {/* <Box
                    component="div"
                    sx={{
                    display: 'flow',
                    // p: 0.5,
                    m: 1.2,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#292f41' : '#292f41'),
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? '#ffff' : '#ffff',
                    border: '0.6px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#292f41' : '#292f41',
                    borderRadius: 1.2,
                    fontSize: '2vw',
                    height: maxHeight,
                    // height: '100%',
                    // width: '90%',
                    // textOverflow: 'ellipsis',
                    // overflow: 'hidden',
                    }}
                > */}
                    {term}
                {/* </Box> */}
                </div>
            {/* </div> */}
        </div>
    )


}

export default PreviewCard;
