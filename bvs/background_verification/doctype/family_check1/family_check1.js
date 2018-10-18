// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Family Check1", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.applicant_id) {
			if(frappe.user.has_role("BVS DEO") || frappe.user.has_role("BVS Manager")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
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
			frm.set_value("status","Entry Completed")
		}
		
	}
});