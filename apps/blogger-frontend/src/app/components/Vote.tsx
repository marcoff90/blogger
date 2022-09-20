import React, {useState} from "react";
import {Grid, Typography} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useAddVote} from "../api/vote/mutations/useAddVote";

type Props = {
  votesCount: number;
  articleId: string;
  commentId: number;
}

const Vote: React.FC<Props> = ({votesCount, articleId, commentId}) => {
  const [upvote, setUpvote] = useState<boolean | null>(null);
  const [downvote, setDownvote] = useState<boolean | null>(null);
  const [upvoteAdded, setUpvoteAdded] = useState<boolean>(false);
  const [downvoteAdded, setDownvoteAdded] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(votesCount);
  const {mutate} = useAddVote();

  const params = {
    articleId: articleId,
    commentId: String(commentId),
    voteData: {
      upvote: upvote,
      downvote: downvote
    }
  };

  const handleAddUpVote = () => {
    setUpvote(true);
    setDownvote(null);
    mutate(params);
    if (!upvoteAdded) {
      setVoteCount(voteCount + 1)
    } else {
      setVoteCount(voteCount - 1)
    }
    setUpvoteAdded(!upvoteAdded);
    setDownvoteAdded(false);
  };

  const handleDownVote = () => {
    setDownvote(true);
    setUpvote(null);
    mutate(params);
    if (!downvoteAdded) {
      setVoteCount(voteCount - 1)
    } else {
      setVoteCount(voteCount + 1)
    }
    setDownvoteAdded(!downvoteAdded);
    setUpvoteAdded(false);
  }

  return (
    <>
      <Grid container xs={12} pt={1} columns={3} columnGap={1} sx={{alignItems: 'center'}} pr={2}>
        <Grid item>
          <Typography>{voteCount}</Typography>
        </Grid>
        <Grid item sx={{cursor: 'pointer'}}>
          <KeyboardArrowUpIcon fontSize={'large'} onClick={handleAddUpVote}/>
        </Grid>
        <Grid item sx={{cursor: 'pointer'}}>
          <KeyboardArrowDownIcon fontSize={'large'} onClick={handleDownVote}/>
        </Grid>
      </Grid>
    </>
  )
};

export default Vote;
