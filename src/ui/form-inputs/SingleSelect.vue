<template>
  <div class="col">
    <span class="text-caption text-weight-bold">{{ label }}</span>
    <q-select
      square
      v-model="model"
      :options="selectOptions"
      option-label="name"
      option-value="id"
      behavior="menu"
      :dense="dense"
      :options-dense="dense"
      outlined
      :hint="hint ? hint : void 0"
      label-color="secondary"
      :rules="rules"
      dropdown-icon="unfold_more"
      :readonly="readonly"
      hide-bottom-space
      :placeholder="label"
      map-options
      emit-value
      clearable
    >
      <template v-slot:before-options v-if="options.length > 10">
        <q-item>
          <q-item-section class="text-grey">
            <q-input
              ref="filter"
              placeholder="Filter"
              v-model="filterText"
              outlined
              :dense="dense"
              autofocus
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SingleSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    optionsDense: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
    },
    value: [String, Number, Boolean],
    hint: { type: String },
    rules: Array,
    readonly: Boolean
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
    },
    selectOptions() {
      const filterText = this.filterText.trim();
      const options = this.$props.options;

      let selectOptions = [];

      if (!filterText) {
        selectOptions = options;
      } else {
        const filterTextLowerCase = filterText.toLowerCase();

        const filteredOptions = options.filter(
          v => v.name.toLowerCase().indexOf(filterTextLowerCase) > -1
        );

        if (!filteredOptions.length) {
          selectOptions = [
            {
              id: 0,
              name: 'No results'
            }
          ];
        } else {
          selectOptions = filteredOptions;
        }
      }

      return selectOptions;
    }
  },
  data() {
    return {
      filterText: '',
      filtering: false
    };
  }
};
</script>
