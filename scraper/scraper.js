"use strict";
exports.__esModule = true;
var cheerio = require('cheerio');
var rp = require('request-promise');
var base_url = 'http://www.laligafantasymarca.com';
var options_teams = {
    uri: base_url,
    transform: function (body) {
        return cheerio.load(body);
    }
};
function return_url_options(url) {
    return {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
}
//Read the list of teams for this season
function scrap_teams(links_teams) {
    rp(options_teams)
        .then(function ($) {
        console.log("Started team info scraping");
        var team_links = $(".teams-menu").find('a');
        team_links.each(function (i, link) {
            var t = { name: link.attribs.title, link: link.attribs.href, players: [] };
            links_teams.push(t);
        });
        scraping_players_links(links_teams);
    });
}
exports["default"] = scrap_teams;
function scraping_players_links(links_teams) {
    links_teams.map(function (team, i) {
        return rp(return_url_options(base_url + links_teams[i].link))
            .then(function ($) {
            console.log("Scraping players from team " + links_teams[i].name);
            var players_link = [];
            $(".tablepager tr h3 a").each(function (link) {
                var link_player = $(this).attr("href");
                if (players_link.filter(function (x) { return x === link_player; }).length === 0) {
                    players_link.push(link_player);
                    scraping_player_stats(link_player, team);
                }
            });
            // team.players = players_link.map(x => {return {name: "A", link:x}})
            // links_players.push({name_team: links_teams[i].name, links_players: players_link})
            // scraping_player_stats()
        });
    });
}
function scraping_player_stats(link_player, team) {
    rp(return_url_options(base_url + link_player))
        .then(function ($) {
        var name_player = $('.name').text();
        var position = "";
        var value = 0;
        $('.info .left .title').each(function (index, element) {
            if ($(element).text() === "Demarcación") {
                position = ($(element).next().text().trim());
            }
            if ($(element).text() === "Valor") {
                value = ($(element).next().text()).slice(0, -2);
            }
        });
        var p = { name: name_player,
            position: position,
            value: value };
        team.players = team.players.concat(p);
    });
}
