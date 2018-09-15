// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Employment Check4", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		if(!frm.doc.in_date){
            frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_employment_check3.verify_employment_check3.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("employment_check4_id", d.name);
					}
				});
			}

		});
	},
	validate:function(frm){
		if(frm.doc.status == "Completed"){
			frm.set_value("end_date",(frappe.datetime.nowdate()));
		}
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	}

});
