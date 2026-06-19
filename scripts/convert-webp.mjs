import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public', 'img');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('No se pudo escanear el directorio: ' + err);
    process.exit(1);
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    
    // Only process PNG, JPG, JPEG that haven't been converted to WEBP yet
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(directoryPath, file);
      const outputPath = path.join(directoryPath, file.replace(ext, '.webp'));

      // Avoid reconverting if the .webp already exists
      if (!fs.existsSync(outputPath)) {
        sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`✅ Convertido: ${file} -> ${path.basename(outputPath)}`))
          .catch((err) => console.error(`❌ Error en ${file}:`, err));
      }
    }
  });
});
