import React from "react";
import {ArticleI} from "../interfaces/articleI";


type Props = {
  article?: ArticleI
}

const ArticlePage: React.FC<Props> = ({article}) => {
  return (
    <>
      <h1>Article Page</h1>
    </>
  );
};

export default ArticlePage;
