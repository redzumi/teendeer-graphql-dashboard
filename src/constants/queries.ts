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

export const TASK_BY_CHALLENGE = gql`
query taskByChallenge($challengeId: String) {
  tasksByChallenge(challengeId: $challengeId) {
    _id
    name
    description
    challengeId
  }
}
`;

export const STEP_BY_TASK = gql`
query stepsByTask($taskId: String) {
  stepsByTask(taskId: $taskId) {
    _id
    name
    description
    taskId
  }
}
`;