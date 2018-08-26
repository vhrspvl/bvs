// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Voters ID Verification", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_voters_id_verification.verify_voters_id_verification.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("voters_id_verification_id", d.name);
					}
				});
			}

		});
	}

});
