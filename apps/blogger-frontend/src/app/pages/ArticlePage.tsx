import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useWarningSnackbar} from "../hooks/useWarningSnackbar";
import {AppLoaderStyled} from "../components/styled/app-loader.styled";
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import {useGetArticleByUsernameAndIdQuery} from "../api/graphql/useGetArticleByUsernameAndIdQuery";
import routes from "../constants/routes";
import Article from "../components/article/Article";
import RelatedArticles from "../components/article/RelatedArticles";
import CommentsList from "../components/comment/CommentsList";
import Reply from "../components/comment/Reply";
import {Slide} from "react-awesome-reveal";
import {FieldValues, useForm} from "react-hook-form";
import {useAddComment} from "../api/comment/mutations/useAddComment";

const ArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const {username, articleId} = useParams();
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const [toggleReply, setToggleReply] = useState(false);
  const {handleSubmit, control} = useForm();
  const {mutate} = useAddComment();

  const {data, status, error} = useGetArticleByUsernameAndIdQuery({
    username: username,
    articleId: articleId ? parseInt(articleId) : undefined
  });

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  const handleAddComment = (data: FieldValues) => {
    console.log('hello')
    const {author, content} = data;
    if (!author || !content || !articleId) {
      enqueueWarningSnackbar('Both fields must be filled');
    } else {
      mutate({articleId: articleId, commentData: {author: author, content: content}});
    }
  };

  if (error) {
    enqueueWarningSnackbar('Article does not exist');
    navigate(routes.home);
  }

  return (
    <>
      {status === 'success' ?
        <>
          <Grid container spacing={10} rowSpacing={3}>
            <Grid item xs={8} p={10} sx={{borderBottom: 1, borderColor: 'secondary.main'}}>
              <Article article={data.getArticleByUsernameAndId}/>
            </Grid>
            <Grid item xs={4} mt={3} sx={{borderLeft: 1, height: '50vh', borderColor: 'secondary.main'}}>
              <Typography variant={'h5'}>Related articles</Typography>
              <RelatedArticles limit={4} username={data.getArticleByUsernameAndId.username}
                               articleId={data.getArticleByUsernameAndId.id}/>
            </Grid>
            <Grid item xs={8} pb={3} sx={{borderBottom: 1, borderColor: 'secondary.main'}}>
              <Button variant="contained" onClick={handleToggleReply}>Add Comment</Button>
              {
                toggleReply &&
                <Slide direction={'down'}>
                  <Reply newComment={true} control={control} handleSubmit={handleSubmit} handler={handleAddComment}/>
                </Slide>
              }
            </Grid>

            {
              data.getArticleByUsernameAndId.comments &&
              <Grid item xs={8}>
                <CommentsList comments={data.getArticleByUsernameAndId.comments} pagination={true}/>
              </Grid>
            }
          </Grid>

        </>

        :
        <AppLoaderStyled>
          <CircularProgress/>
        </AppLoaderStyled>
      }

    </>
  );
};

export default ArticlePage;
