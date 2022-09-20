import React, {useState} from "react";
import {CommentI} from "../../interfaces/commentI";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import CommentList from "./CommentsList";
import {avatars} from "../../constants/avatars";
import Reply from '../comment/Reply';
import {Slide} from "react-awesome-reveal";
import {FieldValues, useForm} from "react-hook-form";
import {useAddComment} from "../../api/comment/mutations/useAddComment";
import {useParams} from "react-router-dom";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import Vote from "../Vote";

type Props = {
  comment: CommentI;
};

const Comment: React.FC<Props> = ({comment}) => {
  const [toggleChildren, setToggleChildren] = useState(false);
  const [toggleReply, setToggleReply] = useState(false);
  const {handleSubmit, control} = useForm();
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const {mutate} = useAddComment();
  const {articleId} = useParams();

  const handleAddComment = (data: FieldValues) => {
    const {author, content} = data;
    if (!author || !content || !articleId) {
      enqueueWarningSnackbar('Both fields must be filled');
    } else {
      mutate({
        articleId: articleId,
        commentData: {
          author: author,
          content: content,
          parent_id: comment.id
        }
      });
    }
  };

  const handleToggleChildren = () => {
    setToggleChildren(!toggleChildren);
  };

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  }

  return (
    <>
      <Box my={3} sx={{border: '2px solid #2196f3', borderRadius: '0.5rem', display: 'flex'}}>
        <Box m={5}>
          <Avatar src={avatars[Math.floor(Math.random() * avatars.length)].avatar} alt={comment.author}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}} my={4}>
          <Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '0.25rem', alignItems: 'center'}}>
            <Typography fontWeight={600}>{comment.author}</Typography>
            <Typography
              fontSize={12}>&nbsp;•&nbsp;{new Date(comment.created_at * 1000).toLocaleString("en-US")}</Typography>
          </Box>
          <Typography>{comment.content}</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: '1rem'
          }}>
            <Vote votesCount={comment.votes[0].upvotes - comment.votes[0].downvotes} articleId={articleId ?? ''} commentId={comment.id}/>
            <Button variant="contained" size={'small'} onClick={handleToggleReply}>{toggleReply ? 'Hide' : 'Join'}</Button>
          </Box>
        </Box>
      </Box>

     <Grid container xs={12}>
       {
         comment.children?.length > 0 &&
         <Grid item xs={2}>
           <Typography
             onClick={handleToggleChildren}
             fontSize={12}
             fontWeight={600}
             color={'primary.main'}
             sx={{cursor: 'pointer', width: '100px', marginRight: '0'}} pl={5}>{toggleChildren ? 'Show Less' : 'Show' +
             ' More'}</Typography>
         </Grid>

       }
       {
         toggleReply &&
           <Grid item xs={comment.children?.length > 0 ? 10 : 12}>
             <Slide duration={2000} direction={'left'}>
               <Reply newComment={false} control={control} handleSubmit={handleSubmit} handler={handleAddComment}/>
             </Slide>
           </Grid>
       }
     </Grid>
      {
        comment.children?.length > 0 && (
          <>
            {
              toggleChildren &&
              <Slide duration={2000} direction={'left'}>
                <Box sx={{paddingLeft: '3rem'}}>
                  <CommentList comments={comment.children} pagination={false}/>
                </Box>
              </Slide>

            }
          </>
        )
      }
    </>
  );
};

export default Comment;
