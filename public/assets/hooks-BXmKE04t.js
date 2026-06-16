import { n as notifications } from "./notifications.store-CHRWQnxs.js";
import { n as useQueryClient } from "./QueryClientProvider-DlcixLz9.js";
import { t as useMutation } from "./useMutation-CaMFWIEn.js";
import { t as useQuery } from "./useQuery-eyQ3VZzM.js";
import { n as axios } from "./axios-DSrlKi_a.js";
//#region src/features/apm/website/api.ts
var api = axios.create({ baseURL: "http://localhost:8080/api" });
var apmApi = {
	getHomepage: () => api.get("/apm/homepage").then((r) => r.data),
	listAgenda: () => api.get("/apm/agenda").then((r) => r.data),
	listAchievements: () => api.get("/apm/achievements").then((r) => r.data),
	listNews: (params) => api.get("/apm/news", { params }).then((r) => r.data),
	getNewsBySlug: (slug) => api.get(`/apm/news/${slug}`).then((r) => r.data),
	listEvents: () => api.get("/apm/events").then((r) => r.data),
	getEvent: (id) => api.get(`/apm/events/${id}`).then((r) => r.data),
	registerForEvent: (eventId, data) => api.post(`/apm/events/${eventId}/register`, data).then((r) => r.data),
	registerVolunteer: (data) => api.post("/apm/volunteer", data).then((r) => r.data),
	joinMovement: (data) => api.post("/apm/join", data).then((r) => r.data),
	submitContact: (data) => api.post("/apm/contact", data).then((r) => r.data),
	subscribeNewsletter: (data) => api.post("/apm/newsletter", data).then((r) => r.data),
	submitFeedback: (data) => api.post("/apm/citizens-speak", data).then((r) => r.data),
	reportIssue: (data) => api.post("/apm/report", data).then((r) => r.data),
	listMedia: () => api.get("/apm/media").then((r) => r.data),
	listTestimonials: () => api.get("/apm/testimonials").then((r) => r.data),
	donate: (data) => api.post("/apm/donate", data).then((r) => r.data)
};
//#endregion
//#region src/features/apm/website/hooks.ts
function useHomepage() {
	return useQuery({
		queryKey: ["apm", "homepage"],
		queryFn: () => apmApi.getHomepage(),
		staleTime: 300 * 1e3
	});
}
function useAgenda() {
	return useQuery({
		queryKey: ["apm", "agenda"],
		queryFn: () => apmApi.listAgenda(),
		staleTime: 600 * 1e3
	});
}
function useAchievements() {
	return useQuery({
		queryKey: ["apm", "achievements"],
		queryFn: () => apmApi.listAchievements(),
		staleTime: 600 * 1e3
	});
}
function useNews(params) {
	return useQuery({
		queryKey: [
			"apm",
			"news",
			params
		],
		queryFn: () => apmApi.listNews(params),
		staleTime: 300 * 1e3
	});
}
function useNewsArticle(slug) {
	return useQuery({
		queryKey: [
			"apm",
			"news",
			slug
		],
		queryFn: () => apmApi.getNewsBySlug(slug),
		enabled: !!slug,
		staleTime: 600 * 1e3
	});
}
function useEvents() {
	return useQuery({
		queryKey: ["apm", "events"],
		queryFn: () => apmApi.listEvents(),
		staleTime: 300 * 1e3
	});
}
function useEvent(id) {
	return useQuery({
		queryKey: [
			"apm",
			"event",
			id
		],
		queryFn: () => apmApi.getEvent(id),
		enabled: !!id,
		staleTime: 600 * 1e3
	});
}
function useMedia() {
	return useQuery({
		queryKey: ["apm", "media"],
		queryFn: () => apmApi.listMedia(),
		staleTime: 1800 * 1e3
	});
}
function useSimpleMutation(fn, successMessage) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: fn,
		onSuccess: () => {
			notifications.show({
				title: "Success",
				message: successMessage,
				color: "green"
			});
			qc.invalidateQueries({ queryKey: ["apm"] });
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Something went wrong. Please try again.",
				color: "red"
			});
		}
	});
}
function useRegisterVolunteer() {
	return useSimpleMutation((data) => apmApi.registerVolunteer(data), "Thank you for volunteering! We will contact you soon.");
}
function useJoinMovement() {
	return useSimpleMutation((data) => apmApi.joinMovement(data), "Welcome to the movement! Together we can build a better Oyo State.");
}
function useSubmitContact() {
	return useSimpleMutation((data) => apmApi.submitContact(data), "Message sent successfully! We will respond shortly.");
}
function useSubscribeNewsletter() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data) => apmApi.subscribeNewsletter(data),
		onSuccess: () => {
			notifications.show({
				title: "Subscribed!",
				message: "You have been added to our newsletter.",
				color: "green"
			});
			qc.invalidateQueries({ queryKey: ["apm"] });
		},
		onError: () => {
			notifications.show({
				title: "Error",
				message: "Could not subscribe. Please try again.",
				color: "red"
			});
		}
	});
}
//#endregion
export { useHomepage as a, useNews as c, useSubmitContact as d, useSubscribeNewsletter as f, useEvents as i, useNewsArticle as l, useAgenda as n, useJoinMovement as o, useEvent as r, useMedia as s, useAchievements as t, useRegisterVolunteer as u };
