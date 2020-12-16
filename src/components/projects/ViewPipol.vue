<template>
	<div v-if="project" style="margin-bottom: 70px;">
    <key-facts :project="project" />

    <card-info>
      <section-header title="Program Information"></section-header>

      <q-card-section class="q-gutter-y-md">
        <label-value label="Program" :value="project.prexc_program ? project.prexc_program.name : null" />

        <label-value label="Subprogram" :value="project.prexc_subprogram ? project.prexc_subprogram.name : null" />

        <label-value label="Banner Program" :value="project.banner_program ? project.banner_program.name : null" />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="General Information"></section-header>

      <q-card-section class="q-gutter-y-md">

        <label-value label="PAP Title" :value="project.title" />

        <label-value label="PAP Type" :value="project.type ? project.type.name : null" />

        <list-items label="Basis for Implementation" :value="project.bases" />

        <label-value label="Project Component and Objectives" :value="project.description"></label-value>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="Implementing Agency"></section-header>

      <q-card-section>
        <label-value label="Implementing Agency" :value="project.operating_unit" />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="Spatial Coverage" icon="map" />

      <q-card-section class="q-gutter-y-md">
        <label-value label="Spatial Coverage" :value="project.spatial_coverage" />

        <list-items label="Regions" :value="project.regions" />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Project for Inclusion in Which Programming Document"
        icon="description"
      ></section-header>

      <q-card-section>
        <label-value label="Public Investment Program" :value="project.pip" />
        <label-value label="Typology" :value="project.typology" />
        <label-value label="Core Investment Program/Project" :value="project.cip" />
        <label-value label="CIP Type" :value="project.cip_type" />
        <label-value
          label="Three-Year Rolling Infrastructure Program"
          :value="project.trip"
        />
        <label-value
          label="Regional Development Investment Program"
          v-model="project.rdip"
        />
        <label-value
          label="RDC Endorsed"
          :value="project.rdc_endorsed"
        />
        <label-value
          label="RDC Endorsement Date"
          :value="project.rdc_endorsed_date"
        />
      </q-card-section>
    </card-info>

    <template v-if="project.trip">
      <card-info>
        <section-header
          title="Three-Year Rolling Investment Program"
          icon="construction"
        ></section-header>

        <q-card-section class="q-gutter-sm">
          <list-items label="Infrastructure Sectors" :value="project.infrastructure_subsectors"></list-items>
          <label-value label="Technical Readiness" :value="project.technical_readinesses"></label-value>
          <label-value label="Implementation Risk &amp; Mitigation Strategy" :value="project.implementation_risk" />
        </q-card-section>
      </card-info>
    </template>

    <card-info>
      <section-header
        title="Physical and Financial Status"
        icon="update"
      ></section-header>

      <q-card-section class="q-gutter-sm">
        <label-value label="Project Status" :value="project.project_status" />
        <label-value label="Will require Investment Coordination Committee/NEDA Board Approval (ICC-able)?" :value="project.iccable" />
        <template v-if="project.iccable">
          <label-value label="Approved by DA-wide Clearinghouse" :value="`${project.clearinghouse ? 'Yes' : 'No' } on ${project.clearinghouse_date}`" />
          <label-value label="Yet to be submitted to the NEDA Secretariat" :value="`${project.neda_submission ? 'Yes' : 'No' } on ${project.neda_submission_date}`" />
          <label-value label="Under the NEDA Secretariat Review" :value="`${project.neda_secretariat_review_date ? 'Yes' : 'No' } on ${project.neda_secretariat_review_date}`" />
          <label-value label="ICC-TB Endorsed" :value="`${project.clearinghouse ? 'Yes' : 'No' } on ${project.clearinghouse_date}`" />
          <label-value label="ICC-CC Approved" :value="`${project.icc_approved ? 'Yes' : 'No' } on ${project.icc_approved_date}`" />
          <label-value label="NEDA Board Confirmed" :value="`${project.neda_board ? 'Yes' : 'No' } on ${project.neda_board_date}`" />
        </template>
        <label-value label="Budget Tier" :value="project.tier" />
        <label-value
          label="UACS Code"
          :value="project.uacs_code"
        ></label-value>

        <label-value
          :value="project.updates"
          label="Updates"
        />

        <label-value
          :value="project.updates_date"
          label="As of"
        />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Philippine Development (PDP) Chapter"
        icon=""
      ></section-header>

      <q-card-section class="q-gutter-sm">
        <label-value label="Main PDP Chapter" :value="project.pdp_chapter"></label-value>
        <list-items label="Other PDP Chapters" :value="project.pdp_chapters"></list-items>
        <list-items
          label="Results Matrices Indicators"
          v-model="project.pdp_indicators"
        ></list-items>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Expected Outputs"
        icon=""
      ></section-header>

      <q-card-section class="q-gutter-sm">
        <label-value
          label="Expected Outputs"
          :value="project.expected_outputs"
        />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="Ten Point Agenda"></section-header>

      <q-card-section class="q-gutter-sm">
        <list-items label="Ten Point Agenda" :value="project.ten_point_agenda"></list-items>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Sustainable Development Goals"
      ></section-header>

      <q-card-section class="q-gutter-sm">
        <list-items label="Sustainable Development Goals" :value="project.sustainable_development_goals" />
      </q-card-section>
    </card-info>

    <template v-if="project.cip">
      <card-info square bordered flat>
        <section-header
          title="Gender and Development Responsiveness"
        ></section-header>

        <q-card-section>
          <label-value label="GAD Responsiveness" :value="project.gad" />
        </q-card-section>
      </card-info>
    </template>

    <card-info>
      <section-header title="Implementation Period"></section-header>

      <q-card-section class="row q-col-gutter-sm">
        <div class="col">
          <label-value label="Start of Project Implementation" :value="project.target_start_year" />
        </div>

        <div class="col">
          <label-value label="Year of Project Completion" :value="project.target_end_year" />
        </div>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Project Preparation Details"
      ></section-header>

      <q-card-section class="q-gutter-sm">
        <label-value label="Project Preparation Document" :value="project.project_preparation_document" />

        <template v-if="project.project_preparation_document_id === '1'">
          <q-item-label class="text-weight-bold text-caption"
          >Feasibility Study Cost (in absolute PhP)</q-item-label
          >
          <q-markup-table flat bordered class="col bg-transparent" dense>
            <thead>
            <tr>
              <th></th>
              <th>Item</th>
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
              <td-click :value="project.fs_target_2017" />
              <td-click :value="project.fs_target_2018" />
              <td-click :value="project.fs_target_2019" />
              <td-click :value="project.fs_target_2020" />
              <td-click :value="project.fs_target_2021" />
              <td-click :value="project.fs_target_2022" />
              <td-click :value="project.fs_target_total" />
            </tr>
            </tbody>
          </q-markup-table>
        </template>

        <label-value
            label="Other preparation document"
            :value="project.project_preparation_document_others"
            v-if="project.project_preparation_document_id === '99'"
        />
      </q-card-section>
    </card-info>


    <card-info>
      <section-header title="Pre-construction Costs"></section-header>

      <q-card-section>
        <label-value label="Right of Way" :value="project.has_row"></label-value>

        <div class="row" v-if="project.has_row">
          <q-markup-table
            flat
            bordered
            class="col bg-transparent"
            wrap-cells
            dense
          >
            <thead>
            <tr>
              <th></th>
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
              <td>Right of Way</td>
              <td-click :value="project.row_target_2017" />
              <td-click :value="project.row_target_2018" />
              <td-click :value="project.row_target_2019" />
              <td-click :value="project.row_target_2020" />
              <td-click :value="project.row_target_2021" />
              <td-click :value="project.row_target_2022" />
              <td-click :value="project.row_target_total" />
            </tr>
            </tbody>
          </q-markup-table>
        </div>

        <template v-if="project.has_row">
          <label-value
              label="Affected Households (No.)"
              :value="project.row_affected"
          ></label-value>
        </template>

        <label-value
          :value="project.has_rap"
          label="Resettlement Action Plan"
        />

        <div class="row" v-if="project.has_rap">
          <q-markup-table flat bordered class="col bg-transparent" dense>
            <thead>
            <tr>
              <th></th>
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
                <td>Resettlement Action Plan</td>
                <td-click :value="project.rap_target_2017" />
                <td-click :value="project.rap_target_2018" />
                <td-click :value="project.rap_target_2019" />
                <td-click :value="project.rap_target_2020" />
                <td-click :value="project.rap_target_2021" />
                <td-click :value="project.rap_target_2022" />
                <td-click :value="project.rap_target_total" />
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <template v-if="project.has_rap">
          <label-value
            label="Affected Households (No.)"
            :value="project.rap_affected"
          ></label-value>
        </template>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="Employment Generation"></section-header>

      <q-card-section>
        <label-value
          :value="project.employment_generated"
          label="No. of persons to be employed"
        />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Funding Source and Mode of Implementation"
      ></section-header>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label-value
              label="Main Funding Source"
              :value="project.main_funding_source"
              class="q-mb-sm"
            />
            <label-value
              :value="project.funding_sources"
              label="Other Funding Sources"
            ></label-value>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <label-value label="Funding Institution" :value="project.funding_institution" />
            <label-value label="Mode of Implementation" :value="project.implementation_mode" />
          </div>
        </div>
      </q-card-section>
    </card-info>

    <card-info>
      <section-header title="Infrastructure Requirements by Funding Source (in absolute PhP)"></section-header>

      <q-card-section class="q-pa-md">
        <vfs-infrastructures :data="project.funding_source_infrastructures" />
      </q-card-section>

    </card-info>

    <card-info>
      <section-header
        title="Investment Requirements by Funding Source (in absolute PhP)"
      ></section-header>

      <q-card-section class="q-pa-md">
        <vfs-financials :data="project.funding_source_financials" />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Investment Requirements by Region (in absolute PhP)"
      ></section-header>

      <q-card-section class="q-pa-md">
        <vr-financials :data="project.region_financials" />
      </q-card-section>
    </card-info>

    <card-info>
      <section-header
        title="Financial Accomplishments (in absolute PhP)"
      ></section-header>

      <q-card-section class="q-gutter-y-md">

        <div class="row">
          <q-markup-table
            flat
            bordered
            class="col bg-transparent"
            wrap-cells
            square
            dense
          >
            <thead class="text-weight-bold">
              <tr>
                <th>Item</th>
                <th>2016 &amp; Prior</th>
                <th>2017</th>
                <th>2018</th>
                <th>2019</th>
                <th>2020</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
                <th>2024</th>
                <th>2025 &amp; Beyond</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="12">
                Target Investment Requirements (auto-computed from
                breakdown)
              </td>
            </tr>
            <tr>
              <td>
                Total
              </td>
              <td-click :value="investTotal.investment_target_2016"></td-click>
              <td-click :value="investTotal.investment_target_2017"></td-click>
              <td-click :value="investTotal.investment_target_2018"></td-click>
              <td-click :value="investTotal.investment_target_2019"></td-click>
              <td-click :value="investTotal.investment_target_2020"></td-click>
              <td-click :value="investTotal.investment_target_2021"></td-click>
              <td-click :value="investTotal.investment_target_2022"></td-click>
              <td-click :value="investTotal.investment_target_2023"></td-click>
              <td-click :value="investTotal.investment_target_2024"></td-click>
              <td-click :value="investTotal.investment_target_2025"></td-click>
              <td-click :value="investTotal.investment_target_total"></td-click>
            </tr>
            <tr>
              <td>
                <q-icon name="build" /> Infrastructure
              </td>
              <td-click :value="infraTotal.infrastructure_target_2016"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2017"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2018"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2019"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2020"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2021"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2022"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2023"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2024"></td-click>
              <td-click :value="infraTotal.infrastructure_target_2025"></td-click>
              <td-click :value="infraTotal.infrastructure_target_total"></td-click>
            </tr>
            <tr>
              <td colspan="12">
                Actual Investments
              </td>
            </tr>
            <tr>
              <td>
                NEP
              </td>
              <td-click :value="project.nep_2016" />
              <td-click :value="project.nep_2017" />
              <td-click :value="project.nep_2018" />
              <td-click :value="project.nep_2019" />
              <td-click :value="project.nep_2020" />
              <td-click :value="project.nep_2021" />
              <td-click :value="project.nep_2022" />
              <td-click :value="project.nep_2023" />
              <td-click :value="project.nep_2024" />
              <td-click :value="project.nep_2025" />
              <td-click :value="project.nep_total" />
            </tr>
            <tr>
              <td>
                GAA
              </td>
              <td-click :value="project.gaa_2016" />
              <td-click :value="project.gaa_2017" />
              <td-click :value="project.gaa_2018" />
              <td-click :value="project.gaa_2019" />
              <td-click :value="project.gaa_2020" />
              <td-click :value="project.gaa_2021" />
              <td-click :value="project.gaa_2022" />
              <td-click :value="project.gaa_2023" />
              <td-click :value="project.gaa_2024" />
              <td-click :value="project.gaa_2025" />
              <td-click :value="project.gaa_total" />
            </tr>
            <tr>
              <td>
                Disbursement
              </td>
              <td-click :value="project.disbursement_2016" />
              <td-click :value="project.disbursement_2017" />
              <td-click :value="project.disbursement_2018" />
              <td-click :value="project.disbursement_2019" />
              <td-click :value="project.disbursement_2020" />
              <td-click :value="project.disbursement_2021" />
              <td-click :value="project.disbursement_2022" />
              <td-click :value="project.disbursement_2023" />
              <td-click :value="project.disbursement_2024" />
              <td-click :value="project.disbursement_2025" />
              <td-click :value="project.disbursement_total" />
            </tr>
            </tbody>
          </q-markup-table>

        </div>
      </q-card-section>
    </card-info>
  </div>
</template>

<script>
	import { date } from 'quasar';
	import {
	  LabelValue,
		SectionHeader} from 'src/ui'
	import VfsFinancials from './financials/VfsFinancials'
	import VrFinancials from './financials/VrFinancials'
	import VfsInfrastructures from './financials/VfsInfrastructures'
	import KeyFacts from './shared/KeyFacts'
  import CardInfo from "components/projects/shared/CardInfo";
  import TdClick from "components/projects/shared/TdClick";
  import ListItems from "src/ui/components/ListItems";

	export default {
		components: {
      ListItems,
      TdClick,
      CardInfo,
			KeyFacts,
			VfsInfrastructures,
			VrFinancials,
			VfsFinancials,
			LabelValue,
			SectionHeader
		},
		name: 'ProjectProfile',
		props: ['project'],
		computed: {
			infraTotal() {
				const fsf = this.project.funding_source_infrastructures;

				let investTotal = {
					infrastructure_target_2016: 0,
					infrastructure_target_2017: 0,
					infrastructure_target_2018: 0,
					infrastructure_target_2019: 0,
					infrastructure_target_2020: 0,
					infrastructure_target_2021: 0,
					infrastructure_target_2022: 0,
					infrastructure_target_2023: 0,
					infrastructure_target_2024: 0,
					infrastructure_target_2025: 0,
					infrastructure_target_total: 0
				};

				if (fsf && fsf.length) {
					investTotal = fsf.reduce((acc, val) => {
						console.log(acc);
						acc.infrastructure_target_2016 += val.infrastructure_target_2016;
						acc.infrastructure_target_2017 += val.infrastructure_target_2017;
						acc.infrastructure_target_2018 += val.infrastructure_target_2018;
						acc.infrastructure_target_2019 += val.infrastructure_target_2019;
						acc.infrastructure_target_2020 += val.infrastructure_target_2020;
						acc.infrastructure_target_2021 += val.infrastructure_target_2021;
						acc.infrastructure_target_2022 += val.infrastructure_target_2022;
						acc.infrastructure_target_2023 += val.infrastructure_target_2023;
						acc.infrastructure_target_2024 += val.infrastructure_target_2024;
						acc.infrastructure_target_2025 += val.infrastructure_target_2025;
						acc.infrastructure_target_total +=
							val.infrastructure_target_2016 +
							val.infrastructure_target_2017 +
							val.infrastructure_target_2018 +
							val.infrastructure_target_2019 +
							val.infrastructure_target_2020 +
							val.infrastructure_target_2021 +
							val.infrastructure_target_2022 +
							val.infrastructure_target_2023 +
							val.infrastructure_target_2024 +
							val.infrastructure_target_2025;
						return acc;
					}, investTotal);
				}

				return investTotal;
			},
			investTotal() {
				const fsf = this.project.funding_source_financials;

				let investTotal = {
					investment_target_2016: 0,
					investment_target_2017: 0,
					investment_target_2018: 0,
					investment_target_2019: 0,
					investment_target_2020: 0,
					investment_target_2021: 0,
					investment_target_2022: 0,
					investment_target_2023: 0,
					investment_target_2024: 0,
					investment_target_2025: 0,
					investment_target_total: 0
				};

				if (fsf && fsf.length) {
					investTotal = fsf.reduce((acc, val) => {
						console.log(acc);
						acc.investment_target_2016 += val.investment_target_2016;
						acc.investment_target_2017 += val.investment_target_2017;
						acc.investment_target_2018 += val.investment_target_2018;
						acc.investment_target_2019 += val.investment_target_2019;
						acc.investment_target_2020 += val.investment_target_2020;
						acc.investment_target_2021 += val.investment_target_2021;
						acc.investment_target_2022 += val.investment_target_2022;
						acc.investment_target_2023 += val.investment_target_2023;
						acc.investment_target_2024 += val.investment_target_2024;
						acc.investment_target_2025 += val.investment_target_2025;
						acc.investment_target_total +=
							val.investment_target_2016 +
							val.investment_target_2017 +
							val.investment_target_2018 +
							val.investment_target_2019 +
							val.investment_target_2020 +
							val.investment_target_2021 +
							val.investment_target_2022 +
							val.investment_target_2023 +
							val.investment_target_2024 +
							val.investment_target_2025;
						return acc;
					}, investTotal);
				}

				return investTotal;
			}
		},
		data() {
			return {
				copyMode: false,
				copyData: '', // cannot be null
				file: null,
				attachment_types: [],
				attachment_type_id: null,
				uploadAttachment: false,
				rules: {
					required: true
				},
				error: false,
				errorMessage: null
			};
		},
		methods: {
			addAttachment() {
				alert('add attachment');
			}
		},
		filters: {
			formatDate(val) {
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
