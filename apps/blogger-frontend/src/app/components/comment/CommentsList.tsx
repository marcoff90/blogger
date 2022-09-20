import React, {useState} from "react";
import Comment from "./Comment";
import {CommentI} from "../../interfaces/commentI";
import {Box, Pagination} from "@mui/material";

type Props = {
  comments: CommentI[],
  pagination: boolean;
}

/**
 * Renders comments from array, if the comments have children, the comment component renders them under with padding
 * to create the nesting
 * @param comments
 * @param pagination
 * @constructor
 */

const CommentList: React.FC<Props> = ({comments, pagination}) => {
  const pageSize = 5;
  const [endPagination, setEndPagination] = useState(pageSize);

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setEndPagination(pageNumber * pageSize);
  };

  return (
    <>
      {comments.slice(endPagination - pageSize, endPagination).map(comment => {
        return <Comment comment={comment}/>
      })}
      {
        pagination && comments.length > 0 &&
        <Box sx={{display: 'flex', justifyContent: 'center'}} py={5}>
          <Pagination count={Math.ceil(comments.length / pageSize)}
                      onChange={handleChange}/>
        </Box>
      }
    </>
  )
};

export default CommentList;
