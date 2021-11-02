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

export const UPDATE_CHALLENGE = gql`
  mutation updateChallenge($id: MongoID!, $record: UpdateByIdChallengeInput!) {
    challengeUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

export const CREATE_CHALLENGE = gql`
  mutation createChallenge($record: CreateOneChallengeInput!) {
    challengeCreateOne(record: $record) {
      recordId
    }
  }
`;

export const UPDATE_STEP = gql`
  mutation updateStep($id: MongoID!, $record: UpdateByIdStepInput!) {
    stepUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

export const CREATE_STEP = gql`
  mutation createStep($record: CreateOneStepInput!) {
    stepCreateOne(record: $record) {
      recordId
    }
  }
`;

export const UPDATE_TALENT = gql`
  mutation updateTalent($id: MongoID!, $record: UpdateByIdTalentInput!) {
    talentUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

export const CREATE_TALENT = gql`
  mutation createTalent($record: CreateOneTalentInput!) {
    talentCreateOne(record: $record) {
      recordId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: MongoID!, $record: UpdateByIdTaskInput!) {
    taskUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($record: CreateOneTaskInput!) {
    taskCreateOne(record: $record) {
      recordId
    }
  }
`;

export const CREATE_USER = gql`
  mutation userCreateOne($record: CreateOneUserInput!) {
    userCreateOne(record: $record) {
      record {
        login
        firstName
        secondName
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    me {
      _id
      login
      firstName
      secondName
      talents
    }
    talentMany {
      _id
      name
    }
  }
`;

export const ADD_TALENTS = gql`
  mutation addTalents($talentsIds: [String]) {
    addTalents(talentsIds: $talentsIds) {
      login
    }
  }
`;

export const TALENT_REMOVE = gql`
mutation talentRemove($talentId: MongoID!) {
  talentRemoveById(_id: $talentId) {
    recordId
  }
}`;