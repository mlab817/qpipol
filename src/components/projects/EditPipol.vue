<template>
  <div>
    <!-- hide if project is finalized or endorsed and if the user is not a reviewer -->
    <q-banner
      class="bg-green-5 text-white col-xl-6 col-lg-6 col-md-8 col-sm-9 col-xs-12 q-mb-md"
      v-if="(submission_status === 'Finalized' || submission_status === 'Endorsed') && !isReviewer"
    >
      <template v-slot:avatar>
        <q-icon name="info" color="white" />
      </template>
      This project has been finalized/endorsed. It cannot be edited.
      <template v-slot:action>
        <q-btn flat color="white" label="PROJECTS" to="/projects" />
      </template>
    </q-banner>

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

    <template v-else>

      <q-form
        ref="editForm"
        @submit="updateProject"
        greedy
        style="margin-bottom: 70px;"
      >
        <div class="row justify-end q-mb-md">
          <q-badge color="blue"> v. {{ project.version }} </q-badge>
        </div>

        <section-header sectionTitle="General Information"></section-header>
        <q-card square bordered flat>
          <q-card-section class="q-gutter-y-md">
            <text-input
              v-model="project.title"
              label="Project/Program Title"
              type="text"
              :rules="rules.required"
            />

            <div class="row">
              <div class="col">
                <types :rules="rules.required" v-model="project.type_id" />
              </div>
            </div>

            <implementation-bases
              v-model="project.selected_bases"
            ></implementation-bases>

            <text-input
              v-model="project.description"
              label="Project Component and Objectives"
              type="textarea"
              :rules="rules.required"
              hint="Identify the Components of the Program/Project. If a Program, please identify the sub-programs/projects and explain the objective of the program/project in terms of responding to the PDP/RM."
            />
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Implementing Agency"></section-header>
        <q-card square bordered flat>
          <q-card-section>
            <implementing-agency
              v-model="project.operating_unit_id"
              :rules="rules.required"
              :readonly="true"
            ></implementing-agency>
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Spatial Coverage">
          <q-btn icon="help" flat round dense>
            <q-tooltip>
              Nationwide - If spatial coverage/impact of a program or project
              covers all regions (in parts or as a whole); Interregional - If
              spatial coverage/impact of a program or project pertains to more
              than one region (in parts or as a whole) but not all regions;
              Region Specific - If spatial coverage/impact of a program or a
              project pertains to one region (in parts or as a whole); Abroad -
              If spatial coverage of a program or project is outside the country
              that will have an impact to Filipinos outside of the country
              (e.g., Overseas Filipino Workers).
            </q-tooltip>
          </q-btn>
        </section-header>
        <q-card square bordered flat>
          <q-card-section class="q-gutter-y-md">
            <spatial-coverage
              v-model="project.spatial_coverage_id"
              :rules="rules.selectOne"
            ></spatial-coverage>

            <regions
              v-model="project.selected_regions"
              v-if="project.spatial_coverage_id === '2'"
              label="Inter-regional"
            ></regions>

            <region
              v-model="project.region_id"
              v-if="project.spatial_coverage_id === '3'"
              :rules="rules.selectOne"
              label="Region"
            ></region>

            <province
              v-model="project.province_id"
              v-if="project.spatial_coverage_id === '4'"
              :rules="rules.selectOne"
            ></province>
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Project for Inclusion in Which Programming Document"
        ></section-header>
        <q-card square bordered flat>
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <checkbox-input
                  label="Public Investment Program"
                  v-model="project.pip"
                />
                <div class="q-pa-sm">
                  <typology v-model="project.typology_id" v-if="project.pip" :rules="rules.required" />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <checkbox-input
                  label="Core Investment Programs/Projects (CIP)"
                  v-model="project.cip"
                />
                <div class="q-pa-sm">
                  <cip-types v-model="project.cip_type_id" v-if="project.cip" :rules="rules.required" />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <checkbox-input
                  label="Three-Year Rolling Infrastructure Program"
                  v-model="project.trip"
                />
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <checkbox-input
                  label="Regional Development Investment Program"
                  v-model="project.rdip"
                />
                <div class="row justify-between">
                  <checkbox-input
                    label="RDC Endorsed"
                    v-model="project.rdc_endorsed"
                    v-if="project.rdip"
                    class="q-ml-md"
                  />
                  <q-input
                    v-if="project.rdc_endorsed"
                    label="Endorsement Date"
                    stack-label
                    type="date"
                    v-model="project.rdc_endorsed_date"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

				<section-header
					sectionTitle="Three-Year Rolling Investment Program (Required only for TRIP PAPs)"
				></section-header>
				<q-card square flat bordered>
					<q-card-section class="q-gutter-sm">
						<div class="row q-col-gutter-sm">
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
								<infrastructure-sectors
									v-model="project.selected_infrastructure_subsectors"
								/>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
								<technical-readinesses
									v-model="project.selected_technical_readinesses"
								></technical-readinesses>
							</div>
						</div>

						<div class="row">
							<text-input
								v-model="project.implementation_risk"
								label="Implementation Risk &amp; Mitigation Strategy"
								type="textarea"
								:rules="rules.required"
							/>
						</div>

						<div class="row">
							<fs-infrastructure
								:data="project.funding_source_infrastructures"
								:project-id="project.id"
							></fs-infrastructure>
						</div>
					</q-card-section>
				</q-card>

        <section-header
          sectionTitle="Physical and Financial Status"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <project-status
              v-model="project.project_status_id"
              :rules="rules.selectOne"
            ></project-status>

            <div class="column">
							<checkbox-item v-model="project.iccable" color="primary" label="Will require Investment Coordination Committee/NEDA Board Approval (ICC-able)?"></checkbox-item>
							<q-card v-if="project.iccable" class="col" square flat bordered>
								<q-card-section class="q-gutter-y-md">
									<div class="row">
										<div class="col">
											<checkbox-input
												label="Approved by DA-wide Clearinghouse"
												v-model="project.clearinghouse"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
													label="Date Approved by the DA-wide Clearinghouse"
												:disable="!project.clearinghouse"
												v-model="project.clearinghouse_date"
											></date-input>
										</div>
									</div>

									<div class="row">
										<div class="col">
											<checkbox-input
												label="Yet to be submitted to the NEDA Secretariat"
												v-model="project.neda_submission"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
												:disable="!project.neda_submission"
												v-model="project.neda_submission_date"
												label="Target Date of Submission"
											></date-input>
										</div>
									</div>

									<div class="row">
										<div class="col">
											<checkbox-input
												label="Under the NEDA Secretariat Review"
												v-model="project.neda_secretariat_review"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
												:disable="!project.neda_secretariat_review"
												v-model="project.neda_secretariat_review_date"
												label="Date of Submission to NEDA Secretariat"
											></date-input>
										</div>
									</div>

									<div class="row">
										<div class="col">
											<checkbox-input
												label="ICC-TB Endorsed"
												v-model="project.icc_endorsed"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
												:disable="!project.icc_endorsed"
												v-model="project.icc_endorsed_date"
												label="Date of Approval"
											></date-input>
										</div>
									</div>

									<div class="row">
										<div class="col">
											<checkbox-input
												label="ICC-CC Approved"
												v-model="project.icc_approved"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
												:disable="!project.icc_approved"
												v-model="project.icc_approved_date"
												label="Date of Approval"
											></date-input>
										</div>
									</div>

									<div class="row">
										<div class="col">
											<checkbox-input
												label="NEDA Board Confirmed"
												v-model="project.neda_board"
											></checkbox-input>
										</div>
										<div class="col">
											<date-input
													label="Date Confirmed"
												:disable="!project.neda_board"
												v-model="project.neda_board_date"
											></date-input>
										</div>
									</div>
								</q-card-section>
							</q-card>
            </div>

            <budget-tier
              v-model="project.tier_id"
              :rules="rules.selectOne"
            ></budget-tier>

            <text-input
              label="UACS Code"
              v-model="project.uacs_code"
              with-na
            ></text-input>

            <text-input
              v-model="project.updates"
              label="Updates"
              type="textarea"
              :rules="rules.required"
							with-na
            />

            <date-input
              v-model="project.updates_date"
              label="As of"
              :rules="rules.required"
            />
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Philippine Development (PDP) Chapter"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <pdp-chapter v-model="project.pdp_chapter_id" :rules="rules.required"></pdp-chapter>

            <!-- Skip this if there is no chapter or the PAP is an admin building -->
            <template
              v-if="
                project.pdp_chapter_id &&
                  project.pdp_chapter_id !== '1' &&
                  project.pdp_chapter_id !== '99'
              "
            >
              <q-item-label class="text-weight-bold text-caption"
                >Other PDP Chapters (Skip if there are no other chapters
                applicable)</q-item-label
              >
              <pdp-chapters
                v-model="project.selected_pdp_chapters"
                :filter="project.pdp_chapter_id"
              ></pdp-chapters>
            </template>
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Philippine Development (PDP) Results Matrices"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <pdp-indicators
              v-model="project.selected_pdp_indicators"
              :filter="project.pdp_chapter_id"
            ></pdp-indicators>
          </q-card-section>
        </q-card>

        <text-input
          class="q-my-sm"
          v-model="project.expected_outputs"
          label="Expected Outputs"
          type="textarea"
          :rules="rules.required"
          hint="Actual Deliverables, i.e. 100km of paved roads"
        />

        <section-header sectionTitle="Ten Point Agenda"></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <ten-point-agenda
              v-model="project.selected_ten_point_agenda"
            ></ten-point-agenda>
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Sustainable Development Goals"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <sd-goals
              v-model="project.selected_sustainable_development_goals"
            />
          </q-card-section>
        </q-card>

        <template v-if="project.cip">
          <section-header
            sectionTitle="Gender and Development Responsiveness"
          ></section-header>
          <q-card square flat bordered>
            <q-card-section class="q-gutter-y-md">
              <q-item-label class="text-caption">Required if CIP</q-item-label>
              <gad
                v-model="project.gad_id"
                class="col"
                :rules="rules.required"
              />
            </q-card-section>
          </q-card>
        </template>

        <section-header sectionTitle="Implementation Period"></section-header>
        <q-card square flat bordered>
          <q-card-section class="row q-col-gutter-sm">
            <div class="col">
							<years
								v-model="project.target_start_year"
								label="Start of Project Implementation"
								:rules="rules.required" />
            </div>

            <div class="col">
							<years
								v-model="project.target_end_year"
								label="Year of Project Completion"
								:rules="rules.required"
								:min-value="project.target_start_year" />
            </div>
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Project Preparation Details"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section class="q-gutter-sm">
            <project-document
              v-model="project.project_preparation_document_id"
              :rules="rules.required"
            ></project-document>

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
                  <tr @click="editFSCostDialog = true" class="cursor-pointer">
                    <td>
                      <edit-button @click="editFSCostDialog = true" />
                    </td>
                    <td>Total</td>
										<td-money :value="project.fs_target_2017" />
                    <td class="text-right">
                      {{ project.fs_target_2018 }}
                    </td>
                    <td class="text-right">
                      {{ project.fs_target_2019 }}
                    </td>
                    <td class="text-right">
                      {{ project.fs_target_2020 }}
                    </td>
                    <td class="text-right">
                      {{ project.fs_target_2021 }}
                    </td>
                    <td class="text-right">
                      {{ project.fs_target_2022 }}
                    </td>
                    <td class="text-right">
                      {{ fs_target_total | money }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </template>

            <text-input
              label="Other preparation document"
              v-model="project.project_preparation_document_others"
              v-if="project.project_preparation_document_id === '99'"
            />
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Pre-construction Costs"></section-header>
        <q-card square flat bordered>
          <q-card-section>
            <checkbox-item
              v-model="project.has_row"
              label="Right of Way"
            ></checkbox-item>

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
                    <th>Right of Way</th>
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
                  <tr @click="editRowCostDialog = true" class="cursor-pointer">
                    <td>
                      <edit-button @click="editRowCostDialog = true" />
                    </td>
                    <td>Total</td>
                    <td class="text-right">{{ project.row_target_2017 }}</td>
                    <td class="text-right">{{ project.row_target_2018 }}</td>
                    <td class="text-right">{{ project.row_target_2019 }}</td>
                    <td class="text-right">{{ project.row_target_2020 }}</td>
                    <td class="text-right">{{ project.row_target_2021 }}</td>
                    <td class="text-right">{{ project.row_target_2022 }}</td>
                    <td class="text-right">
                      {{ row_target_total | money }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class="row" v-if="project.has_row">
              <text-input
                label="Affected Households (No.)"
                v-model="project.row_affected"
                type="number"
              ></text-input>
            </div>

            <checkbox-item
              v-model="project.has_rap"
              label="Resettlement Action Plan"
            ></checkbox-item>

            <div class="row" v-if="project.has_rap">
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
                  <tr @click="editRapCostDialog = true" class="cursor-pointer">
                    <td>
                      <edit-button @click="editRapCostDialog = true" />
                    </td>
                    <td>Total</td>
                    <td class="text-right">{{ project.rap_target_2017 }}</td>
                    <td class="text-right">{{ project.rap_target_2018 }}</td>
                    <td class="text-right">{{ project.rap_target_2019 }}</td>
                    <td class="text-right">{{ project.rap_target_2020 }}</td>
                    <td class="text-right">{{ project.rap_target_2021 }}</td>
                    <td class="text-right">{{ project.rap_target_2022 }}</td>
                    <td class="text-right">
                      {{ rap_target_total | money }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class="row" v-if="project.has_rap">
              <text-input
                label="Affected Households (No.)"
                v-model="project.rap_affected"
                type="number"
              ></text-input>
            </div>
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Employment Generation"></section-header>
        <q-card square flat bordered>
          <q-card-section>
            <text-input
              v-model="project.employment_generated"
              label="No. of persons to be employed"
              hint="Please indicate the no. of persons to be employed by the project outside of the implementing agency"
							with-na
            />
          </q-card-section>
        </q-card>

        <section-header
          sectionTitle="Funding Source and Mode of Implementation"
        ></section-header>
        <q-card square flat bordered>
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <funding-source
                  label="Main Funding Source"
                  v-model="project.main_funding_source_id"
									:rules="rules.required"
                  class="q-mb-sm"
                />
                <q-item-label class="text-weight-bold text-caption"
                  >Other Funding Sources</q-item-label
                >
                <q-option-group
                  type="checkbox"
                  v-model="project.selected_funding_sources"
                  label="Other Funding Sources"
                  :options="filteredFs"
                ></q-option-group>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <funding-institution
                  v-model="project.funding_institution_id"
                  v-if="
                    project.main_funding_source_id === '2' ||
                      project.main_funding_source_id === '3'
                  "
                  :rules="rules.required"
                ></funding-institution>

                <implementation-mode
                  v-model="project.implementation_mode_id"
                  :rules="rules.required"
                ></implementation-mode>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Project Cost"></section-header>

        <q-card square flat bordered>
          <div class="row">
            <fs-financials
              :data="project.funding_source_financials"
              :project-id="project.id"
            />
          </div>

          <div class="row">
            <region-financials
              :data="project.region_financials"
              :project-id="project.id"
            />
          </div>
        </q-card>

        <section-header
          sectionTitle="Financial Accomplishments"
        ></section-header>
        <q-card square bordered flat>
          <q-card-section class="q-gutter-y-md">
            <!-- Investment Requirements (Total, Infrastructure, GAA, NEP, Disbursement) -->
            <q-item-label class="text-h6 text-weight-lighter">
              Investment Requirements (in absolute PhP)
            </q-item-label>

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
                      Target Investment Requirements <span class="text-negative"> (Auto-computed from
                      breakdown by Funding Source) </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total <q-icon name="help" color="primary">
                        <q-tooltip>Computed from Project Cost Breakdown by Funding Source</q-tooltip>
                      </q-icon>
                    </td>
										<td-money :value="investTotal.investment_target_2016" />
										<td-money :value="investTotal.investment_target_2017" />
										<td-money :value="investTotal.investment_target_2018" />
										<td-money :value="investTotal.investment_target_2019" />
										<td-money :value="investTotal.investment_target_2020" />
										<td-money :value="investTotal.investment_target_2021" />
										<td-money :value="investTotal.investment_target_2022" />
										<td-money :value="investTotal.investment_target_2023" />
										<td-money :value="investTotal.investment_target_2024" />
										<td-money :value="investTotal.investment_target_2025" />
										<td-money :value="investTotal.investment_target_total" />
                  </tr>
                  <tr>
                    <td>
                      Infrastructure <q-icon name="help" color="primary">
                        <q-tooltip>Computed from TRIP Breakdown by Funding Source</q-tooltip>
                      </q-icon>
                    </td>
										<td-money :value="infraTotal.infrastructure_target_2016" />
										<td-money :value="infraTotal.infrastructure_target_2017" />
										<td-money :value="infraTotal.infrastructure_target_2018" />
										<td-money :value="infraTotal.infrastructure_target_2019" />
										<td-money :value="infraTotal.infrastructure_target_2020" />
										<td-money :value="infraTotal.infrastructure_target_2021" />
										<td-money :value="infraTotal.infrastructure_target_2022" />
										<td-money :value="infraTotal.infrastructure_target_2023" />
										<td-money :value="infraTotal.infrastructure_target_2024" />
										<td-money :value="infraTotal.infrastructure_target_2025" />
										<td-money :value="infraTotal.infrastructure_target_total" />
                  </tr>
                  <tr>
                    <td colspan="12">
                      Actual Investments (Click edit button (<q-icon name="edit" color="blue" />) to edit)
                    </td>
                  </tr>
                  <tr @click="editNepDialog = true" class="cursor-pointer">
                    <td>
                      <edit-button @click="editNepDialog = true"></edit-button>
                      NEP
                    </td>
										<td-money :value="project.nep_2016" />
										<td-money :value="project.nep_2017" />
										<td-money :value="project.nep_2018" />
										<td-money :value="project.nep_2019" />
										<td-money :value="project.nep_2020" />
										<td-money :value="project.nep_2021" />
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td-money :value="nep_total" />
                  </tr>
                  <tr @click="editGaaDialog = true" class="cursor-pointer">
                    <td>
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editGaaDialog = true"
                      />
                      GAA
                    </td>
                    <td-money :value="project.gaa_2016" />
										<td-money :value="project.gaa_2017" />
										<td-money :value="project.gaa_2018" />
										<td-money :value="project.gaa_2019" />
										<td-money :value="project.gaa_2020" />
										<td-money :value="project.gaa_2021" />
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td-money :value="gaa_total" />
                  </tr>
                  <tr
                    @click="editDisbursementDialog = true"
                    class="cursor-pointer"
                  >
                    <td>
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editDisbursementDialog = true"
                      />
                      Disbursement *
                    </td>
										<td-money :value="project.disbursement_2016" />
										<td-money :value="project.disbursement_2017" />
										<td-money :value="project.disbursement_2018" />
										<td-money :value="project.disbursement_2019" />
										<td-money :value="project.disbursement_2020" />
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td class="bg-red-1"></td>
										<td-money :value="disbursement_total" />
                  </tr>
                </tbody>
              </q-markup-table>

              <!-- Edit NEP Dialog -->
              <q-dialog
                v-model="editNepDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <card-header
                    title="National Expenditure Program (NEP)"
                  ></card-header>

                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.nep_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input v-model="project.nep_2017" label="2017" />
                    <money-input v-model="project.nep_2018" label="2018" />
                    <money-input v-model="project.nep_2019" label="2019" />
                    <money-input v-model="project.nep_2020" label="2020" />
                    <money-input v-model="project.nep_2021" label="2021" />
										<money-input :value="nep_total" label="Total" readonly />
                  </div>
                  <q-card-actions align="right">
                    <q-btn
                      label="Close"
                      color="primary"
                      @click="editNepDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <!-- Edit GAA Dialog -->
              <q-dialog
                v-model="editGaaDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <card-header
                    title="General Appropriations Act (GAA)"
                  ></card-header>

                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.gaa_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input v-model="project.gaa_2017" label="2017" />
                    <money-input v-model="project.gaa_2018" label="2018" />
                    <money-input v-model="project.gaa_2019" label="2019" />
                    <money-input v-model="project.gaa_2020" label="2020" />
										<money-input :value="gaa_total" label="Total" readonly />
                  </div>
                  <q-card-actions align="right">
                    <q-btn
                      label="Close"
                      color="primary"
                      @click="editGaaDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <!-- Edit Disbursement Dialog -->
              <q-dialog
                v-model="editDisbursementDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <card-header title="Disbursement"></card-header>

                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.disbursement_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="project.disbursement_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="project.disbursement_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="project.disbursement_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="project.disbursement_2020"
                      label="2020"
                    />
										<money-input :value="disbursement_total" label="Total" readonly />
                  </div>
                  <q-card-actions align="right">
                    <q-btn
                      label="Close"
                      color="primary"
                      @click="editDisbursementDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>

            <div class="row justify-end">
              <span class="text-caption">* Note: Actual Disbursement data must be as of September 30, 2020.</span>
            </div>
          </q-card-section>
        </q-card>

        <!-- Edit Resettlement Action Plan Cost Dialog -->
        <q-dialog
          v-model="editRowCostDialog"
          full-height
          :position="$q.screen.xs ? void 0 : 'right'"
          persistent
          :maximized="$q.screen.xs"
          transition-show="jump-left"
          transition-hide="jump-right"
        >
          <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
            <card-header title="Right of Way"></card-header>

            <q-card-section class="q-pa-sm q-gutter-y-sm">
              <money-input v-model="project.row_target_2017" label="2017" />
              <money-input v-model="project.row_target_2018" label="2018" />
              <money-input v-model="project.row_target_2019" label="2019" />
              <money-input v-model="project.row_target_2020" label="2020" />
              <money-input v-model="project.row_target_2021" label="2021" />
              <money-input v-model="project.row_target_2022" label="2022" />
              <q-input
                label="Total"
                stack-label
                v-model="row_target_total"
                type="number"
                readonly
              ></q-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                label="Close"
                color="primary"
                @click="editRowCostDialog = false"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Edit Resettlement Action Plan Cost Dialog -->
        <q-dialog
          v-model="editRapCostDialog"
          full-height
          :position="$q.screen.xs ? void 0 : 'right'"
          persistent
          :maximized="$q.screen.xs"
          transition-show="jump-left"
          transition-hide="jump-right"
        >
          <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
            <card-header title="Resettlement Action Plan"></card-header>

            <q-card-section class="q-pa-sm q-gutter-y-sm">
              <money-input v-model="project.rap_target_2017" label="2017" />
              <money-input v-model="project.rap_target_2018" label="2018" />
              <money-input v-model="project.rap_target_2019" label="2019" />
              <money-input v-model="project.rap_target_2020" label="2020" />
              <money-input v-model="project.rap_target_2021" label="2021" />
              <money-input v-model="project.rap_target_2022" label="2022" />
              <money-input
                label="Total"
                stack-label
                readonly
                v-model="rap_target_total"
              ></money-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                label="Close"
                color="primary"
                @click="editRapCostDialog = false"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Edit Feasibility Study Cost Dialog -->
        <q-dialog
          v-model="editFSCostDialog"
          full-height
          :position="$q.screen.xs ? void 0 : 'right'"
          persistent
          :maximized="$q.screen.xs"
          transition-show="jump-left"
          transition-hide="jump-right"
        >
          <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
            <card-header title="Feasibility Study"></card-header>

            <q-card-section class="q-pa-sm q-gutter-y-sm">
              <money-input v-model="project.fs_target_2017" label="2017" />
              <money-input v-model="project.fs_target_2018" label="2018" />
              <money-input v-model="project.fs_target_2019" label="2019" />
              <money-input v-model="project.fs_target_2020" label="2020" />
              <money-input v-model="project.fs_target_2021" label="2021" />
              <money-input v-model="project.fs_target_2022" label="2022" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                label="Close"
                color="primary"
                @click="editFSCostDialog = false"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Add funding source dialog -->
        <q-dialog
          v-model="uploadSignedCopyDialog"
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-card style="width: 400px;">
            <card-header title="Finalize Project"></card-header>
            <q-card-section class="q-gutter-y-md">
              <q-file
                outlined
                square
                v-model="signed_copy"
                label="Scanned signed copy (PDF or image only)"
                stack-label
                accept="image/*, .pdf"
              ></q-file>
              <text-input
                label="Remarks (Required)"
                type="textarea"
                v-model="remarks"
                :rules="rules.required"
              ></text-input>
              <q-checkbox
                v-model="agree"
                label="I understand that I will not be able to update this project after finalizing it."
              ></q-checkbox>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Cancel" flat class="q-mr-md" v-close-popup></q-btn>
              <q-btn
                label="Submit"
                color="primary"
                @click="uploadSignedCopy"
                :disabled="!remarks || !agree"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Actions -->
        <div class="row justify-center q-mt-md q-gutter-sm">
          <q-btn
            label="Save"
            color="primary"
            @click="updateProject"
            v-if="canUpdate"
          ></q-btn>

          <q-btn
            label="Finalize"
            color="secondary"
            @click="finalizeProject"
            v-if="canFinalize"
          >
          </q-btn>

          <q-btn
            label="Validate"
            color="negative"
            @click="$emit('validate')"
            v-if="canValidate"
          >
          </q-btn>
        </div>
      </q-form>
    </template>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab color="secondary" icon="keyboard_arrow_right" direction="right">
        <q-fab-action
          color="positive"
          @click="updateProject"
          icon="save"
          v-if="canUpdate"
        />
        <q-fab-action
          color="secondary"
          @click="finalizeProject"
          icon="done_outline"
          v-if="canFinalize"
        />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
import {
  FETCH_FUNDING_SOURCES
} from '@/graphql/queries';
import BudgetTier from './dropdowns/BudgetTier';
import CipTypes from './dropdowns/CipTypes';
import Gad from './dropdowns/Gad';
import Region from './dropdowns/Region';
import Province from './dropdowns/Province';
import FundingSource from './dropdowns/FundingSource';
import FundingInstitution from './dropdowns/FundingInstitution';
import ImplementationMode from './dropdowns/ImplementationMode';
import InfrastructureSectors from './dropdowns/InfrastructureSectors';
import SpatialCoverage from './dropdowns/SpatialCoverage';
import TextInput from '@/ui/form-inputs/TextInput';
import Typology from './dropdowns/Typology';
import MoneyInput from '@/ui/form-inputs/MoneyInput';
import CheckboxInput from '@/ui/form-inputs/CheckboxInput';
import DateInput from '@/ui/form-inputs/DateInput';
// dropdowns
import ImplementingAgency from './dropdowns/ImplementingAgency';
import ProjectStatus from './dropdowns/ProjectStatus';
import {SectionHeader} from '@/ui';
import EditButton from './shared/EditButton';
import CardHeader from '@/ui/cards/CardHeader';
import CheckboxItem from '@/ui/form-inputs/CheckboxItem';
import RegionFinancials from './financials/RegionFinancials';
import FsFinancials from './financials/FsFinancials';
import Regions from './dropdowns/Regions';
import FsInfrastructure from './financials/FsInfrastructure';
import TechnicalReadinesses from './dropdowns/TechnicalReadinesses';
import PdpChapters from './dropdowns/PdpChapters';
import PdpChapter from './dropdowns/PdpChapter';
import PdpIndicators from './dropdowns/PdpIndicators';
import TenPointAgenda from './dropdowns/TenPointAgenda';
import SdGoals from './dropdowns/SdGoals';
import ProjectDocument from './dropdowns/ProjectDocument';
import ImplementationBases from './dropdowns/ImplementationBases';
import TdMoney from '../../ui/components/TdMoney'
import Years from './dropdowns/Years'
import Types from './dropdowns/Types'

export default {
  components: {
	  Years,
	  TdMoney,
    BudgetTier,
    CipTypes,
    SpatialCoverage,
    Gad,
    ImplementationMode,
    InfrastructureSectors,
    FundingInstitution,
    FundingSource,
    Province,
    Region,
    ProjectStatus,
    ImplementingAgency,
    DateInput,
    MoneyInput,
    TextInput,
    CheckboxInput,
    SectionHeader,
    EditButton,
    CardHeader,
    CheckboxItem,
    RegionFinancials,
    FsFinancials,
    Regions,
    Typology,
    FsInfrastructure,
    TechnicalReadinesses,
    PdpChapters,
    PdpChapter,
    PdpIndicators,
    TenPointAgenda,
    SdGoals,
    ProjectDocument,
    ImplementationBases,
    Types
  },

  name: 'EditPipol',

  props: ['project'],

  apollo: {
    funding_sources: {
      query: FETCH_FUNDING_SOURCES,
      result({ data }) {
        this.funding_sources = data.funding_sources.map(x => {
          return {
            value: x.id,
            label: x.name
          };
        });
      }
    }
  },

  computed: {
    submission_status() {
      const name = this.project.submission_status ? this.project.submission_status.name : ''

      return name
    },
    canUpdate() {
      const submissionStatus = this.submission_status
      const isReviewer = this.isReviewer,
        isEncoder = this.isEncoder;
        console.log(
          `submissionStatus: ${submissionStatus}, isReviewer: ${isReviewer}, isEncoder: ${isEncoder}`
        );
      let res = false;

      if (isReviewer && submissionStatus === 'Endorsed') {
        res = true;
      } else if (submissionStatus === 'Draft' && isEncoder) {
        res = true;
      } else {
        res = false;
      }
      return res;
    },
    canFinalize() {
      const finalized = this.project.finalized || false,
        endorsed = this.project.endorsed || false,
        isEncoder = this.isEncoder;

      if (!finalized && !endorsed && isEncoder) {
        return true;
      }
      return false;
    },
    canValidate() {
      return this.project.endorsed && this.isReviewer;
    },
    isEncoder() {
      return this.$store.getters['auth/isEncoder'];
    },
    isReviewer() {
      return this.$store.getters['auth/isReviewer'];
    },
    infraTotal() {
      const fsf = this.project.funding_source_infrastructures;

      let infraTotal = {
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

      if (fsf.length) {
        const totalInfra = fsf.reduce((acc, val) => {
          console.log('infraTotal ', acc);
	        console.log('infraTotal ', val);
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
						(val.infrastructure_target_2016 +
            val.infrastructure_target_2017 +
            val.infrastructure_target_2018 +
            val.infrastructure_target_2019 +
            val.infrastructure_target_2020 +
            val.infrastructure_target_2021 +
            val.infrastructure_target_2022 +
            val.infrastructure_target_2023 +
            val.infrastructure_target_2024 +
            val.infrastructure_target_2025);
          return acc;
        }, infraTotal);

	      return totalInfra;
      }

			return infraTotal
    },
    investTotal() {
      const fsf = this.project.funding_source_financials;

      const investTotal = {
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
      }

      if (fsf.length) {
        const totalInvest = fsf.reduce((acc, val) => {
	        console.log('current acc ', acc);
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
						(val.investment_target_2016 +
            val.investment_target_2017 +
            val.investment_target_2018 +
            val.investment_target_2019 +
            val.investment_target_2020 +
            val.investment_target_2021 +
            val.investment_target_2022 +
            val.investment_target_2023 +
            val.investment_target_2024 +
            val.investment_target_2025);
          return acc;
        }, investTotal);

        return totalInvest
      }

      return investTotal;
    },

    filteredFs() {
      const fs = this.funding_sources,
        filter = parseInt(this.project.main_funding_source_id) || 0;

      return fs.filter(f => parseInt(f.value) !== filter);
    },

    withSignedCopy() {
      return !!this.project.signed_copy;
    },

    showSaveChanges() {
      const statusId = parseInt(this.project.processing_status.id);
      const validData = !!this.project.validation_data;

      console.log(statusId, validData);
      // if draft or invalid data
      if (statusId === 1 || (statusId === 4 && !validData)) {
        // do not show
        return true;
      }
      // show
      return false;
    },

    filteredYears() {
      const years = this.years;
      const start = this.project.target_start_year;

      let filteredYears = [];

      if (start) {
        filteredYears = years.filter(year => year.id >= start);

        return filteredYears;
      }
      return years;
    },

    infrastructure_target_total() {
      const project = this.project;
      return (
        project.infrastructure_target_2016 +
        project.infrastructure_target_2017 +
        project.infrastructure_target_2018 +
        project.infrastructure_target_2019 +
        project.infrastructure_target_2020 +
        project.infrastructure_target_2021 +
        project.infrastructure_target_2022 +
        project.infrastructure_target_2023
      );
    },

    investment_target_total() {
      const project = this.project;
      return (
        project.investment_target_2016 +
        project.investment_target_2017 +
        project.investment_target_2018 +
        project.investment_target_2019 +
        project.investment_target_2020 +
        project.investment_target_2021 +
        project.investment_target_2022 +
        project.investment_target_2023
      );
    },

    row_target_total() {
      const project = this.project;
      return (
        project.row_target_2017 +
        project.row_target_2018 +
        project.row_target_2019 +
        project.row_target_2020 +
        project.row_target_2021 +
        project.row_target_2022
      );
    },

    rap_target_total() {
      const project = this.project;
      return (
        project.rap_target_2017 +
        project.rap_target_2018 +
        project.rap_target_2019 +
        project.rap_target_2020 +
        project.rap_target_2021 +
        project.rap_target_2022
      );
    },

    fs_target_total() {
      const project = this.project;
      return (
        project.fs_target_2017 +
        project.fs_target_2018 +
        project.fs_target_2019 +
        project.fs_target_2020 +
        project.fs_target_2021 +
        project.fs_target_2022
      );
    },

    disbursement_total() {
      const project = this.project;
      return (
        project.disbursement_2016 +
        project.disbursement_2017 +
        project.disbursement_2018 +
        project.disbursement_2019 +
        project.disbursement_2020
      );
    },

    gaa_total() {
      const project = this.project;
      return (
        project.gaa_2016 +
        project.gaa_2017 +
        project.gaa_2018 +
        project.gaa_2019 +
        project.gaa_2020 +
        project.gaa_2021
      );
    },

    nep_total() {
      const project = this.project;
      return (
        project.nep_2016 +
        project.nep_2017 +
        project.nep_2018 +
        project.nep_2019 +
        project.nep_2020 +
        project.nep_2021
      );
    }
  },

  data() {
    return {
      bases: [],
      finalizeProjectDialog: false,
      agree: false,
      signed_copy: null,
      remarks: '',
      newFundingSource: {
        id: null,
        funding_source_id: null,
        target_2016: 0,
        target_2017: 0,
        target_2018: 0,
        target_2019: 0,
        target_2020: 0,
        target_2021: 0,
        target_2022: 0,
        target_2023: 0
      },
      newRegion: {
        id: null,
        region_id: null,
        target_2016: 0,
        target_2017: 0,
        target_2018: 0,
        target_2019: 0,
        target_2020: 0,
        target_2021: 0,
        target_2022: 0,
        target_2023: 0
      },
      types: [],
      years: [],
      tiers: [],
      trueOrFalse: [
        {
          label: 'No',
          value: false
        },
        {
          label: 'Yes',
          value: true
        }
      ],
      showGadForm: false,
      editRapCostDialog: false,
      editTotalInvestmentDialog: false,
      editInfrastructureInvestmentDialog: false,
      editNepDialog: false,
      editGaaDialog: false,
      editDisbursementDialog: false,
      addRegionFinancialDialog: false,
      error: null,
      errorMessage: null,
      rules: {
        required: [val => !!val || '* Required'],
        selectOne: [val => (!!val && val.length > 0) || '* Required']
      },
      editFSCostDialog: false,
      editRowCostDialog: false,
      editRegionFinancialDialog: false,
      addFundingSourceFinancialDialog: false,
      editFundingSourceFinancialDialog: false,
      regions: [],
      funding_sources: [],
      validationErrors: [],
      gad_form: null,
      uploadGadForm: false,
      uploadSignedCopyDialog: false
    };
  },

  methods: {
    addRegionRow(evt) {
      this.project.regions.push(evt);

      this.addRegionFinancialDialog = false;
    },

    deleteRegionRow(index) {
      this.project.regions.splice(index, 1);
    },

    updateRegionRow(index, evt) {
      this.project.regions.splice(index, 1, evt);
    },

    showAddFundingSourceFinancial() {
      this.addFundingSourceFinancialDialog = true;
    },

    addFsRow(evt) {
      this.project.funding_sources.push(evt);

      this.addFundingSourceFinancialDialog = false;
    },

    deleteFsRow(index) {
      this.project.funding_sources.splice(index, 1);
    },

    updateFsRow(index, evt) {
      this.project.funding_sources.splice(index, 1, evt);
    },

    validateData() {
      // return true if data is valid
      // validate project and save
      return this.$refs.editForm.validate().then(success => {
        // if success, save data
        if (success) {
          this.saveProject();
        } else {
          alert('Please check the form for errors');
          return false;
        }
      });
    },

    updateProject() {
      const project = this.project,
        investTotal = this.investTotal,
        infraTotal = this.infraTotal,
      	nep_total = this.nep_total,
				gaa_total = this.gaa_total,
				disbursement_total = this.disbursement_total

      project.investment_target_2016 = investTotal.investment_target_2016;
      project.investment_target_2017 = investTotal.investment_target_2017;
      project.investment_target_2018 = investTotal.investment_target_2018;
      project.investment_target_2019 = investTotal.investment_target_2019;
      project.investment_target_2020 = investTotal.investment_target_2020;
      project.investment_target_2021 = investTotal.investment_target_2021;
      project.investment_target_2022 = investTotal.investment_target_2022;
      project.investment_target_2023 = investTotal.investment_target_2023;
      project.investment_target_2024 = investTotal.investment_target_2024;
      project.investment_target_2025 = investTotal.investment_target_2025;
      project.investment_target_total = investTotal.investment_target_total;
      project.infrastructure_target_2016 =
        infraTotal.infrastructure_target_2016;
      project.infrastructure_target_2017 =
        infraTotal.infrastructure_target_2017;
      project.infrastructure_target_2018 =
        infraTotal.infrastructure_target_2018;
      project.infrastructure_target_2019 =
        infraTotal.infrastructure_target_2019;
      project.infrastructure_target_2020 =
        infraTotal.infrastructure_target_2020;
      project.infrastructure_target_2021 =
        infraTotal.infrastructure_target_2021;
      project.infrastructure_target_2022 =
        infraTotal.infrastructure_target_2022;
      project.infrastructure_target_2023 =
        infraTotal.infrastructure_target_2023;
      project.infrastructure_target_2024 =
        infraTotal.infrastructure_target_2024;
      project.infrastructure_target_2025 =
        infraTotal.infrastructure_target_2025;
      project.infrastructure_target_total =
        infraTotal.infrastructure_target_total;
      project.disbursement_total = disbursement_total
	    project.gaa_total = gaa_total
	    project.nep_total = nep_total
      // confirm submission
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Save your progress',
          cancel: true
        })
        .onOk(() => {
          this.$q.loading.show();
          this.$store
            .dispatch('projects/updateProject', project)
            .then(() => {
              this.$q.notify({
                message: 'Successfully updated project',
                type: 'positive',
                position: 'bottom-right'
              });
              this.saved();
            })
            .finally(() => this.$q.loading.hide());
        });
    },

    finalizeProject() {
      this.$refs.editForm.validate().then(success => {
        // if success, save data
        if (success) {
	        const project = this.project,
		        investTotal = this.investTotal,
		        infraTotal = this.infraTotal,
		        nep_total = this.nep_total,
		        gaa_total = this.gaa_total,
		        disbursement_total = this.disbursement_total

	        project.investment_target_2016 = investTotal.investment_target_2016;
	        project.investment_target_2017 = investTotal.investment_target_2017;
	        project.investment_target_2018 = investTotal.investment_target_2018;
	        project.investment_target_2019 = investTotal.investment_target_2019;
	        project.investment_target_2020 = investTotal.investment_target_2020;
	        project.investment_target_2021 = investTotal.investment_target_2021;
	        project.investment_target_2022 = investTotal.investment_target_2022;
	        project.investment_target_2023 = investTotal.investment_target_2023;
	        project.investment_target_2024 = investTotal.investment_target_2024;
	        project.investment_target_2025 = investTotal.investment_target_2025;
	        project.investment_target_total = investTotal.investment_target_total;
	        project.infrastructure_target_2016 =
		        infraTotal.infrastructure_target_2016;
	        project.infrastructure_target_2017 =
		        infraTotal.infrastructure_target_2017;
	        project.infrastructure_target_2018 =
		        infraTotal.infrastructure_target_2018;
	        project.infrastructure_target_2019 =
		        infraTotal.infrastructure_target_2019;
	        project.infrastructure_target_2020 =
		        infraTotal.infrastructure_target_2020;
	        project.infrastructure_target_2021 =
		        infraTotal.infrastructure_target_2021;
	        project.infrastructure_target_2022 =
		        infraTotal.infrastructure_target_2022;
	        project.infrastructure_target_2023 =
		        infraTotal.infrastructure_target_2023;
	        project.infrastructure_target_2024 =
		        infraTotal.infrastructure_target_2024;
	        project.infrastructure_target_2025 =
		        infraTotal.infrastructure_target_2025;
	        project.infrastructure_target_total =
		        infraTotal.infrastructure_target_total;
	        project.disbursement_total = disbursement_total
	        project.gaa_total = gaa_total
	        project.nep_total = nep_total

          this.$q
            .dialog({
              title: 'Confirm Finalization',
              message:
                'Are you sure you want to finalize this project? Finalized project will no longer be editable. Type <strong>YES</strong> to confirm.',
              prompt: {
                model: '',
                isValid: val => val.toLowerCase() === 'yes'
              },
              persistent: true,
              html: true,
              cancel: true
            })
            .onOk(() => {
              this.$q.loading.show({
                message: 'Saving project'
              });
              this.$store
                .dispatch('projects/finalizeProject', project)
                .then(() => {
                  this.$q.loading.hide();
                  this.$q.notify({
                    type: 'positive',
                    message: 'Successfully finalized project',
                    position: 'bottom-right'
                  });
                  this.saved();
                })
                .then(() => this.$router.push(`/projects/${this.project.id}`))
                .finally(() => this.$q.loading.hide());
            });
        } else {
          alert('Please check the form for errors');
        }
      });
    },

    uploadSignedCopy() {
      const payload = {
        id: this.project.id,
        signed_copy: this.signed_copy,
        remarks: this.remarks
      };
      this.$q.loading.show();
      this.$store
        .dispatch('projects/uploadSignedCopy', payload)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Successfully uploaded signed copy.',
            position: 'bottom-right'
          });
        })
        .catch(err =>
          this.$q.notify({
            type: 'negative',
            message: err.message,
            position: 'bottom-right'
          })
        )
        .finally(() => {
          this.$q.loading.hide();
          this.uploadSignedCopyDialog = false;
        });
    },

    saved() {
      this.$emit('saved');
    }
  },
  filters: {
    money(val) {
      if (!val) {
        return 0.0;
      }
      return val.toLocaleString();
    }
  },
  beforeDestroy() {}
};
</script>
