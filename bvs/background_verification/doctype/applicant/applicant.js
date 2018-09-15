// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Applicant', {
//     employment_check1:function (frm) {
// // 		// frappe.db.get_value('Employment Check1', {applicant_id: frm.doc.name}, 'name', (r) => {
// // 		// 	d.employment_check_id = r.name
// // 		// })
			
//     	if(!frm.doc.employment_check_id){
//  		    frappe.set_route('Form','Employment Check1','New Employment Check1',{"applicant_name": frm.doc.candidate_first_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
		
//  		} else {
//  			frappe.set_route('Form','Employment Check1',frm.doc.employment_check_id);

// 		}
// 		// console.log(frm.doc.employment_check_id);
//  	}
// // 	// onload:function(frm){
// // 	// 	frm.refresh_field("employment_check_id");
// // 	// }
//  });

frappe.ui.form.on("Applicant", {
	validate: function(frm){
       if(frm.doc.checks_group){
			frappe.call({
				"method": "frappe.client.get",
					args: {
					"doctype": "Checks Group",
					"name":frm.doc.checks_group
					}, 
				callback:function(r){
					if(r.message.name == frm.doc.checks_group){	
						frm.set_value("tat", r.message.tat);
					}
				}
		   })

	   }
	},
	refresh: function (frm) {
			frm.set_query("checks_group", function () {
				return {
					query: "bvs.utils.get_groups",
					filters: {
						customer: frm.doc.customer
					}
				};
			});
			frm.trigger("check_status");
			if (frm.doc.checks_group) {
				frappe.call({
					method: "bvs.utils.get_group_checks",
					args: {
						"checks_group": frm.doc.checks_group
					},
					callback: function (r) {
						(r.message || []).forEach(function (d) {
							if (d === "employment_check1") {
								frm.toggle_display('employment_check1', d === "employment_check1");
							}
							if (d === "employment_check2") {
								frm.toggle_display('employment_check2', d === "employment_check2");
							}
							if (d === "employment_check3") {
								frm.toggle_display('employment_check3', d === "employment_check3");
							}
							if (d === "employment_check4") {
								frm.toggle_display('employment_check4', d === "employment_check4");
							}
							if (d === "education_check1") {
								frm.toggle_display('education_check1', d === "education_check1");
							}
							if (d === "education_check2") {
								frm.toggle_display('education_check2', d === "education_check2");
							}
							if (d === "education_check3") {
								frm.toggle_display('education_check3', d === "education_check3");
							}
							if (d === "education_check4") {
								frm.toggle_display('education_check4', d === "education_check4");
							}
							if (d === "family_check1") {
								frm.toggle_display('family_check1', d === "family_check1");
							}
							if (d === "family_check2") {
								frm.toggle_display('family_check2', d === "family_check2");
							}
							if (d === "family_check3") {
								frm.toggle_display('family_check3', d === "family_check3");
							}
							if (d === "family_check4") {
								frm.toggle_display('family_check4', d === "family_check4");
							}
							if (d === "reference_check1") {
								frm.toggle_display('reference_check1', d === "reference_check1");
							}
							if (d === "reference_check2") {
								frm.toggle_display('reference_check2', d === "reference_check2");
							}
							if (d === "reference_check3") {
								frm.toggle_display('reference_check3', d === "reference_check3");
							}
							if (d === "reference_check4") {
								frm.toggle_display('reference_check4', d === "reference_check4");
							}
							if (d === "aadhar_card_verification") {
								frm.toggle_display('aadhar_card_verification', d === "aadhar_card_verification");
							}
							if (d === "pan_verification") {
								frm.toggle_display('pan_verification', d === "pan_verification");
							}
							if (d === "driving_license_verification") {
								frm.toggle_display('driving_license_verification', d === "driving_license_verification");
							}
							if (d === "passport_verification") {
								frm.toggle_display('passport_verification', d === "passport_verification");
							}
							if (d === "ration_card_verification") {
								frm.toggle_display('ration_card_verification', d === "ration_card_verification");
							}
							if (d === "voters_id_verification") {
								frm.toggle_display('voters_id_verification', d === "voters_id_verification");
							}
							if (d === "address_check1") {
								frm.toggle_display('address_check1', d === "address_check1");
							}
							if (d === "address_check2") {
								frm.toggle_display('address_check2', d === "address_check2");
							}
							if (d === "address_check3") {
								frm.toggle_display('address_check3', d === "address_check3");
							}
							if (d === "address_check4") {
								frm.toggle_display('address_check4', d === "address_check4");
							}
							if (d === "civil_check") {
								frm.toggle_display('civil_check', d === "civil_check");
							}
							if (d === "criminal_check") {
								frm.toggle_display('criminal_check', d === "criminal_check");
							}
						});

					}
				});
			}
	},
	onload: function (frm) {
		// frm.trigger("check_status");
		if(!frm.doc.in_date){
            frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
		frm.toggle_display(['employment_check1','employment_check2','employment_check3','employment_check4','education_check1','education_check2','education_check3','education_check4','reference_check1','reference_check2','reference_check3','reference_check4',
		 'address_check1','address_check2','address_check3','address_check4','aadhar_card_verification','pan_verification','driving_license_verification','passport_verification','ration_card_verification','voters_id_verification','family_check1','family_check2','family_check3','family_check4','civil_check','criminal_check']);
		
		
	},
	checks_group: function (frm) {
        if (frm.doc.checks_group) {
            frappe.call({
                method: "bvs.utils.get_group_checks",
                args: {
                    "checks_group": frm.doc.checks_group
                },
                callback: function (r) {
                    (r.message || []).forEach(function (d) {
                        if (d === "employment_check1") {
                            frm.toggle_display('employment_check1', d === "employment_check1");
						}
						if (d === "employment_check2") {
                            frm.toggle_display('employment_check2', d === "employment_check2");
						}
						if (d === "employment_check3") {
                            frm.toggle_display('employment_check3', d === "employment_check3");
						}
						if (d === "employment_check4") {
                            frm.toggle_display('employment_check4', d === "employment_check4");
						}
						if (d === "education_check1") {
                            frm.toggle_display('education_check1', d === "education_check1");
						}
						if (d === "education_check2") {
                            frm.toggle_display('education_check2', d === "education_check2");
						}
						if (d === "education_check3") {
                            frm.toggle_display('education_check3', d === "education_check3");
						}
						if (d === "education_check4") {
                            frm.toggle_display('education_check4', d === "education_check4");
						}
						if (d === "family_check1") {
                            frm.toggle_display('family_check1', d === "family_check1");
						}
						if (d === "family_check2") {
                            frm.toggle_display('family_check2', d === "family_check2");
						}
						if (d === "family_check3") {
                            frm.toggle_display('family_check3', d === "family_check3");
						}
						if (d === "family_check4") {
                            frm.toggle_display('family_check4', d === "family_check4");
						}
						if (d === "reference_check1") {
                            frm.toggle_display('reference_check1', d === "reference_check1");
						}
						if (d === "reference_check2") {
                            frm.toggle_display('reference_check2', d === "reference_check2");
						}
						if (d === "reference_check3") {
                            frm.toggle_display('reference_check3', d === "reference_check3");
						}
						if (d === "reference_check4") {
                            frm.toggle_display('reference_check4', d === "reference_check4");
						}
						if (d === "aadhar_card_verification") {
                            frm.toggle_display('aadhar_card_verification', d === "aadhar_card_verification");
						}
						if (d === "pan_verification") {
                            frm.toggle_display('pan_verification', d === "pan_verification");
						}
						if (d === "driving_license_verification") {
                            frm.toggle_display('driving_license_verification', d === "driving_license_verification");
						}
						if (d === "passport_verification") {
                            frm.toggle_display('passport_verification', d === "passport_verification");
						}
						if (d === "ration_card_verification") {
                            frm.toggle_display('ration_card_verification', d === "ration_card_verification");
						}
						if (d === "voters_id_verification") {
                            frm.toggle_display('voters_id_verification', d === "voters_id_verification");
						}
						if (d === "address_check1") {
                            frm.toggle_display('address_check1', d === "address_check1");
						}
						if (d === "address_check2") {
                            frm.toggle_display('address_check2', d === "address_check2");
						}
						if (d === "address_check3") {
                            frm.toggle_display('address_check3', d === "address_check3");
						}
						if (d === "address_check4") {
                            frm.toggle_display('address_check4', d === "address_check4");
						}
						if (d === "civil_check") {
                            frm.toggle_display('civil_check', d === "civil_check");
						}
						if (d === "criminal_check") {
                            frm.toggle_display('criminal_check', d === "criminal_check");
						}
                    });

                }
            });
        }
	},

 	"employment_check1":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
 		frappe.call({
                "method":"bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
					"applicant":frm.doc.name,
					"check":"Employment Check1"
  			    },
                callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Employment Check1',r.message);
						} else{
							frappe.set_route('Form','Employment Check1','New Employment Check1',{"applicant_name": frm.doc.candidate_name,"tat": frm.doc.tat, "customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
  			    }
			  });
		}else{
			frappe.call({
                "method":"bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
					"applicant":frm.doc.name,
					"check":"Verify Employment Check1"
  			    },
                callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Employment Check1',r.message);
						} else{
							frappe.set_route('Form','Verify Employment Check1','New Verify Employment Check1',{"applicant_name": frm.doc.candidate_name,"tat": frm.doc.tat, "customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
  			    }
			  });     
			}
	},
	"employment_check2":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
		frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Employment Check2"
				},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Employment Check2',r.message);
						} else{
						    frappe.set_route('Form','Employment Check2','New Employment Check2',{"applicant_name": frm.doc.candidate_name,"tat": frm.doc.tat, "customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
				}
			});
		}else{
			frappe.call({
                "method":"bvs.background_verification.doctype.applicant.applicant.get_check",
                args: {
					"applicant":frm.doc.name,
					"check":"Verify Employment Check2"
  			    },
                callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Employment Check2',r.message);
						} else{
							frappe.set_route('Form','Verify Employment Check2','New Verify Employment Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
  			    }
			  });     
			}	
	},	
	"employment_check3":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Employment Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Employment Check3',r.message);
						} else{
							frappe.set_route('Form','Employment Check3','New Employment Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Employment Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Employment Check3',r.message);
						} else{
							frappe.set_route('Form','Verify Employment Check3','New Verify Employment Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
		}
		
	},
	"employment_check4":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Employment Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Employment Check4',r.message);
						} else{
							frappe.set_route('Form','Employment Check4','New Employment Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Employment Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Employment Check4',r.message);
						} else{
							frappe.set_route('Form','Verify Employment Check4','New Verify Employment Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},

	"education_check1":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Education Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Education Check1',r.message);
						} else{
							frappe.set_route('Form','Education Check1','New Education Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Education Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Education Check1',r.message);
						} else{
							frappe.set_route('Form','Verify Education Check1','New Verify Education Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"education_check2":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Education Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Education Check2',r.message);
						} else{
							frappe.set_route('Form','Education Check2','New Education Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Education Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Education Check2',r.message);
						} else{
							frappe.set_route('Form','Verify Education Check2','New Verify Education Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"education_check3":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Education Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Education Check3',r.message);
						} else{
							frappe.set_route('Form','Education Check3','New Education Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Education Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Education Check3',r.message);
						} else{
							frappe.set_route('Form','Verify Education Check3','New Verify Education Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
			console.log(frm.doc.candidate_name)
	},
	"education_check4":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Education Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Education Check4',r.message);
						} else{
							frappe.set_route('Form','Education Check4','New Education Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Education Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Education Check4',r.message);
						} else{
							frappe.set_route('Form','Verify Education Check4','New Verify Education Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"family_check1":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Family Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Family Check1',r.message);
						} else{
							frappe.set_route('Form','Family Check1','New Family Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Family Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Family Check1',r.message);
						} else{
							frappe.set_route('Form','Verify Family Check1','New Verify Family Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"family_check2":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Family Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Family Check2',r.message);
						} else{
							frappe.set_route('Form','Family Check2','New Family Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Family Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Family Check2',r.message);
						} else{
							frappe.set_route('Form','Verify Family Check2','New Verify Family Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"family_check3":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Family Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Family Check3',r.message);
						} else{
							frappe.set_route('Form','Family Check3','New Family Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Family Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Family Check3',r.message);
						} else{
							frappe.set_route('Form','Verify Family Check3','New Verify Family Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"family_check4":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Family Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Family Check4',r.message);
						} else{
							frappe.set_route('Form','Family Check4','New Family Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Family Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Family Check4',r.message);
						} else{
							frappe.set_route('Form','Verify Family Check4','New Verify Family Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"address_check1":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Address Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Address Check1',r.message);
						} else{
							frappe.set_route('Form','Address Check1','New Address Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Address Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Address Check1',r.message);
						} else{
							frappe.set_route('Form','Verify Address Check1','New Verify Address Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"address_check2":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Address Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Address Check2',r.message);
						} else{
							frappe.set_route('Form','Address Check2','New Address Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Address Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Address Check2',r.message);
						} else{
							frappe.set_route('Form','Verify Address Check2','New Verify Address Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"address_check3":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Address Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Address Check3',r.message);
						} else{
							frappe.set_route('Form','Address Check3','New Address Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Address Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Address Check3',r.message);
						} else{
							frappe.set_route('Form','Verify Address Check3','New Verify Address Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"address_check4":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Address Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Address Check4',r.message);
						} else{
							frappe.set_route('Form','Address Check4','New Address Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Address Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Address Check4',r.message);
						} else{
							frappe.set_route('Form','Verify Address Check4','New Verify Address Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"aadhar_card_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Aadhar Card Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Aadhar Card Verification',r.message);
						} else{
							frappe.set_route('Form','Aadhar Card Verification','New Aadhar Card Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Aadhar Card Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Aadhar Card Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Aadhar Card Verification','New Verify Aadhar Card Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"pan_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Pan Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Pan Verification',r.message);
						} else{
							frappe.set_route('Form','Pan Verification','New Aadhar Card Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Pan Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Pan Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Pan Verification','New Verify Pan Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"driving_license_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Driving License Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Driving License Verification',r.message);
						} else{
							frappe.set_route('Form','Driving License Verification','New Driving License Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Driving License Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Driving License Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Driving License Verification','New Verify Driving License Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"passport_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Passport Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Passport Verification',r.message);
						} else{
							frappe.set_route('Form','Passport Verification','New Passport Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Passport Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Passport Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Passport Verification','New Passport Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"ration_card_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Ration Card Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Ration Card Verification',r.message);
						} else{
							frappe.set_route('Form','Ration Card Verification','New Ration Card Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Ration Card Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Ration Card Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Ration Card Verification','New Ration Card Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"voters_id_verification":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Voters ID Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Voters ID Verification',r.message);
						} else{
							frappe.set_route('Form','Voters ID Verification','New Voters ID Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Voters ID Verification"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Voters ID Verification',r.message);
						} else{
							frappe.set_route('Form','Verify Voters ID Verification','New Voters ID Verification',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"reference_check1":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Reference Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Reference Check1',r.message);
						} else{
							frappe.set_route('Form','Reference Check1','New Reference Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Reference Check1"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Reference Check1',r.message);
						} else{
							frappe.set_route('Form','Verify Reference Check1','New Reference Check1',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"reference_check2":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Reference Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Reference Check2',r.message);
						} else{
							frappe.set_route('Form','Reference Check2','New Reference Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Reference Check2"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Reference Check2',r.message);
						} else{
							frappe.set_route('Form','Verify Reference Check2','New Reference Check2',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"reference_check3":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Reference Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Reference Check3',r.message);
						} else{
							frappe.set_route('Form','Reference Check3','New Reference Check3',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Reference Check3"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Reference Check3',r.message);
						} else{
							frappe.set_route('Form','Verify Reference Check3','New Reference Check3',{"tat": frm.doc.tat, "applicant_name":frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"reference_check4":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Reference Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Reference Check4',r.message);
						} else{
							frappe.set_route('Form','Reference Check4','New Reference Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Reference Check4"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Reference Check4',r.message);
						} else{
							frappe.set_route('Form','Verify Reference Check4','New Reference Check4',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"civil_check":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Civil Check"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Civil Check',r.message);
						} else{
							frappe.set_route('Form','Civil Check','New Civil Check',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Civil Check"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Civil Check',r.message);
						} else{
							frappe.set_route('Form','Verify Civil Check','New Civil Check',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	"criminal_check":function(frm) {
		if(frappe.user.has_role("BVS DEO")) {
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Criminal Check"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Criminal Check',r.message);
						} else{
							frappe.set_route('Form','Criminal Check','New Criminal Check',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});
		}else{
			frappe.call({
				"method":"bvs.background_verification.doctype.applicant.applicant.get_check",
				args: {
					"applicant":frm.doc.name,
					"check":"Verify Criminal Check"
					},
				callback: function (r) {
					if(r.message){
						frappe.set_route('Form','Verify Criminal Check',r.message);
						} else{
							frappe.set_route('Form','Verify Criminal Check','New Criminal Check',{"tat": frm.doc.tat, "applicant_name": frm.doc.candidate_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.name});
						}
					}
				});     
			}
	},
	check_status:function(frm){
		if(frm.doc.status){
			frappe.call({				
				"method": "bvs.background_verification.doctype.applicant.applicant.get_status",
				args: {
					"applicant":frm.doc.name,
				},
				callback: function(r){
								
				}
			});	
		}
	}

	});




