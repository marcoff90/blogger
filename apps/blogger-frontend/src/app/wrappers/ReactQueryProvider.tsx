import React, {useMemo} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';

interface Props {
  children: React.ReactNode,
}

export const ReactQueryProvider: React.FC<Props> = ({children}) => {
  const createClient = () => {
    return new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        }
      }
    })
  };
  const queryClient = useMemo(createClient, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}
