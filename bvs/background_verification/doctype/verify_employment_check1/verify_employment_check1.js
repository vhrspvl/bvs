// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Employment Check1", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			if(frappe.user.has_role("BVS DEO")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
			if(frappe.user.has_role("BVS Verifier")) {
			    var last_route = frappe.route_history.slice(-2, -1)[0];
			    frappe.set_route(last_route[0]);
			}
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	},
	onload:function(frm){
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
	},
	validate:function(frm){
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
		if(!frm.doc.actual_end_date){
			var tomorrow = moment(frm.doc.in_date).add(frm.doc.tat, 'days');
            frm.set_value("actual_end_date", tomorrow);
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			if(frm.doc.executive == frappe.session.user){
				frm.set_value("status","Completed")
				frm.set_value("allocated_for","Allocation Completed")
				if(!frm.doc.end_date){
					if(frm.doc.status != ("Completed"||"Pending")){
					frm.set_value("end_date",(frappe.datetime.nowdate()))
					}
				}
		      }
		}
		if(frm.doc.customer == "Aadhar Housing Finance Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "BorgWarner Morse TEC India Pvt Ltd. - BVS"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "IDFC Bharath Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Igarashi Motors India Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Lapiz & Customer Broad Cast"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Michelin India Tamilnadu Tyres Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Navia Markets Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Ninestars Information Technologies Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Nippon Express(India) Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Q Way Technologies"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Saint - Gobain India Private Limited - BVS"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Sun Network"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Ranstand"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "RED FM (Kal Radio, South Asia, Suryan FM, Udaya)"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Hannon"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Gestamp Automotive Chennai Pvt Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "IQ Back Office"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Karnataka Bank"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "MANAPPURAM FINANCE LIMITED"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Muthoot Housing Finance Co Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Schwing Stetter (India) Private Limited"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "South Indian Bank"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "TCI Chemical (India) Private Ltd -BVS"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "The Federal Bank Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Insurance"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Hinduja Leyland Finance"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Home Finance(White Lilles)"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Vechile & Equipment"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",13);
		}
		if(frm.doc.customer == "GAC Shipping"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Enlighted"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Lider Consultancy Services Pvt Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",13);
		}
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		if(!frm.doc.in_date){
			frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
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
