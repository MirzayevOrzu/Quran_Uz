import * as React from 'react';
import { excludeTafsir } from '../utils';
// mui components
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    arabic: {
        fontFamily: 'DroidArabicNaskhRegular',
        textAlign: "right",
        fontWeight: "normal",
        fontStyle: "normal",
    }
  });
  

export interface AyahProps {
    ayahTranslation: {
        text: string;
        number: number;
    },
    ayahArabic: string;
}

const Ayah = (props: AyahProps) => {
    const classes = useStyles();

    return (
        <Container
            className="ayah"
            maxWidth="md"
            style={{padding: 0}}
        >
            <Paper elevation={2} className={classes.root} >
                <Box m={[1, 2, 3]} p={[1, 2, 3]}>
                    <Typography variant="h6" className={classes.arabic}>
                        {props.ayahArabic}
                    </Typography>
                    <Typography variant="subtitle1" >
                        {excludeTafsir(props.ayahTranslation.text)}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default Ayah;
