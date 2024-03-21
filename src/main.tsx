import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ThemeProvider from './app/common/context/theme';
import { DataContextProvider } from './app/common/context/data';
import { ContextProviderComposer } from './app/common/context/provider-composer';

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
            <App />
        </ContextProviderComposer>
    </BrowserRouter>
);
