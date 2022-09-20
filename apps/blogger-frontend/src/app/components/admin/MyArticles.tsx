import {Box, Button, Typography} from "@mui/material";
import React, {useState} from "react";
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
import useAuth from "../../auth/useAuth";
import {useDeleteArticle} from "../../api/article/mutations/useDeleteArticle";

type Props = {
  articles: ArticleI[]
}

const MyArticles: React.FC<Props> = ({articles}) => {
  const [checkboxSelection, setCheckboxSelection] = useState<GridRowId[]>([]);
  const [articlesState, setArticleState] = useState(articles);

  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const {mutate} = useDeleteArticle();
  const auth = useAuth();

  articlesState.forEach(article => {
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
      mutate({userId: `${auth?.user?.id}` ?? '', articleId: id, token: auth?.user?.token ?? ''});
      setArticleState(articlesState.filter(article => article.id !== id));

    } else if (checkboxSelection.length === 1) {
      mutate({
        userId: `${auth?.user?.id}` ?? '',
        articleId: checkboxSelection[0].toString(),
        token: auth?.user?.token ?? ''
      });
      setArticleState(articlesState.filter(article => article.id !== checkboxSelection[0]));

    } else {
      checkboxSelection.forEach(id => {
        mutate({userId: `${auth?.user?.id}` ?? '', articleId: id.toString(), token: auth?.user?.token ?? ''});
        setArticleState(articlesState.filter(article => article.id !== id));
      })
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
    {field: 'title', headerName: 'Article title', width: 200},
    {field: 'perex', headerName: 'Perex', width: 350},
    {field: 'username', headerName: 'Author', width: 100},
    {field: 'state', headerName: 'State', width: 100},
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
                  rows={articlesState}
                  autoHeight
                  components={{
                    NoRowsOverlay: () => (
                      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Typography>
                          Time to write some articles :)
                        </Typography>
                      </Box>
                    )
                  }}
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
