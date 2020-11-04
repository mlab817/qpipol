<template>
  <single-select
    label="Project Preparation Document"
    v-model="model"
    :options="project_preparation_documents"
  />
</template>

<script>
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import { PROJECT_PREPARATION_DOCUMENTS } from '@/graphql';

export default {
  components: { SingleSelect },
  name: 'ProjectDocument',
  props: ['value'],
  apollo: {
    project_preparation_documents: {
      query: PROJECT_PREPARATION_DOCUMENTS,
      result({ data }) {
        this.project_preparation_documents = data.project_preparation_documents.map(
          x => {
            return {
              id: x.id,
              name: x.name
            };
          }
        );
      }
    }
  },
  data() {
    return {
      project_preparation_documents: []
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
