import React from "react";
import {ArticleI} from "../../interfaces/articleI";
import {Box, Link, Typography} from "@mui/material";
import {countComments} from "../../utils/count-comments";

type Props = {
  article: ArticleI
}

const Article: React.FC<Props> = ({article}) => {

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '60%'}} my={3}>
        <Box>
          <img width={'160px'} height={'160px'} src={article?.image} alt={'image'}
               style={{marginTop: '2rem', objectFit: 'cover', display: 'block'}}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column'}} ml={5}>
          <Typography variant={'h5'} my={3}>{article.title}</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link href={`/blogs/${article.username}/articles`} fontSize={10}>{article.username}</Link>
            <Typography fontSize={10}>
              &nbsp;•&nbsp;{new Date(article.created_at * 1000).toLocaleDateString("en-US")}
            </Typography>
          </Box>
          <Typography my={2} fontSize={15}>{article.perex}</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Link href={'/'} fontSize={10} mr={3}>Read whole article</Link>
            <Typography fontSize={10}>Comments {countComments(article)}</Typography>
          </Box>
        </Box>
      </Box>

    </>
  )
};

export default Article;
