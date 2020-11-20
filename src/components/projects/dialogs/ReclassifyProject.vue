<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section>
        <q-select v-model="prexc_program_id" :options="prexc_programs" />
        <q-select v-model="prexc_subprogram_id" :options="prexc_subprograms" />
        <q-select v-model="banner_program_id" :options="banner_programs" />
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancel" v-close-popup />
        <q-btn flat color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  PREXC_PROGRAMS,
  PREXC_SUBPROGRAMS,
  BANNER_PROGRAMS
} from '@/graphql'

export default {
  name: 'ReclassifyProject',
  apollo: {
    prexc_programs: {
      query: PREXC_PROGRAMS
    },
    prexc_subprograms: {
      query: PREXC_SUBPROGRAMS
    },
    banner_programs: {
      query: BANNER_PROGRAMS
    }
  },
  props: {
    title: String
  },
  data() {
    return {
      prexc_program_id: null,
      prexc_subprogram_id: null,
      banner_program_id: null,
      prexc_programs: [],
      prexc_subprograms: [],
      banner_programs: []
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', {
        prexc_program_id: this.prexc_program_id,
        prexc_subprogram_id: this.prexc_subprogram_id,
        banner_program_id: this.banner_program_id
      })
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
