<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Add Program/Project" icon="add_box">
				<help-button @click="showHelp" />
      </page-title>
    </template>

    <add-project @saved="saved = true"></add-project>
  </page-container>
</template>

<script>
import AddProject from '../../components/projects/AddProjectv2';
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import HelpButton from '../ui/buttons/HelpButton'

export default {
  components: {
	  HelpButton,
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
    showHelp() {
    	const content = `
    		<p>Add Programs, Projects and Activities here. Complete the details needed to qualify for inclusion in the Public Investment Program and the Three-Year Rolling Infrastructure Program.</p>
    		<p>Can\'t find your Programs and Subprograms? Contact your assigned IPD Staff.</p>
    	`
      this.$q.dialog({
        title: 'Help',
        message: content,
				html: true,
				cancel: true
      })
    }
  }
};
</script>
