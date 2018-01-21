// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Profile', {
	refresh: function (frm) { },
	onload: function (frm) {
		frm.toggle_display(['employment', 'second_employment', 'third_employee', 'education', 'second_education', 'third_education']);
		frm.set_query("checks_group", function () {
			return {
				query: "bvs.utils.get_groups",
				filters: {
					customer: frm.doc.customer
				}
			};
		});
	},
	checks_group: function (frm) {
		// var checks = frappe.get_doc("Checks Group", frm.doc.checks_group)
		if (frm.doc.checks_group) {
			frappe.call({
				method: "bvs.utils.get_group_checks",
				args: {
					"checks_group": frm.doc.checks_group
				},
				callback: function (r) {
					(r.message || []).forEach(function (d) {
						if (d === "employment") {
							frm.toggle_display('employment', d === "employment");
						}
						if (d === "employment2") {
							frm.toggle_display('second_employment', d === "employment2");
						}
						if (d === "education") {
							frm.toggle_display('education', d === "education");
						}
					});

				}
			});
		}
	},
});
