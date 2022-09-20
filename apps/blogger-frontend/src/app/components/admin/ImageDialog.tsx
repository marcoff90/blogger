import React from "react";
import { Box, Dialog, IconButton} from "@mui/material";
import {Image} from '../styled/image.styled';
import CloseIcon from '@mui/icons-material/Close';
import {Controller, FieldValues} from "react-hook-form";
import {Control, UseFormSetValue} from "react-hook-form/dist/types/form";

type Props = {
  open: boolean;
  handleClose: () => void;
  control: Control,
  setValue: UseFormSetValue<FieldValues>
}

const ImageDialog: React.FC<Props> = ({open, handleClose, setValue, control}) => {
  const images = [
    {url: '../../../assets/article-images/image1.jpeg'},
    {url: '../../../assets/article-images/image2.jpeg'},
    {url: '../../../assets/article-images/image3.jpeg'},
    {url: '../../../assets/article-images/image4.jpeg'},
    {url: '../../../assets/article-images/image5.jpeg'}
  ]

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          <>
            <Controller
              render={({field}) => (
                <>
                  {images.map(
                    ({url}, index) => (
                      <Box p={10}>
                        <Image src={url}
                               width={159}
                               {...field}
                               style={{cursor: 'pointer'}}
                               onClick={() => {
                                 setValue('image', url);
                                 handleClose();
                               }}/>
                      </Box>
                    ))}
                </>
              )}
              name="image"
              control={control}
            />

          </>
        </Box>
      </Dialog>
    </>
  );
};
export default ImageDialog;
