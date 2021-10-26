import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";

import { getPosts } from "../../actions/posts";
import Form from "../Form/Form"
import Posts from "../Posts/Posts";
import useStyles from "./styles";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Grow in>
                <Container maxWidth={false}>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={8} lg={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
};

export default Home;