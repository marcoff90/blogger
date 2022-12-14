import React from "react";
import {ArticleI} from "../../interfaces/articleI";
import {Box, Link, Typography} from "@mui/material";
import {countComments} from "../../utils/count-comments";
import {useNavigate} from "react-router-dom";
import {Image} from "../styled/image.styled";

type Props = {
  article: ArticleI
}

const ArticlePreview: React.FC<Props> = ({article}) => {
  const navigate = useNavigate();

  const handleReadArticle = () => {
    navigate(`/blogs/${article.username}/articles/${article.id}`);
  }

  const handleShowUsersArticles = () => {
    navigate(`/blogs/${article.username}/articles`);
  }

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '60%'}} my={3}>
        <Box>
          <Image width={'160px'} height={'160px'} src={article?.image} alt={'image'}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column'}} ml={5}>
          <Typography variant={'h5'} my={3}>{article.title}</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link onClick={handleShowUsersArticles} fontSize={10}>{article.username}</Link>
            <Typography fontSize={10}>
              &nbsp;•&nbsp;{new Date(article.updated_at * 1000).toLocaleDateString("en-US")}
            </Typography>
          </Box>
          <Typography my={2} fontSize={15}>{article.perex}</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link onClick={handleReadArticle} fontSize={10} mr={3}>Read whole article</Link>
            <Typography fontSize={10}>Comments {countComments(article)}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
};

export default ArticlePreview;
