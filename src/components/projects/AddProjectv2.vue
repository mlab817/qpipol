<template>
  <div style="margin-bottom: 70px;">
    <q-form
      ref="addProject"
      @submit="confirmSubmit"
      @reset="resetForm"
      greedy
    >
			<q-card flat square>
				<q-card-section class="q-gutter-sm">
          <operating-unit v-model="operating_unit_id"></operating-unit>

          <prexc-programs v-model="prexc_program_id" />

					<prexc-subprograms v-model="prexc_subprogram_id" :filter="prexc_program_id" />

          <banner-program v-model="banner_program_id" />

					<text-input
						label="UACS Code"
						v-model="uacs_code"
						with-na
					/>

					<div class="column">
						<text-input
							label="Title"
							v-model="title"
							:rules="rules.required"
						/>
					</div>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						label="Reset"
						@click="confirmReset"
						outline
						color="primary"
						class="q-mr-sm"
					></q-btn>
					<q-btn label="Submit" type="submit" color="primary"></q-btn>
				</q-card-actions>
			</q-card>
    </q-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextInput from '@/ui/form-inputs/TextInput';
import BannerProgram from './dropdowns/BannerProgram'
import PrexcPrograms from './dropdowns/PrexcPrograms'
import PrexcSubprograms from './dropdowns/PrexcSubprograms'
import { showError } from '@/utils';
import OperatingUnit from "components/projects/dropdowns/ImplementingAgency";

export default {
  name: 'AddProject',
  components: {
    OperatingUnit,
    TextInput,
    BannerProgram,
    PrexcPrograms,
    PrexcSubprograms
  },
  data() {
    return {
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
      operating_unit_id: null,
      uacs_code: null,
      prexc_program_id: null,
      prexc_subprogram_id: null,
      banner_program_id: null
    };
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    confirmSubmit() {
      // prepare data
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
	  refetchPrexcPrograms() {
		  this.$apollo.queries.prexc_programs.refetch()
	  },
	  refetchPrexcSubprograms() {
		  this.$apollo.queries.prexc_subprograms.refetch()
	  },
    submitForm() {
      const payload = {
        prexc_program_id: this.prexc_program_id,
        prexc_subprogram_id: this.prexc_subprogram_id,
        title: this.title,
        operating_unit_id: this.operating_unit_id,
        banner_program_id: this.banner_program_id
      };
      this.$q.loading.show({
        message: 'Saving project...'
      });
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
        .finally(() => this.$q.loading.hide());
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
      this.prexc_program_id = null;
      this.prexc_subprogram_id = null;
      this.title = null;
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
    },
    saved() {
      this.$emit('saved');
    }
  }
};
</script>
