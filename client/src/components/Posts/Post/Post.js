import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const likeCount = post.likes.length;
    const isLogged = user?.result;
    const userId = user?.result?.googleId ? user?.result?.googleId : user?.result?._id;

    const Likes = () => {
        if(!isLogged) return ( <><ThumbUpAltOutlined fontSize="small" /> &nbsp; {likeCount}</> ) 
        else {
            if(post.likes.includes(userId)) return ( <><ThumbUpAltIcon fontSize="small" /> &nbsp; {likeCount}</> ) 
            else return ( <><ThumbUpAltOutlined fontSize="small" /> &nbsp; {likeCount}</> ) 
        }
    }

    const EditButton = () => {
        if(isLogged) {
            if(post.creator === userId) return ( <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}> <MoreHorizIcon fontSize="medium" /> </Button>)
        }
        
        return null;
    }

    const DeleteButton = () => {
        if(isLogged) {
            if(post.creator === userId) return ( 
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>)
        }
        
        return null;
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <EditButton />
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => tag !== "" ? `#${tag} ` : '')}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                <DeleteButton />
            </CardActions>
        </Card>
    );
}

export default Post;