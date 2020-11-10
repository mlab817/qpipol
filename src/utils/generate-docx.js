import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import { date } from 'quasar'

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const recodeData = (data) => {
  // let's destructure
  const {
    title,
    type,
    prexc_program,
    prexc_subprogram,
    bases,
    description,
    regions,
    region,
    operating_unit,
    spatial_coverage,
    pip,
    cip,
    trip,
    rdip,
    typology,
    cip_type,
    rdc_endorsed,
    rdc_endorsed_date,
    infrastructure_subsectors,
    technical_readinesses,
    implementation_risk,
    readiness,
    iccable,
    clearinghouse,
    clearinghouse_date,
    neda_submission,
    neda_submission_date,
    neda_secretariat_review,
    neda_secretariat_review_date,
    icc_endorsed,
    icc_endorsed_date,
    icc_approved,
    neda_board,
    neda_board_date,
    tier,
    uacs_code,
    updates,
    updates_date,
    pdp_chapter,
    pdp_chapters,
    pdp_indicators,
    expected_outputs,
    ten_point_agenda,
    sustainable_development_goals,
    gad,
    target_start_year,
    target_end_year,
    project_preparation_document,
    project_preparation_document_others,
    row_affected,
    rap_affected,
    employment_generated,
    main_funding_source,
    funding_institution,
    implementation_mode,
    funding_sources,
    nep_2016,
    nep_2017,
    nep_2018,
    nep_2019,
    nep_2020,
    nep_2021,
    nep_2022,
    nep_2023,
    nep_2024,
    nep_2025,
    nep_total,
    gaa_2016,
    gaa_2017,
    gaa_2018,
    gaa_2019,
    gaa_2020,
    gaa_2021,
    gaa_2022,
    gaa_2023,
    gaa_2024,
    gaa_2025,
    gaa_total,
    disbursement_2016,
    disbursement_2017,
    disbursement_2018,
    disbursement_2019,
    disbursement_2020,
    disbursement_2021,
    disbursement_2022,
    disbursement_2023,
    disbursement_2024,
    disbursement_2025,
    disbursement_total
  } = data
  // data is an object of type project


  const project = {
    datetime_generated: date.formatDate(new Date(), 'MMM D, YYYY hh:mm:ss A'),
    title: title,
    type: type ? data.type.name : '',
    prexc_program: prexc_program ? prexc_program.name : '',
    prexc_subprogram: prexc_subprogram ? prexc_subprogram.name : '',
    bases: bases && bases.map(b => b.name).join(', '),
    description: description,
    regions: regions && regions.map(r => r.name).join(', '),
    region: region ? region.name : '',
    operating_unit: operating_unit ? operating_unit.name : '',
    spatial_coverage: spatial_coverage ? spatial_coverage.name : '',
    pip: pip ? 'YES': 'NO',
    cip: cip ? 'YES': 'NO',
    trip: trip ? 'YES': 'NO',
    rdip: rdip ? 'YES': 'NO',
    typology: typology ? typology.name : '',
    cip_type: cip_type ? cip_type.name : '',
    rdc_endorsed: rdc_endorsed ? 'YES' : 'NO',
    rdc_endorsed_date: rdc_endorsed_date,
    infrastructure_subsectors: infrastructure_subsectors.length && infrastructure_subsectors.map(p => p.name).join(', '),
    technical_readinesses: technical_readinesses.length && technical_readinesses.map(p => p.name).join(', '),
    implementation_risk: implementation_risk,
    readiness: readiness ? readiness.name : '',
    iccable: iccable ? 'YES' : 'NO',
    clearinghouse: clearinghouse ? 'YES' : 'NO',
    clearinghouse_date: clearinghouse_date,
    neda_submission: neda_submission ? 'YES' : 'NO',
    neda_submission_date: neda_submission_date,
    neda_secretariat_review: neda_secretariat_review ? 'YES' : 'NO',
    neda_secretariat_review_date: neda_secretariat_review_date,
    icc_endorsed: icc_endorsed ? 'YES' : 'NO',
    icc_endorsed_date: icc_endorsed_date,
    icc_approved: icc_approved ? 'YES' : 'NO',
    neda_board: neda_board,
    neda_board_date: neda_board_date ? 'YES' : 'NO',
    tier: tier ? tier.name : '',
    uacs_code: uacs_code,
    updates: updates,
    updates_date: updates_date,
    pdp_chapter: pdp_chapter ? pdp_chapter.name : '',
    pdp_chapters: pdp_chapters && pdp_chapters.map(p => p.name).join(', '),
    pdp_indicators: pdp_indicators && pdp_indicators.map(p => p.name).join(', '),
    expected_outputs: expected_outputs,
    ten_point_agenda: ten_point_agenda && ten_point_agenda.map(p => p.name).join(', '),
    sustainable_development_goals: sustainable_development_goals && sustainable_development_goals.map(p => p.name).join(', '),
    gad: gad ? gad.name : '',
    target_start_year: target_start_year,
    target_end_year: target_end_year,
    project_preparation_document: project_preparation_document ? project_preparation_document.name : '',
    project_preparation_document_others: project_preparation_document_others,
    row_affected: row_affected,
    rap_affected: rap_affected,
    employment_generated: employment_generated,
    main_funding_source: main_funding_source ? main_funding_source.name : '',
    funding_institution: funding_institution ? funding_institution.name : '',
    implementation_mode: implementation_mode ? implementation_mode.name : '',
    funding_sources: funding_sources && funding_sources.map(p => p.name).join(', '),
    nep_2016: nep_2016,
    nep_2017: nep_2017,
    nep_2018: nep_2018,
    nep_2019: nep_2019,
    nep_2020: nep_2020,
    nep_2021: nep_2021,
    nep_2022: nep_2022,
    nep_2023: nep_2023,
    nep_2024: nep_2024,
    nep_2025: nep_2025,
    nep_total: nep_total,
    gaa_2016: gaa_2016,
    gaa_2017: gaa_2017,
    gaa_2018: gaa_2018,
    gaa_2019: gaa_2019,
    gaa_2020: gaa_2020,
    gaa_2021: gaa_2021,
    gaa_2022: gaa_2022,
    gaa_2023: gaa_2023,
    gaa_2024: gaa_2024,
    gaa_2025: gaa_2025,
    gaa_total: gaa_total,
    disbursement_2016: disbursement_2016,
    disbursement_2017: disbursement_2017,
    disbursement_2018: disbursement_2018,
    disbursement_2019: disbursement_2019,
    disbursement_2020: disbursement_2020,
    disbursement_2021: disbursement_2021,
    disbursement_2022: disbursement_2022,
    disbursement_2023: disbursement_2023,
    disbursement_2024: disbursement_2024,
    disbursement_2025: disbursement_2025,
    disbursement_total: disbursement_total
  }

  console.dir(project)

  return project
}

export const generateDocx = (project) => {
  loadFile("https://staging.dapmsipd.org/template", function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);

      const data = recodeData(project)

      doc.setData(data);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      }); //Output the document using Data-URI
      saveAs(out, "output.docx");
    });
}
