import { gql } from 'apollo-boost';

const getPlayerQuery = gql`
  query($playerId: ID!) {
    player(id: $playerId) {
      name
      fixtures {
        number
        generalStats {
          PJ
          Plus60
        }
        deffensiveStats {
          P
          D
          P0
          PTYD
        }
        bonusStats {
          REC
          MAR
          PER
        }
        negativeStats {
          GE
        }
      }
      generalInfo {
        totalPoints
        position
      }
      injuries {
        fixture
      }
    }
  }
`;

const getPlayersByPositionQuery = gql`
  query Players($position: String!) {
    players(position: $position) {
      name
      fixtures {
        number
        generalStats {
          PJ
          Plus60
        }
        deffensiveStats {
          P
          D
          P0
          PTYD
        }
        bonusStats {
          REC
          MAR
          PER
        }
        negativeStats {
          GE
        }
      }
      generalInfo {
        totalPoints
        position
      }
      injuries {
        fixture
      }
    }
  }
`;

const getAllPlayersIDsQuery = gql`
  {
    players {
      id
    }
  }
`;

const getAllPlayerQuery = gql`
  {
    players {
      name
    }
  }
`;

export {
  getPlayerQuery,
  getAllPlayerQuery,
  getAllPlayersIDsQuery,
  getPlayersByPositionQuery,
};
