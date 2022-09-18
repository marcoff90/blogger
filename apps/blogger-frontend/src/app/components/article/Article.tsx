import React from "react";
import {ArticleI} from "../../interfaces/articleI";
import ReactMarkdown from 'react-markdown';

type Props = {
  article: ArticleI,
}

const Article: React.FC<Props> = ({article}) => {
  return (
    <>
      <ReactMarkdown>
        {article.content}
      </ReactMarkdown>
    </>
  )
};

export default Article;
