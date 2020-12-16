<template>
  <div class="column">
    <!-- TODO: Filters -->
    <div class="row q-mt-sm q-col-gutter-md">
      <transition
        appear
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutLeft"
      >
        <!-- hide if filter is off or search is on (since they are not compatible) -->
        <div class="col-3" v-if="filter && !search">
          <div class="row q-gutter-sm q-py-sm justify-end">
            <q-btn label="Clear Filters" color="red" size="sm" @click="clearFilters" />
          </div>
          <q-separator />
          <q-expansion-item label="PAP Types">
            <q-option-group color="secondary" :options="types" type="checkbox" v-model="selectedTypes"></q-option-group>
          </q-expansion-item>
          <q-separator/>
          <q-expansion-item label="Operating Units">
            <q-option-group color="secondary" :options="operating_units" type="checkbox" v-model="selectedOperatingUnits"></q-option-group>
          </q-expansion-item>
          <q-separator  />
          <q-expansion-item label="Banner Program">
            <q-option-group color="secondary" :options="banner_programs" type="checkbox" v-model="selectedBannerPrograms"></q-option-group>
          </q-expansion-item>
          <q-separator />
          <q-expansion-item label="Project Status">
            <q-option-group color="secondary" :options="project_statuses" type="checkbox" v-model="selectedProjectStatuses"></q-option-group>
          </q-expansion-item>
          <q-separator />
        </div>
      </transition>

      <!-- TODO: Content -->
      <div class="col">
        <q-list separator>
          <template v-if="loading">
            <q-item v-for="i in 10" :key="i">
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="90%" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="20%" />
                </q-item-label>
              </q-item-section>
              <q-item-section side top class="col-1">
                <q-item-label>
                  <q-skeleton type="QBadge" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-else>
            <template v-if="!projects || !projects.length">
              <q-banner class="bg-purple text-white">
                No projects found.
                <template v-slot:action>
                  <q-btn flat color="white" label="Add" to="/projects/add" />
                </template>
              </q-banner>
            </template>
            <template v-else>
              <q-item v-for="project in projects" :key="project.id" clickable :to="`/projects/${project.slug}`">
                <q-item-section>
                  <q-item-label
                    class="text-weight-bold"
                    v-html="$options.filters.searchHighlight(project.title, search)" />
                  <q-item-label
                    :lines="2"
                    v-html="$options.filters.searchHighlight(project.description, search)" />
                  <q-item-label caption>
                    {{ project.creator ? project.creator.name : '' }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ project.updated_at | formatDate }}
                  </q-item-label>
                  <q-item-label>
                    <q-badge class="text-weight-bold" :color="getColor(project.type)" v-if="project.type">
                      {{ project.type ? project.type.name : '' }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side top class="text-weight-bold">
                  PhP {{ project.investment_target_total ? project.investment_target_total.toLocaleString() : 0 }}
                </q-item-section>
              </q-item>
            </template>
          </template>
        </q-list>
      </div>
    </div>

    <!-- TODO: Pagination -->
    <div class="row justify-center q-mt-md">
      <q-pagination
        color="secondary"
        v-model="page"
        :max="lastPage"
        :max-pages="10"
        :boundary-links="true"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  props: ['loading','lastPage','projects','currentPage'],
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update-page', val)
      }
    }
  },
  data() {
    return {
      filter: true,
      types: [],
      operating_units: [],
      banner_programs: [],
      project_statuses: [],
    }
  },
  methods: {
    getColor(type) {
      const name = type ? type.name.toLowerCase() : ''
      switch (name) {
        case 'program':
          return 'primary';
          break;
        case 'project':
          return 'secondary';
          break;
        case 'activity':
          return 'red';
          break;
        default:
          return 'white';
      }
    }
  },
  filters: {
    searchHighlight(value, search) {
      // if (search) {
      //   let regex = new RegExp(search, 'ig');
      //   return value && value.replace(regex, (match) => {
      //     return `<span class="bg-yellow-6">${match}</span>`;
      //   });
      // }

      const keywords = search && search.split(/[.,\/ -]/)

      if (keywords && keywords.length) {
        return keywords.reduce((value, word) => {
          console.log(word)
          let regex = new RegExp(word, 'ig');
          const valueToReturn = value && value.replace(regex, (match) => {
            return `<span class="bg-yellow-6">${match}</span>`;
          });
          console.log(valueToReturn)
          return valueToReturn
        }, value)
      }

      return value;
    }
  }
}
</script>
