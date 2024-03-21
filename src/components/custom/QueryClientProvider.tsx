'use client'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const QueryClientProviderComp = ({children}:{children:React.ReactNode}) => {
   const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:false
      },
    },
   });
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
   
  )
}

export default QueryClientProviderComp
