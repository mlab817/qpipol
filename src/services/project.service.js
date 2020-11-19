import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import {
  SEARCH_PROJECTS,
  FETCH_PROJECT_QUERY,
  DOWNLOAD_PROJECT,
  ALL_PROJECTS,
  DELETED_PROJECTS_QUERY,
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  REVIEW_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
  VALIDATE_PROJECT_MUTATION,
  RETURN_PROJECT_MUTATION,
  FINALIZE_PROJECT_MUTATION,
  ACCEPT_PROJECT_MUTATION,
  APPROVE_PROJECT_MUTATION,
  SAVE_REVIEW,
  DELETE_ATTACHMENT,
  UPLOAD_ATTACHMENT,
  TRANSFER_PROJECT_MUTATION,
  SUBMIT_REVIEW_MUTATION,
  RESTORE_PROJECT_MUTATION,
  FORCE_DELETE_PROJECT_MUTATION,
  CREATE_FUNDING_SOURCE_FINANCIAL,
  UPDATE_FUNDING_SOURCE_FINANCIAL,
  DELETE_FUNDING_SOURCE_FINANCIAL,
  CREATE_REGION_FINANCIAL,
  UPDATE_REGION_FINANCIAL,
  DELETE_REGION_FINANCIAL,
  CREATE_FUNDING_SOURCE_INFRASTRUCTURE,
  UPDATE_FUNDING_SOURCE_INFRASTRUCTURE,
  DELETE_FUNDING_SOURCE_INFRASTRUCTURE,
  UPLOAD_SIGNED_COPY,
  EXPORT_PROJECT_DOCX_MUTATION,
  REVERT_TO_DRAFT_PROJECT,
	EXPORT_PROJECTS
} from '@/graphql';
import {CREATE_PREXC_ACTIVITY_FROM_PROJECT, PREXC_ACTIVITIES} from 'src/graphql'

export const projectService = {
	index() {
		// console.log(payload);
		return client
			.query({
				query: ALL_PROJECTS
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	show(payload) {
		// get based on id
		return client
			.query({
				query: FETCH_PROJECT_QUERY,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	create(payload) {
		return client
			.mutate({
				mutation: CREATE_PROJECT_MUTATION,
				variables: payload,
				update: (store, {data: {createProject}}) => {
					const data = store.readQuery({
						query: ALL_PROJECTS
					});
					
					data.allProjects.push(createProject);
					
					store.writeQuery({
						query: ALL_PROJECTS,
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	delete(payload) {
		return client
			.mutate({
				mutation: DELETE_PROJECT_MUTATION,
				variables: payload,
				update: (store, {data: {deleteProject}}) => {
					// assigned the deleted id to target id and return id
					const deletedId = deleteProject
						? deleteProject.project.id
						: payload.id;
					
					// retrieve the paginated query
					// variables are required
					const data = store.readQuery({
						query: ALL_PROJECTS
					});
					
					// console.log('is store being run?');
					
					// filter out the deleted id from the list
					data.allProjects = data.allProjects.filter(
						project => project.id !== deletedId
					);
					
					// save the query
					store.writeQuery({
						query: ALL_PROJECTS,
						data
					});
					
					const data2 = store.readQuery({
						query: DELETED_PROJECTS_QUERY
					})
					
					data2.allProjects.push(deleteProject)
					
					store.writeQuery({
						query: DELETED_PROJECTS_QUERY,
						data2
					})
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	restore(id) {
		return client
			.mutate({
				mutation: RESTORE_PROJECT_MUTATION,
				variables: {
					id: id
				},
				update: (store, {data: {restoreProject}}) => {
					const data = store.readQuery({
						query: ALL_PROJECTS
					});
					
					console.log(data);
					
					data.allProjects.push(restoreProject);
					
					store.writeQuery({
						query: ALL_PROJECTS,
						data
					});
					
					const data2 = store.readQuery({
						query: DELETED_PROJECTS_QUERY
					});
					
					data2.filter(project => project.id !== id);
					
					data2.allProjects.writeQuery({
						query: DELETED_PROJECTS_QUERY,
						data2
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	update(payload) {
		return client
			.mutate({
				mutation: UPDATE_PROJECT_MUTATION,
				variables: payload,
				update: (store, {data: {updateProject}}) => {
					const data = store.readQuery({
						query: ALL_PROJECTS
					});
					
					const index = data.allProjects.findIndex(
						project => project.id === updateProject.id
					);
					
					data.allProjects.splice(index, 1, updateProject);
					
					store.writeQuery({
						query: ALL_PROJECTS,
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	finalize(payload) {
		return client
			.mutate({
				mutation: FINALIZE_PROJECT_MUTATION,
				variables: payload,
				update: (store, {data: {finalizeProject}}) => {
					console.log('store', store);
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: finalizeProject.id
						}
					});
					
					data.finalized = true;
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: finalizeProject.id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	return(payload) {
		return client
			.mutate({
				mutation: RETURN_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	validate(payload) {
		return client
			.mutate({
				mutation: VALIDATE_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	review(payload) {
		return client
			.mutate({
				mutation: REVIEW_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	accept(payload) {
		return client
			.mutate({
				mutation: ACCEPT_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	approve(payload) {
		return client
			.mutate({
				mutation: APPROVE_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	saveReviewAsDraft(payload) {
		return client
			.mutate({
				mutation: SAVE_REVIEW,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	deleteAttachment(payload) {
		return client
			.mutate({
				mutation: DELETE_ATTACHMENT,
				variables: {
					id: payload.id
				},
				update: (cache, {data: {deleteAttachment}}) => {
					const data = cache.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					const index = data.project.attachments.findIndex(
						x => x.id === deleteAttachment.id
					);
					data.project.attachments.splice(index, 1);
					
					cache.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	uploadAttachment(payload) {
		return client
			.mutate({
				mutation: UPLOAD_ATTACHMENT,
				variables: payload,
				update: (cache, {data: {uploadAttachment}}) => {
					const data = cache.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					// const attachments = data.project.attachments
					const attachments = data.project.attachments;
					attachments.push(uploadAttachment);
					
					cache.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: uploadAttachment.id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	search(payload) {
		return client
			.query({
				query: SEARCH_PROJECTS,
				variables: {
					search: payload
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	transfer(payload) {
		return client
			.mutate({
				mutation: TRANSFER_PROJECT_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	download(payload) {
		return client
			.query({
				query: DOWNLOAD_PROJECT,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	uploadSignedCopy(payload) {
		return client
			.mutate({
				mutation: UPLOAD_SIGNED_COPY,
				variables: payload,
				update: (store, {data: {uploadSignedCopy}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: uploadSignedCopy.id
						}
					});
					
					data.project.signed_copy_link = uploadSignedCopy.signed_copy_link;
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: uploadSignedCopy.id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	submitReview(payload) {
		return client
			.mutate({
				mutation: SUBMIT_REVIEW_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	forceDelete(payload) {
		return client
			.mutate({
				mutation: FORCE_DELETE_PROJECT_MUTATION,
				variables: payload,
				update: (store, {data: {forceDeleteProject}}) => {
					const data = store.readQuery({
						query: DELETED_PROJECTS_QUERY
					});
					
					data.allProjects = data.allProjects.filter(
						x => x.id !== forceDeleteProject.id
					);
					
					store.writeQuery({
						query: DELETED_PROJECTS_QUERY,
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	createFundingSourceFinancial(payload) {
		return client
			.mutate({
				mutation: CREATE_FUNDING_SOURCE_FINANCIAL,
				variables: payload,
				update: (store, {data: {createFundingSourceFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					data.project.funding_source_financials.push(
						createFundingSourceFinancial
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	updateFundingSourceFinancial(payload) {
		return client
			.mutate({
				mutation: UPDATE_FUNDING_SOURCE_FINANCIAL,
				variables: payload,
				update: (store, {data: {updateFundingSourceFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					const index = data.project.funding_source_financials.findIndex(
						x => x.id === updateFundingSourceFinancial.id
					);
					data.project.funding_source_financials.splice(
						index,
						1,
						updateFundingSourceFinancial
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	deleteFundingSourceFinancial(payload) {
		return client
			.mutate({
				mutation: DELETE_FUNDING_SOURCE_FINANCIAL,
				variables: payload,
				update: (store, {data: {deleteFundingSourceFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteFundingSourceFinancial.project_id
						}
					});
					
					const index = data.project.funding_source_financials.findIndex(
						x => x.id === deleteFundingSourceFinancial.id
					);
					data.project.funding_source_financials.splice(
						index,
						1
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteFundingSourceFinancial.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	createRegionFinancial(payload) {
		return client
			.mutate({
				mutation: CREATE_REGION_FINANCIAL,
				variables: payload,
				update: (store, {data: {createRegionFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					data.project.region_financials.push(createRegionFinancial);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	updateRegionFinancial(payload) {
		return client
			.mutate({
				mutation: UPDATE_REGION_FINANCIAL,
				variables: payload,
				update: (store, {data: {updateRegionFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					const index = data.project.region_financials.findIndex(
						x => x.id === updateRegionFinancial.id
					);
					data.project.region_financials.splice(
						index,
						1,
						updateRegionFinancial
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	deleteRegionFinancial(payload) {
		return client
			.mutate({
				mutation: DELETE_REGION_FINANCIAL,
				variables: payload,
				update: (store, {data: {deleteRegionFinancial}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteRegionFinancial.project_id
						}
					});
					
					const index = data.project.region_financials.findIndex(
						x => x.id === deleteRegionFinancial.id
					);
					data.project.region_financials.splice(index, 1);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteRegionFinancial.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	createFundingSourceInfrastructure(payload) {
		return client
			.mutate({
				mutation: CREATE_FUNDING_SOURCE_INFRASTRUCTURE,
				variables: payload,
				update: (store, {data: {createFundingSourceInfrastructure}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					console.log('before save: ', data)
					
					data.project.funding_source_infrastructures.push(
						createFundingSourceInfrastructure
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
					
					console.log('after save: ', data)
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	updateFundingSourceInfrastructure(payload) {
		return client
			.mutate({
				mutation: UPDATE_FUNDING_SOURCE_INFRASTRUCTURE,
				variables: payload,
				update: (store, {data: {updateFundingSourceInfrastructure}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						}
					});
					
					const index = data.project.funding_source_infrastructures.findIndex(
						x => x.id === updateFundingSourceInfrastructure.id
					);
					data.project.funding_source_infrastructures.splice(
						index,
						1,
						updateFundingSourceInfrastructure
					);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	deleteFundingSourceInfrastructure(payload) {
		return client
			.mutate({
				mutation: DELETE_FUNDING_SOURCE_INFRASTRUCTURE,
				variables: payload,
				update: (store, {data: {deleteFundingSourceInfrastructure}}) => {
					const data = store.readQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteFundingSourceInfrastructure.project_id
						}
					});
					
					const index = data.project.funding_source_infrastructures.findIndex(
						x => x.id === deleteFundingSourceInfrastructure.id
					);
					data.project.funding_source_infrastructures.splice(index, 1);
					
					store.writeQuery({
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: deleteFundingSourceInfrastructure.project_id
						},
						data
					});
				}
			})
			.then(handleResponse)
			.catch(handleError);
	},
	
	exportProjectDocx(payload) {
		return client
			.mutate({
				mutation: EXPORT_PROJECT_DOCX_MUTATION,
				variables: payload
			})
			.then(handleResponse)
			.catch(handleError)
	},
	
	exportProjects() {
		return client
			.mutate({
				mutation: EXPORT_PROJECTS
			})
			.then(handleResponse)
			.catch(handleError)
	},
	
	revertToDraftProject(payload) {
		return client
			.mutate({
				mutation: REVERT_TO_DRAFT_PROJECT,
				variables: payload,
				update: (store, {data: {revertToDraftProject}}) => {
					const data = store.readQuery({
						query: ALL_PROJECTS
					})
					
					const index = data.projects.findIndex(project => project.id === revertToDraftProject.id)
					data.projects.splice(index, 1, revertToDraftProject)
					
					store.writeQuery({
						query: ALL_PROJECTS,
						data
					})
				},
				refetchQueries: [
					{
						query: FETCH_PROJECT_QUERY,
						variables: {
							id: payload.id
						}
					}
				]
			})
			.then(handleResponse)
			.catch(handleError)
	},
	
	createPrexcActivityFromProject(payload) {
		return client
			.mutate({
				mutation: CREATE_PREXC_ACTIVITY_FROM_PROJECT,
				variables: payload,
				update: (store, {data: { createPrexcActivityFromProject } }) => {
					const data = store.readQuery({
						query: PREXC_ACTIVITIES
					})
					
					data.prexc_activities.push(createPrexcActivityFromProject)
					
					store.writeQuery({
						query: PREXC_ACTIVITIES,
						data
					})
				}
			})
			.then(handleResponse)
			.catch(handleError)
	}
}
