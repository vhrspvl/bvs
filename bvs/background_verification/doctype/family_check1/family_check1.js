// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Family Check1", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.checks_group){
			if(frm.doc.status == "IQC Completed"){
				frappe.call({
					"method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
					args:{
						"applicant": frm.doc.applicant_id,
						"checks_group": frm.doc.checks_group,
						"doctype": doctype.name,
						"check_status": frm.doc.status
					},
					callback: function(r){
						if(r.message.doctype){
							if(r.message.status != frm.doc.status) {
								frappe.set_route('Form',r.message.doctype,r.message.name);
							}
						} else if(r.message != "Completed"){
							frappe.set_route('Form',r.message,'New '+r.message,{"tat": frm.doc.tat,"applicant_name": frm.doc.applicant_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.applicant_id});
						} else if(r.message == "Completed"){
							frappe.set_route('Form',"Applicant",frm.doc.applicant_id);
						} 
					}
				})
			} else {
				frappe.confirm(
					'Do you want to attach the File?',
					function(){
						window.close();
					},
					function(){
						frappe.call({
							"method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
							args:{
								"applicant": frm.doc.applicant_id,
								"checks_group": frm.doc.checks_group,
								"doctype": doctype.name,
								"check_status": frm.doc.status
							},
							callback: function(r){
								if(r.message.doctype){
									if(r.message.status != frm.doc.status) {
										frappe.set_route('Form',r.message.doctype,r.message.name);
									}
								} else if(r.message != "Completed"){
									frappe.set_route('Form',r.message,'New '+r.message,{"tat": frm.doc.tat,"applicant_name": frm.doc.applicant_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.applicant_id});
								} else if(r.message == "Completed"){
									frappe.set_route('Form',"Applicant",frm.doc.applicant_id);
								} 
							}
						})
					}
				)
			}
		}
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}

	},
	onload: function(frm){
		frm.toggle_display(['member_ii_section','member_iii_section','member_iv_section']);
	},
	add_member: function(frm){
		frm.toggle_display('member_ii_section', 'add_member');
		frm.toggle_display(['add_member']);
	},
	add_member1: function(frm){
		frm.toggle_display('member_iii_section', 'add_member');
		frm.toggle_display(['add_member1']);
	},
	add_member2: function(frm){
		frm.toggle_display('member_iv_section', 'add_member');
		frm.toggle_display(['add_member2']);
	},
	refresh: function(frm){
		frm.add_custom_button(__('Back'), function () {
			frappe.set_route("Form", "Applicant",frm.doc.applicant_id)
		});
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		if(frm.doc.relationship2 != "Select"){
		frm.toggle_display('member_ii_section', 'add_member');
		}
		if(frm.doc.relationship3 != "Select"){
		frm.toggle_display('member_iii_section', 'add_member');
		}
		if(frm.doc.relationship4 != "Select"){
		frm.toggle_display('member_iv_section', 'add_member');
		}
	},
	relationship: function(frm){
		if(frm.doc.relationship) {
			frm.set_value("gender", {
				"Father": "Male",
				"Mother": "Female",
				"Brother": "Male",
				"Sister": "Female",
				"Grand Mother": "Female",
				"Grand Father": "male"
			}[frm.doc.relationship]);
		}
	},
	relationship2: function(frm){
		if(frm.doc.relationship2) {
			frm.set_value("gender2", {
				"Father": "Male",
				"Mother": "Female",
				"Brother": "Male",
				"Sister": "Female",
				"Grand Mother": "Female",
				"Grand Father": "male"
			}[frm.doc.relationship2]);
		}
	},
	relationship3: function(frm){
		if(frm.doc.relationship3) {
			frm.set_value("gender3", {
				"Father": "Male",
				"Mother": "Female",
				"Brother": "Male",
				"Sister": "Female",
				"Grand Mother": "Female",
				"Grand Father": "male"
			}[frm.doc.relationship3]);
		}
	},
	relationship4: function(frm){
		if(frm.doc.relationship4) {
			frm.set_value("gender4", {
				"Father": "Male",
				"Mother": "Female",
				"Brother": "Male",
				"Sister": "Female",
				"Grand Mother": "Female",
				"Grand Father": "male"
			}[frm.doc.relationship]);
		}	
	},
	validate: function(frm){
		if(frm.doc.allocated_for != frm.doc.status){
			frm.set_value("executive","");
		}
		if(frm.doc.allocated_for == "IQC Pending"){
			frm.set_value("status","IQC Completed")
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			frm.set_value("status","Allocation Completed")
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			if(frm.doc.status == "Insufficient"){
				frm.set_value("status","Insufficient")
			}else{
				frm.set_value("status","Entry Completed")
			}
		}
		
	}
});