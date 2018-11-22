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
							if(d.status == "IQC Completed"){	
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");							
								row.status = "Allocation Pending";
								row.reference_doctype = d.doctype;
								row.tat = d.tat;
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
												row.reference_name = r.message[0].name;
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
												row.reference_name = r.message[2].name;
											}
											if((row.reference_doctype == "Verify Driving License Verification") && (r.message[3].name != 0)){
												row.reference_name = r.message[3].name;
											}
											if(row.reference_doctype == "Verify Voters ID Verification"){
												row.reference_name = r.message[4].name;
											}
											if(row.reference_doctype == "Verify Ration Card Verification"){
												row.reference_name = r.message[5].name;
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
					}
				    }
					});
				}
			});	
		}	     
	},	
	batch_id: function(frm){
		frappe.call({
			"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_applicant",
			args: {
				batch_id: frm.doc.batch_id
			},
			callback: function (r) {
				if(r.message){
					var len = r.message.length;
					for(var i = 0; i< len; i++){
						frappe.call({
							"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_status",
							args: {
								applicant: r.message[i].name,
								checks_group: r.message[i].checks_group
							},
							callback: function (r) {
								// if(r.message[i].applicant_id == applicant){
									console.log(r.message.applicant_id)
								// }
							}
						})
					}
				}
			}
		})
	},
	// select_executive: function(frm, cdt, cdn) {		
	// 	if(frm.doc.select_executive != ""){
	// 	frappe.call({
	// 		"method":"frappe.client.get",
	// 		args: {
	// 			doctype: "User",
	// 			name: frm.doc.select_executive
	// 		},
	// 		callback: function (r) {
	// 			$.each(cur_frm.doc.allocate_checks_executive || [], function(i, d) {
	// 			if(r.message){
	// 				d.allocated_to = r.message.email
	// 			}
	// 			});
	// 			refresh_field("allocate_checks_executive");				
	// 		}
	// 	});
	// 	} 
	// },
	upto:function(frm){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "User",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				if(r.message){
					for(var i=0; i < frm.doc.upto; i++){					
					var a = frm.doc.allocate_checks_executive;
					a[i].allocated_to = r.message.email
					}
					refresh_field("allocate_checks_executive");	
							
				}
			}
	    })
	},
	to:function(frm){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "User",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				if(r.message){
					for(var i= frm.doc.from - 1; i < frm.doc.to; i++){					
					var a = frm.doc.allocate_checks_executive;
					a[i].allocated_to = r.message.email
					}
					refresh_field("allocate_checks_executive");	
							
				}
			}
	    })
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
	get_selected: function() {
		return (this.grid_rows || []).map(function(row) { return row.doc.__checked ? "hi" : "helllo"; })
			.filter(function(d) { return d; });
		console.log(hi)
	},
	assign:function(frm,cdt, cdn){	
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
					// frm.clear_table("allocate_checks_executive");
					var d = frappe.get_doc(cdt, cdn);
		            // if(d.reference_name) {
					var a = d.allocate_checks_executive;
					var c = Object.keys(a).length;
					for(var i = 0; i < c; i++){
						var r = a[i].reference_name;
						var exe = a[i].allocated_to;
					    if(exe){
							frappe.call({
								"method": "frappe.client.get",
								args: {
									doctype:a[i].reference_doctype,
									name: r
								},
								callback: function(r){
									if(r.message){
										frappe.call({				
											"method": "bvs.background_verification.doctype.applicant.applicant.get_status",
											args: {
												"applicant": r.message.applicant_id,
												"checks_group": r.message.checks_group
											},
											callback: function(r){
												if(r.message){
													// console.log(r.message)
												}
											}
										})
									}
								}
							})
						}
					}
				}
			}
			})
		}
})




	
	