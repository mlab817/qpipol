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
					<single-select
						label="Program"
						v-model="prexc_program_id"
						:options="prexc_programs"
						:loading="$apollo.queries.prexc_programs.loading"
						with-refresh
						@refetch="refetchPrexcPrograms"
					></single-select>

					<single-select
						label="Subprogram"
						v-model="prexc_subprogram_id"
						:options="filtered_prexc_subprograms"
						:loading="$apollo.queries.prexc_subprograms.loading"
						with-refresh
						@refetch="refetchPrexcSubprograms"
					></single-select>

					<text-input
						label="UACS Code"
						v-model="uacs_code"
						hint="Input N/A if the PAP does not have a UACS Code yet."
						with-na
					/>

					<div class="row">
						<text-input
							label="Title"
							v-model="title"
							:rules="rules.required"
							hint="The PAP Title must match the title of the proposal to be submitted to NEDA/DBM."
						/>
						<!--
							if title is not empty,
							if no matches were found
						-->
						<div class="row" v-if="matches.length > 0">
							<q-list>
								<q-item v-for="{ name, id } in matches" :key="id">
									<q-item-section>
										<q-item-label
											class="text-caption"
											v-html="$options.filters.searchHighlight(name, title)"
										></q-item-label>
									</q-item-section>
								</q-item>
							</q-list>
						</div>
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
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import {
  PREXC_PROGRAMS,
  PREXC_SUBPROGRAMS,
  PREXC_ACTIVITIES
} from 'src/graphql/queries';
import { showError } from '@/utils';
export default {
  name: 'AddProject',
  components: {
    SingleSelect,
    TextInput
  },
  apollo: {
    prexc_programs: {
      query: PREXC_PROGRAMS
    },
    prexc_subprograms: {
      query: PREXC_SUBPROGRAMS
    },
    prexc_activities: {
      query: PREXC_ACTIVITIES
    }
  },
  data() {
    return {
      prexc_programs: [],
      prexc_subprograms: [],
      prexc_activities: [],
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
      prexc_subprogram_id: null
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    filtered_prexc_subprograms() {
      const subprograms = this.prexc_subprograms;
      if (!this.prexc_program_id) {
        return [{ id: null, name: 'Select program first' }];
      }
      return subprograms.filter(
        x => x.prexc_program_id === this.prexc_program_id
      );
    },
    matches() {
      const title = this.title && this.title.toLowerCase();
      if (title && title.length > 3) {
        const activities = this.prexc_activities;
        const matches = activities.filter(x => x.name.includes(title));
        return matches;
      }
      return [];
    }
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
        operating_unit_id: this.operating_unit_id
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
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, 'ig');
        return value.replace(searchRegExp, match => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    }
  },
  mounted() {
    this.operating_unit_id = this.user.operating_unit.id;
  }
};
</script>
