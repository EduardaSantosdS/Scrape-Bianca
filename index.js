import express from 'express';
import scrapingRoute from './routes/scraping.js'

const app = express();
const port = 3000;

app.use('/', scrapingRoute);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
});

