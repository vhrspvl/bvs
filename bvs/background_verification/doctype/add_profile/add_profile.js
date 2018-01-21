// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Add Profile', {
	refresh: function (frm) {
		frm.disable_save();
	},
	data_with_attachment: function (frm) {
		frappe.set_route('Form', 'Demographic Data With Attachment')
	},
	full_form: function (frm) {
		frappe.set_route('Form', 'Profile', 'New Profile 1')
	},
	single_excel: function (frm) {
		frappe.set_route('Form', 'Bulk Excel Upload', 'New Bulk Excel Upload 1')
	}
});
