<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Add Program/Project" icon="add_box">
        <q-btn icon="help" flat round @click="showHelp" />
      </page-title>
    </template>

    <add-project @saved="saved = true"></add-project>
  </page-container>
</template>

<script>
import AddProject from '../components/projects/AddProjectv2';
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';

export default {
  components: {
    PageContainer,
    PageTitle,
    AddProject
  },

  name: 'AddProjectPage',

  data() {
    return {
      saved: false
    };
  },

  beforeRouteLeave(to, from, next) {
    if (!this.saved) {
      const answer = window.confirm(
        'Do you really want to leave? Your progress will not be saved.'
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },

  methods: {
    showHelp() {}
  }
};
</script>
