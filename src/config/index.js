export const CONFIG = {
  appName: 'Investment Programming & Management System',
  shortName: 'IPMS',
  version: '0.1.1',
  author: 'Mark Lester A. Bolotaolo',
  graphQLEndpoint: process.env.DEV
    ? // ? 'https://da-ipms.herokuapp.com/graphql'
      'http://localhost:8000/graphql'
    : 'https://da-ipms.herokuapp.com/graphql'
};
