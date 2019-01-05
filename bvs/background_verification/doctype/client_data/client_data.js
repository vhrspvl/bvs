// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client Data', {
	refresh: function (frm) {
		frm.disable_save();
	},
	proceed: function(frm){
		frappe.set_route("List", "Demographic Data With Attachment");
	},
	proceed1: function(frm){
		frappe.set_route("List", "Bulk Excel Upload");
	},
});
