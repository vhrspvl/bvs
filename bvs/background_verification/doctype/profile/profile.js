// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Profile', {
	refresh: function (frm) { },
	checks_group: function (frm) {
		// var checks = frappe.get_doc("Checks Group", frm.doc.checks_group)
		if (frm.doc.checks_group) {
			frappe.call({
				method: "bvs.utils.get_group_checks",
				args: {
					"checks_group": frm.doc.checks_group
				},
				callback: function (r) {
					$.each(r.message, function (k, v) {
						frm.toggle_display(['employment', 'second_employment', 'third_employment'], v == 'employment');
						frm.toggle_display(['education', 'second_education', 'third_education'], v == 'education');
					});
				}
			});
		}
	},
	onload: function (frm) {
		frm.toggle_display(['employment', 'second_employment', 'third_employment',
			'second_education', 'third_education', 'education']);
		frm.set_query("checks_group", function () {
			return {
				query: "bvs.utils.get_groups",
				filters: {
					customer: frm.doc.customer
				}
			};
		});
	}
});
