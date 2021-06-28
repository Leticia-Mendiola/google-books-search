import React from "react";
import { 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography,
    Button,
    makeStyles,
    Link 
    } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex", 
    },
    media: {
        width: 110,
        objectFit: "scale-down"
    }
}));

function CardComp({ googleBooksId, volumeInfo }) {
    const classes = useStyles();

    return (
        <Card 
            className={classes.root}
            key={googleBooksId}
        >
            <CardMedia 
            className={classes.media}
            component="img"
            image={volumeInfo.imageLinks.smallThumbnail}
            />
            <CardContent>
                <Typography variant="h5" component="h2">{volumeInfo.title}</Typography>
                <Typography variant="body2" component="p">published: {volumeInfo.publishedDate}</Typography>
                <Typography variant="body2" component="p">authors: {volumeInfo.authors.join(', ')}</Typography>
                <Typography variant="body2" component="p">description: {volumeInfo.description}</Typography>
            </CardContent>
            <CardActions>
                <Button href={volumeInfo.previewLink} target="_blank">
                    View
                </Button>
                <Button>Save</Button>
            </CardActions>
        </Card>
    )
};

export default CardComp;