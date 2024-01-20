import {json, Request, Response} from 'express';
import {Document} from "mongoose";
import fs from 'fs';


export async function createScraper(req: Request, res: Response) {
    const {path, source, tech} = req.body;
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


export async function testExecuteScrapyScraper() {
    const exec = require('child_process').exec;
    exec('py src/scrapers/scrapy/pcfactory.py', (err: any, stdout: any, stderr: any) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(stdout);
        console.log(stderr);
        return json(stdout);
    })
}


export async function detectScrapersFiles(req: Request, res: Response) {
    const path = 'src/scrapers/puppeteer';
    const files = fs.readdirSync(path);
    return res.json({
        message: 'Files detected',
        status: 200,
        data: files
    });
}