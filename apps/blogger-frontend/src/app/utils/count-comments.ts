import {ArticleI} from "../interfaces/articleI";

export const countComments = (article: ArticleI) => {
  let count = article.comments?.length ? article.comments.length : 0;
  article.comments?.map(child => {
    if (child?.children?.length > 0) {
      count += child.children.length;
      child.children.map(secondLevel => {
        if (secondLevel.children?.length > 0) {
          count += secondLevel.children.length;
          secondLevel.children.forEach(thirdLevel => {
            if (thirdLevel.children?.length > 0) {
              count += thirdLevel.children.length
            }
          });
        }
      });
    }
  });
  return count;
};
