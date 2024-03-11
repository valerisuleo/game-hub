import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { CounterProvider } from './app/views/exercises/working-with-context/context/counter';
import { ContextProviderComposer } from './app/views/exercises/working-with-context/context/provider-composer/provider-composer';
import ThemeProvider from './app/common/context/theme';
import { SideNavProvider } from './app/common/side-nav/context/useSideNav';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ContextProviderComposer
            contexts={[
                <CounterProvider children={undefined} />,
                <ThemeProvider children={undefined} />,
                <SideNavProvider children={undefined} />,
            ]}
        >
            <App />
        </ContextProviderComposer>
    </BrowserRouter>
);
