import { t as Box } from "./Box-7OfPvxF3.js";
import { t as ScrollArea } from "./ScrollArea-2PaY6uv1.js";
import { t as Select } from "./Select-BlwOJ1xN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DUb9_lJB.js";
import { t as Paper } from "./Paper-DvHgmkDB.js";
import { t as ActionIcon } from "./ActionIcon-r9_a10T4.js";
import { t as Group } from "./Group-DVvbFFzc.js";
import { t as Flex } from "./Flex-DsiVxXRs.js";
import { t as Text } from "./Text-Bbe5G6dH.js";
import { t as Checkbox } from "./Checkbox-R1eU-RuA.js";
import { t as Button } from "./Button-C98OF_32.js";
import { t as NumberInput } from "./NumberInput-Dzj2A-5Q.js";
import { t as Table } from "./Table-DOuTP3iC.js";
import { t as TextInput } from "./TextInput-BW4Py070.js";
import { t as Calculator } from "./calculator-B6foghpo.js";
import { Fn as Plus, Lr as Title, Nn as RefreshCcw, Wr as Grid, jn as Search, kn as Settings } from "./index-DuM1cidb.js";
//#region src/features/damorex/pos/pos2.tsx
var import_jsx_runtime = require_jsx_runtime();
function PosSalesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		bg: "#b7dce9",
		h: "100vh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 0,
				withBorder: true,
				p: "xs",
				bg: "#d9edf5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
					justify: "space-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "xs",
						children: "Next Sales"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }),
						placeholder: "Enter Item to search for Here",
						w: 400
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 600,
						children: "Selling to Customer: 1 | SALE CODE = 58C12026"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				radius: 0,
				withBorder: true,
				p: "sm",
				bg: "#bfe0ea",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						color: "yellow",
						variant: "filled",
						children: "Single Item Selection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "filled",
						children: "Multiple Item Selection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Choose Customer",
						w: 250,
						data: ["ADOF HOSPITAL"],
						defaultValue: "ADOF HOSPITAL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }),
						children: "+ Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						fw: 700,
						size: "lg",
						children: "Customer: 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						color: "red",
						leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { size: 16 }),
						children: "Reset POS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, {
						size: "lg",
						variant: "light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 })
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				radius: 0,
				withBorder: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					striped: true,
					withTableBorder: true,
					withColumnBorders: true,
					horizontalSpacing: "xs",
					verticalSpacing: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, {
						bg: "#a6d5e5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "No" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM CODE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM NAME" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "RtPrice" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "WSPrice" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "QUANTITY" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "TOTAL" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, { defaultChecked: true }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: "CR0129" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							data: ["Amodiaquinne (X1)"],
							defaultValue: "Amodiaquinne (X1)"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: "40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: "20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, { defaultValue: 5 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
							fw: 700,
							children: "720"
						})
					] }) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					ta: "center",
					c: "blue",
					py: "xs",
					fw: 600,
					children: "Add to Cart"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, {
				gap: 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						radius: 0,
						bg: "#2f8a53",
						h: "calc(100vh - 250px)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							h: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								withTableBorder: true,
								withColumnBorders: true,
								stickyHeader: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Thead, {
									bg: "#f0d56a",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "S/N" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "CODE" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "ITEM NAME" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "PRICE" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "QTY" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Th, { children: "TotalCost" })
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Tbody, { children: [{
									code: "CR0129",
									name: "Amodiaquinne (X1)",
									price: 40,
									qty: 5,
									total: 200
								}, {
									code: "OL0239",
									name: "Faith Calamine Lotion",
									price: 120,
									qty: 6,
									total: 720
								}].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Tr, {
									bg: "#00185f",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: index + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: item.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: item.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: item.price
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: item.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Td, {
											c: "lime",
											children: item.total
										})
									]
								}, item.code)) })]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid.Col, {
					span: {
						base: 12,
						md: 3
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						radius: 0,
						withBorder: true,
						bg: "#c7e6f1",
						h: "calc(100vh - 250px)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
								order: 3,
								ta: "center",
								py: "md",
								children: "Current Sales Summary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "xs",
								radius: 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: "Items on Cart"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 700,
										children: "2"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "xs",
								radius: 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: "Total Cost"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 700,
										children: "₦920.00"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								withBorder: true,
								p: "xs",
								radius: 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
									justify: "space-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: "Total Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										fw: 700,
										children: "Not Yet Paid"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								fullWidth: true,
								mt: "md",
								leftSection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { size: 16 }),
								children: "Calculate Current Sales"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								mt: "md",
								p: "md",
								withBorder: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									ta: "center",
									fw: 700,
									children: "Total Cost"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
									order: 2,
									ta: "center",
									children: "₦920.00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								fullWidth: true,
								mt: "md",
								children: "Sell Only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								fullWidth: true,
								mt: "xs",
								children: "Sell Print"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								fullWidth: true,
								mt: "xs",
								children: "Print Wholesale Receipt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								fullWidth: true,
								mt: "xs",
								children: "Next Customer"
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/damorex/pos2.tsx?tsr-split=component
var SplitComponent = PosSalesPage;
//#endregion
export { SplitComponent as component };
