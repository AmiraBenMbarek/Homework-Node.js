import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 9090;

app.get('/game', (req, res) => {
    fs.readFile("./SteamGames.json", (err, data) => {
        var game = JSON.parse(data);
        res.status(200).json(game);
    })
})

app.get('/game/select/:year', (req, res) => {
    var year = req.params.year;
    fs.readFile("./SteamGames.json", (err, data) => {
        var selectedGames = JSON.parse(data).filter((e) => e.Year > year);
        res.status(200).json({ "Games from ": year, "are": selectedGames })
    })
})

app.get('/game/:name', (req, res) => {
    fs.readFile("./SteamGames.json", (err, data) => {
        var URL = JSON.parse(data).find((e) => e.Game === req.params.name).GameLink;
        res.status(200).json({ URL })
    })

})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});