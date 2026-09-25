import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const page = path => fileURLToPath(new URL(path, import.meta.url));

// The landing page and the company pages (About, Contact, Privacy) are each
// an HTML entry of their own; they share the nav, the header row and the
// styles through src/. See src/pages/.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        about: page('./about/index.html'),
        contact: page('./contact/index.html'),
        privacy: page('./privacy/index.html')
      }
    }
  }
});
