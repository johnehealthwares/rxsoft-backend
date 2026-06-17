import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { jr as rxsoftApi } from "./index-DuM1cidb.js";
//#region src/features/apm/website/admin-api.ts
var apmAdminApi = {
	listLgas: () => rxsoftApi.get("/apm/data/lgas").then((r) => r.data),
	listWards: (lgaId) => rxsoftApi.get(`/apm/data/lgas/${lgaId}/wards`).then((r) => r.data),
	listPollingUnits: (wardId) => rxsoftApi.get(`/apm/data/wards/${wardId}/polling-units`).then((r) => r.data),
	getPollingUnit: (id) => rxsoftApi.get(`/apm/data/polling-units/${id}`).then((r) => r.data),
	searchPollingUnits: (query) => rxsoftApi.get(`/apm/data/polling-units/search/${query}`).then((r) => r.data),
	getConversionDashboard: () => rxsoftApi.get("/apm/conversion/dashboard").then((r) => r.data),
	getLgaConversionDashboard: () => rxsoftApi.get("/apm/conversion/lgas").then((r) => r.data),
	getWardConversionDashboard: (lgaId) => rxsoftApi.get(`/apm/conversion/wards/${lgaId}`).then((r) => r.data),
	getWardPollingUnits: (wardId) => rxsoftApi.get(`/apm/conversion/polling-units/${wardId}`).then((r) => r.data),
	updateConversionScore: (entityType, entityId, data) => rxsoftApi.put(`/apm/conversion/score/${entityType}/${entityId}`, data).then((r) => r.data),
	updatePollingUnit: (id, data) => rxsoftApi.put(`/apm/conversion/polling-units/${id}`, data).then((r) => r.data),
	listStakeholders: (params) => rxsoftApi.get("/apm/stakeholders", { params }).then((r) => r.data),
	listStakeholdersByLga: (lgaId, params) => rxsoftApi.get(`/apm/stakeholders/lga/${lgaId}`, { params }).then((r) => r.data),
	getStakeholder: (id) => rxsoftApi.get(`/apm/stakeholders/${id}`).then((r) => r.data),
	createStakeholder: (data) => rxsoftApi.post("/apm/stakeholders", data).then((r) => r.data),
	updateStakeholder: (id, data) => rxsoftApi.put(`/apm/stakeholders/${id}`, data).then((r) => r.data),
	createActivity: (stakeholderId, data) => rxsoftApi.post(`/apm/stakeholders/${stakeholderId}/activities`, data).then((r) => r.data),
	listActivities: (stakeholderId) => rxsoftApi.get(`/apm/stakeholders/${stakeholderId}/activities`).then((r) => r.data),
	listWhatsAppGroups: (level) => rxsoftApi.get("/apm/whatsapp/groups", { params: { level } }).then((r) => r.data),
	createWhatsAppGroup: (data) => rxsoftApi.post("/apm/whatsapp/groups", data).then((r) => r.data),
	getCanvassingStats: () => rxsoftApi.get("/apm/canvassing/stats").then((r) => r.data),
	listCanvassingSessions: (params) => rxsoftApi.get("/apm/canvassing/sessions", { params }).then((r) => r.data),
	getCanvassingSession: (id) => rxsoftApi.get(`/apm/canvassing/sessions/${id}`).then((r) => r.data),
	createCanvassingSession: (data) => rxsoftApi.post("/apm/canvassing/sessions", data).then((r) => r.data),
	updateCanvassingSession: (id, data) => rxsoftApi.put(`/apm/canvassing/sessions/${id}`, data).then((r) => r.data),
	listSessionVisits: (sessionId) => rxsoftApi.get(`/apm/canvassing/sessions/${sessionId}/visits`).then((r) => r.data),
	getSessionVisitStats: (sessionId) => rxsoftApi.get(`/apm/canvassing/sessions/${sessionId}/visit-stats`).then((r) => r.data),
	addSessionVisit: (sessionId, data) => rxsoftApi.post(`/apm/canvassing/sessions/${sessionId}/visits`, data).then((r) => r.data),
	getAllVisitStats: () => rxsoftApi.get("/apm/canvassing/visits/stats").then((r) => r.data),
	getSentimentDashboard: () => rxsoftApi.get("/apm/sentiment").then((r) => r.data),
	listVolunteerAssignments: (params) => rxsoftApi.get("/apm/volunteer-assignments", { params }).then((r) => r.data),
	listAssignmentsByWard: (wardId) => rxsoftApi.get(`/apm/volunteer-assignments/ward/${wardId}`).then((r) => r.data),
	createVolunteerAssignment: (data) => rxsoftApi.post("/apm/volunteer-assignments", data).then((r) => r.data),
	updateVolunteerAssignment: (id, data) => rxsoftApi.put(`/apm/volunteer-assignments/${id}`, data).then((r) => r.data),
	getVolunteerStats: () => rxsoftApi.get("/apm/volunteer-assignments/stats").then((r) => r.data),
	listTours: (params) => rxsoftApi.get("/apm/tours", { params }).then((r) => r.data),
	getTour: (id) => rxsoftApi.get(`/apm/tours/${id}`).then((r) => r.data),
	getTourStats: () => rxsoftApi.get("/apm/tours/stats").then((r) => r.data),
	createTour: (data) => rxsoftApi.post("/apm/tours", data).then((r) => r.data),
	updateTour: (id, data) => rxsoftApi.put(`/apm/tours/${id}`, data).then((r) => r.data),
	listContent: (params) => rxsoftApi.get("/apm/content", { params }).then((r) => r.data),
	createContent: (data) => rxsoftApi.post("/apm/content", data).then((r) => r.data),
	listMentions: (params) => rxsoftApi.get("/apm/listening", { params }).then((r) => r.data),
	getMention: (id) => rxsoftApi.get(`/apm/listening/${id}`).then((r) => r.data),
	getListeningStats: () => rxsoftApi.get("/apm/listening/stats").then((r) => r.data),
	createMention: (data) => rxsoftApi.post("/apm/listening", data).then((r) => r.data),
	updateMentionStatus: (id, status) => rxsoftApi.put(`/apm/listening/${id}/status`, { status }).then((r) => r.data),
	listResponses: (mentionId) => rxsoftApi.get(`/apm/truth-desk/${mentionId}/responses`).then((r) => r.data),
	createResponse: (data) => rxsoftApi.post("/apm/truth-desk", data).then((r) => r.data),
	listAgents: (params) => rxsoftApi.get("/apm/agents", { params }).then((r) => r.data),
	getAgentStats: () => rxsoftApi.get("/apm/agents/stats").then((r) => r.data),
	getAgent: (id) => rxsoftApi.get(`/apm/agents/${id}`).then((r) => r.data),
	createAgent: (data) => rxsoftApi.post("/apm/agents", data).then((r) => r.data),
	updateAgent: (id, data) => rxsoftApi.put(`/apm/agents/${id}`, data).then((r) => r.data),
	listResults: (params) => rxsoftApi.get("/apm/results", { params }).then((r) => r.data),
	getResultDashboard: () => rxsoftApi.get("/apm/results/dashboard").then((r) => r.data),
	listResultsByLga: (lgaId) => rxsoftApi.get(`/apm/results/lga/${lgaId}`).then((r) => r.data),
	getResult: (id) => rxsoftApi.get(`/apm/results/${id}`).then((r) => r.data),
	createResult: (data) => rxsoftApi.post("/apm/results", data).then((r) => r.data),
	verifyResult: (id) => rxsoftApi.put(`/apm/results/${id}/verify`, {}).then((r) => r.data),
	listIncidents: (params) => rxsoftApi.get("/apm/incidents", { params }).then((r) => r.data),
	getIncidentStats: () => rxsoftApi.get("/apm/incidents/stats").then((r) => r.data),
	createIncident: (data) => rxsoftApi.post("/apm/incidents", data).then((r) => r.data),
	updateIncident: (id, data) => rxsoftApi.put(`/apm/incidents/${id}`, data).then((r) => r.data),
	listGotv: (params) => rxsoftApi.get("/apm/gotv", { params }).then((r) => r.data),
	getGotvStats: () => rxsoftApi.get("/apm/gotv/stats").then((r) => r.data),
	listGotvByPu: (pollingUnitId) => rxsoftApi.get(`/apm/gotv/pu/${pollingUnitId}`).then((r) => r.data),
	createGotv: (data) => rxsoftApi.post("/apm/gotv", data).then((r) => r.data),
	updateGotv: (id, data) => rxsoftApi.put(`/apm/gotv/${id}`, data).then((r) => r.data)
};
//#endregion
//#region src/features/apm/website/admin-hooks.ts
function useLgas() {
	return useQuery({
		queryKey: ["apm-admin", "lgas"],
		queryFn: () => apmAdminApi.listLgas(),
		staleTime: 1800 * 1e3
	});
}
function useWards(lgaId) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"wards",
			lgaId
		],
		queryFn: () => apmAdminApi.listWards(lgaId),
		enabled: !!lgaId,
		staleTime: 1800 * 1e3
	});
}
function useConversionDashboard() {
	return useQuery({
		queryKey: ["apm-admin", "dashboard"],
		queryFn: () => apmAdminApi.getConversionDashboard(),
		staleTime: 300 * 1e3
	});
}
function useLgaConversion() {
	return useQuery({
		queryKey: ["apm-admin", "lga-conversion"],
		queryFn: () => apmAdminApi.getLgaConversionDashboard(),
		staleTime: 300 * 1e3
	});
}
function useWardConversion(lgaId) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"ward-conversion",
			lgaId
		],
		queryFn: () => apmAdminApi.getWardConversionDashboard(lgaId),
		enabled: !!lgaId,
		staleTime: 300 * 1e3
	});
}
function useWardPollingUnits(wardId) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"ward-pus",
			wardId
		],
		queryFn: () => apmAdminApi.getWardPollingUnits(wardId),
		enabled: !!wardId,
		staleTime: 300 * 1e3
	});
}
function useStakeholders(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"stakeholders",
			params
		],
		queryFn: () => apmAdminApi.listStakeholders(params),
		staleTime: 300 * 1e3
	});
}
function useWhatsAppGroups(level) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"whatsapp-groups",
			level
		],
		queryFn: () => apmAdminApi.listWhatsAppGroups(level),
		staleTime: 600 * 1e3
	});
}
function invalidateApmAdmin(qc) {
	qc.invalidateQueries({ queryKey: ["apm-admin"] });
}
function useUpdateConversionScore() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ entityType, entityId, data }) => apmAdminApi.updateConversionScore(entityType, entityId, data),
		onSuccess: () => {
			notifications.show({
				title: "Score Updated",
				message: "Conversion score saved.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update score.",
				color: "red"
			});
		}
	});
}
function useUpdatePollingUnit() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updatePollingUnit(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Polling unit updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update polling unit.",
				color: "red"
			});
		}
	});
}
function useCreateStakeholder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createStakeholder(data),
		onSuccess: () => {
			notifications.show({
				title: "Created",
				message: "Stakeholder added.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create stakeholder.",
				color: "red"
			});
		}
	});
}
function useUpdateStakeholder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateStakeholder(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Stakeholder updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update stakeholder.",
				color: "red"
			});
		}
	});
}
function useCreateWhatsAppGroup() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createWhatsAppGroup(data),
		onSuccess: () => {
			notifications.show({
				title: "Group Created",
				message: "WhatsApp group added.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create group.",
				color: "red"
			});
		}
	});
}
function useCanvassingStats() {
	return useQuery({
		queryKey: ["apm-admin", "canvassing-stats"],
		queryFn: () => apmAdminApi.getCanvassingStats(),
		staleTime: 300 * 1e3
	});
}
function useCanvassingSessions(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"canvassing-sessions",
			params
		],
		queryFn: () => apmAdminApi.listCanvassingSessions(params),
		staleTime: 300 * 1e3
	});
}
function useAllVisitStats() {
	return useQuery({
		queryKey: ["apm-admin", "all-visit-stats"],
		queryFn: () => apmAdminApi.getAllVisitStats(),
		staleTime: 300 * 1e3
	});
}
function useCreateCanvassingSession() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createCanvassingSession(data),
		onSuccess: () => {
			notifications.show({
				title: "Created",
				message: "Canvassing session created.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create session.",
				color: "red"
			});
		}
	});
}
function useSentimentDashboard() {
	return useQuery({
		queryKey: ["apm-admin", "sentiment"],
		queryFn: () => apmAdminApi.getSentimentDashboard(),
		staleTime: 300 * 1e3
	});
}
function useVolunteerAssignments(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"volunteer-assignments",
			params
		],
		queryFn: () => apmAdminApi.listVolunteerAssignments(params),
		staleTime: 300 * 1e3
	});
}
function useVolunteerStats() {
	return useQuery({
		queryKey: ["apm-admin", "volunteer-stats"],
		queryFn: () => apmAdminApi.getVolunteerStats(),
		staleTime: 300 * 1e3
	});
}
function useCreateVolunteerAssignment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createVolunteerAssignment(data),
		onSuccess: () => {
			notifications.show({
				title: "Assigned",
				message: "Volunteer assigned.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to assign volunteer.",
				color: "red"
			});
		}
	});
}
function useUpdateVolunteerAssignment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateVolunteerAssignment(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Assignment updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update assignment.",
				color: "red"
			});
		}
	});
}
function useTours(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"tours",
			params
		],
		queryFn: () => apmAdminApi.listTours(params),
		staleTime: 300 * 1e3
	});
}
function useTourStats() {
	return useQuery({
		queryKey: ["apm-admin", "tour-stats"],
		queryFn: () => apmAdminApi.getTourStats(),
		staleTime: 300 * 1e3
	});
}
function useCreateTour() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createTour(data),
		onSuccess: () => {
			notifications.show({
				title: "Created",
				message: "Tour created.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create tour.",
				color: "red"
			});
		}
	});
}
function useUpdateTour() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateTour(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Tour updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update tour.",
				color: "red"
			});
		}
	});
}
function useContentAssets(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"content",
			params
		],
		queryFn: () => apmAdminApi.listContent(params),
		staleTime: 600 * 1e3
	});
}
function useCreateContentAsset() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createContent(data),
		onSuccess: () => {
			notifications.show({
				title: "Created",
				message: "Content added.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create content.",
				color: "red"
			});
		}
	});
}
function useMentions(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"mentions",
			params
		],
		queryFn: () => apmAdminApi.listMentions(params),
		staleTime: 120 * 1e3
	});
}
function useListeningStats() {
	return useQuery({
		queryKey: ["apm-admin", "listening-stats"],
		queryFn: () => apmAdminApi.getListeningStats(),
		staleTime: 120 * 1e3
	});
}
function useCreateMention() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createMention(data),
		onSuccess: () => {
			notifications.show({
				title: "Logged",
				message: "Mention recorded.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to log mention.",
				color: "red"
			});
		}
	});
}
function useUpdateMentionStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, status }) => apmAdminApi.updateMentionStatus(id, status),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Status updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update.",
				color: "red"
			});
		}
	});
}
function useCreateResponse() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createResponse(data),
		onSuccess: () => {
			notifications.show({
				title: "Response Sent",
				message: "Rapid response published.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to send response.",
				color: "red"
			});
		}
	});
}
function useAgentStats() {
	return useQuery({
		queryKey: ["apm-admin", "agent-stats"],
		queryFn: () => apmAdminApi.getAgentStats(),
		staleTime: 300 * 1e3
	});
}
function useAgents(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"agents",
			params
		],
		queryFn: () => apmAdminApi.listAgents(params),
		staleTime: 300 * 1e3
	});
}
function useCreateAgent() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createAgent(data),
		onSuccess: () => {
			notifications.show({
				title: "Created",
				message: "Agent registered.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create agent.",
				color: "red"
			});
		}
	});
}
function useUpdateAgent() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateAgent(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Agent updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update agent.",
				color: "red"
			});
		}
	});
}
function useResultDashboard() {
	return useQuery({
		queryKey: ["apm-admin", "result-dashboard"],
		queryFn: () => apmAdminApi.getResultDashboard(),
		staleTime: 120 * 1e3
	});
}
function useResults(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"results",
			params
		],
		queryFn: () => apmAdminApi.listResults(params),
		staleTime: 120 * 1e3
	});
}
function useCreateResult() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createResult(data),
		onSuccess: () => {
			notifications.show({
				title: "Submitted",
				message: "Result entry created.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to submit result.",
				color: "red"
			});
		}
	});
}
function useVerifyResult() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => apmAdminApi.verifyResult(id),
		onSuccess: () => {
			notifications.show({
				title: "Verified",
				message: "Result verified.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to verify result.",
				color: "red"
			});
		}
	});
}
function useIncidentStats() {
	return useQuery({
		queryKey: ["apm-admin", "incident-stats"],
		queryFn: () => apmAdminApi.getIncidentStats(),
		staleTime: 120 * 1e3
	});
}
function useIncidents(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"incidents",
			params
		],
		queryFn: () => apmAdminApi.listIncidents(params),
		staleTime: 120 * 1e3
	});
}
function useCreateIncident() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createIncident(data),
		onSuccess: () => {
			notifications.show({
				title: "Reported",
				message: "Incident reported.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to report incident.",
				color: "red"
			});
		}
	});
}
function useUpdateIncident() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateIncident(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "Incident updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update incident.",
				color: "red"
			});
		}
	});
}
function useGotvStats() {
	return useQuery({
		queryKey: ["apm-admin", "gotv-stats"],
		queryFn: () => apmAdminApi.getGotvStats(),
		staleTime: 300 * 1e3
	});
}
function useGotvRecords(params) {
	return useQuery({
		queryKey: [
			"apm-admin",
			"gotv",
			params
		],
		queryFn: () => apmAdminApi.listGotv(params),
		staleTime: 300 * 1e3
	});
}
function useCreateGotv() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmAdminApi.createGotv(data),
		onSuccess: () => {
			notifications.show({
				title: "Logged",
				message: "GOTV record created.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to create GOTV record.",
				color: "red"
			});
		}
	});
}
function useUpdateGotv() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => apmAdminApi.updateGotv(id, data),
		onSuccess: () => {
			notifications.show({
				title: "Updated",
				message: "GOTV record updated.",
				color: "green"
			});
			invalidateApmAdmin(qc);
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Failed to update GOTV record.",
				color: "red"
			});
		}
	});
}
//#endregion
export { useSentimentDashboard as A, useUpdateStakeholder as B, useIncidents as C, useMentions as D, useListeningStats as E, useUpdateConversionScore as F, useVolunteerStats as G, useUpdateVolunteerAssignment as H, useUpdateGotv as I, useWards as J, useWardConversion as K, useUpdateIncident as L, useTourStats as M, useTours as N, useResultDashboard as O, useUpdateAgent as P, useUpdateMentionStatus as R, useIncidentStats as S, useLgas as T, useVerifyResult as U, useUpdateTour as V, useVolunteerAssignments as W, useWhatsAppGroups as Y, useCreateTour as _, useCanvassingStats as a, useGotvRecords as b, useCreateAgent as c, useCreateGotv as d, useCreateIncident as f, useCreateStakeholder as g, useCreateResult as h, useCanvassingSessions as i, useStakeholders as j, useResults as k, useCreateCanvassingSession as l, useCreateResponse as m, useAgents as n, useContentAssets as o, useCreateMention as p, useWardPollingUnits as q, useAllVisitStats as r, useConversionDashboard as s, useAgentStats as t, useCreateContentAsset as u, useCreateVolunteerAssignment as v, useLgaConversion as w, useGotvStats as x, useCreateWhatsAppGroup as y, useUpdatePollingUnit as z };
