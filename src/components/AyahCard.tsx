import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    card: {
        textDecoration: "none",
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(grey[200]),
        backgroundColor: grey[200],
        fontSize: theme.spacing(1.5)
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        alingItems: "center",
    }
}))

export interface AyahCardProps {
    data: any
}

const AyahCard = (props: AyahCardProps) => {
    const classes = useStyles();
    console.log(props.data);
    return (
        <Link className={classes.card} to={`/sura/${props.data.id}`}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar} aria-label="recipe">
                            {props.data.id}
                        </Avatar>
                    }
                    title={
                        <div className={classes.content}>
                            <Typography variant="body1" >{props.data.name_simple}</Typography>
                            <Typography variant="h5" className='arabic'>{props.data.name_arabic}</Typography>
                        </div>
                    }
                    subheader={
                        <Typography variant="body2">{props.data.translated_name.name}</Typography>
                    }
                />
            </Card>
        </Link>
    );
}

export default AyahCard;