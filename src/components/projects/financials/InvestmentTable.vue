<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    :pagination="pagination"
    hide-pagination
    flat
    bordered
    wrap-cells
    separator="cell"
    class="row"
    :grid="$q.screen.lt.md"
  >
    <template v-slot:body-cell-ya="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2016"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yb="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2017"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yc="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2018"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yd="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2019"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-ye="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2020"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yf="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2021"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yg="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2022"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yh="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2023"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yi="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2024"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-yj="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_2025"></copy-td>
      </q-td>
    </template>

    <template v-slot:body-cell-total="props">
      <q-td :props="props">
        <copy-td :value="props.row.investment_target_total"></copy-td>
      </q-td>
    </template>

    <template v-slot:bottom-row>
      <q-tr>
        <q-th>Total</q-th>
        <q-th align="right">{{ totalsRow.y1 }}</q-th>
        <q-th align="right">{{ totalsRow.y2 }}</q-th>
        <q-th align="right">{{ totalsRow.y3 }}</q-th>
        <q-th align="right">{{ totalsRow.y4 }}</q-th>
        <q-th align="right">{{ totalsRow.y5 }}</q-th>
        <q-th align="right">{{ totalsRow.y6 }}</q-th>
        <q-th align="right">{{ totalsRow.y7 }}</q-th>
        <q-th align="right">{{ totalsRow.y8 }}</q-th>
        <q-th align="right">{{ totalsRow.y9 }}</q-th>
        <q-th align="right">{{ totalsRow.y10 }}</q-th>
        <q-th align="right">{{ totalsRow.total }}</q-th>
      </q-tr>
    </template>

    <template v-slot:item="props">
      <div
        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
      >
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section class="q-pa-none">
            <q-item-label header>{{ props.row.name }}</q-item-label>
          </q-card-section>
          <q-separator />
          <q-list dense>
            <q-item
              v-for="col in props.cols.filter(col => col.name !== 'name')"
              :key="col.name"
            >
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>
                  <copy-td :value="col.value" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import CopyTd from './CopyTd';

export default {
  components: { CopyTd },
  name: 'InvestmentTable',
  props: ['data', 'title'],
  computed: {
    totalsRow() {
      const data = this.data;
      console.log(data);

      const totalsRow = data.reduce(
        (acc, a) => {
          acc.y1 += a.investment_target_2016;
          acc.y2 += a.investment_target_2017;
          acc.y3 += a.investment_target_2018;
          acc.y4 += a.investment_target_2019;
          acc.y5 += a.investment_target_2020;
          acc.y6 += a.investment_target_2021;
          acc.y7 += a.investment_target_2022;
          acc.y8 += a.investment_target_2023;
          acc.y9 += a.investment_target_2024;
          acc.y10 += a.investment_target_2025;
          acc.total += a.investment_target_total;
          return acc;
        },
        {
          y1: 0,
          y2: 0,
          y3: 0,
          y4: 0,
          y5: 0,
          y6: 0,
          y7: 0,
          y8: 0,
          y9: 0,
          y10: 0,
          total: 0
        }
      );

      console.log(totalsRow);

      return totalsRow;
    }
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          label: 'Particular',
          field: row => row.funding_source.name,
          align: 'center'
        },
        {
          name: 'ya',
          label: '2016 & Prior',
          field: row =>
            row.investment_target_2016
              ? row.investment_target_2016.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yb',
          label: '2018',
          field: row =>
            row.investment_target_2017
              ? row.investment_target_2017.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yc',
          label: '2018',
          field: row =>
            row.investment_target_2018
              ? row.investment_target_2018.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yd',
          label: '2019',
          field: row =>
            row.investment_target_2019
              ? row.investment_target_2019.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'ye',
          label: '2020',
          field: row =>
            row.investment_target_2020
              ? row.investment_target_2020.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yf',
          label: '2021',
          field: row =>
            row.investment_target_2021
              ? row.investment_target_2021.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yg',
          label: '2022',
          field: row =>
            row.investment_target_2022
              ? row.investment_target_2022.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yh',
          label: '2023',
          field: row =>
            row.investment_target_2023
              ? row.investment_target_2023.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yi',
          label: '2024',
          field: row =>
            row.investment_target_2024
              ? row.investment_target_2024.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'yj',
          label: '2025 & Beyond',
          field: row =>
            row.investment_target_2025
              ? row.investment_target_2025.toLowerCase()
              : 0,
          align: 'center'
        },
        {
          name: 'total',
          label: 'Total',
          field: row => (row.total ? row.total.toLowerCase() : 0),
          align: 'center'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    };
  }
};
</script>
