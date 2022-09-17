import { useSnackbar } from 'notistack';

export const useErrorSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const ourEnqueue = (message: string) =>
    enqueueSnackbar((message), {
      variant: 'error',
    });

  return {
    enqueueErrorSnackbar: ourEnqueue,
  };
};
