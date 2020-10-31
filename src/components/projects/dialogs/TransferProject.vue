<template>
  <q-card style="width:400px;">
    <card-header title="Transfer Project"></card-header>
    <q-item-label header>Transfer project to: </q-item-label>

    <div class="q-pa-sm">
      <q-input
        outlined
        placeholder="Filter Users"
        v-model="filterUsers"
      ></q-input>
    </div>

    <template v-if="$apollo.loading">
      <q-inner-loading :showing="$apollo.loading">
        <q-spinner-tail size="50px" color="primary"></q-spinner-tail>
      </q-inner-loading>
    </template>

    <template v-else>
      <q-option-group
        v-model="user_id"
        :options="filteredOptions"
      ></q-option-group>
    </template>

    <card-footer>
      <close-button @close="$emit('close')" />
      <confirm-button
        @click="confirmTransferProject"
        :disable="!user_id"
      ></confirm-button>
    </card-footer>
  </q-card>
</template>

<script>
import { FETCH_ENCODERS_QUERY } from '@/graphql/queries';
import { showSuccessNotification } from '@/functions/function-show-notifications';
import { showError } from '@/utils';
import CardFooter from '@/ui/cards/CardFooter';
import CardHeader from '@/ui/cards/CardHeader';

export default {
  components: {
    CardFooter,
    CardHeader
  },
  name: 'TransferProject',
  props: ['projectId'],
  apollo: {
    encoders: {
      query: FETCH_ENCODERS_QUERY,
      result({ data }) {
        this.options = data.encoders.map(encoder => {
          const { id, name, operating_unit } = encoder;
          return {
            value: id,
            label: `${name} - ${
              operating_unit ? operating_unit.acronym : 'N/A'
            }`
          };
        });
      }
    }
  },
  computed: {
    filteredOptions() {
      let filteredOptions = [];
      const filterUsers = this.filterUsers;

      if (!filterUsers) {
        filteredOptions = this.options;
      }

      const filterUsersLowerCase = filterUsers.toLowerCase();

      filteredOptions = this.options.filter(option => {
        return option.label.toLowerCase().includes(filterUsersLowerCase);
      });

      return filteredOptions;
    }
  },
  data() {
    return {
      user_id: null,
      options: [],
      filterUsers: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirmTransferProject() {
      if (this.user_id) {
        this.$q
          .dialog({
            title: 'Confirm Transfer',
            message:
              'You will no longer be able to access project upon transfer. Continue?',
            cancel: true
          })
          .onOk(() => this.transferProject());
      }
    },
    transferProject() {
      const payload = {
        project_id: this.$props.projectId,
        user_id: this.user_id
      };

      this.$q.loading.show();

      this.$store
        .dispatch('projects/transfer', payload)
        .then(res => {
          showSuccessNotification({
            message: res.transferProject.message
          });
          this.close();
        })
        .catch(showError)
        .finally(() => this.$q.loading.hide());
      // implement transfer
      // be sure to remove project from list if successful
    }
  }
};
</script>
