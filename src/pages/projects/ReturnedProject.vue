<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Returned Project" icon="keyboard_return"></page-title>
    </template>

    <q-list class="bg-red-1">
      <q-item-label header class="text-weight-bolder"
        >Validation Result</q-item-label
      >
      <q-item>
        <q-item-section avatar>
          <q-icon
            :name="!!project.validation_data ? 'check_circle' : 'cancel'"
            :color="!!project.validation_data ? 'positive' : 'negative'"
          ></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>Data is complete and consistent.</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Update"
            outline
            color="red"
            v-if="!project.validation_data"
            @click="updateProject"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon
            :name="!!project.validation_signed ? 'check_circle' : 'cancel'"
            :color="!!project.validation_signed ? 'positive' : 'negative'"
          ></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>Signed copy is correct.</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Re-Upload"
            outline
            color="red"
            v-if="!project.validation_signed"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon
            :name="!!project.validation_endorsed ? 'check_circle' : 'cancel'"
            :color="!!project.validation_endorsed ? 'positive' : 'negative'"
          ></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label
            >Project is included in endorsement letter.</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-btn
            label="Re-endorse"
            outline
            color="red"
            v-if="!project.validation_endorsed"
            @click="reendorseDialog = true"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="reendorseDialog">
      <q-card style="min-width:400px;" square>
        <card-header title="Re-endorse"></card-header>
        <q-card-section>
          <q-file
            v-model="file"
            outlined
            label="Endorsement Letter"
            stack-label
          ></q-file>
        </q-card-section>
        <card-footer>
          <q-btn label="Cancel" flat v-close-popup></q-btn>
          <q-btn
            label="Ok"
            flat
            v-close-popup
            color="green"
            @click="reendorseProject"
          ></q-btn>
        </card-footer>
      </q-card>
    </q-dialog>

    <project-profile :project="project"></project-profile>
  </page-container>
</template>

<script>
import { FETCH_PROJECT_QUERY } from '@/graphql';

export default {
  components: {
    'page-container': () => import('@/ui/page/PageContainer.vue'),
    'page-title': () => import('@/ui/page/PageTitle.vue'),
    'project-profile': () =>
      import('../../components/projects/ProjectProfile.vue'),
    'card-header': () => import('@/ui/cards/CardHeader.vue'),
    'card-footer': () => import('@/ui/cards/CardFooter.vue')
  },
  name: 'PageReturnedProject',
  apollo: {
    project: {
      query: FETCH_PROJECT_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      project: {},
      file: null,
      reendorseDialog: true,
      selectedPaps: []
    };
  },
  methods: {
    reendorseProject() {
      console.log(this.selectedPaps);

      this.$q.loading.show();
      this.$store
        .dispatch('projects/endorseProjects', {
          projects: this.selectedPaps,
          file: this.file
        })
        .then(() => {
          // this.$router.push({ name: 'endorsed-projects' });
        })
        .catch(err => console.log(err.message))
        .finally(() => this.$q.loading.hide());
    },

    updateProject() {
      const id = this.$route.params.id;

      this.$router.push(`/projects/${id}/edit`);
    }
  },
  mounted() {
    this.selectedPaps.push(this.$route.params.id);
  }
};
</script>
