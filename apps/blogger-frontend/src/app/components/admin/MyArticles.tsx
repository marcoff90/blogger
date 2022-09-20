import {Box, Button, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ArticleI} from "../../interfaces/articleI";
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import {countComments} from "../../utils/count-comments";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";

type Props = {
  articles: ArticleI[]
}

const MyArticles: React.FC<Props> = ({articles}) => {
  const [checkboxSelection, setCheckboxSelection] = useState<GridRowId[]>([]);
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  articles.forEach(article => {
    article.commentsCount = countComments(article);
  });

  const handleEdit = (params: GridCellParams) => {
    if (checkboxSelection.length > 1) {
      enqueueWarningSnackbar('Please select just one article to edit');
    } else if (checkboxSelection.length === 1) {
      const id = checkboxSelection[0];
      // TODO send to edit page
      console.log(id);
    } else {
      const id = params.row.id;
      // TODO send to edit page
      console.log(id);
    }
  };

  const handleDelete = (params: GridCellParams) => {
    if (checkboxSelection.length === 0) {
      const id = params.row.id;
      console.log(id);
      // TODO send delete request
    } else {
      // TODO for each checkbox selection id send delete request
      console.log(checkboxSelection);
    }
  };

  const actionsButtons = (params: GridCellParams) => {
    return (
      <>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <EditIcon onClick={() => handleEdit(params)} sx={{cursor: 'pointer'}}/>
          <DeleteIcon onClick={() => handleDelete(params)} sx={{cursor: 'pointer'}}/>
        </Box>
      </>
    )
  };

  const columns: GridColumns = [
    {field: 'id', headerName: 'Id', width: 50},
    {field: 'title', headerName: 'Article title', width: 250},
    {field: 'perex', headerName: 'Perex', width: 350},
    {field: 'username', headerName: 'Author', width: 150},
    {field: 'commentsCount', headerName: '# of comments', width: 150},
    {field: 'actions', headerName: 'Actions', renderCell: actionsButtons},
  ];

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Typography variant={'h4'} mr={10}>My Articles</Typography>
        <Button variant={'contained'} size={'small'}>Create Article</Button>
      </Box>
      <Box my={10}>
        <DataGrid checkboxSelection
                  disableSelectionOnClick
                  onSelectionModelChange={(itm) => setCheckboxSelection(itm)}
                  columns={columns}
                  pageSize={10}
                  rows={articles}
                  loading={!articles.length}
                  autoHeight
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                  }}/>
      </Box>
    </>
  );
};





export default MyArticles;
