// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bulk Excel Upload', {
	refresh: function (frm) {

	},
	onload: function (frm) {
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
