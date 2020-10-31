<template>
  <q-card flat bordered square tag="div" style="position: relative;">
    <q-card-section class="row justify-between">
      <div class="text-h6">
        Review Project
      </div>
      <q-badge v-if="reviewed" color="primary">finalized</q-badge>
    </q-card-section>

    <q-separator />

    <q-card-section class="column q-pa-none">
      <div class="row justify-between">
        <q-item-label header class="text-uppercase text-primary"
          >Responsiveness</q-item-label
        >
        <q-toggle
          :value="expanded"
          @input="expandAll"
          label="Expand All"
          class="q-mr-sm"
        />
      </div>

      <q-expansion-item
        icon="playlist_add_check"
        label="PDP Chapters"
        expand-separator
        :caption="`${selected_pdp_chapters.length} selected`"
        v-model="expanded1"
      >
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox :value="noChapter" @input="clearChapters"></q-checkbox>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar> </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              No Chapter
            </q-item-label>
          </q-item-section>
        </q-item>
        <list-item
          v-model="selected_pdp_chapters"
          folder="pdp"
          ext="png"
          :options="filteredChapters"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="PDP RM Indicators"
        expand-separator
        :caption="`${selected_pdp_indicators.length} selected`"
        v-model="expanded2"
      >
        <template v-if="filteredIndicators.length">
          <q-input
            filled
            square
            v-model="filter"
            label="Filter Indicators"
            stack-label
            class="q-ma-sm"
          ></q-input>
          <q-tree
            :nodes="filteredIndicators"
            nodeKey="value"
            tick-strategy="leaf"
            :ticked.sync="selected_pdp_indicators"
            default-expand-all
            :filter="filter"
          />
        </template>
        <q-item v-else>
          <q-item-section>
            <q-item-label>Select PDP Chapters first.</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Sustainable Developments"
        expand-separator
        :caption="`${selected_sustainable_development_goals.length} selected`"
        v-model="expanded3"
      >
        <list-item
          v-model="selected_sustainable_development_goals"
          folder="sdg"
          ext="jpg"
          :options="sustainable_development_goals"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Implementation Bases"
        expand-separator
        :caption="`${selected_bases.length} selected`"
        v-model="expanded4"
      >
        <list-item
          v-model="selected_bases"
          folder="tpa"
          ext="png"
          :options="bases"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="Ten Point Agenda"
        expand-separator
        :caption="`${selected_ten_point_agenda.length} selected`"
        v-model="expanded5"
      >
        <list-item
          v-model="selected_ten_point_agenda"
          folder="tpa"
          ext="png"
          :options="ten_point_agenda"
        ></list-item>
      </q-expansion-item>

      <q-expansion-item
        icon="playlist_add_check"
        label="New Thinking"
        expand-separator
        :caption="`${selected_paradigms.length} selected`"
        v-model="expanded6"
      >
        <list-item
          v-model="selected_paradigms"
          folder="nt"
          ext="png"
          :options="paradigms"
        ></list-item>
      </q-expansion-item>

      <q-item-label header class="text-uppercase text-primary"
        >Readiness</q-item-label
      >

      <q-expansion-item label="Readiness" v-model="expanded7">
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="within_period"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label
              >To begin implementation within 2017-2022</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item>
          <single-select
            label="Level of Readiness"
            v-model="readiness_id"
            :options="readinesses"
          ></single-select>
        </q-item>
      </q-expansion-item>

      <q-item-label header class="text-uppercase text-primary"
        >Typology</q-item-label
      >

      <q-expansion-item label="Typology" v-model="expanded8">
        <q-item>
          <typology v-model="typology_id"></typology>
        </q-item>
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="cip"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Core Investment Program/Project
            </q-item-label>
            <q-item-label caption>
              The project will undergo ICC approval.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="cip">
          <single-select
            label="CIP Type"
            v-model="cip_type_id"
            :options="cip_types"
          ></single-select>
        </q-item>
        <q-item tag="label">
          <q-item-section avatar>
            <q-checkbox v-model="trip"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Three-Year Rolling Infrastructure Program
            </q-item-label>
            <q-item-label caption>
              The project is/contains infrastructure component.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>

      <q-item>
        <text-input
          type="textarea"
          label="Remarks"
          v-model="remarks"
        ></text-input>
      </q-item>

      <q-item>
        <q-item-label caption>
          You must save your review before you can submit it.
        </q-item-label>
      </q-item>
    </q-card-section>

    <q-card-actions align="center" v-if="!reviewed">
      <q-btn
        color="negative"
        label="faker!!"
        class="q-mr-md"
        @click="generateFakeData"
      ></q-btn>
      <q-btn
        outline
        label="Save as Draft"
        color="primary"
        @click="saveReviewAsDraft"
        class="q-mr-md"
      ></q-btn>
      <q-btn
        label="Submit"
        color="primary"
        @click="confirmSubmitReview"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Typology from './dropdowns/Typology';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import TextInput from '@/ui/form-inputs/TextInput';
import ListItem from './review-form/ListItem';
import { PDP_INDICATORS } from '@/constants/pdp';
import {
  FETCH_REVIEW_QUERY,
  SDG_QUERY,
  TEN_POINT_AGENDA_QUERY,
  PARADIGMS_QUERY,
  BASES_QUERY,
  READINESSES_QUERY,
  CIP_TYPES_QUERY,
  PDP_CHAPTERS_QUERY
} from '@/graphql/queries';
import { mapActions } from 'vuex';
import { showError } from '@/utils';

export default {
  components: { SingleSelect, TextInput, Typology, ListItem },
  name: 'ReviewForm',
  props: ['id', 'reviewed'],
  apollo: {
    sustainable_development_goals: {
      query: SDG_QUERY
    },
    ten_point_agenda: {
      query: TEN_POINT_AGENDA_QUERY
    },
    paradigms: {
      query: PARADIGMS_QUERY
    },
    bases: {
      query: BASES_QUERY
    },
    readinesses: {
      query: READINESSES_QUERY
    },
    cip_types: {
      query: CIP_TYPES_QUERY
    },
    pdp_chapters: {
      query: PDP_CHAPTERS_QUERY
    },
    project: {
      query: FETCH_REVIEW_QUERY,
      variables() {
        return {
          id: this.$props.id
        };
      },
      result({ data }) {
        const {
          within_period,
          readiness_id,
          typology_id,
          cip,
          cip_type_id,
          trip,
          remarks,
          selected_pdp_chapters,
          selected_pdp_indicators,
          selected_sustainable_development_goals,
          selected_bases,
          selected_ten_point_agenda,
          selected_paradigms
        } = data.project.review;
        // initialize the review properties
        this.selected_pdp_chapters = selected_pdp_chapters;
        this.selected_pdp_indicators = selected_pdp_indicators;
        this.selected_sustainable_development_goals = selected_sustainable_development_goals;
        this.selected_bases = selected_bases;
        this.selected_ten_point_agenda = selected_ten_point_agenda;
        this.selected_paradigms = selected_paradigms;
        this.within_period = within_period;
        this.readiness_id = readiness_id;
        this.typology_id = typology_id;
        this.cip = cip;
        this.cip_type_id = cip_type_id;
        this.trip = trip;
        this.remarks = remarks;
      }
    }
  },
  data() {
    return {
      project: {},
      bases: [],
      sustainable_development_goals: [],
      ten_point_agenda: [],
      paradigms: [],
      readinesses: [],
      cip_types: [],
      pdp_chapters: [],
      pdp_indicators: PDP_INDICATORS,
      selected_pdp_chapters: [],
      selected_pdp_indicators: [],
      selected_sustainable_development_goals: [],
      selected_bases: [],
      selected_ten_point_agenda: [],
      selected_paradigms: [],
      within_period: false,
      readiness_id: null,
      typology_id: null,
      cip: false,
      cip_type_id: null,
      trip: false,
      remarks: null,
      filter: '',
      expanded1: true,
      expanded2: true,
      expanded3: true,
      expanded4: true,
      expanded5: true,
      expanded6: true,
      expanded7: true,
      expanded8: true
    };
  },
  computed: {
    filteredChapters() {
      let filteredChapters = [];

      const chapters = this.pdp_chapters;

      // remove option no chapter
      filteredChapters = chapters.filter(x => x.id !== '0');

      return filteredChapters;
    },

    filteredIndicators() {
      let filteredIndicators = [];

      const pdpIndicators = this.pdp_indicators;

      const selectedPdpChapters = this.selected_pdp_chapters;

      if (!selectedPdpChapters.length) {
        filteredIndicators = [];
      } else {
        filteredIndicators = pdpIndicators.filter(chapter => {
          return selectedPdpChapters.includes(chapter.value.toString());
        });
      }

      return filteredIndicators;
    },

    expanded() {
      const {
        expanded1,
        expanded2,
        expanded3,
        expanded4,
        expanded5,
        expanded6,
        expanded7,
        expanded8
      } = this.$data;
      return (
        expanded1 &&
        expanded2 &&
        expanded3 &&
        expanded4 &&
        expanded5 &&
        expanded6 &&
        expanded7 &&
        expanded8
      );
    },

    noChapter() {
      return (
        this.selected_pdp_chapters.includes('0') &&
        this.selected_pdp_chapters.length === 1
      );
    }
  },
  methods: {
    ...mapActions('projects', ['reviewProject']),

    clearChapters() {
      this.selected_pdp_chapters = [];
      this.selected_pdp_chapters.push('0');
    },

    expandAll() {
      if (this.expanded) {
        this.expanded1 = false;
        this.expanded2 = false;
        this.expanded3 = false;
        this.expanded4 = false;
        this.expanded5 = false;
        this.expanded6 = false;
        this.expanded7 = false;
        this.expanded8 = false;
      } else {
        this.expanded1 = true;
        this.expanded2 = true;
        this.expanded3 = true;
        this.expanded4 = true;
        this.expanded5 = true;
        this.expanded6 = true;
        this.expanded7 = true;
        this.expanded8 = true;
      }
    },

    confirmSubmitReview() {
      this.$q
        .dialog({
          title: 'Confirm Review Submission',
          message:
            'Are you sure you want to submit your review? You will no longer be able to update it once you do.',
          prompt: {
            model: '',
            type: 'textarea',
            isValid: val => !!val
          },
          cancel: true,
          transitionShow: 'jump-down',
          transitionHide: 'jump-up'
        })
        .onOk(remarks => {
          this.handleReviewProject(remarks);
        });
    },

    handleReviewProject(remarks) {
      const payload = {
        id: this.$props.id,
        remarks: remarks
      };

      this.$q.loading.show();

      this.saveReviewAsDraft()
        .then(() => this.$store.dispatch('projects/submitReview', payload))
        .then(() =>
          this.$q.notify({
            type: 'positive',
            position: 'bottom-right',
            message: 'Successfully submitted review.'
          })
        )
        .catch(err => console.err(err.message))
        .finally(() => this.$q.loading.hide());
    },

    preparePayload() {
      const payload = {
        id: this.$props.id,
        within_period: this.within_period,
        readiness_id: this.readiness_id,
        typology_id: this.typology_id,
        cip: this.cip,
        cip_type_id: this.cip_type_id,
        trip: this.trip,
        remarks: this.remarks,
        bases: this.selected_bases,
        pdp_chapters: this.selected_pdp_chapters,
        pdp_indicators: this.selected_pdp_indicators,
        ten_point_agenda: this.selected_ten_point_agenda,
        paradigms: this.selected_paradigms,
        sustainable_development_goals: this
          .selected_sustainable_development_goals
      };

      return payload;
    },

    saveReviewAsDraft() {
      const payload = this.preparePayload();

      this.$q.loading.show();

      return this.$store
        .dispatch('projects/saveReviewAsDraft', payload)
        .then(res => {
          const {
            within_period,
            readiness_id,
            typology_id,
            cip,
            cip_type_id,
            trip,
            remarks,
            selected_pdp_chapters,
            selected_pdp_indicators,
            selected_sustainable_development_goals,
            selected_bases,
            selected_ten_point_agenda,
            selected_paradigms
          } = res.saveReview.review;

          // initialize the review properties
          this.selected_pdp_chapters = selected_pdp_chapters;
          this.selected_pdp_indicators = selected_pdp_indicators;
          this.selected_sustainable_development_goals = selected_sustainable_development_goals;
          this.selected_bases = selected_bases;
          this.selected_ten_point_agenda = selected_ten_point_agenda;
          this.selected_paradigms = selected_paradigms;
          this.within_period = within_period;
          this.readiness_id = readiness_id;
          this.typology_id = typology_id;
          this.cip = cip;
          this.cip_type_id = cip_type_id;
          this.trip = trip;
          this.remarks = remarks;

          this.$q.notify({
            type: 'positive',
            position: 'bottom-right',
            message: 'Successfully saved review as draft'
          });
        })
        .then(() => (this.saved = true))
        .catch(showError)
        .finally(() => this.$q.loading.hide());
    },

    selectRandomItems(array, n) {
      const newArray = [...array]
        .sort(() => Math.random() - Math.random())
        .slice(0, n);

      return newArray.map(a => a.id);
    },

    generateFakeData() {
      this.selected_pdp_chapters = this.selectRandomItems(this.pdp_chapters, 2);
      // this.selected_pdp_indicators = this.selectRandomItems(this.filteredIndicators, 3)
      this.selected_sustainable_development_goals = this.selectRandomItems(
        this.sustainable_development_goals,
        2
      );
      this.selected_bases = this.selectRandomItems(this.bases, 2);
      this.selected_ten_point_agenda = this.selectRandomItems(
        this.ten_point_agenda,
        2
      );
      this.selected_paradigms = this.selectRandomItems(this.paradigms, 2);
      this.within_period = this.$faker().random.boolean();
      this.readiness_id = this.$faker()
        .random.number({ min: 1, max: 8 })
        .toString();
      this.typology_id = this.$faker()
        .random.number({ min: 1, max: 4 })
        .toString();
      this.cip = this.$faker().random.boolean();
      this.cip_type_id = this.$faker()
        .random.number({ min: 1, max: 7 })
        .toString();
      this.trip = this.$faker().random.boolean();
      this.remarks = this.$faker().lorem.sentence();
    }
  }
};
</script>
