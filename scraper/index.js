const rp = require('request-promise');
const cheerio = require('cheerio');

const links_teams = ['http://www.laligafantasymarca.com/equipos/betis'];

const options = {
  uri: links_teams[0],
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
    .then(($) => {
        var players_description = $("#players-list").find("table").find(".name").find("a");
       // players_description = players_description.filter(x => x.attribs != undefined);
       // var players_links = players_description.map(x => x.attribs.href);
       var players_link = [];
       players_description.each(function(i, link){ 
          if(!players_link.includes(link.attribs.href)){
            players_link.push(link.attribs.href);
          }
        });
        console.log(players_link)
    })
    .catch((err) => {
        console.log(err);
});