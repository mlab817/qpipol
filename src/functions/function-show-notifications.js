import { Notify } from 'quasar';

export const showSuccessNotification = (
  message = 'Success',
  icon = 'check',
  actions = null
) => {
  Notify.create({
    type: 'positive',
    position: 'top-right',
    message: message,
    timeout: 2000,
    progress: true,
    actions: actions
  });
};

export const showErrorNotification = ({
  message = 'An error occurred.',
  icon = 'close',
  actions = null
}) => {
  Notify.create({
    icon: icon,
    position: 'bottom-right',
    color: 'negative',
    message: message,
    timeout: 5000,
    progress: true,
    actions: actions
  });
};
