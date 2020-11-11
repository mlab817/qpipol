<template>
  <q-card class="bg-white">
    <q-bar class="bg-accent text-white">
      <div>View Activity</div>
      <q-space />
      <q-btn flat round icon="close" v-close-popup />
    </q-bar>

    <template v-if="$apollo.loading">
      <div class="row text-h6 q-pa-md">
        Loading...
      </div>
    </template>

    <q-form @submit="handleSubmit" class="q-pa-md" v-else>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Operating Unit</q-item-label>
          </q-item-section>
          <q-item-section class="col-10">
            <q-item-label>
              {{
                investmentToSubmit.operating_unit
                  ? investmentToSubmit.operating_unit.name
                  : null
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Program</q-item-label>
          </q-item-section>
          <q-item-section class="col-10">
            <q-item-label>
              {{
                investmentToSubmit.prexc_program
                  ? investmentToSubmit.prexc_program.name
                  : null
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Subprogram</q-item-label>
          </q-item-section>
          <q-item-section class="col-10">
            <q-item-label>
              {{
                investmentToSubmit.prexc_subprogram
                  ? investmentToSubmit.prexc_subprogram.name
                  : null
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Activity</q-item-label>
          </q-item-section>
          <q-item-section class="col-10">
            <q-item-label>
              {{ investmentToSubmit.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>UACS Code</q-item-label>
          </q-item-section>
          <q-item-section class="col-10">
            <q-item-label>
              {{ investmentToSubmit.uacs_code }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

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
						<td-money :value="investmentToSubmit.infrastructure_target_2016" />
						<td-money :value="investmentToSubmit.investment_target_2016" />
						<td-money :value="investmentToSubmit.nep_2016" />
            <td-money :value="investmentToSubmit.gaa_2016" />
            <td-money :value="investmentToSubmit.disbursement_2016" />
          </tr>
          <tr>
            <td>2017</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2017" />
						<td-money :value="investmentToSubmit.investment_target_2017" />
						<td-money :value="investmentToSubmit.nep_2017" />
            <td-money :value="investmentToSubmit.gaa_2017" />
            <td-money :value="investmentToSubmit.disbursement_2017" />
          </tr>
          <tr>
            <td>2018</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2018" />
						<td-money :value="investmentToSubmit.investment_target_2018" />
						<td-money :value="investmentToSubmit.nep_2018" />
            <td-money :value="investmentToSubmit.gaa_2018" />
            <td-money :value="investmentToSubmit.disbursement_2018" />
          </tr>
          <tr>
            <td>2019</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2019" />
						<td-money :value="investmentToSubmit.investment_target_2019" />
						<td-money :value="investmentToSubmit.nep_2019" />
            <td-money :value="investmentToSubmit.gaa_2019" />
						<td-money :value="investmentToSubmit.disbursement_2019" />
          </tr>
          <tr>
            <td>2020</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2020" />
						<td-money :value="investmentToSubmit.investment_target_2020" />
						<td-money :value="investmentToSubmit.nep_2020" />
            <td-money :value="investmentToSubmit.gaa_2020" />
						<td-money :value="investmentToSubmit.disbursement_2020" />
          </tr>
          <tr>
            <td>2021</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2021" />
						<td-money :value="investmentToSubmit.investment_target_2021" />
						<td-money :value="investmentToSubmit.nep_2021" />
            <td-money :value="investmentToSubmit.gaa_2021" />
						<td-money :value="investmentToSubmit.disbursement_2021" />
          </tr>
          <tr>
            <td>2022</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2022" />
						<td-money :value="investmentToSubmit.investment_target_2022" />
						<td-money :value="investmentToSubmit.nep_2022" />
            <td-money :value="investmentToSubmit.gaa_2022" />
						<td-money :value="investmentToSubmit.disbursement_2022" />
          </tr>
          <tr>
            <td>2023</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2023" />
						<td-money :value="investmentToSubmit.investment_target_2023" />
						<td-money :value="investmentToSubmit.nep_2023" />
            <td-money :value="investmentToSubmit.gaa_2023" />
						<td-money :value="investmentToSubmit.disbursement_2023" />
          </tr>
          <tr>
            <td>2024</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2024" />
						<td-money :value="investmentToSubmit.investment_target_2024" />
						<td-money :value="investmentToSubmit.nep_2024" />
            <td-money :value="investmentToSubmit.gaa_2024" />
						<td-money :value="investmentToSubmit.disbursement_2024" />
          </tr>
          <tr>
            <td>2025 &amp; Beyond</td>
						<td-money :value="investmentToSubmit.infrastructure_target_2025" />
						<td-money :value="investmentToSubmit.investment_target_2025" />
						<td-money :value="investmentToSubmit.nep_2025" />
            <td-money :value="investmentToSubmit.gaa_2025" />
						<td-money :value="investmentToSubmit.disbursement_2025" />
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-weight-bold">
						<td-money value="Total" />
						<td-money :value="infrastructure_target_total" />
						<td-money :value="investment_target_total" />
						<td-money :value="nep_total" />
            <td-money :value="gaa_total" />
						<td-money :value="disbursement_total" />
          </tr>
        </tfoot>
      </q-markup-table>
    </q-form>
  </q-card>
</template>

<script>
import { PREXC_ACTIVITY } from '@/graphql';
import { programService } from 'src/services';
import TdMoney from '../../ui/components/TdMoney'

export default {
  name: 'PrexcActivity',
	components: {TdMoney},
	props: ['prexc_programs', 'prexc_subprograms', 'prexc_activities', 'id'],
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
    }
  },
  computed: {
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
      editMode: false,
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
        programService.updatePrexcActivity(payload).then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'positive',
            message: 'Success'
          });
          this.$emit('close');
        });
      } else {
        // programService.createPrexcActivity(payload)
        console.log('run create');
        programService.createPrexcActivity(payload).then(() => {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'positive',
            message: 'Success'
          });
          this.$emit('close');
        });
      }
    },
    preparePayload() {
      const investmentToSubmit = this.investmentToSubmit;
      investmentToSubmit.operating_unit_id = this.operating_unit_id;
      investmentToSubmit.investment_target_total = this.investment_target_total;
      investmentToSubmit.infrastructure_target_total = this.infrastructure_target_total;
      investmentToSubmit.nep_total = this.nep_total;
      investmentToSubmit.gaa_total = this.gaa_total;
      investmentToSubmit.disbursement_total = this.disbursement_total;

      return investmentToSubmit;
    }
  },
	filters: {
  	money(val) {
  		if (val) {
  			return val.toLocaleString('en-US', { maximumFractionDigits: 2 })
			}
  		return 0.00
		}
	}
};
</script>
