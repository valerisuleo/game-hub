import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { CounterProvider } from './app/views/exercises/working-with-context/context/counter';
import { ContextProviderComposer } from './app/views/exercises/working-with-context/context/provider-composer/provider-composer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
       <ContextProviderComposer contexts={[<CounterProvider children={undefined} />]}>
            <App />
        </ContextProviderComposer>
    </BrowserRouter>
);
