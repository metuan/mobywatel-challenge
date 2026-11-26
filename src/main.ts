import '@/styles/index.css';
import { html, render } from '@/lib/preact';
import { App } from '@/app/App';

const root = document.getElementById('root');
if (root) render(html`<${App} />`, root);
