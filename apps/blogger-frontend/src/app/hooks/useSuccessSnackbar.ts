import { useSnackbar } from 'notistack';

export const useSuccessSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const ourEnqueue = (message: string) =>
    enqueueSnackbar((message), {
      variant: 'success',
    });

  return {
    enqueueSuccessSnackbar: ourEnqueue,
  };
};
