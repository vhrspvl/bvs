// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Allocate Checks', {
	check: function(frm) {
        if(frm.doc.check != "Select"){
			frm.clear_table("allocate_checks_executive");
			frappe.call({
				"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
				args:{
					"check":frm.doc.check
				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
					if(r.message){
						if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Civil Check"||"Criminal Check"){
							var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
							if(d.status == "IQC Completed"){								
								row.status = "Allocation Pending";
								row.reference_doctype = d.doctype;
								row.applicant = d.applicant_id;
								if(row.status == "Allocation Pending"){
									frappe.call({
										"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
										args: {
											"check":frm.doc.check,
											"applicant":d.applicant_id
										},
										callback: function (r) {
											if(row.reference_doctype == "Verify Employment Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Employment Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Employment Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Employment Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Education Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Education Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Education Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Education Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Address Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Address Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Address Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Address Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Reference Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Reference Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Reference Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Reference Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Family Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Family Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Family Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Family Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Aadhar Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Pan Verification"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Passport Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Driving License Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Voter's ID Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Ration Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Civil Check"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Criminal Check"){
												row.reference_name = r.message[0].name;
											}
											refresh_field("allocate_checks_executive");
											
										}
										
									});
									
								}
							
						}else if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Civil Checks"||"Verify Criminal Check"){
							// var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
							if(d.status == "Pending"||"Insufficient"){	                    
								row.reference_doctype = d.doctype;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = d.status;
							}
					    }
					}
				    }
					});
					refresh_field("allocate_checks_executive");
				}
			});	
		}	     
	},
	status: function(frm) {
        if(frm.doc.check != "Select"){	
			frm.clear_table("allocate_checks_executive");
			frappe.call({
				"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.status_filter",
				args: {
					"check":frm.doc.check,
					"status":frm.doc,status

				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
					if(r.message){
						if(frm.doc.status == "Allocation Pending" && d.status == "IQC Completed"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Criminal Check"||"Civil Check"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.doctype;
								row.applicant = d.applicant_id;
								console.log(d.applicant_id)
								row.status = "Allocation Pending";
								if(row.status == "Allocation Pending"){
									frappe.call({
										"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
										args: {
											"check":frm.doc.check,
											"applicant":d.applicant_id
										},
										callback: function (r) {											
											if(row.reference_doctype == "Verify Employment Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Employment Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Employment Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Employment Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Education Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Education Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Education Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Education Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Address Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Address Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Address Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Address Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Reference Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Reference Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Reference Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Reference Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Family Check1"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Family Check2"){
												row.reference_name = r.message[1].name;
											}
											if(row.reference_doctype == "Verify Family Check3"){
												row.reference_name = r.message[2].name;
											}
											if(row.reference_doctype == "Verify Family Check4"){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Aadhar Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Pan Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Passport Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Driving License Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Voter's Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Ration Card Verification"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Civil Check"){
												row.reference_name = r.message[0].name;
											}
											if(row.reference_doctype == "Verify Criminal Check"){
												row.reference_name = r.message[0].name;
											}											
											refresh_field("allocate_checks_executive");											
										}
										
									});												
								}								 
							}
						}else if(frm.doc.status == "Pending" && d.status == "Pending"){
							if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Civil Checks"||"Verify Criminal Check"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.doctype;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = d.status;
							} 
						}else if(frm.doc.status == "Insufficient" && d.status == "Insufficient"){
							if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Civil Checks"||"Verify Criminal Check"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.doctype;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "Insufficient";
							} 
						}
					}					
					});
					refresh_field("allocate_checks_executive");
				}
			});
		}
	},	
	select_executive: function(frm, cdt, cdn) {		
		if(frm.doc.select_executive != ""){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "Employee",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				$.each(cur_frm.doc.allocate_checks_executive || [], function(i, d) {
				if(r.message){
					d.allocated_to = r.message.user_id
				}
				});
				refresh_field("allocate_checks_executive");				
			}
		});
		} 
	},
	refresh: function (frm) {
		frm.disable_save();
	},
	onload:function(frm, dt,dn){
		frm.set_query("select_executive", function() {
			return {
				"filters": {
					"department": "BVS - V"
				}
			};
		});	
		// cur_frm.fields_dict['allocate_checks_executive'].grid.get_field("allocated_to").set_query = function(frm, dt, dn) {
		// 	return {
		// 		filters: {"department": "BVS - V"}
		// 	}
		// }
	},
	assign:function(frm){	
		frappe.call({
			"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.set_assign_to",
			args: {
				"doc": frm.doc.allocate_checks_executive,
				"check": frm.doc.check
			},
			freeze:true,
			callback: function(r){
				frappe.msgprint("Updated")
				if(r.message == "ok"){
					// console.log(r.message == "ok")
					frm.clear_table("allocate_checks_executive");
				}
			}
			})
		}
})




	
	