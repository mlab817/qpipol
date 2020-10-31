<template>
  <div class="col q-pa-md">
    <q-dialog v-model="addFsDialog">
      <q-card style="max-width: 80wh; min-width: 400px;">
        <q-bar class="bg-accent text-white">
          <div>Add/Edit Region</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup />
        </q-bar>
        <q-form @submit="handleSubmit">
          <q-card-section>
            <q-select
              label="Region"
              stack-label
              v-model="investmentToSubmit.region_id"
              :options="filteredFs"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              :rules="[val => !!val || '* Required']"
              :readonly="editMode"
            ></q-select>
            <q-input
              input-class="text-right"
              label="2016 &amp; Prior"
              stack-label
              v-model="investmentToSubmit.investment_target_2016"
            />
            <q-input
              input-class="text-right"
              label="2017"
              stack-label
              v-model="investmentToSubmit.investment_target_2017"
            />
            <q-input
              input-class="text-right"
              label="2018"
              stack-label
              v-model="investmentToSubmit.investment_target_2018"
            />
            <q-input
              input-class="text-right"
              label="2019"
              stack-label
              v-model="investmentToSubmit.investment_target_2019"
            />
            <q-input
              input-class="text-right"
              label="2020"
              stack-label
              v-model="investmentToSubmit.investment_target_2020"
            />
            <q-input
              input-class="text-right"
              label="2021"
              stack-label
              v-model="investmentToSubmit.investment_target_2021"
            />
            <q-input
              input-class="text-right"
              label="2022"
              stack-label
              v-model="investmentToSubmit.investment_target_2022"
            />
            <q-input
              input-class="text-right"
              label="2023"
              stack-label
              v-model="investmentToSubmit.investment_target_2023"
            />
            <q-input
              input-class="text-right"
              label="2024"
              stack-label
              v-model="investmentToSubmit.investment_target_2024"
            />
            <q-input
              input-class="text-right"
              label="2025 &amp; Beyond"
              stack-label
              v-model="investmentToSubmit.investment_target_2025"
            />
            <q-input
              input-class="text-right"
              label="Total"
              stack-label
              :value="totalRow.investment_target_total"
              readonly
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancel" flat v-close-popup color="primary"></q-btn>
            <q-btn label="Ok" flat type="submit" color="primary"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-table
      flat
      bordered
      separator="cell"
      wrap-cells
      title="Total Investment Requirement by Region (in absolute PhP)"
      class="col"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      hide-bottom
    >
      <template v-slot:top-right>
        <q-btn icon="add" label="Add" color="primary" @click="addRow" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            flat
            round
            size="sm"
            @click="editRow(props.row)"
            color="blue"
          />
          <q-btn
            icon="delete"
            flat
            round
            size="sm"
            @click="deleteRow(props.row)"
            color="red"
          />
        </q-td>
      </template>

      <template v-slot:bottom-row>
        <q-tr class="text-weight-bold">
          <q-td>TOTAL</q-td>
          <q-td class="text-right" v-for="(item, key) in totalRow" :key="key">
            {{ item }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row text-caption q-pt-sm justify-end">
      Note: Each new and updated item are saved immediately in the database.
    </div>
  </div>
</template>

<script>
import { FETCH_REGIONS } from 'src/graphql';
import { projectService } from 'src/services';

export default {
  name: 'FsFinancials',
  props: ['data', 'projectId'],
  apollo: {
    regions: {
      query: FETCH_REGIONS
    }
  },
  computed: {
    editMode() {
      return !!this.investmentToSubmit.id;
    },
    taken() {
      const fs = this.data;

      const taken = fs.map(x => x.region_id);

      return taken;
    },
    filteredFs() {
      let fs = this.regions,
        taken = this.taken;

      // if in edit mode, show all
      if (this.investmentToSubmit.id) {
        return fs;
      }

      // if in add mode, filter
      return fs.filter(x => !taken.includes(x.id));
    },
    totalRow() {
      const data = this.data;

      let arraySum = {
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
        investment_target_total: 0
      };

      arraySum = data.reduce((prev, cur) => {
        arraySum.investment_target_2016 += cur.investment_target_2016;
        arraySum.investment_target_2017 += cur.investment_target_2017;
        arraySum.investment_target_2018 += cur.investment_target_2018;
        arraySum.investment_target_2019 += cur.investment_target_2019;
        arraySum.investment_target_2020 += cur.investment_target_2020;
        arraySum.investment_target_2021 += cur.investment_target_2021;
        arraySum.investment_target_2022 += cur.investment_target_2022;
        arraySum.investment_target_2023 += cur.investment_target_2023;
        arraySum.investment_target_2024 += cur.investment_target_2024;
        arraySum.investment_target_2025 += cur.investment_target_2025;
        arraySum.investment_target_total +=
          cur.investment_target_2016 +
          cur.investment_target_2017 +
          cur.investment_target_2018 +
          cur.investment_target_2019 +
          cur.investment_target_2020 +
          cur.investment_target_2021 +
          cur.investment_target_2022 +
          cur.investment_target_2023 +
          cur.investment_target_2024 +
          cur.investment_target_2025;
        return arraySum;
      }, arraySum);

      return arraySum;
    }
  },
  data() {
    return {
      funding_sources: [],
      addFsDialog: false,
      pagination: {
        rowsPerPage: 0
      },
      investmentToSubmit: {
        id: null,
        region_id: null,
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0
      },
      columns: [
        {
          name: 'region',
          label: 'Region',
          field: row => row.region && row.region.name,
          align: 'left'
        },
        {
          name: 'y1',
          label: '2016 & Prior',
          field: row => row.investment_target_2016
        },
        {
          name: 'y2',
          label: '2017',
          field: row => row.investment_target_2017
        },
        {
          name: 'y3',
          label: '2018',
          field: row => row.investment_target_2018
        },
        {
          name: 'y4',
          label: '2019',
          field: row => row.investment_target_2019
        },
        {
          name: 'y5',
          label: '2020',
          field: row => row.investment_target_2020
        },
        {
          name: 'y6',
          label: '2021',
          field: row => row.investment_target_2021
        },
        {
          name: 'y7',
          label: '2022',
          field: row => row.investment_target_2022
        },
        {
          name: 'y8',
          label: '2023',
          field: row => row.investment_target_2023
        },
        {
          name: 'y9',
          label: '2024',
          field: row => row.investment_target_2024
        },
        {
          name: 'y10',
          label: '2025 & Beyond',
          field: row => row.investment_target_2025
        },
        {
          name: 'total',
          label: 'Total',
          field: row =>
            row.investment_target_2016 +
            row.investment_target_2017 +
            row.investment_target_2018 +
            row.investment_target_2019 +
            row.investment_target_2020 +
            row.investment_target_2021 +
            row.investment_target_2022 +
            row.investment_target_2023 +
            row.investment_target_2024 +
            row.investment_target_2025
        },
        {
          name: 'actions',
          label: 'Actions'
        }
      ]
    };
  },
  methods: {
    addRow() {
      // console.log('add row')
      this.investmentToSubmit = {
        // id: null,
        region_id: null,
        investment_target_2016: 0,
        investment_target_2017: 0,
        investment_target_2018: 0,
        investment_target_2019: 0,
        investment_target_2020: 0,
        investment_target_2021: 0,
        investment_target_2022: 0,
        investment_target_2023: 0,
        investment_target_2024: 0,
        investment_target_2025: 0
      };

      this.addFsDialog = true;
    },
    editRow(row) {
      this.investmentToSubmit = Object.assign({}, row);

      this.addFsDialog = true;
    },
    deleteRow(row) {
      this.$q
        .dialog({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show();
          projectService
            .deleteRegionFinancial({ id: row.id })
            .then(() => this.$q.loading.hide());
        });
    },
    handleSubmit() {
      const investmentToSubmit = this.investmentToSubmit,
        project_id = this.projectId;

      investmentToSubmit.project_id = project_id;

      this.$q.loading.show();

      if (investmentToSubmit.id) {
        // update
        projectService
          .updateRegionFinancial(investmentToSubmit)
          .then(() => {
            this.addFsDialog = false;
          })
          .finally(() => this.$q.loading.hide());
      } else {
        // create
        projectService
          .createRegionFinancial(investmentToSubmit)
          .then(() => {
            this.addFsDialog = false;
          })
          .finally(() => this.$q.loading.hide());
      }
    }
  },
  mounted() {
    console.log(this.projectId);
  }
};
</script>
