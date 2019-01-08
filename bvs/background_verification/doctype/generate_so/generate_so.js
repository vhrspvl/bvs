// Copyright (c) 2019, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Generate SO', {
    refresh: function (frm) {
        frm.disable_save();
    }
});
