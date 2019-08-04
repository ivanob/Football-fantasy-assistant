# Football-fantasy-assistant

Multinode application to advice about lineups, hires, performance and skills of players in football fantasy.
It focuses in Marca fantasy league (spanish competition)

# Architecture

Architecture is defined in different microservices, orchestrated with docker/docker-compose:
- Client: frontend in React + redux
- Scraper: It scrapes the official web in order to retrieve players stats, game results and updated table. It uses typescript, Cheerio.js
- Mongo: persistence layer is mongo

# Resources
- Tutorial about Graphql https://www.youtube.com/watch?v=ed8SzALpx1Q&t=5652s