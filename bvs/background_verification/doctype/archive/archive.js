// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Archive', {
	customer: function(frm) {
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
