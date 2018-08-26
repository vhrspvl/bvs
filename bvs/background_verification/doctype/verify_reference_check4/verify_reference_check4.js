// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt
// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Reference Check4", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		frm.set_value("date",(frappe.datetime.nowdate()));
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_reference_check4.verify_reference_check4.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("reference_check4_id", d.name);
					}
				});
			}

		});
	}

});