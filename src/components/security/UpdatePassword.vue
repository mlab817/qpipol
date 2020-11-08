<template>
  <div class="row q-pa-sm q-col-gutter-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
      <span class="text-subtitle1 text-primary">Password</span>
      <p class="text-caption">
        Your password ensures secured access to your IPM System account and is
        used to log in.
      </p>
    </div>
    <div class="col-lg-8 col-md-6 col-xs-12">
      <q-form
        ref="changePasswordForm"
        @submit="handleSubmit"
        class="q-gutter-y-sm"
        greedy
      >
        <div>
          <span class="text-weight-bold">Current Password</span>
          <password-input
            v-model="old_password"
            placeholder="Current Password"
            :rules="[val => !!val || 'Current password is required']"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">New Password</span>
          <password-input
            v-model="password"
            placeholder="New Password"
            :rules="[
              val => val.length >= 8 || 'Password must at least be 8 characters'
            ]"
          ></password-input>
        </div>

        <div>
          <span class="text-weight-bold">Confirm New Password</span>
          <password-input
            v-model="password_confirmation"
            placeholder="Confirm Password"
            :rules="[
              val => !!val || '* Required',
              val => val === password || 'Password does not match'
            ]"
          ></password-input>
        </div>

        <div>
          <q-btn type="submit" label="Update" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import PasswordInput from '@/ui/form-inputs/PasswordInput';

export default {
  components: { PasswordInput },

  name: 'UpdatePassword',

  data() {
    return {
      showPassword: false,
      old_password: '',
      password: '',
      password_confirmation: ''
    };
  },

  methods: {
    handleSubmit() {
      this.$refs.changePasswordForm.validate().then(success => {
        if (success) {
          const { password, old_password, password_confirmation } = this.$data;

          const payload = {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation
          };

          this.updatePasswordDialog(payload);
        } else {
          return;
        }
      });
    },

    updatePasswordDialog(payload) {
      this.$q
        .dialog({
          title: 'Update Password',
          message:
            'Be sure to backup your new password and keep it in a safe place.',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$q.loading.show();
          this.$store
            .dispatch('security/updatePassword', payload)
            .then(res => {
              // check if successfully changed password
              if (
                res.updatePassword &&
                res.updatePassword.status === 'PASSWORD_UPDATED'
              ) {
                // confirm sign out
                this.$q.notify({
                  type: 'positive',
                  message: 'Successfully updated password.',
                  position: 'bottom-right'
                });
              }
            })
            .catch(err => {
              this.$q.notify({
                type: 'negative',
                message: err.message,
                position: 'bottom-right'
              });
            })
            .finally(() => this.$q.loading.hide());
        });
    }
  }
};
</script>
