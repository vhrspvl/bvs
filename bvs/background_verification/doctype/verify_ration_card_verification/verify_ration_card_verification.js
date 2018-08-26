// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Ration Card Verification", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		frm.set_value("date",(frappe.datetime.nowdate()));
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_ration_card_verification.verify_ration_card_verification.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("ration_card_verification_id", d.name);
					}
				});
			}

		});
	}

});