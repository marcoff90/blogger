import React from "react";
import {ArticleI} from "../../interfaces/articleI";
import ReactMarkdown from 'react-markdown';
import {Box, Typography} from "@mui/material";
import {Image} from "../styled/image.styled";

type Props = {
  article: ArticleI,
}

const Article: React.FC<Props> = ({article}) => {
  return (
    <>
      <Typography variant={'h3'}>{article.title}</Typography>
      <Box sx={{display: 'flex', flexDirection: 'row'}} pt={5}>
        <Typography fontSize={12}>{article.username}</Typography>
        <Typography fontSize={12}>
          &nbsp;•&nbsp;{new Date(article.updated_at * 1000).toLocaleDateString("en-US")}
        </Typography>
      </Box>
      <Image width={'100%'} src={article.image} alt={'image'}/>
      <ReactMarkdown>
        {article.content}
      </ReactMarkdown>
    </>
  )
};

export default Article;
