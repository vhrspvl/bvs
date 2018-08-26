// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Employment Check1", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	onload:function(frm){
		frm.set_value("date",(frappe.datetime.nowdate()));
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_employment_check1.verify_employment_check1.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("employment_check1_id", d.name);
					}
				});
			}

		});
	}
});

	// },
	// after_onload:function(frm){
	// 	if(frm.doc.employment_check1_id) {
// 		frappe.call({
// 			"method": "frappe.client.get",
// 			args: {
// 				doctype:"Employment Check1",
// 				name: frm.doc.employment_check1_id
// 			},
// 			callback: function(r){
// 				frm.set_value("employee_code",r.message.employee_code);
// 				frm.set_value("employee_name",r.message.employee_name);
// 				frm.set_value("employer_name",r.message.employer_name);
// 				frm.set_value("location",r.message.location);
// 				frm.set_value("contact_number",r.message.contact_number);
// 				frm.set_value("employment_type",r.message.employment_type);
// 				frm.set_value("designationjoining",r.message.designationjoining);
// 				frm.set_value("designationleaving",r.message.designationleaving);
// 				frm.set_value("from",r.message.period_of_employment);
// 				frm.set_value("to",r.message.to);
// 				frm.set_value("amount",r.message.amount);
// 				frm.set_value("amount1",r.message.amount1);
// 				frm.set_value("remunerations",r.message.remunerations);
// 				frm.set_value("reporting_managers_name",r.message.reporting_managers_name);
// 				frm.set_value("reporting_managers_designation",r.message.reporting_managers_designation);
// 				frm.set_value("reason_for_leaving",r.message.reason_for_leaving);
// 			}

// 		});
// 		// }
// 	}

// });
