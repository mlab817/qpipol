<template>
  <q-card style="min-width: 360px;">
    <card-header
      title="Request for IPMS Account"
      @close="$emit('close')"
    ></card-header>
    <q-form ref="requestAccountForm" greedy @submit="submitRequest">
      <q-card-section class="q-gutter-y-md">
        <q-item-label caption
          >Please allow us some time to review your request. You may also
          contact us directly at da_pipd@yahoo.com /
          dapipd@gmail.com.</q-item-label
        >
        <text-input
          label="Full Name"
          v-model="name"
          :rules="required"
        ></text-input>
        <email-input v-model="email" :rules="validEmail"></email-input>
        <single-select
          label="Agency/Office"
          v-model="operating_unit"
          :options="operating_units"
          :rules="required"
        ></single-select>
        <text-input
          label="Contact No."
          v-model="contact_number"
          :rules="required"
        ></text-input>
        <text-input
          type="textarea"
          label="Message (optional)"
          v-model="message"
        ></text-input>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn outline @click="$emit('close')" label="Cancel"></q-btn>
        <q-btn type="submit" label="Submit" color="primary"></q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import CardHeader from '@/ui/cards/CardHeader';
import TextInput from '@/ui/form-inputs/TextInput';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import EmailInput from '@/ui/form-inputs/EmailInput';
import { validateEmail } from '@/utils';
import { FETCH_OPERATING_UNITS } from '@/graphql';

export default {
  components: {
    CardHeader,
    TextInput,
    SingleSelect,
    EmailInput
  },

  apollo: {
    operating_units: {
      query: FETCH_OPERATING_UNITS
    }
  },

  name: 'RequestAccount',

  data() {
    return {
      name: null,
      email: null,
      operating_unit: null,
      contact_number: null,
      message: null,
      operating_units: [],
      required: [val => !!val || '* Required'],
      validEmail: [val => validateEmail(val) || '* Must be a valid email']
    };
  },

  methods: {
    submitRequest() {
      this.$refs.requestAccountForm.validate().then(success => {
        if (success) {
          const payload = {
            name: this.name,
            email: this.email,
            operating_unit: this.operating_unit,
            contact_number: this.contact_number,
            message: this.message
          };
          this.requestAccount(payload);
        }
      });
    },

    requestAccount(payload) {
      this.$q.loading.show();
      this.$store
        .dispatch('auth/requestAccount', payload)
        .then(res => {
          const { status, message } = res.requestAccount;
          if (status === 'SUCCESS') {
            this.$q.notify({
              type: 'positive',
              message: message,
              position: 'bottom-right'
            });
          } else {
            this.$q.notify({
              type: 'negative',
              message: message,
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
        .finally(() => {
          this.$q.loading.hide();
          this.$emit('close');
        });
    }
  }
};
</script>
