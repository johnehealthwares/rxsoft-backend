//#region src/features/communication/types/constants.ts
var MESSAGE_TYPE_OPTIONS = [
	"text",
	"email",
	"sms",
	"push",
	"in_app",
	"webhook"
].map((value) => ({
	value,
	label: value
}));
var MESSAGE_STATUS_OPTIONS = [
	"draft",
	"scheduled",
	"sending",
	"sent",
	"delivered",
	"read",
	"failed",
	"cancelled"
].map((value) => ({
	value,
	label: value
}));
var MESSAGE_PRIORITY_OPTIONS = [
	"low",
	"normal",
	"high",
	"urgent"
].map((value) => ({
	value,
	label: value
}));
var NOTIFICATION_TYPE_OPTIONS = [
	"info",
	"warning",
	"error",
	"success",
	"system"
].map((value) => ({
	value,
	label: value
}));
var CHANNEL_TYPE_OPTIONS = [
	"email",
	"sms",
	"push",
	"webhook",
	"in_app"
].map((value) => ({
	value,
	label: value
}));
var TEMPLATE_TYPE_OPTIONS = [
	"message",
	"notification",
	"broadcast"
].map((value) => ({
	value,
	label: value
}));
var BROADCAST_STATUS_OPTIONS = [
	"draft",
	"scheduled",
	"running",
	"completed",
	"cancelled",
	"failed"
].map((value) => ({
	value,
	label: value
}));
var AE_STATUS_OPTIONS = [
	"ACTIVE",
	"INACTIVE",
	"MAINTENANCE",
	"ERROR"
].map((value) => ({
	value,
	label: value
}));
var PROTOCOL_TYPE_OPTIONS = [
	"HL7_V2",
	"HL7_V3",
	"FHIR_R4",
	"FHIR_R5",
	"HTTP",
	"HTTPS",
	"SFTP",
	"MQ",
	"KAFKA"
].map((value) => ({
	value,
	label: value
}));
var TLS_VERSION_OPTIONS = [
	"TLSv1.0",
	"TLSv1.1",
	"TLSv1.2",
	"TLSv1.3"
].map((value) => ({
	value,
	label: value
}));
[
	"GET",
	"POST",
	"PUT",
	"DELETE",
	"PATCH"
].map((value) => ({
	value,
	label: value
}));
[
	"none",
	"basic",
	"bearer",
	"oauth2"
].map((value) => ({
	value,
	label: value
}));
var ROUTING_MESSAGE_TYPE_OPTIONS = [{
	value: "ORDER",
	label: "Order"
}, {
	value: "PATIENT",
	label: "Patient"
}];
var ROUTE_STATUS_OPTIONS = [
	{
		value: "ACTIVE",
		label: "Active"
	},
	{
		value: "INACTIVE",
		label: "Inactive"
	},
	{
		value: "DELETED",
		label: "Deleted"
	}
];
var ROUTING_PROTOCOL_TYPE_OPTIONS = [
	{
		value: "HL7_V2",
		label: "HL7 v2"
	},
	{
		value: "FHIR_R4",
		label: "FHIR R4"
	},
	{
		value: "HTTP",
		label: "HTTP"
	},
	{
		value: "TCP",
		label: "TCP"
	},
	{
		value: "CUSTOM_JSON",
		label: "Custom JSON"
	}
];
[
	"v2.3",
	"v2.3.1",
	"v2.4",
	"v2.5",
	"v2.5.1",
	"v2.6",
	"v2.7",
	"v2.7.1",
	"v2.8"
].map((value) => ({
	value,
	label: value
}));
["R4", "R5"].map((value) => ({
	value,
	label: value
}));
[
	"string",
	"number",
	"boolean",
	"json",
	"date"
].map((value) => ({
	value,
	label: value
}));
//#endregion
export { MESSAGE_STATUS_OPTIONS as a, PROTOCOL_TYPE_OPTIONS as c, ROUTING_PROTOCOL_TYPE_OPTIONS as d, TEMPLATE_TYPE_OPTIONS as f, MESSAGE_PRIORITY_OPTIONS as i, ROUTE_STATUS_OPTIONS as l, BROADCAST_STATUS_OPTIONS as n, MESSAGE_TYPE_OPTIONS as o, TLS_VERSION_OPTIONS as p, CHANNEL_TYPE_OPTIONS as r, NOTIFICATION_TYPE_OPTIONS as s, AE_STATUS_OPTIONS as t, ROUTING_MESSAGE_TYPE_OPTIONS as u };
