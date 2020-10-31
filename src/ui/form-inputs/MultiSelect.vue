<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-select
      square
      v-model="model"
      @filter="filterFn"
      :options="filterOptions"
      option-label="name"
      option-value="id"
      behavior="menu"
      :dense="dense"
      :options-dense="dense"
      outlined
      multiple
      map-options
      emit-value
      use-chips
      use-input
      label-color="orange-10"
      counter
    >
      <template v-slot:before-options>
        <q-item>
          <q-item-section avatar>
            <q-btn label="Select all" @click.stop="selectAllOptions" />
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-checkbox v-model="model" :val="scope.opt.id" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="scope.opt.name"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-if="model.length" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop="clearSelected"
          class="cursor-pointer"
        />
      </template>
    </q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MultiSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    optionsDense: {
      type: Boolean,
      default: false
    },
    options: Array,
    value: {
      type: Array
    }
  },
  computed: {
    ...mapState('settings', ['dense']),
    model: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  data() {
    return {
      filterOptions: []
    };
  },
  methods: {
    filterFn(val, update) {
      const { options } = this;
      update(() => {
        if (val === '') {
          this.filterOptions = options;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = options.filter(
            ({ name }) => name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    selectAllOptions() {
      const { options } = this;
      this.model = [];
      options.forEach(option => this.model.push(option.id));
    },
    clearSelected() {
      this.model = [];
      this.$emit('clear');
    }
  },
  mounted() {
    this.filterOptions = this.$props.options;
  }
};
</script>
