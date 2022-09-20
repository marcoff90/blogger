import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {ArticleI} from "../../interfaces/articleI";
import {Image} from '../styled/image.styled';
import MDEditor from '@uiw/react-md-editor';
import ImageDialog from "./ImageDialog";
import {Controller, FieldValues, useForm} from "react-hook-form";
import useAuth from "../../auth/useAuth";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import {useCreateArticle} from "../../api/article/mutations/useCreateArticle";
import {useEditArticle} from "../../api/article/mutations/useEditArticle";

type Props = {
  pageTitle: string;
  article?: ArticleI;
}

/**
 * Reused for editing and creating article -> when editing prefills the data, based on if article is present, sends
 * the request to updateArticle or createArticle
 * @param pageTitle
 * @param article
 * @constructor
 */

const AdminArticle: React.FC<Props> = ({pageTitle, article}) => {
  const [value, setMarkDownValue] = useState<string | undefined>(article?.content ?? 'Supports markdown. Yay');
  const [showImage, setShowImage] = useState(true);
  const {handleSubmit, setValue, control} = useForm();
  const [open, setOpen] = useState(false);
  const [articleState, setArticleState] = useState<string>(article?.state ?? '');
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const create = useCreateArticle();
  const update = useEditArticle();
  const auth = useAuth();

  const handleSubmitArticle = (data: FieldValues) => {
    const {image, title, perex} = data;
    const content = value;
    const userId = auth?.user?.id

    if (article && userId) {
      const articleData = {
        title: title ?? article.title,
        perex: perex ?? article.perex,
        content: content ?? article.content,
        image: image ?? article.image,
        state: articleState
      };
      update.mutate({
        userId: userId.toString(),
        token: auth?.user?.token ?? '',
        articleId: article.id.toString(),
        articleData
      })
    } else {
      if (!image || !title || !perex || !content || !userId || articleState.length < 1) {
        enqueueWarningSnackbar(`All fields must be filled including image and article's state through button`);

      } else {
        const articleData = {
          title: title,
          perex,
          content,
          image,
          state: articleState
        };
        create.mutate({
          userId: userId.toString(),
          token: auth?.user?.token ?? '',
          articleData
        })
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDraftState = () => {
    setArticleState('draft');
  };

  const handleDoneState = () => {
    setArticleState('done');
  };

  const handleDeleteImage = () => {
    if (article) {
      article.image = '';
      setShowImage(false);
    }
  }

  return (
    <>
      <Box component="form"
           sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
           onSubmit={handleSubmit((data) => {
             handleSubmitArticle(data);
           })}>

        <Typography variant={'h4'}>{pageTitle}</Typography>

        <Button variant={'contained'} size={'small'} sx={{margin: '25px'}}
                type="submit" onClick={handleDoneState}>Publish Article</Button>

        <Button variant={'outlined'} size={'small'} sx={{margin: '25px'}}
                type={'submit'} onClick={handleDraftState}>Save as draft</Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column'}} my={5}>
        <Typography>Article Title</Typography>
        <Controller
          render={({field}) => (
            <TextField
              required
              {...field}
              id="title"
              label="Title"
              name='title'
              defaultValue={article?.title ?? ''}
              variant="filled"
              sx={{width: '60%'}}
            />
          )}
          name="title"
          control={control}
        />
        <Controller
          render={({field}) => (
            <TextField
              required
              {...field}
              id="perex"
              label="Perex"
              name='perex'
              multiline={true}
              defaultValue={article?.perex ?? ''}
              sx={{width: '60%', marginTop: '1rem'}}
            />
          )}
          name="perex"
          control={control}
        />

      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column'}} my={5}>
        <Typography>Featured image</Typography>
        {
          article ?
            <>
              {showImage && <Image width={150} src={article.image} alt={'image'}/>}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '150px',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography fontSize={12} color={'primary.main'}
                            onClick={handleClickOpen} sx={{cursor: 'pointer'}}>Upload new</Typography>
                <Typography fontSize={12} color={'error.main'}
                            onClick={handleDeleteImage} sx={{cursor: 'pointer'}}>Delete</Typography>
              </Box>

            </>
            :
            <>
              <Button variant={'contained'}
                      color={'secondary'}
                      size={'small'}
                      onClick={handleClickOpen}
                      sx={{width: '10rem', marginTop: '20px'}}>Upload
                an image</Button>
            </>

        }
      </Box>
      <Box my={10} sx={{width: '60%'}}>
        <div data-color-mode="light">
          <MDEditor
            value={value}
            height={800}
            onChange={setMarkDownValue}/>
        </div>
      </Box>
      <ImageDialog open={open} handleClose={handleClose} control={control} setValue={setValue}/>
    </>
  );
};

export default AdminArticle;
