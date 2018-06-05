const rp = require('request-promise');
const cheerio = require('cheerio');
const database = require('./database');

//Solo betis, de momento
const links_teams = ['http://www.laligafantasymarca.com/equipos/betis'];
const base_url = 'http://www.laligafantasymarca.com';

/*const options = {
  uri: links_teams[0],
  transform: function (body) {
    return cheerio.load(body);
  }
};*/

database.connectDB();

/*rp(options)
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

        //Solo Adan, de momento
        const options2 = {
          uri: base_url+players_link[0],
          transform: function (body) {
            return cheerio.load(body);
          }
        };
        rp(options2)
          .then(($) => { 
            var player_stats = $(".matchstats tbody").find("tr")
            var fixtures = []
            player_stats.each(function(i, link){ 
              fixtures.push($($(link).find("td")[1]).text())
            });
            
            console.log(fixtures[0]);
          })
          

            
        
    })
    .catch((err) => {
        console.log(err);
});*/