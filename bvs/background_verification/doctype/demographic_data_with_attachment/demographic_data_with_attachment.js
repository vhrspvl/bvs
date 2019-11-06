// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Demographic Data With Attachment', {
	refresh: function (frm) {
	    if(!frm.doc.in_date) {
		    frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
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
