<template>
  <q-page class="q-pa-sm">
    <project-list
      :projects="ownProjects.data"
      :current-page="currentPage"
      :last-page="lastPage"
      @update-page="updatePage"></project-list>
  </q-page>
</template>

<script>
import ProjectList from "components/projects/ProjectList";
import { OWNED_PROJECTS } from 'src/graphql'

export default {
  name: 'MyProjects',
  components: { ProjectList },
  apollo: {
    ownProjects: {
      query: OWNED_PROJECTS,
      variables() {
        return {
          first: this.first,
          page: this.currentPage
        }
      },
      results({data}) {
        const { paginatorInfo } = data.ownProjects
        this.lastPage = paginatorInfo.lastPage
        this.currentPage = paginatorInfo.currentPage
      }
    }
  },
  data() {
    return {
      ownProjects: {},
      first: 10,
      currentPage: 1,
      lastPage: 0
    }
  },
  methods: {
    updatePage(page) {
      this.page = page
    }
  }
}
</script>
