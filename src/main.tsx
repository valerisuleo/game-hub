import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ThemeProvider from './app/common/context/theme';
import { DataContextProvider } from './app/common/context/data';
import { ContextProviderComposer } from './app/common/context/provider-composer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ContextProviderComposer
            contexts={[
                <ThemeProvider children={undefined} />,
                <DataContextProvider children={undefined} />,
            ]}
        >
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools></ReactQueryDevtools>
            </QueryClientProvider>
        </ContextProviderComposer>
    </BrowserRouter>
);
