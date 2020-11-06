<template>
  <div>
    <pre>
      {{project}}
    </pre>

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
        <div class="row justify-end q-px-sm">
          <q-badge color="blue"> v. {{ project.version }} </q-badge>
        </div>
        <section-header sectionTitle="Basic Information"></section-header>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <text-input
              v-model="project.title"
              label="Project/Program Title"
              type="text"
              :rules="rules.required"
            />

            <div class="row">
              <div class="col">
                <radio-input
                  v-model="project.type_id"
                  label="Locally-funded or Foreign-assisted"
                  :options="types"
                  :recode="true"
                  :rules="rules.required"
                />
              </div>

              <div class="col">
                <radio-input
                  v-model="project.infrastructure"
                  label="Has Infrastructure Component"
                  :options="trueOrFalse"
                />
              </div>
            </div>

            <text-input
              v-model="project.description"
              label="Description"
              type="textarea"
              :rules="rules.required"
            />

            <div class="row q-col-gutter-md q-mt-md">
              <div class="col">
                <single-select
                  v-model="project.target_start_year"
                  label="Implementation Start"
                  :options="years"
                  :rules="rules.required"
                ></single-select>
              </div>

              <div class="col">
                <single-select
                  v-model="project.target_end_year"
                  label="Implementation End"
                  :options="filteredYears"
                  :rules="rules.required"
                ></single-select>
              </div>
            </div>

            <implementing-agency
              v-model="project.operating_unit_id"
              :rules="rules.selectOne"
              :readonly="true"
            ></implementing-agency>
          </q-card-section>
        </q-card>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <spatial-coverage
              v-model="project.spatial_coverage_id"
              :rules="rules.selectOne"
            ></spatial-coverage>

            <region
              v-model="project.region_id"
              v-if="project.spatial_coverage_id === '3'"
              :rules="rules.selectOne"
              label="Region"
            ></region>

            <regions
              v-model="project.regions"
              v-if="project.spatial_coverage_id === '2'"
              label="Inter-regional"
            ></regions>

            <province
              v-model="project.province_id"
              v-if="project.spatial_coverage_id === '4'"
              :rules="rules.selectOne"
            ></province>

            <district
              v-model="project.district_id"
              v-if="project.spatial_coverage_id === '5'"
              :rules="rules.selectOne"
            ></district>

            <city-municipality
              v-model="project.city_municipality_id"
              v-if="project.spatial_coverage_id === '6'"
              :rules="rules.selectOne"
            ></city-municipality>
          </q-card-section>
        </q-card>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section>
            <q-item-label header>
              Inclusion in any of the following documents
            </q-item-label>

            <checkbox-input
              label="Agriculture and Fisheries Modernization and Industrialization Plan (AFMIP)"
              v-model="project.afmip"
            />

            <checkbox-input
              label="Regional Development Investment Program (RDIP)"
              v-model="project.rdip"
            />

            <checkbox-input
              label="Provincial Commodity Investment Plan (PCIP)"
              v-model="project.pcip"
            />
          </q-card-section>
        </q-card>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <text-input
              v-model="project.goals"
              label="Goals"
              type="textarea"
              :rules="rules.required"
            />

            <text-input
              v-model="project.outcomes"
              label="Outcomes"
              type="textarea"
              :rules="rules.required"
            />

            <text-input
              v-model="project.purpose"
              label="Purpose"
              type="textarea"
              :rules="rules.required"
            />

            <text-input
              v-model="project.expected_outputs"
              label="Expected Outputs"
              type="textarea"
              :rules="rules.required"
            />

            <text-input
              v-model="project.beneficiaries"
              label="Beneficiaries"
              :rules="rules.required"
            />

            <text-input
              v-model="project.employment_generated"
              label="Employment Generated"
              :rules="rules.required"
            />

            <gad v-model="project.gad_id" class="col" :rules="rules.required" />
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Technical Readiness"></section-header>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <q-item-label header>
              * Check all that applies and provide the date the requirement is
              complied.
            </q-item-label>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="Approved by DA-wide Clearinghouse"
                  v-model="project.clearinghouse"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.clearinghouse"
                  v-model="project.clearinghouse_date"
                ></date-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="NEDA Submission"
                  v-model="project.neda_submission"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.neda_submission"
                  v-model="project.neda_submission_date"
                ></date-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="NEDA Secretariat Review"
                  v-model="project.neda_secretariat_review"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.neda_secretariat_review"
                  v-model="project.neda_secretariat_review_date"
                ></date-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="NEDA Board"
                  v-model="project.neda_board"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.neda_board"
                  v-model="project.neda_board_date"
                ></date-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="ICC Endorsed"
                  v-model="project.icc_endorsed"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.icc_endorsed"
                  v-model="project.icc_endorsed_date"
                ></date-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <checkbox-input
                  label="ICC Approved"
                  v-model="project.icc_approved"
                ></checkbox-input>
              </div>
              <div class="col">
                <date-input
                  :disable="!project.icc_approved"
                  v-model="project.icc_approved_date"
                ></date-input>
              </div>
            </div>

            <text-input
              v-model="project.implementation_risk"
              label="Implementation Risk &amp; Mitigation Strategy"
              type="textarea"
              :rules="rules.required"
            />
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Financial Information"></section-header>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <budget-tier
              v-model="project.tier_id"
              :rules="rules.selectOne"
            ></budget-tier>

            <text-input
              label="UACS Code"
              v-model="project.uacs_code"
            ></text-input>

            <funding-source
              label="Main Funding Source"
              v-model="project.main_funding_source_id"
              :rules="rules.required"
            ></funding-source>

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

            <div class="row q-col-gutter-sm">
              <money-input
                v-model="project.total_project_cost"
                label="Total Project Cost"
                :rules="rules.required"
              />
            </div>
          </q-card-section>
        </q-card>

        <section-header sectionTitle="Investment Requirements"></section-header>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <checkbox-item
              v-model="project.has_fs"
              label="Feasibility Study"
            ></checkbox-item>

            <div class="row" v-if="project.has_fs">
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
                    <td class="text-right">
                      {{ project.fs_target_2017 }}
                    </td>
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
            </div>

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

        <div class="row q-pa-sm">
          <region-financials
            :data="project.region_financials"
            :project-id="project.id"
          />
        </div>

        <div class="row q-pa-sm">
          <fs-financials
            :data="project.funding_source_financials"
            :project-id="project.id"
          />
        </div>

        <div class="row q-pa-sm">
          <fs-financials
            :data="project.funding_source_infrastructure"
            :project-id="project.id"
          />
        </div>

        <q-card square bordered flat class="q-ma-sm">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="13">
                      Target Investment Requirements
                    </td>
                  </tr>
                  <tr
                    @click="editTotalInvestmentDialog = true"
                    class="cursor-pointer"
                  >
                    <td>Total</td>
                    <td class="text-right">
                      {{ project.investment_target_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2024 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.investment_target_2025 | money }}
                    </td>
                    <td class="text-right">
                      {{ investment_target_total | money }}
                    </td>
                    <td class="text-center">
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editTotalInvestmentDialog = true"
                      />
                    </td>
                  </tr>
                  <tr
                    @click="editInfrastructureInvestmentDialog = true"
                    class="cursor-pointer"
                  >
                    <td>Infrastructure</td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2024 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.infrastructure_target_2025 | money }}
                    </td>
                    <td class="text-right">
                      {{ infrastructure_target_total | money }}
                    </td>
                    <td class="text-center">
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editInfrastructureInvestmentDialog = true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="13">
                      Actual Investments
                    </td>
                  </tr>
                  <tr @click="editNepDialog = true" class="cursor-pointer">
                    <td>NEP</td>
                    <td class="text-right">
                      {{ project.nep_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2024 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.nep_2025 | money }}
                    </td>
                    <td class="text-right">
                      {{ nep_total | money }}
                    </td>
                    <td class="text-center">
                      <edit-button @click="editNepDialog = true"></edit-button>
                    </td>
                  </tr>
                  <tr @click="editGaaDialog = true" class="cursor-pointer">
                    <td>GAA</td>
                    <td class="text-right">
                      {{ project.gaa_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2024 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.gaa_2025 | money }}
                    </td>
                    <td class="text-right">
                      {{ gaa_total | money }}
                    </td>
                    <td class="text-center">
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editGaaDialog = true"
                      />
                    </td>
                  </tr>
                  <tr
                    @click="editDisbursementDialog = true"
                    class="cursor-pointer"
                  >
                    <td>Disbursement</td>
                    <td class="text-right">
                      {{ project.disbursement_2016 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2017 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2018 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2019 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2020 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2021 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2022 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2023 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2024 | money }}
                    </td>
                    <td class="text-right">
                      {{ project.disbursement_2025 | money }}
                    </td>
                    <td class="text-right">
                      {{ disbursement_total | money }}
                    </td>
                    <td class="text-center">
                      <q-btn
                        icon="edit"
                        color="secondary"
                        flat
                        round
                        dense
                        size="sm"
                        @click="editDisbursementDialog = true"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>

              <!-- Edit Total Investment Dialog -->
              <q-dialog
                v-model="editTotalInvestmentDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <card-header title="Total Investment Target"></card-header>

                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.investment_target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="project.investment_target_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="project.investment_target_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="project.investment_target_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="project.investment_target_2020"
                      label="2020"
                    />
                    <money-input
                      v-model="project.investment_target_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="project.investment_target_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="project.investment_target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>

                  <q-card-actions align="right">
                    <q-btn
                      label="Close"
                      color="primary"
                      @click="editTotalInvestmentDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <!-- Edit Infrastructure Investment Dialog -->
              <q-dialog
                v-model="editInfrastructureInvestmentDialog"
                full-height
                :position="$q.screen.xs ? void 0 : 'right'"
                persistent
                :maximized="$q.screen.xs"
                transition-show="jump-left"
                transition-hide="jump-right"
              >
                <q-card :style="$q.screen.gt.xs ? 'min-width:400px' : ''">
                  <card-header
                    title="Infrastructure Investment Target"
                  ></card-header>

                  <div class="q-pa-sm q-gutter-y-sm">
                    <money-input
                      v-model="project.infrastructure_target_2016"
                      label="2016 &amp; Prior"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2017"
                      label="2017"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2018"
                      label="2018"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2019"
                      label="2019"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2020"
                      label="2020"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="project.infrastructure_target_2023"
                      label="2023 &amp; Beyond"
                    />
                  </div>
                  <q-card-actions align="right">
                    <q-btn
                      label="Close"
                      color="primary"
                      @click="editInfrastructureInvestmentDialog = false"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>

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
                    <money-input v-model="project.nep_2022" label="2022" />
                    <money-input
                      v-model="project.nep_2023"
                      label="2023 &amp; Beyond"
                    />
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
                    <money-input v-model="project.gaa_2021" label="2021" />
                    <money-input v-model="project.gaa_2022" label="2022" />
                    <money-input
                      v-model="project.gaa_2023"
                      label="2023 &amp; Beyond"
                    />
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
                    <money-input
                      v-model="project.disbursement_2021"
                      label="2021"
                    />
                    <money-input
                      v-model="project.disbursement_2022"
                      label="2022"
                    />
                    <money-input
                      v-model="project.disbursement_2023"
                      label="2023 &amp; Beyond"
                    />
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

        <section-header sectionTitle="PAP Status"></section-header>

        <q-card square bordered flat class="q-ma-sm">
          <q-card-section class="q-gutter-y-md">
            <project-status
              v-model="project.project_status_id"
              :rules="rules.selectOne"
            ></project-status>

            <text-input
              v-model="project.updates"
              label="Updates"
              type="textarea"
              :rules="rules.required"
            />

            <date-input
              v-model="project.updates_date"
              label="As of"
              :rules="rules.required"
            />
          </q-card-section>
        </q-card>

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
        <div class="row justify-center q-gutter-sm">
          <!--          <q-btn outline label="Download" @click="downloadProject"></q-btn>-->

          <q-btn
            v-if="!project.finalized && showRandom"
            outline
            label="Random"
            color="red"
            @click="generateFakeData"
          ></q-btn>

          <q-btn
            label="Save"
            color="primary"
            @click="updateProject"
            v-if="!project.finalized"
          ></q-btn>

          <q-btn
            label="Finalize"
            color="secondary"
            @click="finalizeProject"
            v-if="!project.finalized"
          >
          </q-btn>
        </div>
      </q-form>
    </template>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab color="secondary" icon="keyboard_arrow_right" direction="right">
        <q-fab-action
          outline
          color="negative"
          @click="generateFakeData"
          icon="wifi_protected_setup"
          v-if="!project.finalized"
        />
        <q-fab-action
          color="positive"
          @click="updateProject"
          icon="save"
          v-if="!project.finalized"
        />
        <q-fab-action
          color="secondary"
          @click="finalizeProject"
          icon="done_outline"
          v-if="!project.finalized"
        />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
// import InvestmentTable from './shared/InvestmentTable.vue';
import {
  FETCH_TYPES,
  FETCH_YEARS,
  FETCH_FUNDING_SOURCES
} from '@/graphql/queries';
import BudgetTier from './dropdowns/BudgetTier';
import Gad from './dropdowns/Gad';
import Region from './dropdowns/Region';
import Province from './dropdowns/Province';
import FundingSource from './dropdowns/FundingSource';
import FundingInstitution from './dropdowns/FundingInstitution';
import ImplementationMode from './dropdowns/ImplementationMode';
import CityMunicipality from './dropdowns/CityMunicipality';
import District from './dropdowns/District';
import SpatialCoverage from './dropdowns/SpatialCoverage';
import TextInput from '@/ui/form-inputs/TextInput';
import RadioInput from '@/ui/form-inputs/RadioInput';
import SingleSelect from '@/ui/form-inputs/SingleSelect';
import MoneyInput from '@/ui/form-inputs/MoneyInput';
import CheckboxInput from '@/ui/form-inputs/CheckboxInput';
import DateInput from '@/ui/form-inputs/DateInput';
// dropdowns
import ImplementingAgency from './dropdowns/ImplementingAgency';
import ProjectStatus from './dropdowns/ProjectStatus';
import SectionHeader from './shared/SectionHeader';
import EditButton from './shared/EditButton';
import CardHeader from '@/ui/cards/CardHeader';
import CheckboxItem from '@/ui/form-inputs/CheckboxItem';
import RegionFinancials from './financials/RegionFinancials';
import FsFinancials from './financials/FsFinancials';
import Regions from './dropdowns/Regions';

import { generateFakeProject } from '@/utils';
import axios from 'axios';

export default {
  components: {
    BudgetTier,
    SpatialCoverage,
    Gad,
    District,
    CityMunicipality,
    ImplementationMode,
    FundingInstitution,
    FundingSource,
    Province,
    Region,
    ProjectStatus,
    ImplementingAgency,
    DateInput,
    MoneyInput,
    SingleSelect,
    RadioInput,
    TextInput,
    CheckboxInput,
    SectionHeader,
    EditButton,
    CardHeader,
    CheckboxItem,
    RegionFinancials,
    FsFinancials,
    Regions
    // InvestmentTable
  },

  name: 'EditProject',

  props: ['project'],

  apollo: {
    types: {
      query: FETCH_TYPES
    },
    years: {
      query: FETCH_YEARS
    },
    funding_sources: {
      query: FETCH_FUNDING_SOURCES
    }
  },

  computed: {
    showRandom() {
      return process.env.DEV;
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
        project.disbursement_2020 +
        project.disbursement_2021 +
        project.disbursement_2022 +
        project.disbursement_2023
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
        project.gaa_2021 +
        project.gaa_2022 +
        project.gaa_2023
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
        project.nep_2021 +
        project.nep_2022 +
        project.nep_2023
      );
    }
  },

  data() {
    return {
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
    showAlert(e) {
      alert(e.id);
    },

    generateFakeProject,

    generateFakeData() {
      const fakeProject = this.generateFakeProject();

      Object.assign(this.project, fakeProject);
    },

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

    downloadProject() {
      this.$q.loading.show('Generating file...');
      this.$store
        .dispatch('projects/download', { id: this.$route.params.id })
        .then(res => {
          return axios.post(process.env.REPORT_ENDPOINT, res.project, {
            responseType: 'arraybuffer',
            headers: {
              'content-type': 'application/json',
              accept:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
          });
        })
        .then(res => {
          const type = res.headers['content-type'];
          const blob = new Blob([res.data], {
            type: type,
            encoding: 'UTF-8'
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'export.docx';
          link.click();
        })
        .catch(err => console.log(err.message))
        .finally(() => this.$q.loading.hide());
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
            .dispatch('projects/updateProject', this.project)
            .then(() => {
              this.$q.notify({
                message: 'Successfully updated project',
                type: 'positive',
                position: 'bottom-right'
              });
              this.saved();
            })
            .then(() => this.$q.loading.hide());
        });
    },

    finalizeProject() {
      this.$refs.editForm.validate().then(success => {
        // if success, save data
        if (success) {
          this.$q
            .dialog({
              title: 'Confirm Finalization',
              message:
                'Finalized project will no longer be editable. Proceed with caution.',
              persistent: true,
              cancel: true
            })
            .onOk(() => {
              this.$q.loading.show({
                message: 'Saving project'
              });
              this.$store
                .dispatch('projects/finalizeProject', this.project)
                .then(() => {
                  this.$q.loading.hide();
                  this.$q.notify({
                    type: 'positive',
                    message: 'Successfully finalized project',
                    position: 'bottom-right'
                  });
                  this.saved();
                })
                .then(() => this.$router.push(`/projects/${this.project.id}`));
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
