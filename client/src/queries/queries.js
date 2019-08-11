import {gql} from 'apollo-boost'

const getPlayerQuery = gql`
{
    player(id: "melero") {
        name,
        fixtures{
          number,
          generalStats{
            PJ,
            Plus60
          },
          deffensiveStats{
            P,D
          },
          bonusStats{
            REC,MAR
          },
        },
        generalInfo{
          totalPoints,
          position
        },
        injuries{
          fixture
        }
    }
}
`

const getAllPlayerQuery = gql`
{
    players {
        name
    }
}
`

export {getPlayerQuery, getAllPlayerQuery}