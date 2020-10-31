import { Dialog } from 'quasar';

export const graphQLErrorMessages = errorsFromCatch => {
  const errors = errorsFromCatch.graphQLErrors[0];
  const messages = [];

  if (errors.hasOwnProperty('functionError')) {
    const customErrors = JSON.parse(errors.functionError);
    messages.push(...customErrors.errors);
  } else {
    messages.push(errors.message);
  }

  return messages;
};

export const showGraphQLErrorMessage = error => {
  const { graphQLErrors } = error;
  // console.log(graphQLErrors);
  const category = graphQLErrors[0].extensions.category;
  // console.log(category);

  const errors = graphQLErrors[0].extensions.errors;

  Dialog.create({
    color: 'red',
    title: category,
    message: JSON.stringify(errors)
  });
};
