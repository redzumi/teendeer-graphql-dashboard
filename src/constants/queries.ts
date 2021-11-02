import { gql } from '@apollo/client';

export const TALENT_MANY = gql`
query talentMany {
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

export const TASK_MANY = gql`
query taskMany {
  taskMany {
    _id
    name
    description
    challengeId
  }
}
`;