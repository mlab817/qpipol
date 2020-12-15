<template>
  <q-list bordered>
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section>
          <q-item-label>
            Implementing Agencies (including your agency)
          </q-item-label>
          <q-item-label caption>
            (Click to expand)
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row items-center">
            {{model && model.length}} selected
          </div>
        </q-item-section>
      </template>
      <list-option-group
        v-model="model"
        :options="operating_units"
        :rules="rules"
        :loading="$apollo.loading"
        with-refresh
        @refetch="refetch"
      />
    </q-expansion-item>
  </q-list>
</template>

<script>
import gql from "graphql-tag";
import ListOptionGroup from "src/ui/form-inputs/ListOptionGroup";

export default {
  components: { ListOptionGroup },
  name: 'OperatingUnit',
  props: {
    value: Array,
    rules: Array
  },
  computed: {
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  apollo: {
    operating_units: {
      query: gql`
        query {
          operating_units {
            id
            acronym
          }
        }
      `,
      result({ data }) {
        console.log(data)
        this.operating_units = data.operating_units && data.operating_units.map(ou => {
          return {
            value: ou.id,
            label: ou.acronym
          }
        })
      }
    }
  },
  data() {
    return {
      operating_units: []
    };
  },
	methods: {
  	refetch() {
  		this.$apollo.queries.operating_units.refetch()
		}
	}
};
</script>
