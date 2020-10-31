<template>
  <q-form ref="loginForm" class="q-gutter-md" @submit="handleSubmit" greedy>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <q-banner
        inline-actions
        dense
        rounded
        class="bg-red text-white"
        v-if="error"
      >
        {{ error }}
        <template v-slot:action>
          <q-btn flat round icon="close" @click="clearError" />
        </template>
      </q-banner>
    </transition>

    <email-input
      v-model="username"
      :rules="[
        val => !!val || '* Required',
        val => validEmail(val) || 'Please enter valid email.'
      ]"
      v-test="{ id: 'username' }"
      :dense="$q.screen.lt.md"
      dark
    ></email-input>

    <password-input
      placeholder="Password"
      v-model="password"
      :rules="required"
      v-test="{ id: 'password' }"
      :dense="$q.screen.lt.md"
      dark
    ></password-input>

    <div class="row">
      <q-btn
        outline
        class="full-width"
        type="submit"
        unelevated
        v-test="{ id: 'login' }"
        :size="$q.screen.lt.md ? 'md' : 'lg'"
        square
      >
        Login
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapGetters } from 'vuex';
import PasswordInput from '@/ui/form-inputs/PasswordInput';
import EmailInput from '@/ui/form-inputs/EmailInput';
import { validateEmail } from '@/utils';
import { LocalStorage, Loading } from 'quasar';
import { client } from 'boot/apollo';

export default {
  name: 'LoginForm',

  components: { EmailInput, PasswordInput },

  data() {
    return {
      username: null,
      password: null,
      required: [val => !!val || '* Required'],
      error: ''
    };
  },

  computed: {
    ...mapGetters('auth', ['user'])
  },

  watch: {
    user(value) {
      // if user is logged in, redirect to homepage
      if (value) {
        this.$store.dispatch('auth/getCurrentUser');
        this.$router.push('/');
      }
    }
  },

  methods: {
    clearError() {
      this.error = '';
    },

    validEmail(email) {
      return validateEmail(email);
    },

    handleSubmit() {
      // validate the form before calling login method
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const { username, password } = this.$data;

          const payload = {
            username: username,
            password: password
          };

          this.error = '';

          // reset the token so it doesn't get sent to the server
          LocalStorage.set('token', '');

          Loading.show({
            message: 'Checking credentials'
          });

          // trigger auth request
          this.$store
            .dispatch('auth/signinUser', payload)
            .then(res => {
              const token = res.login.access_token;

              LocalStorage.set('token', token);

              client.resetStore();

              this.$router.go();
            })
            .catch(err => {
              LocalStorage.set('token', '');

              this.password = '';

              if (err.message === 'GraphQL error: Authentication exception') {
                this.error = 'Invalid username or password.';
              }
            })
            .finally(() => Loading.hide());
        }
      });
    }
  }
};
</script>
