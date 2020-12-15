<template>
  <div class="col q-pa-md">
    <q-table
      :title="title"
      :data="dataToEdit"
      :columns="columns"
      :pagination="pagination"
      class="col"
      flat
      bordered
      dense
      hide-bottom
      >
      <template v-slot:body-cell-total="props">
        <q-td :props="props">
          {{
            (
              (parseFloat(props.row.y1) || 0) +
              (parseFloat(props.row.y2) || 0) +
              (parseFloat(props.row.y3) || 0) +
              (parseFloat(props.row.y4) || 0) +
              (parseFloat(props.row.y5) || 0) +
              (parseFloat(props.row.y6) || 0) +
              (parseFloat(props.row.y7) || 0) +
              (parseFloat(props.row.y8) || 0) +
              (parseFloat(props.row.y9) || 0) +
              (parseFloat(props.row.y10) || 0)
            ).toLocaleString()
          }}
        </q-td>
      </template>
      <template v-slot:bottom-row>
        <q-tr>
          <q-td>Total</q-td>
          <q-td align="right">{{ totalRow.y1 && totalRow.y1.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y2 && totalRow.y2.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y3 && totalRow.y3.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y4 && totalRow.y4.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y5 && totalRow.y5.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y6 && totalRow.y6.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y7 && totalRow.y7.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y8 && totalRow.y8.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y9 && totalRow.y9.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.y10 && totalRow.y10.toLocaleString() }}</q-td>
          <q-td align="right">{{ totalRow.total && totalRow.total.toLocaleString() }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'TableFinancials',
  props: {
    data: Array,
    title: String,
    item: String
  },
  computed: {
    dataToEdit: {
      get() {
        return this.data && this.data.map(x => {
          return {
            name: x[this.item].name,
            y1: x.investment_target_2016,
            y2: x.investment_target_2017,
            y3: x.investment_target_2018,
            y4: x.investment_target_2019,
            y5: x.investment_target_2020,
            y6: x.investment_target_2021,
            y7: x.investment_target_2022,
            y8: x.investment_target_2023,
            y9: x.investment_target_2024,
            y10: x.investment_target_2025
          }
        })
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    totalRow() {
      const dataToEdit = this.dataToEdit,
        totalRow = {
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

      return dataToEdit && dataToEdit.reduce((acc, val) => {
        acc.y1 += val.y1
        acc.y2 += val.y2
        acc.y3 += val.y3
        acc.y4 += val.y4
        acc.y5 += val.y5
        acc.y6 += val.y6
        acc.y7 += val.y7
        acc.y8 += val.y8
        acc.y9 += val.y9
        acc.y10 += val.y10
        acc.total += val.y1 +
          val.y2 +
          val.y3 +
          val.y4 +
          val.y5 +
          val.y6 +
          val.y7 +
          val.y8 +
          val.y9 +
          val.y10
        console.log(totalRow)
        return acc
      }, totalRow)
    }
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'particular',
          label: 'Particulars',
          field: 'name',
          align: 'left'
        },
        {
          name: 'y1',
          label: '2016 & Prior',
          field: 'y1',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y2',
          label: '2017',
          field: 'y2',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y3',
          label: '2018',
          field: 'y3',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y4',
          label: '2019',
          field: 'y4',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y5',
          label: '2020',
          field: 'y5',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y6',
          label: '2021',
          field: 'y6',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y7',
          label: '2022',
          field: 'y7',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y8',
          label: '2023',
          field: 'y8',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y9',
          label: '2024',
          field: 'y9',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'y10',
          label: '2025 & Beyond',
          field: 'y10',
          format: (val) => val && val.toLocaleString()
        },
        {
          name: 'total',
          label: 'Total'
        }
      ]
    }
  }
}
</script>
