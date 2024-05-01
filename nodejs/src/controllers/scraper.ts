import {json, Request, Response} from 'express';
import fs from 'fs';
const mysqlConnection = require('../database/connection');


export async function getScrapers(req: Request, res: Response) : Promise<void> {
    const query  = 'SELECT * FROM scraper';
    mysqlConnection.query(query, (err: Error, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
    });
}


export async function createScraper(req: Request, res: Response) {
    const {path, tech, source} = req.body;
    const pathFile : string = path.match("puppeteer") ? path + '.ts' : path + '.py';


    if (fs.existsSync(pathFile)) {
        return res.json({
            message: 'File already exists',
            status: 200,
            data: pathFile
        });
    }
    else {
        fs.writeFile(pathFile, source, function (err: any) {
            if (err) throw err;
            if (!err) return res.json({
                message: 'File successfully created',
                status: 200,
                data: pathFile
            });
        });
        const query   = 'INSERT INTO scraper (path, tech, source) VALUES (?, ?, ?)';
        mysqlConnection.query(query, [path, tech, source], (err: Error, results) => {
            if (err) throw err;
            return res.json({
                message: 'Scraper successfully created',
                status: 200,
                data: results
            });
        });

    }

}

export async function testCreateFile(req: Request, res: Response) {
    const {path,source,tech} = {path: 'src/scrapers/puppeteer/pcfactory', source: 'test', tech: ['test']}
    const pathFile : string = path.match("puppeteer") ? path + '.ts' : path + '.py';
    if (fs.existsSync(pathFile)) {
        return res.json({
            message: 'File already exists',
            status: 200,
            data: pathFile
        });
    }
    else {
        fs.writeFile(pathFile, source, function (err: any) {
            if (err) throw err;
            if (!err) return console.log('File is created successfully.');
        });
        return res.json({
            message: 'File successfully created',
            status: 200,
            data: pathFile
        });
    }
}

