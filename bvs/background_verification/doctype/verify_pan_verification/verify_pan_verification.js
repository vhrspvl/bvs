// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Pan Verification", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		frm.set_value("date",(frappe.datetime.nowdate()));
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_pan_verification.verify_pan_verification.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("pan_verification_id", d.name);
					}
				});
			}

		});
	},
	validate:function(frm){
		if(frm.doc.status == "Completed"){
			frm.set_value("end_date",(frappe.datetime.nowdate()));
		}
	}

});
