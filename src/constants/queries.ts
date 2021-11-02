import { gql } from '@apollo/client';

export const TALENT_MANY = gql`
query {
  talentMany {
    _id
    name
    tag
  }
}
`;

export const CHALLENGE_MANY = gql`
query challengeMany {
  challengeMany {
    _id
    name
    description
    talentsIds
  }
}
`;