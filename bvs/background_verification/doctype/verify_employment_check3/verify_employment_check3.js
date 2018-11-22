// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Employment Check3", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			if(frappe.user.has_role("BVS DEO") || (frm.doc.status == "QC Completed")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
		}  
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
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
						frm.set_value("employment_check3_id", d.name);
					}
				});
			}

		});
	},
	validate:function(frm){
		if(!frm.doc.client_tat){
			frappe.call({
				"method": "bvs.background_verification.doctype.verify_employment_check1.verify_employment_check1.get_client_tat",
				args: {
					checks_group: frm.doc.checks_group
				},
				callback: function(r){
					$.each(r.message, function(i, d) {
						if(r.message){
							frm.set_value("client_tat", r.message.tat1)							
							if(frm.doc.client_tat){
								frm.set_df_property('client_tat', 'read_only', 1);
								var tomorrow = moment(frm.doc.in_date).add(frm.doc.client_tat, 'days');
								frm.set_value("actual_end_date_for_client_tat", tomorrow);
								if(frm.doc.actual_end_date_for_client_tat.get > frappe.datetime.nowdate()){
									$(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Magenta");
								} else if(frm.doc.actual_end_date_for_client_tat.get = frappe.datetime.nowdate()){
									$(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Magenta");
									frappe.msgprint("Today is Client TAT End Day")
								}else{
									$(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Red");
								}
							}
						}
					});
				}
	
			});
		}
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
		if(frm.doc.checks_group){
			var tomorrow = moment(frm.doc.in_date).add(frm.doc.tat, 'days');
			frm.set_value("actual_end_date", tomorrow);
			var diff = frm.doc.actual_end_date - frappe.datetime.nowdate();
			if(frm.doc.actual_end_date.get > frappe.datetime.nowdate()){
				$(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Blue");
			} else if(frm.doc.actual_end_date.get = frappe.datetime.nowdate()){
				$(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Blue");
				frappe.msgprint("Today is TAT End Day")
			}else{
				$(cur_frm.fields_dict.actual_end_date.input).css("borderColor", "Red");
			}
		}
		if((frm.doc.result == "Positive")|| (frm.doc.result == "Negative") || (frm.doc.result == "Amber") || (frm.doc.result == "Insufficient")){
			frm.set_value("end_date",(frappe.datetime.nowdate()))
		}
		if(frm.doc.executive == frappe.session.user){
			if(frm.doc.allocated_for == "QC Pending"){
				frm.set_value("status","QC Completed")
				frm.set_value("allocated_for","QC Completed")
			}
			if(frm.doc.allocated_for == "Execution Pending"){
				frm.set_value("status","Execution Completed")
				frappe.call({				
					"method": "bvs.background_verification.doctype.applicant.applicant.get_status",
					args: {
						"applicant":frm.doc.applicant_id,
						"checks_group": frm.doc.checks_group
					},
					callback: function(r){
						if(r.message){
							frappe.call({
								"method": "frappe.client.set_value",
								"args": {
								"doctype": "Applicant",
								"name": frm.doc.applicant_id,
								"fieldname": "status",
								"value": r.message
								}
							});
						}
					}
				})
			}
		}
		if(frm.doc.status == "Execution Completed"){
			frappe.set_route("List", "Verifier Dashboard");
		}
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		if(frm.doc.applicant_id){
			frappe.call({
				"method":"frappe.client.get",
				args:{
					doctype: "Employment Check3",
					filters:{
						"name": frm.doc.employment_check3_id
					 }
				},
				callback: function(r){
				   if(r.message){
					 frm.set_value('employee_code', r.message.employee_code);
					 frm.set_value('employee_name', r.message.employee_name);
					 frm.set_value('employer_name', r.message.employer_name);
					 frm.set_value('location', r.message.location);
					 frm.set_value('contact_number', r.message.contact_number);
					 frm.set_value('employment_type', r.message.employment_type);
					 frm.set_value('from', r.message.from);
					 frm.set_value('to', r.message.to);
					 frm.set_value('designationjoining', r.message.designationjoining);
					 frm.set_value('designationleaving', r.message.designationleaving);
					 frm.set_value('remunerations', r.message.remunerations);
					 frm.set_value('amount', r.message.amount );
					 frm.set_value('amount1', r.message.amount1);
					 frm.set_value('reporting_managers_name', r.message.reporting_managers_name);
					 frm.set_value('reporting_managers_designation', r.message.reporting_managers_designation);
					 frm.set_value('reason_for_leaving', r.message.reason_for_leaving);
				   }
				}
			})
		 }
	}

});
