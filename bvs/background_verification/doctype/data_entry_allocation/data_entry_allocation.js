// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Data Entry Allocation', {
	refresh: function(frm) {

	},
	validate: function(frm){
		frm.set_value("cases_pending", frm.doc.no_of_cases);
	},
	onload: function(frm){
		if(!frm.doc.in_date){
            frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
	}
});
