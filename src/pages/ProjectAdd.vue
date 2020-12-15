<template>
  <page-container>
    <q-form ref="addProject" @submit.prevent="handleSubmit" greedy>
      <q-card>
        <div class="row text-h6 q-pa-md text-secondary">
          Add PAP
        </div>
        <q-card-section class="q-gutter-md">
          <text-input
            label="PAP Title"
            v-model="title"
            :rules="rules.required"
            hint="PAP Title must match the title to be proposed to the DBM"
          />
          <types label="PAP Type" v-model="type_id" :rules="rules.required" />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md q-gutter-md">
          <q-btn
            label="Reset"
            @click="confirmReset"
            outline
            color="primary"
          ></q-btn>
          <q-btn label="Submit" type="submit" color="primary" :loading="loading"></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </page-container>
</template>

<script>
import {
  PageContainer,
  TextInput
} from 'src/ui';
import Types from "src/components/projects/dropdowns/Types";
import { mapGetters } from "vuex";
import { showError } from "src/utils";

export default {
  components: {
    PageContainer,
    TextInput,
    Types
  },

  name: 'AddProjectPage',

  data() {
    return {
      saved: false,
      rules: {
        required: [val => !!val || '* Required'],
        notEmpty: [val => !!val || '* Select one'],
        notLower: [
          val =>
            (!!val && val >= this.target_start_year) ||
            '* Should be higher than start year'
        ]
      },
      title: null,
      type_id: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    handleSubmit() {
      this.$refs.addProject.validate().then(success => {
        if (success) {
          this.$q
            .dialog({
              title: 'Confirm Submit',
              message: 'Are you sure?',
              cancel: true
            })
            .onOk(() => {
              this.submitForm()
            });
        }
      });
    },
    submitForm() {
      const payload = {
        title: this.title,
        type_id: this.type_id
      };
      this.loading = true
      this.$store
        .dispatch('projects/createProject', payload)
        .then(res => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully saved project',
            position: 'bottom-right'
          });
          this.handleSaved(res.createProject.id);
        })
        .catch(showError)
        .finally(() => (this.loading = false));
    },
    confirmReset() {
      this.$q
        .dialog({
          title: 'Confirm Reset',
          message: 'Are you sure you want to reset the form?',
          cancel: true
        })
        .onOk(() => {
          this.$refs.addProject.reset();
        });
    },
    resetForm() {
      this.title = null;
      this.type_id = null;
    },
    handleSaved(id) {
      this.saved();
      this.confirmNextStep(id);
    },
    confirmNextStep(id) {
      this.$q
        .dialog({
          title: 'Success',
          message:
            'Would you like to update your recently submitted project? Click OK if yes or cancel if you want to submit a new one.',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.goTo(id);
        })
        .onCancel(() => {
          this.$refs.addProject.reset();
        });
    },
    goTo(id) {
      this.$router.push('/projects/' + id);
    }
  },

  beforeRouteLeave(to, from, next) {
    if (!this.saved) {
      const answer = window.confirm(
        'Do you really want to leave? Your progress will not be saved.'
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>
