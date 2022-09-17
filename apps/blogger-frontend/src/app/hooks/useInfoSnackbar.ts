import { useSnackbar } from 'notistack';

export const useInfoSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const ourEnqueue = (message: string) =>
    enqueueSnackbar((message), {
      variant: 'info',
    });

  return {
    enqueueInfoSnackbar: ourEnqueue,
  };
};
