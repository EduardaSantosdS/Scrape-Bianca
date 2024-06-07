import puppeteer from 'puppeteer';
import express from 'express';

const router = express();

router.get('/scrape', async (req, res) => {
    try {
        const data = await scrapePageBianca();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer o scraping' });
    }
});

async function scrapePageBianca() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto('http://bianca.com', { waitUntil: 'load' });

        const data = await page.evaluate(() => {
            const data = Array.from(document.querySelectorAll('h1')).map(h1 => h1.innerText);
            return { data };
        });

        await browser.close();
        return data;
    } catch (error) {
        console.error('Erro ao acessar a página:', error);
        await browser.close();
        throw error;
    }
}

export default router ;