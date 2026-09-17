import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function profilePhotoSaverPlugin(): Plugin {
  return {
    name: 'profile-photo-saver',
    configureServer(server) {
      server.middlewares.use('/api/save-profile-photo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.image && typeof data.image === 'string' && data.image.startsWith('data:image')) {
                const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const publicTarget = path.resolve(__dirname, 'public/profile.jpg');
                fs.writeFileSync(publicTarget, buffer);
                const distTarget = path.resolve(__dirname, 'dist/profile.jpg');
                if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
                  fs.writeFileSync(distTarget, buffer);
                }
                // Replace any prior generated files so only the authentic photo exists
                const imageDir = path.resolve(__dirname, 'src/assets/images');
                if (fs.existsSync(imageDir)) {
                  fs.readdirSync(imageDir).forEach((file) => {
                    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                      fs.writeFileSync(path.join(imageDir, file), buffer);
                    }
                  });
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Saved permanently to public/profile.jpg' }));
                return;
              }
            } catch (err) {
              console.error('Failed to save profile photo to disk:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Invalid image payload' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), profilePhotoSaverPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
