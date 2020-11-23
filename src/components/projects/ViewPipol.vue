<template>
	<div v-if="project" style="margin-bottom: 70px;">
			<key-facts :project="project" />

			<!-- hide if project is finalized or endorsed and if the user is not a reviewer -->
			<template v-if="error">
				<q-banner class="bg-grey-2">
					<template v-slot:avatar>
						<q-icon name="warning" color="red" />
					</template>
					{{ errorMessage }}
					<template v-slot:action>
						<q-btn
								flat
								label="GO TO PROJECTS"
								color="negative"
								to="/projects/draft"
						></q-btn>
					</template>
				</q-banner>
			</template>


					<div class="row justify-end q-mb-md">
						<q-badge color="blue"> v. {{ project.version }} </q-badge>
					</div>

					<section-header sectionTitle="Program Information"></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-y-md">
							<label-value label="Program" :value="project.prexc_program ? project.prexc_program.name : ''" />

							<label-value label="Subprogram" :value="project.prexc_subprogram ? project.prexc_subprogram.name : ''" />

							<label-value label="Banner Program" :value="project.banner_program ? project.banner_program.name : ''" />
						</q-card-section>
					</q-card>

					<section-header sectionTitle="General Information"></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-y-md">

							<label-value label="PAP Title" :value="project.title" />

							<label-value label="Locally-Funded or Foreign Assisted" :value="project.type ? project.type.name : null" />

							<label-list label="Basis for Implementation" :value="project.bases" />

							<label-value label="Project Component and Objectives" :value="project.description"></label-value>
						</q-card-section>
					</q-card>

					<section-header sectionTitle="Implementing Agency"></section-header>
					<q-card square bordered flat>
						<q-card-section>
							<label-value label="Implementing Agency" :value="project.operating_unit" />
						</q-card-section>
					</q-card>

					<section-header sectionTitle="Spatial Coverage" />
					<q-card square bordered flat>
						<q-card-section class="q-gutter-y-md">
							<label-value label="Spatial Coverage" :value="project.spatial_coverage" />

							<label-list label="Inter-regional" :value="project.regions" v-if="project.spatial_coverage_id === '2'"></label-list>

							<label-value label="Region" :value="project.region" v-if="project.spatial_coverage_id === '3'" />
						</q-card-section>
					</q-card>

					<section-header
							sectionTitle="Project for Inclusion in Which Programming Document"
					></section-header>
					<q-card square bordered flat>
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
					</q-card>

					<template v-if="project.trip">
						<section-header
							sectionTitle="Three-Year Rolling Investment Program"
						></section-header>
						<q-card square bordered flat>
							<q-card-section class="q-gutter-sm">
								<label-list label="Infrastructure Sectors" :value="project.infrastructure_subsectors"></label-list>
								<label-list label="Technical Readiness" :value="project.technical_readinesses"></label-list>
								<label-value label="Implementation Risk &amp; Mitigation Strategy" :value="project.implementation_risk" />
								<label-table label="Infrastructure Investment by Funding Source">
									<vfs-infrastructures :data="project.funding_source_infrastructures" />
								</label-table>
							</q-card-section>
						</q-card>
					</template>

					<section-header
							sectionTitle="Physical and Financial Status"
					></section-header>
					<q-card square bordered flat>
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
					</q-card>

					<section-header
							sectionTitle="Philippine Development (PDP) Chapter"
					></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-sm">
							<label-value label="Main PDP Chapter" :value="project.pdp_chapter"></label-value>
							<label-list label="Other PDP Chapters" :value="project.pdp_chapters"></label-list>
						</q-card-section>
					</q-card>

					<section-header
							sectionTitle="Philippine Development (PDP) Results Matrices"
					></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-sm">
							<label-list
									label="Results Matrices Indicators"
									v-model="project.pdp_indicators"
							></label-list>
						</q-card-section>
					</q-card>

					<label-value
						class="q-my-sm"
						:value="project.expected_outputs"
						label="Expected Outputs"
					/>

					<section-header sectionTitle="Ten Point Agenda"></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-sm">
							<label-list label="Ten Point Agenda" :value="project.ten_point_agenda"></label-list>
						</q-card-section>
					</q-card>

					<section-header
							sectionTitle="Sustainable Development Goals"
					></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-sm">
							<label-list
								label="Sustainable Development Goals"
								:value="project.sustainable_development_goals"
							/>
						</q-card-section>
					</q-card>

					<template v-if="project.cip">
						<section-header
								sectionTitle="Gender and Development Responsiveness"
						></section-header>
						<q-card square bordered flat>
							<q-card-section>
								<label-value label="GAD Responsiveness" :value="project.gad" />
							</q-card-section>
						</q-card>
					</template>

					<section-header sectionTitle="Implementation Period"></section-header>
					<q-card square>
						<q-card-section class="row q-col-gutter-sm">
							<div class="col">
								<label-value label="Start of Project Implementation" :value="project.target_start_year" />
							</div>

							<div class="col">
								<label-value label="Year of Project Completion" :value="project.target_end_year" />
							</div>
						</q-card-section>
					</q-card>

					<section-header
							sectionTitle="Project Preparation Details"
					></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-sm">
							<label-value label="Project Preparation Document" :value="project.project_preparation_document" />

							<template v-if="project.project_preparation_document_id === '1'">
								<q-item-label class="text-weight-bold text-caption"
								>Feasibility Study Cost (in absolute PhP)</q-item-label
								>
								<q-markup-table flat bordered class="col bg-transparent">
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
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2017" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2018" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2019" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2020" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2021" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_2022" />
										<copy-td :copy-mode="copyMode" :value="project.fs_target_total" />
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
					</q-card>

					<section-header sectionTitle="Pre-construction Costs"></section-header>
					<q-card square bordered flat>
						<q-card-section>
							<label-value label="Right of Way" :value="project.has_row"></label-value>

							<div class="row" v-if="project.has_row">
								<q-markup-table
										flat
										bordered
										class="col bg-transparent"
										wrap-cells
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
										<copy-td :value="project.row_target_2017" />
										<copy-td :value="project.row_target_2018" />
										<copy-td :value="project.row_target_2019" />
										<copy-td :value="project.row_target_2020" />
										<copy-td :value="project.row_target_2021" />
										<copy-td :value="project.row_target_2022" />
										<copy-td :value="project.row_target_total" />
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
								<q-markup-table flat bordered class="col bg-transparent">
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
											<copy-td :value="project.rap_target_2017" />
											<copy-td :value="project.rap_target_2018" />
											<copy-td :value="project.rap_target_2019" />
											<copy-td :value="project.rap_target_2020" />
											<copy-td :value="project.rap_target_2021" />
											<copy-td :value="project.rap_target_2022" />
											<copy-td :value="project.rap_target_total" />
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
					</q-card>

					<section-header sectionTitle="Employment Generation"></section-header>
					<q-card square bordered flat>
						<q-card-section>
							<label-value
								:value="project.employment_generated"
								label="No. of persons to be employed"
							/>
						</q-card-section>
					</q-card>

					<section-header
							sectionTitle="Funding Source and Mode of Implementation"
					></section-header>
					<q-card square bordered flat>
						<q-card-section>
							<div class="row q-col-gutter-sm">
								<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
									<label-value
											label="Main Funding Source"
											:value="project.main_funding_source"
											class="q-mb-sm"
									/>
									<label-list
										:value="project.funding_sources"
										label="Other Funding Sources"
									></label-list>
								</div>
								<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
									<label-value label="Funding Institution" :value="project.funding_institution" />
									<label-value label="Mode of Implementation" :value="project.implementation_mode" />
								</div>
							</div>
						</q-card-section>
					</q-card>

					<section-header sectionTitle="Project Cost"></section-header>
					<q-card square bordered flat>
						<div class="row">
							<label-table
									label="Investment Requirements by Funding Source">
								<vfs-financials :data="project.funding_source_financials" />
							</label-table>
						</div>

						<div class="row">
							<label-table
								label="Investment Requirements by Region">
								<vr-financials :data="project.region_financials" />
							</label-table>
						</div>
					</q-card>

					<section-header
							sectionTitle="Financial Accomplishments"
					></section-header>
					<q-card square bordered flat>
						<q-card-section class="q-gutter-y-md">
							<!-- Investment Requirements (Total, Infrastructure, GAA, NEP, Disbursement) -->
							<div class="row">
								<q-item-label class="text-h6 text-weight-lighter">
									Investment Requirements (in absolute PhP)
								</q-item-label>
								<q-space />
								<q-toggle :value="copyMode" @input="copyMode = !copyMode" label="Toggle Copy" color="secondary" />
							</div>

							<div class="row">
								<q-markup-table
										flat
										bordered
										class="col bg-transparent"
										wrap-cells
										square
								>
									<thead>
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
										<copy-td :value="investTotal.investment_target_2016" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2017" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2018" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2019" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2020" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2021" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2022" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2023" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2024" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_2025" :copy-mode="copyMode" />
										<copy-td :value="investTotal.investment_target_total" :copy-mode="copyMode" />
									</tr>
									<tr>
										<td>
											Infrastructure
										</td>
										<copy-td :value="infraTotal.infrastructure_target_2016" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2017" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2018" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2019" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2020" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2021" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2022" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2023" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_2024" :copy-mode="copyMode"/>
										<copy-td :value="infraTotal.infrastructure_target_2025" :copy-mode="copyMode" />
										<copy-td :value="infraTotal.infrastructure_target_total" :copy-mode="copyMode" />
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
										<copy-td :value="project.nep_2016" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2017" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2018" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2019" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2020" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2021" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2022" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2023" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2024" :copy-mode="copyMode" />
										<copy-td :value="project.nep_2025" :copy-mode="copyMode" />
										<copy-td :value="project.nep_total" :copy-mode="copyMode" />
									</tr>
									<tr>
										<td>
											GAA
										</td>
										<copy-td :value="project.gaa_2016" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2017" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2018" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2019" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2020" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2021" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2022" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2023" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2024" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_2025" :copy-mode="copyMode" />
										<copy-td :value="project.gaa_total" :copy-mode="copyMode" />
									</tr>
									<tr>
										<td>
											Disbursement
										</td>
										<copy-td :value="project.disbursement_2016" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2017" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2018" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2019" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2020" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2021" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2022" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2023" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2024" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_2025" :copy-mode="copyMode" />
										<copy-td :value="project.disbursement_total" :copy-mode="copyMode" />
									</tr>
									</tbody>
								</q-markup-table>

							</div>
						</q-card-section>
					</q-card>


		</div>
</template>

<script>
	import { date } from 'quasar';
	import CopyTd from './financials/CopyTd';
	import { LabelValue,
		LabelList,
		LabelTable,
		SectionHeader} from '@/ui'
	import VfsFinancials from './financials/VfsFinancials'
	import VrFinancials from './financials/VrFinancials'
	import VfsInfrastructures from './financials/VfsInfrastructures'
	import KeyFacts from './shared/KeyFacts'

	export default {
		components: {
			KeyFacts,
			VfsInfrastructures,
			VrFinancials,
			VfsFinancials,
			CopyTd,
			LabelTable,
			LabelList,
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
						acc.infrastructure_target_2016 = val.infrastructure_target_2016;
						acc.infrastructure_target_2017 = val.infrastructure_target_2017;
						acc.infrastructure_target_2018 = val.infrastructure_target_2018;
						acc.infrastructure_target_2019 = val.infrastructure_target_2019;
						acc.infrastructure_target_2020 = val.infrastructure_target_2020;
						acc.infrastructure_target_2021 = val.infrastructure_target_2021;
						acc.infrastructure_target_2022 = val.infrastructure_target_2022;
						acc.infrastructure_target_2023 = val.infrastructure_target_2023;
						acc.infrastructure_target_2024 = val.infrastructure_target_2024;
						acc.infrastructure_target_2025 = val.infrastructure_target_2025;
						acc.infrastructure_target_total =
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
						acc.investment_target_2016 = val.investment_target_2016;
						acc.investment_target_2017 = val.investment_target_2017;
						acc.investment_target_2018 = val.investment_target_2018;
						acc.investment_target_2019 = val.investment_target_2019;
						acc.investment_target_2020 = val.investment_target_2020;
						acc.investment_target_2021 = val.investment_target_2021;
						acc.investment_target_2022 = val.investment_target_2022;
						acc.investment_target_2023 = val.investment_target_2023;
						acc.investment_target_2024 = val.investment_target_2024;
						acc.investment_target_2025 = val.investment_target_2025;
						acc.investment_target_total =
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
			},
			isEncoder() {
				return this.$store.getters['auth/isEncoder'];
			},
			user() {
				return this.$store.getters['auth/user'];
			},
			dark() {
				return this.$store.getters['settings/dark'];
			},
			risk() {
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
				if (ib && ib.length) {
					let ib_values = ib.map(x => x.name);
					return ib_values.join(', ');
				}
				return 'None specified';
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
