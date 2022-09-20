import { useSnackbar } from 'notistack';

export const useWarningSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const ourEnqueue = (message: string) =>
    enqueueSnackbar((message), {
      variant: 'warning',
    });

  return {
    enqueueWarningSnackbar: ourEnqueue,
  };
};
