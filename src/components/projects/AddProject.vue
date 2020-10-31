<template>
  <div style="margin-bottom: 70px;">
    <div class="text-h6" v-if="$apollo.loading">Loading...</div>

    <q-form
      class="q-pa-sm q-gutter-md"
      ref="addProject"
      @submit="submitForm"
      @reset="resetForm"
      greedy
      v-if="!$apollo.loading"
    >
      <span class="text-red">* All fields are required.</span>

      <q-card square bordered flat>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label header class="text-black text-weight-bold q-pa-none"
                >PREXC Tag</q-item-label
              >
              <q-item-label caption
                >Note: This information can no longer be edited.</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row q-pa-md q-col-gutter-md">
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-sm-12">
            <single-select
              label="Program"
              v-model="prexc_program_id"
              :options="prexc_programs"
            ></single-select>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-sm-12">
            <single-select
              label="Subprogram"
              v-model="prexc_subprogram_id"
              :options="filtered_prexc_subprograms"
            ></single-select>
          </div>
        </div>
      </q-card>

      <q-card flat bordered square>
        <q-item-label header class="text-black text-weight-bold"
          >Specific PAP Details</q-item-label
        >

        <div class="q-pa-md q-gutter-y-md">
          <text-input label="Title" v-model="title" :rules="rules.required" />

          <div class="row q-pt-md q-col-gutter-md">
            <div class="col-6">
              <single-select
                v-model="type_id"
                label="Locally-funded or Foreign-assisted"
                :options="types"
                :rules="rules.notEmpty"
              />
            </div>
            <div class="col-6">
              <single-select
                v-model="infrastructure"
                label="Has Infrastructure Component?"
                :options="[
                  { id: true, name: 'Yes' },
                  { id: false, name: 'No' }
                ]"
                :rules="rules.notNull"
              />
            </div>
          </div>

          <text-input
            label="Description"
            type="textarea"
            v-model="description"
            :rules="rules.required"
          />

          <single-select
            v-model="operating_unit_id"
            :options="operating_units"
            label="Implementing Agency"
            :rules="rules.notEmpty"
            readonly
            hint="Identified based on office where user is affiliated."
          />

          <single-select
            v-model="main_funding_source_id"
            :options="funding_sources"
            label="Main Funding Source"
            :rules="rules.notEmpty"
          />

          <single-select
            v-model="spatial_coverage_id"
            label="Spatial Coverage"
            :options="spatial_coverages"
            :rules="rules.notEmpty"
          >
          </single-select>

          <single-select
            v-model="project_status_id"
            :options="project_statuses"
            label="Project Status"
            :rules="rules.notEmpty"
          />

          <div class="row q-pt-md q-col-gutter-md">
            <div class="col-6">
              <single-select
                v-model="target_start_year"
                :options="years"
                label="Implementation Start"
                :rules="rules.notEmpty"
              />
            </div>

            <div class="col-6">
              <single-select
                v-model="target_end_year"
                :options="filteredYears"
                label="Implementation End"
                :rules="rules.notLower"
              />
            </div>
          </div>

          <money-input
            v-model="total_project_cost"
            label="Total Project Cost (in PhP)"
            :rules="rules.greaterThanZero"
          ></money-input>
        </div>
      </q-card>

      <q-card-actions align="center">
        <q-btn
          label="Reset"
          @click="confirmReset"
          outline
          color="primary"
          class="q-mr-sm"
        ></q-btn>
        <q-btn
          label="Submit"
          @click="confirmSubmit"
          color="primary"
          class="q-mr-sm"
        ></q-btn>
        <q-btn
          label="Random"
          @click="generateFakeData"
          color="negative"
          outline
          v-if="dev"
        ></q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextInput from '@/ui/form-inputs/TextInput';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import MoneyInput from '@/ui/form-inputs/MoneyInput';
import {
  FETCH_OPERATING_UNITS,
  FETCH_FUNDING_SOURCES,
  FETCH_PROJECT_STATUSES,
  FETCH_SPATIAL_COVERAGES,
  FETCH_TYPES,
  FETCH_YEARS,
  PREXC_PROGRAMS,
  PREXC_SUBPROGRAMS,
  PREXC_ACTIVITIES
} from 'src/graphql/queries';
import { showError } from '@/utils';

export default {
  name: 'AddProject',

  components: {
    MoneyInput,
    SingleSelect,
    TextInput
  },

  apollo: {
    operating_units: {
      query: FETCH_OPERATING_UNITS
    },
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    },
    project_statuses: {
      query: FETCH_PROJECT_STATUSES
    },
    spatial_coverages: {
      query: FETCH_SPATIAL_COVERAGES
    },
    types: {
      query: FETCH_TYPES
    },
    years: {
      query: FETCH_YEARS
    },
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
      operating_units: [],
      funding_sources: [],
      project_statuses: [],
      spatial_coverages: [],
      currencies: [],
      types: [],
      years: [],
      rules: {
        required: [val => !!val || '* Required'],
        notEmpty: [val => !!val || '* Select one'],
        notLower: [
          val =>
            (!!val && val >= this.target_start_year) ||
            '* Should be higher than start year'
        ],
        greaterThanZero: [
          val => this.checkPositiveNumber(val) || '* Should be positive number'
        ],
        notNull: [val => val !== null || '* Select one']
      },
      title: null,
      description: null,
      operating_unit_id: null,
      project_status_id: null,
      type_id: null,
      infrastructure: null,
      main_funding_source_id: null,
      spatial_coverage_id: null,
      target_start_year: null,
      target_end_year: null,
      total_project_cost: null,
      prexc_program_id: null,
      prexc_subprogram_id: null
    };
  },

  computed: {
    ...mapGetters('auth', ['user']),
    filteredYears() {
      const years = this.years;
      const start = this.target_start_year;

      let filteredYears = [];

      if (start) {
        filteredYears = years.filter(year => year.id >= start);

        return filteredYears;
      }
      return years;
    },

    filtered_prexc_subprograms() {
      const subprograms = this.prexc_subprograms;

      if (!this.prexc_program_id) {
        return [{ id: null, name: 'Select program first' }];
      }

      return subprograms.filter(
        x => x.prexc_program_id === this.prexc_program_id
      );
    },

    dev() {
      return process.env.DEV;
    }
  },

  methods: {
    confirmSubmit() {
      // prepare data
      this.$refs.addProject.validate().then(success => {
        if (success) {
          this.$q
            .dialog({
              title: 'Confirm',
              message: 'Are you done with the form?',
              cancel: true
            })
            .onOk(() => {
              this.$refs.addProject.submit();
            });
        }
      });
    },

    submitForm() {
      const payload = {
        prexc_program_id: this.prexc_program_id,
        prexc_subprogram_id: this.prexc_subprogram_id,
        title: this.title,
        description: this.description,
        operating_unit_id: this.operating_unit_id,
        project_status_id: this.project_status_id,
        type_id: this.type_id,
        infrastructure: this.infrastructure,
        main_funding_source_id: this.main_funding_source_id,
        spatial_coverage_id: this.spatial_coverage_id,
        target_start_year: this.target_start_year,
        target_end_year: this.target_end_year,
        total_project_cost: this.total_project_cost
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
      this.description = null;
      this.project_status_id = null;
      this.type_id = null;
      this.infrastructure = null;
      this.main_funding_source_id = null;
      this.spatial_coverage_id = null;
      this.target_start_year = null;
      this.target_end_year = null;
      this.currency_id = null;
      this.total_project_cost = null;
    },

    checkPositiveNumber(val) {
      const value = parseFloat(val);

      return value > 0;
    },

    generateFakeData() {
      this.title = this.$faker().lorem.sentence();
      this.description = this.$faker().lorem.sentences(5);
      this.project_status_id = this.$faker().helpers.randomize(
        this.project_statuses
      ).id;
      this.type_id = this.$faker().helpers.randomize(this.types).id;
      this.infrastructure = this.$faker().random.boolean();
      this.main_funding_source_id = this.$faker().helpers.randomize(
        this.funding_sources
      ).id;
      this.spatial_coverage_id = this.$faker().helpers.randomize(
        this.spatial_coverages
      ).id;
      const start_year = this.$faker().helpers.randomize(this.years).id;
      this.target_start_year = start_year;
      this.target_end_year = start_year < 2039 ? start_year + 2 : 2040;
      this.total_project_cost = this.$faker().random.number() * 1000;
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
    money(val) {
      if (!val) {
        return 0.0;
      }
      return val.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
    }
  },

  mounted() {
    this.operating_unit_id = this.user.operating_unit.id;
  }
};
</script>

<style scoped>
button.q-btn {
  width: 150px;
}
</style>
