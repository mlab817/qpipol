<template>
  <div v-if="project" style="margin-bottom: 70px;">
    <div class="row items-center">
      <instruction-message type="Instruction">
        Click
        <q-icon name="img:statics/icons/content_copy-black-18dp.svg"></q-icon>
        to copy text on the clipboard.
      </instruction-message>
      <q-space />
      <div>
        <q-badge color="blue"> v. {{ project.version }} </q-badge>
      </div>
    </div>

    <q-separator />

    <div class="q-pa-md text-h5 text-cyan">
      <div class="row">
        <q-badge>
          {{ project.type ? project.type.name : 'Not specified.' }}
        </q-badge>
        <q-badge color="red" v-if="project.infrastructure" class="q-ml-sm">
          Infrastructure
        </q-badge>
        <q-badge color="red" v-if="project.afmip" class="q-ml-sm">
          AFMIP
        </q-badge>
        <q-badge color="orange" v-if="project.pcip" class="q-ml-sm">
          PCIP
        </q-badge>
      </div>
      {{ project.title }}
      <q-btn
        v-copy="project.title"
        round
        flat
        icon="content_copy"
        size="xs"
        color="blue"
      >
        <q-tooltip>Copy to clipboard</q-tooltip>
      </q-btn>
    </div>
    <q-separator />

    <div class="row">
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
        <key-facts :project="project"></key-facts>
      </div>

      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <view-attachments
          :project="project"
          :is-owner="isOwner"
        ></view-attachments>
      </div>
    </div>

    <section-header sectionTitle="Basic Information"></section-header>

    <with-text label="Description">
      <textarea-copy :value="project.description"></textarea-copy>
    </with-text>

    <with-text label="Purpose/Objectives">
      <textarea-copy :value="project.purpose"></textarea-copy>
    </with-text>

    <with-text label="Outcomes">
      <textarea-copy :value="project.outcomes"></textarea-copy>
    </with-text>

    <with-text label="Expected Outputs">
      <textarea-copy :value="project.expected_outputs"></textarea-copy>
    </with-text>

    <with-text label="Beneficiaries">
      <textarea-copy type="text" :value="project.beneficiaries"></textarea-copy>
    </with-text>

    <with-text label="Employment Generated">
      <textarea-copy
        type="text"
        :value="project.employment_generated"
      ></textarea-copy>
    </with-text>

    <with-text label="Technical Readiness">
      <q-list separator bordered>
        <technical-readiness
          :value="project.clearinghouse"
          label="Approved by DA-Wide Clearinghouse"
          :date="project.clearinghouse_date"
        />
        <technical-readiness
          :value="project.neda_submission"
          label="Submitted to NEDA"
          :date="project.neda_submission_date"
        />
        <technical-readiness
          :value="project.neda_secretariat_review"
          label="Reviewed by the NEDA Secretariat"
          :date="project.neda_secretariat_review_date"
        />
        <technical-readiness
          :value="project.icc_endorsed"
          label="Endorsed by the ICC"
          :date="project.icc_endorsed_date"
        />
        <technical-readiness
          :value="project.icc_approved"
          label="Approved by ICC"
          :date="project.icc_approved_date"
        />
        <technical-readiness
          :value="project.neda_board"
          label="Approved by NEDA Board"
          :date="project.neda_board_date"
        />
      </q-list>
    </with-text>

    <with-text label="Implementation Risk and Mitigation Strategy">
      <textarea-copy :value="riskAndStrategy"></textarea-copy>
    </with-text>

    <!-- Left side -->
    <section-header sectionTitle="Pre-Investment Requirement"></section-header>

    <q-markup-table class="col q-ma-sm bg-transparent" flat bordered wrap-cells>
      <thead>
        <tr>
          <th align="left">Type</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
          <th>2022</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Feasibility Study</td>
          <template v-if="project.has_fs">
            <copy-td :value="project.fs_target_2017"></copy-td>
            <copy-td :value="project.fs_target_2018"></copy-td>
            <copy-td :value="project.fs_target_2019"></copy-td>
            <copy-td :value="project.fs_target_2020"></copy-td>
            <copy-td :value="project.fs_target_2021"></copy-td>
            <copy-td :value="project.fs_target_2022"></copy-td>
            <copy-td :value="project.fs_target_total"></copy-td>
          </template>
          <template v-else>
            <td class="text-center" colspan="7">N/A</td>
          </template>
        </tr>
        <tr>
          <td>Right of Way</td>
          <template v-if="project.has_row">
            <copy-td :value="project.row_target_2017"></copy-td>
            <copy-td :value="project.row_target_2018"></copy-td>
            <copy-td :value="project.row_target_2019"></copy-td>
            <copy-td :value="project.row_target_2020"></copy-td>
            <copy-td :value="project.row_target_2021"></copy-td>
            <copy-td :value="project.row_target_2022"></copy-td>
            <copy-td :value="project.row_target_total"></copy-td>
          </template>
          <template v-else>
            <td class="text-center" colspan="7">N/A</td>
          </template>
        </tr>
        <tr>
          <td>Resettlement Action Plan</td>
          <template v-if="project.has_rap">
            <copy-td :value="project.rap_target_2017"></copy-td>
            <copy-td :value="project.rap_target_2018"></copy-td>
            <copy-td :value="project.rap_target_2019"></copy-td>
            <copy-td :value="project.rap_target_2020"></copy-td>
            <copy-td :value="project.rap_target_2021"></copy-td>
            <copy-td :value="project.rap_target_2022"></copy-td>
            <copy-td :value="project.rap_target_total"></copy-td>
          </template>
          <template v-else>
            <td class="text-center" colspan="7">N/A</td>
          </template>
        </tr>
      </tbody>
    </q-markup-table>

    <with-text label="Right-of-Way (ROW) Affected">
      <textarea-copy type="text" :value="project.row_affected"></textarea-copy>
    </with-text>

    <with-text label="Resettlement Action Plan (RAP) Affected">
      <textarea-copy type="text" :value="project.rap_affected"></textarea-copy>
    </with-text>

    <section-header sectionTitle="Financial Information"></section-header>

    <with-text label="Funding Source">
      <textarea-copy
        type="text"
        :value="
          project.main_funding_source ? project.main_funding_source.name : ''
        "
      >
      </textarea-copy>
    </with-text>

    <with-text label="Funding Institution">
      <textarea-copy
        type="text"
        :value="
          project.funding_institution ? project.funding_institution.name : ''
        "
      >
      </textarea-copy>
    </with-text>

    <with-text label="Budget Tier">
      <textarea-copy type="text" :value="project.tier ? project.tier.name : ''">
      </textarea-copy>
    </with-text>

    <with-text label="UACS Code">
      <textarea-copy
        type="text"
        :value="project.uacs_code ? project.uacs_code : ''"
      >
      </textarea-copy>
    </with-text>

    <with-text label="Investment Requirement by Funding Source">
      <investment-table :data="project.funding_source_financials" />
    </with-text>

    <with-text label="Investment Requirement by Region">
      <investment-table :data="project.region_financials" />
    </with-text>

    <with-text label="Total and Infrastructure Investment Requirement">
      <q-markup-table class="col bg-transparent" flat bordered wrap-cells>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total</th>
            <th>Infrastructure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- <tr v-if="project.target_start_year <= 2016 && project.target_end_year >= 2016"> -->
            <td>2016 &amp; Prior</td>
            <td>
              <copy-td :value="project.investment_target_2016"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2016"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2017 && project.target_end_year >= 2017"> -->
          <tr>
            <td>2017</td>
            <td>
              <copy-td :value="project.investment_target_2017"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2017"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2018 && project.target_end_year >= 2018"> -->
          <tr>
            <td>2018</td>
            <td>
              <copy-td :value="project.investment_target_2018"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2018"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2019 && project.target_end_year >= 2019"> -->
          <tr>
            <td>2019</td>
            <td>
              <copy-td :value="project.investment_target_2019"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2019"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2020 && project.target_end_year >= 2020"> -->
          <tr>
            <td>2020</td>
            <td>
              <copy-td :value="project.investment_target_2020"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2020"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2021 && project.target_end_year >= 2021"> -->
          <tr>
            <td>2021</td>
            <td>
              <copy-td :value="project.investment_target_2021"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2021"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2022 && project.target_end_year >= 2022"> -->
          <tr>
            <td>2022</td>
            <td>
              <copy-td :value="project.investment_target_2022"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2022"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2023 && project.target_end_year >= 2023"> -->
          <tr>
            <td>2023</td>
            <td>
              <copy-td :value="project.investment_target_2023"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2023"></copy-td>
            </td>
          </tr>
          <tr>
            <td>2024</td>
            <td>
              <copy-td :value="project.investment_target_2024"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2024"></copy-td>
            </td>
          </tr>
          <tr>
            <td>2025 &amp; Beyond</td>
            <td>
              <copy-td :value="project.investment_target_2025"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_2025"></copy-td>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>
              <copy-td :value="project.investment_target_total"></copy-td>
            </td>
            <td>
              <copy-td :value="project.infrastructure_target_total"></copy-td>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </with-text>

    <section-header sectionTitle="Status"></section-header>

    <with-text label="Financial Status">
      <q-markup-table
        class="col q-my-sm bg-transparent"
        flat
        bordered
        wrap-cells
      >
        <thead>
          <tr>
            <th style="width:25%">Year</th>
            <th style="width:25%">NEP</th>
            <th style="width:25%">GAA</th>
            <th style="width:25%">Disbursement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- <tr v-if="project.target_start_year <= 2016 && project.target_end_year >= 2016"> -->
            <td>2016 &amp; Prior</td>
            <td>
              <copy-td></copy-td>
            </td>
            <td>
              <copy-td></copy-td>
            </td>
            <td>
              <copy-td></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2017 && project.target_end_year >= 2017"> -->
          <tr>
            <td>2017</td>
            <td>
              <copy-td :value="project.nep_2017"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2017"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2017"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2018 && project.target_end_year >= 2018"> -->
          <tr>
            <td>2018</td>
            <td>
              <copy-td :value="project.nep_2018"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2018"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2018"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2019 && project.target_end_year >= 2019"> -->
          <tr>
            <td>2019</td>
            <td>
              <copy-td :value="project.nep_2019"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2019"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2019"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2020 && project.target_end_year >= 2020"> -->
          <tr>
            <td>2020</td>
            <td>
              <copy-td :value="project.nep_2020" />
            </td>
            <td>
              <copy-td :value="project.gaa_2020" />
            </td>
            <td>
              <copy-td :value="project.disbursement_2020" />
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2021 && project.target_end_year >= 2021"> -->
          <tr>
            <td>2021</td>
            <td>
              <copy-td :value="project.nep_2021"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2021"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2021"></copy-td>
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2022 && project.target_end_year >= 2022"> -->
          <tr>
            <td>2022</td>
            <td>
              <copy-td :value="project.nep_2022" />
            </td>
            <td>
              <copy-td :value="project.gaa_2022" />
            </td>
            <td>
              <copy-td :value="project.disbursement_2022" />
            </td>
          </tr>
          <!-- <tr v-if="project.target_start_year <= 2023 && project.target_end_year >= 2023"> -->
          <tr>
            <td>2023</td>
            <td>
              <copy-td :value="project.nep_2023"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2023"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2023"></copy-td>
            </td>
          </tr>
          <tr>
            <td>2024</td>
            <td>
              <copy-td :value="project.nep_2024"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2024"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2024"></copy-td>
            </td>
          </tr>
          <tr>
            <td>2025 &amp; Beyond</td>
            <td>
              <copy-td :value="project.nep_2025"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_2025"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_2025"></copy-td>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>
              <copy-td :value="project.nep_total"></copy-td>
            </td>
            <td>
              <copy-td :value="project.gaa_total"></copy-td>
            </td>
            <td>
              <copy-td :value="project.disbursement_total"></copy-td>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </with-text>

    <with-text label="Physical Status">
      <textarea-copy :value="projectUpdates"></textarea-copy>
    </with-text>
  </div>
</template>

<script>
import { date } from 'quasar';
import TextareaCopy from './shared/TextareaCopy';
import { SectionHeader } from '@/ui';
import InstructionMessage from './shared/InstructionMessage';
import KeyFacts from './shared/KeyFacts';
import ViewAttachments from './shared/ViewAttachments';
import WithText from './shared/WithText';
import InvestmentTable from './financials/InvestmentTable';
import CopyTd from './financials/CopyTd';
import TechnicalReadiness from './shared/TechnicalReadiness';

export default {
  components: {
    CopyTd,
    TextareaCopy,
    SectionHeader,
    InstructionMessage,
    KeyFacts,
    ViewAttachments,
    WithText,
    InvestmentTable,
    TechnicalReadiness
  },
  name: 'ProjectProfile',
  props: ['project'],
  computed: {
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    dark() {
      return this.$store.getters['settings/dark'];
    },
    riskAndStrategy() {
      return this.project.implementation_risk;
    },
    projectUpdates() {
      if (this.project.updates) {
        const updatesDate = date.formatDate(
          this.project.updates_date,
          'MMM D, YYYY'
        );
        return `As of ${updatesDate}, ${this.project.updates}.`;
      }
      return '';
    },
    isOwner() {
      return this.project.creator && this.project.creator.id === this.user.id;
    },
    implementationBases() {
      const ib = this.project.implementation_bases
        ? this.project.implementation_bases
        : [];
      if (ib.length) {
        let ib_values = ib.map(x => x.name);
        return ib_values.join(', ');
      }
      return 'None specified';
    }
  },
  data() {
    return {
      copyData: '', // cannot be null
      file: null,
      attachment_types: [],
      attachment_type_id: null,
      uploadAttachment: false
    };
  },
  methods: {
    addAttachment() {
      alert('add attachment');
    }
  },
  filters: {
    formatDate(val) {
      // let newDate = new Date(val)
      if (!val) {
        return '';
      }

      return date.formatDate(val, 'MMM D, YYYY (ddd)');
    },
    formatDateTime(val) {
      if (!val) {
        return '';
      }
      return date.formatDate(val, 'MMM DD YYYY HH:mm:ss A');
    },
    formatMoney(val) {
      if (val) {
        return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
      }
      return 0.0;
    }
  }
};
</script>
