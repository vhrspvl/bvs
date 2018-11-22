// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Family Check1", {
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
			"method": "bvs.background_verification.doctype.verify_family_check1.verify_family_check1.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("family_check1_id", d.name);
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
		if(!frm.doc.ver_relationship3){
			frm.toggle_display('section_break_57');
		}
		if(!frm.doc.ver_relationship4){
			frm.toggle_display('section_break_75');
		}
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		if(frm.doc.applicant_id){
			frappe.call({
				"method":"frappe.client.get",
				args:{
					doctype: "Family Check1",
					filters:{
						"name": frm.doc.family_check1_id
					 }
				},
				callback: function(r){
				   if(r.message){
					frm.toggle_display(["member_ii","member_iii","member_iv","member_i"]);
					if(r.message.relationship != "Select"){
					frm.toggle_display("member_i", (r.message.relationship != "Select"));
					frm.set_value('ver_relationship', r.message.relationship);
					frm.set_value('ver_first_name', r.message.first_name);
					frm.set_value('ver_last_name', r.message.last_name);
					frm.set_value('ver_gender', r.message.gender);
					frm.set_value('ver_age', r.message.age);
					frm.set_value('ver_qualification', r.message.qualification);
					frm.set_value('ver_occupation', r.message.occupation);
					}
					if(r.message.relationship2 != "Select"){
					frm.toggle_display("member_ii",r.message.relationship2 != "Select");
					frm.set_value('ver_relationship2', r.message.relationship2);
					frm.set_value('ver_first_name2', r.message.first_name2);
					frm.set_value('ver_last_name2', r.message.last_name2);
					frm.set_value('ver_gender2', r.message.gender2);
					frm.set_value('ver_age2', r.message.age2);
					frm.set_value('ver_qualification2', r.message.qualification2);
					frm.set_value('ver_occupation2', r.message.occupation2);
					}
					if(r.message.relationship3 != "Select"){
					frm.toggle_display("member_iii",r.message.relationship3 != "Select");
					frm.set_value('ver_relationship3', r.message.relationship3);
					frm.set_value('ver_first_name3', r.message.first_name3);
					frm.set_value('ver_last_name3', r.message.last_name3);
					frm.set_value('ver_gender3', r.message.gender3);
					frm.set_value('ver_age3', r.message.age3);
					frm.set_value('ver_qualification3', r.message.qualification3);
					frm.set_value('ver_occupation3', r.message.occupation3);
					}
					if(r.message.relationship4 != "Select"){
					frm.toggle_display("member_iv",r.message.relationship4 != "Select");
					frm.set_value('ver_relationship4', r.message.relationship4);
					frm.set_value('ver_first_name4', r.message.first_name4);
					frm.set_value('ver_last_name4', r.message.last_name4);
					frm.set_value('ver_gender4', r.message.gender4);
					frm.set_value('ver_age4', r.message.age4);
					frm.set_value('ver_qualification4', r.message.qualification4);
					frm.set_value('ver_occupation4', r.message.occupation4);
					}					 
				   }
				}
			})
		}
	}

});