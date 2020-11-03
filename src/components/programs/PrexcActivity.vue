<template>
  <q-card class="bg-white">
    <q-bar class="bg-accent text-white">
      <div>Add/Edit Activity</div>
      <q-space />
      <q-btn flat round icon="close" v-close-popup />
    </q-bar>

    <template v-if="$apollo.loading">
      <div class="row text-h6 q-pa-md">
        Loading...
      </div>
    </template>

    <q-form @submit.prevent="handleSubmit" class="q-pa-md" v-else>
			<q-item-label class="text-weight-bold text-negative">Note: This form is for Tier 1 PAPs only. For Tier 2 PAPs, use the Add Project Module.</q-item-label>
      <div class="row q-col-gutter-sm q-my-sm">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <single-select
            label="Program"
            v-model="investmentToSubmit.prexc_program_id"
            :options="prexc_programs"
            :rules="[val => !!val || '* Required']"
            :disable="editMode"
          ></single-select>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <single-select
            label="Subprogram"
            v-model="investmentToSubmit.prexc_subprogram_id"
            :options="filterSubprograms"
            :rules="[val => !!val || '* Required']"
            :disable="editMode"
          ></single-select>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <single-select
            label="Banner Program"
            v-model="investmentToSubmit.banner_program_id"
            :options="banner_programs"
            :disable="editMode"
          ></single-select>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <text-input
            label="Activity"
            v-model="investmentToSubmit.name"
            stack-label
            :rules="[val => !!val || '* Required']"
            :disable="editMode"
          ></text-input>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <text-input
            label="UACS Code"
            v-model="investmentToSubmit.uacs_code"
            stack-label
            :rules="[val => !!val || '* Required']"
            :disable="editMode"
            with-na
          ></text-input>
        </div>
      </div>

      <q-markup-table wrap-cells separator="cell">
        <thead class="bg-accent text-white">
          <tr class="text-weight-bold text-center text-uppercase">
            <td style="width: 10%;">Year</td>
            <td style="width: 18%;">Infrastructure Target (PhP)</td>
            <td style="width: 18%;">Total Investment Target (PhP)</td>
            <td style="width: 18%;">
              National Expenditure Program (NEP, PhP)
            </td>
            <td style="width: 18%;">General Appropriations Act (GAA, PhP)</td>
            <td style="width: 18%;">Actual Disbursement (PhP)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2016 &amp; Prior</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2016"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2016"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2016"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2016"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2016"
              ></money-input>
            </td>
          </tr>
          <tr>
            <td>2017</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2017"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2017"
              ></money-input>
            </td>
          </tr>
          <tr>
            <td>2018</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2018"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2018"
              ></money-input>
            </td>
          </tr>
          <tr>
            <td>2019</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2019"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2019"
              ></money-input>
            </td>
          </tr>
          <tr>
            <td>2020</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2020"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2020"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2020"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2020"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2020"
              />
            </td>
          </tr>
          <tr>
            <td>2021</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2021"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2021"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2021"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2021"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2021"
              />
            </td>
          </tr>
          <tr>
            <td>2022</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2022"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2022"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2022"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2022"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2022"
              />
            </td>
          </tr>
          <tr>
            <td>2023</td>
            <td>
              <money-input
                dense
                input-class="text-right"
                v-model="investmentToSubmit.infrastructure_target_2023"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2023"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2023"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2023"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2023"
              />
            </td>
          </tr>
          <tr>
            <td>2024</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2024"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2024"
              />
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2024"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2024"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2024"
              ></money-input>
            </td>
          </tr>
          <tr>
            <td>2025 &amp; Beyond</td>
            <td>
              <money-input
                v-model="investmentToSubmit.infrastructure_target_2025"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.investment_target_2025"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.gaa_2025"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.nep_2025"
              ></money-input>
            </td>
            <td>
              <money-input
                v-model="investmentToSubmit.disbursement_2025"
              ></money-input>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-weight-bold">
            <td>Total</td>
            <td class="text-right">
              {{ infrastructure_target_total | money }}
            </td>
            <td class="text-right">{{ investment_target_total | money }}</td>
            <td class="text-right">{{ gaa_total | money }}</td>
            <td class="text-right">{{ nep_total | money }}</td>
            <td class="text-right">{{ disbursement_total | money }}</td>
          </tr>
        </tfoot>
      </q-markup-table>

      <div class="row justify-end q-py-md q-gutter-sm">
        <q-btn
					color="primary"
					type="submit"
					label="Save"
					v-if="editMode" />
        <q-btn
          color="primary"
          label="Validate"
          @click="confirmValidation"
          v-if="isReviewer"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script>
import { PREXC_ACTIVITY, BANNER_PROGRAMS } from '@/graphql';
import { programService } from '@/services';
import MoneyInput from '@/ui/form-inputs/MoneyInput'
import TextInput from '@/ui/form-inputs/TextInput'
import SingleSelect from '../../ui/form-inputs/SingleSelect'

export default {
	components: {
		SingleSelect,
		TextInput,
		MoneyInput
	},
  name: 'PrexcActivity',
  props: {
		prexc_programs: Array,
  	prexc_subprograms: Array,
		prexc_activities: Array,
		id: Number,
		mode: {
			type: String,
			validator: (value) => {
				return ['add','edit','validate'].indexOf(value) !== -1
			},
			default: 'add'
		},
    editMode: Boolean
	},
  apollo: {
    prexc_activity: {
      query: PREXC_ACTIVITY,
      variables() {
        return {
          id: this.id
        };
      },
      skip() {
        // do not run the query if id is null since this means that it is a new activity
        return this.id === null;
      },
      result({ data }) {
        if (data.prexc_activity) {
          this.investmentToSubmit = data.prexc_activity;
          this.editMode = true;
        }
      }
    },
    banner_programs: {
      query: BANNER_PROGRAMS
    }
  },
  computed: {
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    isReviewer() {
      return this.$store.getters['auth/isReviewer'];
    },
    filterSubprograms() {
      const subprograms = this.prexc_subprograms;

      if (!this.investmentToSubmit.prexc_program_id) {
        return [{ name: 'Select program first', id: null }];
      } else {
        return subprograms.filter(
          s => s.prexc_program_id === this.investmentToSubmit.prexc_program_id
        );
      }
    },
    operating_unit_id() {
      return this.$store.getters['auth/operatingUnitId'];
    },
    infrastructure_target_total() {
      const {
        infrastructure_target_2016,
        infrastructure_target_2017,
        infrastructure_target_2018,
        infrastructure_target_2019,
        infrastructure_target_2020,
        infrastructure_target_2021,
        infrastructure_target_2022,
        infrastructure_target_2023,
        infrastructure_target_2024,
        infrastructure_target_2025
      } = this.investmentToSubmit;
      return (
        parseFloat(infrastructure_target_2016 || 0) +
        parseFloat(infrastructure_target_2017 || 0) +
        parseFloat(infrastructure_target_2018 || 0) +
        parseFloat(infrastructure_target_2019 || 0) +
        parseFloat(infrastructure_target_2020 || 0) +
        parseFloat(infrastructure_target_2021 || 0) +
        parseFloat(infrastructure_target_2022 || 0) +
        parseFloat(infrastructure_target_2023 || 0) +
        parseFloat(infrastructure_target_2024 || 0) +
        parseFloat(infrastructure_target_2025 || 0)
      );
    },
    investment_target_total() {
      const {
        investment_target_2016,
        investment_target_2017,
        investment_target_2018,
        investment_target_2019,
        investment_target_2020,
        investment_target_2021,
        investment_target_2022,
        investment_target_2023,
        investment_target_2024,
        investment_target_2025
      } = this.investmentToSubmit;
      return (
        parseFloat(investment_target_2016 || 0) +
        parseFloat(investment_target_2017 || 0) +
        parseFloat(investment_target_2018 || 0) +
        parseFloat(investment_target_2019 || 0) +
        parseFloat(investment_target_2020 || 0) +
        parseFloat(investment_target_2021 || 0) +
        parseFloat(investment_target_2022 || 0) +
        parseFloat(investment_target_2023 || 0) +
        parseFloat(investment_target_2024 || 0) +
        parseFloat(investment_target_2025 || 0)
      );
    },
    gaa_total() {
      const {
        gaa_2016,
        gaa_2017,
        gaa_2018,
        gaa_2019,
        gaa_2020,
        gaa_2021,
        gaa_2022,
        gaa_2023,
        gaa_2024,
        gaa_2025
      } = this.investmentToSubmit;
      return (
        parseFloat(gaa_2016 || 0) +
        parseFloat(gaa_2017 || 0) +
        parseFloat(gaa_2018 || 0) +
        parseFloat(gaa_2019 || 0) +
        parseFloat(gaa_2020 || 0) +
        parseFloat(gaa_2021 || 0) +
        parseFloat(gaa_2022 || 0) +
        parseFloat(gaa_2023 || 0) +
        parseFloat(gaa_2024 || 0) +
        parseFloat(gaa_2025 || 0)
      );
    },
    nep_total() {
      const {
        nep_2016,
        nep_2017,
        nep_2018,
        nep_2019,
        nep_2020,
        nep_2021,
        nep_2022,
        nep_2023,
        nep_2024,
        nep_2025
      } = this.investmentToSubmit;
      return (
        parseFloat(nep_2016 || 0) +
        parseFloat(nep_2017 || 0) +
        parseFloat(nep_2018 || 0) +
        parseFloat(nep_2019 || 0) +
        parseFloat(nep_2020 || 0) +
        parseFloat(nep_2021 || 0) +
        parseFloat(nep_2022 || 0) +
        parseFloat(nep_2023 || 0) +
        parseFloat(nep_2024 || 0) +
        parseFloat(nep_2025 || 0)
      );
    },
    disbursement_total() {
      const {
        disbursement_2016,
        disbursement_2017,
        disbursement_2018,
        disbursement_2019,
        disbursement_2020,
        disbursement_2021,
        disbursement_2022,
        disbursement_2023,
        disbursement_2024,
        disbursement_2025
      } = this.investmentToSubmit;
      return (
        parseFloat(disbursement_2016 || 0) +
        parseFloat(disbursement_2017 || 0) +
        parseFloat(disbursement_2018 || 0) +
        parseFloat(disbursement_2019 || 0) +
        parseFloat(disbursement_2020 || 0) +
        parseFloat(disbursement_2021 || 0) +
        parseFloat(disbursement_2022 || 0) +
        parseFloat(disbursement_2023 || 0) +
        parseFloat(disbursement_2024 || 0) +
        parseFloat(disbursement_2025 || 0)
      );
    }
  },
  data() {
    return {
      banner_programs: [],
      prexc_activity: {},
      investmentToSubmit: {
        id: null,
        operating_unit_id: null,
        prexc_program_id: null,
        prexc_subprogram_id: null,
        name: null,
        uacs_code: null,
        infrastructure_target_2016: 0,
        infrastructure_target_2017: 0,
        infrastructure_target_2018: 0,
        infrastructure_target_2019: 0,
        infrastructure_target_2020: 0,
        infrastructure_target_2021: 0,
        infrastructure_target_2022: 0,
        infrastructure_target_2023: 0,
        infrastructure_target_2024: 0,
        infrastructure_target_2025: 0,
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0,
        gaa_2016: 0,
        gaa_2017: 0,
        gaa_2018: 0,
        gaa_2019: 0,
        gaa_2020: 0,
        gaa_2021: 0,
        gaa_2022: 0,
        gaa_2023: 0,
        gaa_2024: 0,
        gaa_2025: 0,
        nep_2016: 0,
        nep_2017: 0,
        nep_2018: 0,
        nep_2019: 0,
        nep_2020: 0,
        nep_2021: 0,
        nep_2022: 0,
        nep_2023: 0,
        nep_2024: 0,
        nep_2025: 0,
        disbursement_2016: 0,
        disbursement_2017: 0,
        disbursement_2018: 0,
        disbursement_2019: 0,
        disbursement_2020: 0,
        disbursement_2021: 0,
        disbursement_2022: 0,
        disbursement_2023: 0,
        disbursement_2024: 0,
        disbursement_2025: 0
      }
    };
  },
  methods: {
    handleSubmit() {
      const payload = this.preparePayload();
      this.$q.loading.show();
      if (payload.id) {
        // run update
        // programService.updatePrexcActivity(payload)
        console.log('run update');
        programService
          .updatePrexcActivity(payload)
          .then(() => {
            this.$q.notify({
              type: 'positive',
              message: 'Success'
            });
            this.$emit('close');
          })
          .finally(() => this.$q.loading.hide());
      } else {
        // programService.createPrexcActivity(payload)
        console.log('run create');
        payload.operating_unit_id = this.operating_unit_id;
        programService
          .createPrexcActivity(payload)
          .then(() => {
            this.$q.notify({
              type: 'positive',
              message: 'Success'
            });
            this.$emit('close');
          })
          .finally(() => this.$q.loading.hide());
      }
    },
    preparePayload() {
      const investmentToSubmit = this.investmentToSubmit;
      investmentToSubmit.investment_target_total = this.investment_target_total;
      investmentToSubmit.infrastructure_target_total = this.infrastructure_target_total;
      investmentToSubmit.nep_total = this.nep_total;
      investmentToSubmit.gaa_total = this.gaa_total;
      investmentToSubmit.disbursement_total = this.disbursement_total;

      return investmentToSubmit;
    },
    confirmValidation() {
      this.$q
        .dialog({
          title: 'Confirm Validation',
          message:
            'Are you sure you want to validate this activity? This action cannot be undone. Type <strong>YES</strong> to confirm.',
          html: true,
          prompt: {
            model: '',
            isValid: val => val.toLowerCase() === 'yes'
          }
        })
        .onOk(() => this.validatePrexcActivity(this.id));
    },
    validatePrexcActivity(id) {
      this.$q.loading.show();
      programService
        .validatePrexcActivity({ id: id })
        .then(() =>
          this.$q.notify({
            type: 'positive',
            message: 'Success'
          })
        )
        .catch(err =>
          this.$q.notify({
            type: 'negative',
            message: err.message
          })
        )
        .finally(() => this.$q.loading.hide());
    }
  },
	filters: {
		money(val) {
			if (val) {
				return val.toLocaleString('en-US', {maximumFractionDigits:2})
			}
			return 0.00
		}
	}
};
</script>
