// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Allocate Checks', {
    check: function (frm) {
        if (!frm.doc.client) {
            if (frm.doc.check != "Select") {
                frm.clear_table("allocate_checks_executive");
                refresh_field("allocate_checks_executive");
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                    args: {
                        "check": frm.doc.check,
                        // limit_page_length: 20
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        $.each(r.message, function (i, d) {
                            if (r.message) {
                                if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                    if (d.status == "IQC Completed") {
                                        var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                        row.status = "Allocation Pending";
                                        row.reference_doctype = d.doctype;
                                        row.tat = d.tat;
                                        row.in_date = r.message.in_date;
                                        row.candidate_name = d.applicant_name;
                                        row.applicant = d.applicant_id;
                                        row.emp_code = d.emp_code;
                                        // if (row.applicant) {
                                        //     frappe.call({
                                        //         "method": "frappe.client.get",
                                        //         args: {
                                        //             "doctype": "Applicant",
                                        //             "name": row.applicant
                                        //         },
                                        //         freeze: true,
                                        //         freeze_message: "Fetching....",
                                        //         callback: function (r) {
                                        //             if (r.message) {
                                        //                 if (r.message.client_employee_code) {
                                        //                     row.emp_code = r.message.client_employee_code;
                                        //                 } else {
                                        //                     row.emp_code = "-";
                                        //                 }
                                        //                 row.in_date = r.message.in_date;
                                        //             }
                                        //             refresh_field("allocate_checks_executive");
                                        //         }
                                        //     })
                                        // }
                                        if (row.status == "Allocation Pending") {
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                                args: {
                                                    "check": frm.doc.check,
                                                    "applicant": d.applicant_id
                                                },
                                                freeze: true,
                                                freeze_message: "Fetching....",
                                                callback: function (r) {
                                                    // console.log(r.message)
                                                    if (row.reference_doctype == "Verify Employment Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Family Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    // if (row.reference_doctype == "Verify Family Check2") {
                                                    //     row.reference_name = r.message[1].name;
                                                    // }
                                                    // if (row.reference_doctype == "Verify Family Check3") {
                                                    //     row.reference_name = r.message[2].name;
                                                    // }
                                                    // if (row.reference_doctype == "Verify Family Check4") {
                                                    //     row.reference_name = r.message[3].name;
                                                    // }
                                                    if (row.reference_doctype == "Verify ID Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check5") {
                                                        row.reference_name = r.message[4].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check6") {
                                                        row.reference_name = r.message[5].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Civil Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Criminal Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Political Affiliations Check") {
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
        } else {
            if (frm.doc.check != "Select") {
                frm.clear_table("allocate_checks_executive");
                refresh_field("allocate_checks_executive");
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                    args: {
                        "check": frm.doc.check
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        $.each(r.message, function (i, d) {
                            if (d.customer == frm.doc.client) {
                                if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                    if (d.status == "IQC Completed") {
                                        var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                        row.status = "Allocation Pending";
                                        row.reference_doctype = d.doctype;
                                        row.tat = d.tat;
                                        row.in_date = r.message.in_date;
                                        row.candidate_name = d.applicant_name;
                                        row.applicant = d.applicant_id;
                                        if (row.applicant) {
                                            frappe.call({
                                                "method": "frappe.client.get",
                                                args: {
                                                    "doctype": "Applicant",
                                                    "name": row.applicant
                                                },
                                                freeze: true,
                                                freeze_message: "Fetching....",
                                                callback: function (r) {
                                                    if (r.message) {
                                                        if (r.message.client_employee_code) {
                                                            row.emp_code = r.message.client_employee_code;
                                                        } else {
                                                            row.emp_code = "-";
                                                        }
                                                        row.in_date = r.message.in_date;
                                                    }
                                                    refresh_field("allocate_checks_executive");
                                                }
                                            })
                                        }
                                        if (row.status == "Allocation Pending") {
                                            frappe.call({
                                                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                                args: {
                                                    "check": frm.doc.check,
                                                    "applicant": d.applicant_id
                                                },
                                                freeze: true,
                                                freeze_message: "Fetching....",
                                                callback: function (r) {
                                                    // console.log(r.message)
                                                    if (row.reference_doctype == "Verify Employment Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Employment Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Education Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Address Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Reference Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Family Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Family Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Family Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Family Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check1") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check2") {
                                                        row.reference_name = r.message[1].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check3") {
                                                        row.reference_name = r.message[2].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check4") {
                                                        row.reference_name = r.message[3].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check5") {
                                                        row.reference_name = r.message[4].name;
                                                    }
                                                    if (row.reference_doctype == "Verify ID Check6") {
                                                        row.reference_name = r.message[5].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Civil Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Criminal Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                        row.reference_name = r.message[0].name;
                                                    }
                                                    if (row.reference_doctype == "Verify Political Affiliations Check") {
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
        }
    },
    batch_id: function (frm) {
        frappe.call({
            "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_applicant",
            args: {
                batch_id: frm.doc.batch_id
            },
            freeze: true,
            freeze_message: "Fetching....",
            callback: function (r) {
                if (r.message) {
                    var len = r.message.length;
                    for (var i = 0; i < len; i++) {
                        frappe.call({
                            "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_status",
                            args: {
                                applicant: r.message[i].name,
                                checks_group: r.message[i].checks_group
                            },
                            freeze: true,
                            freeze_message: "Fetching....",
                            callback: function (r) {
                                // if(r.message[i].applicant_id == applicant){
                                // }
                            }
                        })
                    }
                }
            }
        })
    },
    select_executive: function (frm, cdt, cdn) {
        var grid = frm.fields_dict["allocate_checks_executive"].grid;
        if (frm.doc.select_executive != "") {
            if (grid.get_selected_children().length !== 0) {
                $.each(grid.get_selected_children(), function (i, d) {
                    frappe.call({
                        "method": "frappe.client.get",
                        args: {
                            doctype: "User",
                            name: frm.doc.select_executive
                        },
                        callback: function (r) {
                            if (r.message) {
                                if (d.idx) {
                                    d.allocated_to = r.message.email
                                }
                            }
                            refresh_field("allocate_checks_executive");
                        }
                    });

                })
            }
        }
    },
    upto: function (frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
                name: frm.doc.select_executive
            },
            freeze: true,
            freeze_message: "Fetching....",
            callback: function (r) {
                if (r.message) {
                    for (var i = 0; i < frm.doc.upto; i++) {
                        var a = frm.doc.allocate_checks_executive;
                        a[i].allocated_to = r.message.email
                    }
                    refresh_field("allocate_checks_executive");

                }
            }
        })
    },
    to: function (frm) {
        frappe.call({
            "method": "frappe.client.get",
            args: {
                doctype: "User",
                name: frm.doc.select_executive
            },
            freeze: true,
            freeze_message: "Fetching....",
            callback: function (r) {
                if (r.message) {
                    for (var i = frm.doc.from - 1; i < frm.doc.to; i++) {
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
    onload: function (frm) {
        frm.set_query("select_executive", function () {
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
    short_code: function (frm) {
        frm.clear_table("allocate_checks_executive");
        refresh_field("allocate_checks_executive");
        if (frm.doc.check != "Select") {
            frappe.call({
                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                args: {
                    "check": frm.doc.check
                },
                freeze: true,
                freeze_message: "Fetching....",
                callback: function (r) {
                    $.each(r.message, function (i, d) {
                        if (r.message) {
                            if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                if (d.status == "IQC Completed") {
                                    if (d.applicant_id) {
                                        frappe.call({
                                            "method": "frappe.client.get",
                                            args: {
                                                "doctype": "Applicant",
                                                "name": d.applicant,
                                                filters: {
                                                    short_code: frm.doc.short_code
                                                }
                                            },
                                            freeze: true,
                                            freeze_message: "Fetching....",
                                            callback: function (r) {
                                                if (r.message.short_code == frm.doc.short_code) {
                                                    var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                                    row.status = "Allocation Pending";
                                                    row.reference_doctype = d.doctype;
                                                    row.tat = d.tat;
                                                    row.in_date = r.message.in_date;
                                                    row.candidate_name = d.applicant_name;
                                                    row.applicant = d.applicant_id;
                                                    if (row.applicant) {
                                                        frappe.call({
                                                            "method": "frappe.client.get",
                                                            args: {
                                                                "doctype": "Applicant",
                                                                "name": row.applicant
                                                            },
                                                            freeze: true,
                                                            freeze_message: "Fetching....",
                                                            callback: function (r) {
                                                                if (r.message) {
                                                                    if (r.message.client_employee_code) {
                                                                        row.emp_code = r.message.client_employee_code;
                                                                    } else {
                                                                        row.emp_code = "-";
                                                                    }
                                                                    row.in_date = r.message.in_date;
                                                                }
                                                                refresh_field("allocate_checks_executive");
                                                            }
                                                        })
                                                    }
                                                    if (row.status == "Allocation Pending") {
                                                        frappe.call({
                                                            "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                                            args: {
                                                                "check": frm.doc.check,
                                                                "applicant": d.applicant_id
                                                            },
                                                            freeze: true,
                                                            freeze_message: "Fetching....",
                                                            callback: function (r) {
                                                                if (row.reference_doctype == "Verify Employment Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Employment Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Employment Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Employment Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Education Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Education Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Education Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Education Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Address Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Address Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Address Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Address Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Reference Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Reference Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Reference Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Reference Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Family Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Family Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Family Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Family Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check1") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check2") {
                                                                    row.reference_name = r.message[1].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check3") {
                                                                    row.reference_name = r.message[2].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check4") {
                                                                    row.reference_name = r.message[3].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check5") {
                                                                    row.reference_name = r.message[4].name;
                                                                }
                                                                if (row.reference_doctype == "Verify ID Check6") {
                                                                    row.reference_name = r.message[5].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Civil Check") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Criminal Check") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                if (row.reference_doctype == "Verify Political Affiliations Check") {
                                                                    row.reference_name = r.message[0].name;
                                                                }
                                                                refresh_field("allocate_checks_executive");
                                                            }
                                                        });
                                                    }

                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    })
                }
            });
        }
    },
    location: function (frm) {
        if (!frm.doc.client) {
            frm.clear_table("allocate_checks_executive");
            refresh_field("allocate_checks_executive");
            if (frm.doc.check != "Select") {
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                    args: {
                        "check": frm.doc.check
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        $.each(r.message, function (i, d) {
                            if (r.message) {
                                if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                    if (d.status == "IQC Completed") {
                                        if (d.applicant_id) {
                                            frappe.call({
                                                "method": "frappe.client.get",
                                                args: {
                                                    "doctype": "Applicant",
                                                    "name": d.applicant_id,
                                                    filters: {
                                                        state: frm.doc.location
                                                    }
                                                },
                                                freeze: true,
                                                freeze_message: "Fetching....",
                                                callback: function (r) {
                                                    if (r.message.state == frm.doc.location) {
                                                        var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                                        row.status = "Allocation Pending";
                                                        row.reference_doctype = d.doctype;
                                                        row.tat = d.tat;
                                                        row.in_date = r.message.in_date;
                                                        row.candidate_name = d.applicant_name;
                                                        row.applicant = d.applicant_id;
                                                        if (row.applicant) {
                                                            frappe.call({
                                                                "method": "frappe.client.get",
                                                                args: {
                                                                    "doctype": "Applicant",
                                                                    "name": row.applicant
                                                                },
                                                                freeze: true,
                                                                freeze_message: "Fetching....",
                                                                callback: function (r) {
                                                                    if (r.message) {
                                                                        if (r.message.client_employee_code) {
                                                                            row.emp_code = r.message.client_employee_code;
                                                                        } else {
                                                                            row.emp_code = "-";
                                                                        }
                                                                        row.in_date = r.message.in_date;
                                                                    }
                                                                    refresh_field("allocate_checks_executive");
                                                                }
                                                            })
                                                        }
                                                        if (row.status == "Allocation Pending") {
                                                            frappe.call({
                                                                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                                                args: {
                                                                    "check": frm.doc.check,
                                                                    "applicant": d.applicant_id
                                                                },
                                                                freeze: true,
                                                                freeze_message: "Fetching....",
                                                                callback: function (r) {
                                                                    if (row.reference_doctype == "Verify Employment Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check5") {
                                                                        row.reference_name = r.message[4].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check6") {
                                                                        row.reference_name = r.message[5].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Civil Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Criminal Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Political Affiliations Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    refresh_field("allocate_checks_executive");
                                                                }
                                                            });
                                                        }

                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        })
                    }
                });
            }
        } else {
            frm.clear_table("allocate_checks_executive");
            refresh_field("allocate_checks_executive");
            if (frm.doc.check != "Select") {
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                    args: {
                        "check": frm.doc.check
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        $.each(r.message, function (i, d) {
                            if (r.message) {
                                if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                    if (d.status == "IQC Completed") {
                                        if (d.applicant_id) {
                                            frappe.call({
                                                "method": "frappe.client.get",
                                                args: {
                                                    "doctype": "Applicant",
                                                    "name": d.applicant_id,
                                                    filters: {
                                                        state: frm.doc.location
                                                    }
                                                },
                                                freeze: true,
                                                freeze_message: "Fetching....",
                                                callback: function (r) {
                                                    if ((r.message.state == frm.doc.location) && (r.message.customer == frm.doc.client)) {
                                                        var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                                        row.status = "Allocation Pending";
                                                        row.reference_doctype = d.doctype;
                                                        row.tat = d.tat;
                                                        row.in_date = r.message.in_date;
                                                        row.candidate_name = d.applicant_name;
                                                        row.applicant = d.applicant_id;
                                                        if (row.applicant) {
                                                            frappe.call({
                                                                "method": "frappe.client.get",
                                                                args: {
                                                                    "doctype": "Applicant",
                                                                    "name": row.applicant
                                                                },
                                                                freeze: true,
                                                                freeze_message: "Fetching....",
                                                                callback: function (r) {
                                                                    if (r.message) {
                                                                        if (r.message.client_employee_code) {
                                                                            row.emp_code = r.message.client_employee_code;
                                                                        } else {
                                                                            row.emp_code = "-";
                                                                        }
                                                                        row.in_date = r.message.in_date;
                                                                    }
                                                                    refresh_field("allocate_checks_executive");
                                                                }
                                                            })
                                                        }
                                                        if (row.status == "Allocation Pending") {
                                                            frappe.call({
                                                                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                                                args: {
                                                                    "check": frm.doc.check,
                                                                    "applicant": d.applicant_id
                                                                },
                                                                freeze: true,
                                                                freeze_message: "Fetching....",
                                                                callback: function (r) {
                                                                    if (row.reference_doctype == "Verify Employment Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Employment Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Education Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Address Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Reference Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Family Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check1") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check2") {
                                                                        row.reference_name = r.message[1].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check3") {
                                                                        row.reference_name = r.message[2].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check4") {
                                                                        row.reference_name = r.message[3].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check5") {
                                                                        row.reference_name = r.message[4].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify ID Check6") {
                                                                        row.reference_name = r.message[5].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Civil Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Criminal Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    if (row.reference_doctype == "Verify Political Affiliations Check") {
                                                                        row.reference_name = r.message[0].name;
                                                                    }
                                                                    refresh_field("allocate_checks_executive");
                                                                }
                                                            });
                                                        }

                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        })
                    }
                });
            }
        }
    },
    emp_id: function (frm) {
        if (frm.doc.client) {
            if (frm.doc.emp_id == "Ascending") {
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.sort",
                    args: {
                        "table": frm.doc.allocate_checks_executive
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        frm.clear_table("allocate_checks_executive");
                        refresh_field("allocate_checks_executive");
                        if (r.message) {
                            var len = r.message.length;
                            for (var i = 0; i < len; i++) {
                                var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                row.status = "Allocation Pending";
                                row.reference_doctype = r.message[i].reference_doctype;
                                row.tat = r.message[i].tat;
                                row.in_date = r.message[i].in_date;
                                row.candidate_name = r.message[i].candidate_name;
                                row.applicant = r.message[i].applicant;
                                row.emp_code = r.message[i].emp_code;
                                row.reference_name = r.message[0].reference_name;
                                refresh_field("allocate_checks_executive");
                            }
                        }
                    }
                })
            } else if (frm.doc.emp_id == "Descending") {
                frappe.call({
                    "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.sort_r",
                    args: {
                        "table": frm.doc.allocate_checks_executive
                    },
                    freeze: true,
                    freeze_message: "Fetching....",
                    callback: function (r) {
                        frm.clear_table("allocate_checks_executive");
                        refresh_field("allocate_checks_executive");
                        if (r.message) {
                            var len = r.message.length;
                            for (var i = 0; i < len; i++) {
                                var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                row.status = "Allocation Pending";
                                row.reference_doctype = r.message[i].reference_doctype;
                                row.tat = r.message[i].tat;
                                row.in_date = r.message[i].in_date;
                                row.candidate_name = r.message[i].candidate_name;
                                row.applicant = r.message[i].applicant;
                                row.emp_code = r.message[i].emp_code;
                                row.reference_name = r.message[0].reference_name;
                                refresh_field("allocate_checks_executive");
                            }
                        }
                    }
                })
            }
        } else {
            frappe.msgprint("Choose the Client Name")
        }
    },
    to_date: function (frm) {
        frm.clear_table("allocate_checks_executive");
        if (frm.doc.check != "Select") {
            frappe.call({
                "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
                args: {
                    "check": frm.doc.check
                },
                freeze: true,
                freeze_message: "Fetching....",
                callback: function (r) {
                    $.each(r.message, function (i, d) {
                        if (r.message) {
                            if (frm.doc.check == "Address Check" || "Education Check" || "Employment Check" || "Reference Check" || "Family Check" || "Identity Check" || "Civil Check" || "Criminal Check" || "Neighbourhood Check") {
                                if ((d.status == "IQC Completed") && (d.in_date >= frm.doc.from_date) && (d.in_date <= frm.doc.to_date)) {
                                    var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");
                                    row.status = "Allocation Pending";
                                    row.reference_doctype = d.doctype;
                                    row.tat = d.tat;
                                    row.in_date = r.message.in_date;
                                    row.candidate_name = d.applicant_name;
                                    row.applicant = d.applicant_id;
                                    if (row.applicant) {
                                        frappe.call({
                                            "method": "frappe.client.get",
                                            args: {
                                                "doctype": "Applicant",
                                                "name": row.applicant
                                            },
                                            freeze: true,
                                            freeze_message: "Fetching....",
                                            callback: function (r) {
                                                if (r.message) {
                                                    if (r.message.client_employee_code) {
                                                        row.emp_code = r.message.client_employee_code;
                                                    } else {
                                                        row.emp_code = "-";
                                                    }
                                                    row.in_date = r.message.in_date;
                                                }
                                                refresh_field("allocate_checks_executive");
                                            }
                                        })
                                    }
                                    if (row.status == "Allocation Pending") {
                                        frappe.call({
                                            "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.get_verifycheck",
                                            args: {
                                                "check": frm.doc.check,
                                                "applicant": d.applicant_id
                                            },
                                            freeze: true,
                                            freeze_message: "Fetching....",
                                            callback: function (r) {
                                                if (row.reference_doctype == "Verify Employment Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Employment Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify Employment Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify Employment Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify Education Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Education Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify Education Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify Education Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify Address Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Address Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify Address Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify Address Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify Reference Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Reference Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify Reference Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify Reference Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify Family Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Family Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify Family Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify Family Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check1") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check2") {
                                                    row.reference_name = r.message[1].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check3") {
                                                    row.reference_name = r.message[2].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check4") {
                                                    row.reference_name = r.message[3].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check5") {
                                                    row.reference_name = r.message[4].name;
                                                }
                                                if (row.reference_doctype == "Verify ID Check6") {
                                                    row.reference_name = r.message[5].name;
                                                }
                                                if (row.reference_doctype == "Verify Civil Check") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Criminal Check") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Neighbourhood Check") {
                                                    row.reference_name = r.message[0].name;
                                                }
                                                if (row.reference_doctype == "Verify Political Affiliations Check") {
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
    assign: function (frm, cdt, cdn) {
        frappe.call({
            "method": "bvs.background_verification.doctype.allocate_checks.allocate_checks.set_assign_to",
            args: {
                "doc": frm.doc.allocate_checks_executive,
                "check": frm.doc.check
            },
            freeze: true,
            freeze_message: "Assigning....",
            callback: function (r) {
                frappe.msgprint("Updated")
                if (r.message == "ok") {
                    // frm.clear_table("allocate_checks_executive");
                    var d = frappe.get_doc(cdt, cdn);
                    // if(d.reference_name) {
                    var a = d.allocate_checks_executive;
                    var c = Object.keys(a).length;
                    for (var i = 0; i < c; i++) {
                        var r = a[i].reference_name;
                        var exe = a[i].allocated_to;
                        if (exe) {
                            frappe.call({
                                "method": "frappe.client.get",
                                args: {
                                    doctype: a[i].reference_doctype,
                                    name: r
                                },
                                freeze: true,
                                freeze_message: "Assigning....",
                                callback: function (r) {
                                    if (r.message) {
                                        frappe.call({
                                            "method": "bvs.background_verification.doctype.applicant.applicant.get_status",
                                            args: {
                                                "applicant": r.message.applicant_id,
                                                "checks_group": r.message.checks_group
                                            },
                                            callback: function (r) {
                                                if (r.message) {
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



