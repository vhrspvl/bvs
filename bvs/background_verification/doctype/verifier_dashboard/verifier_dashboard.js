// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Verifier Dashboard', {
    onload: function (frm) {
        frappe.call({
            "method": "bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
            args: {
                limit_page_length: 500,
            },
            callback: function (r) {
                if (r.message) {
                    var b = Object.keys(r.message).length;
                    for (var i = 0; i < b; i++) {
                        var j = i;
                        $.each(r.message[i], function (i, d) {
                            var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list");
                            // row.pending_checks = c;
                            row.executive = frappe.session.user;
                            row.ref_no = d.applicant_id;
                            row.candidate_name = d.applicant_name;
                            row.status = d.status;
                            row.check_name = d.name;
                            if (row.ref_no) {
                                frappe.call({
                                    "method": "frappe.client.get",
                                    args: {
                                        "doctype": "Applicant",
                                        "name": row.ref_no
                                    },
                                    callback: function (r) {
                                        if (r.message) {
                                            if (r.message.client_employee_code) {
                                                row.emp_code = r.message.client_employee_code;
                                            } else {
                                                row.emp_code = "-";
                                            }
                                            row.in_date = r.message.in_date;
                                        }
                                        refresh_field("verify_dashboard_list");
                                    }
                                })
                            }
                            if (j == 0) {
                                row.checks = "Employment Check1";
                            }
                            if (j == 1) {
                                row.checks = "Employment Check2";
                            }
                            if (j == 2) {
                                row.checks = "Employment Check3";
                            }
                            if (j == 3) {
                                row.checks = "Employment Check4";
                            }
                            if (j == 4) {
                                row.checks = "Education Check1";
                            }
                            if (j == 5) {
                                row.checks = "Education Check2";
                            }
                            if (j == 6) {
                                row.checks = "Education Check3";
                            }
                            if (j == 7) {
                                row.checks = "Education Check4";
                            }
                            if (j == 8) {
                                row.checks = "Address Check1";
                            }
                            if (j == 9) {
                                row.checks = "Address Check2";
                            }
                            if (j == 10) {
                                row.checks = "Address Check3";
                            }
                            if (j == 11) {
                                row.checks = "Address Check4";
                            }
                            if (j == 12) {
                                row.checks = "Family Check1";
                            }
                            if (j == 13) {
                                row.checks = "Family Check2";
                            }
                            if (j == 14) {
                                row.checks = "Family Check3";
                            }
                            if (j == 15) {
                                row.checks = "Family Check4";
                            }
                            if (j == 16) {
                                row.checks = "Reference Check1";
                            }
                            if (j == 17) {
                                row.checks = "Reference Check2";
                            }
                            if (j == 18) {
                                row.checks = "Reference Check3";
                            }
                            if (j == 19) {
                                row.checks = "Reference Check4";
                            }
                            if (j == 20) {
                                row.checks = "Civil Check";
                            }
                            if (j == 21) {
                                row.checks = "Criminal Check";
                            }
                            if (j == 22) {
                                row.checks = "ID Check1";
                            }
                            if (j == 23) {
                                row.checks = "ID Check2";
                            }
                            if (j == 24) {
                                row.checks = "ID Check3";
                            }
                            if (j == 25) {
                                row.checks = "ID Check4";
                            }
                            if (j == 26) {
                                row.checks = "ID Check5";
                            }
                            if (j == 27) {
                                row.checks = "ID Check6";
                            }
                        })
                    }
                    refresh_field("verify_dashboard_list");
                }

            }
        })
    },
    client: function (frm) {
        if (frm.doc.client) {
            frm.clear_table("verify_dashboard_list");
            frappe.call({
                "method": "bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
                args: {
                    limit_page_length: 500,
                },
                callback: function (r) {
                    if (r.message) {
                        var b = Object.keys(r.message).length;
                        for (var i = 0; i < b; i++) {
                            var j = i;
                            $.each(r.message[i], function (i, d) {
                                if (d.customer == frm.doc.client) {
                                    var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list");
                                    // row.pending_checks = c;
                                    row.executive = frappe.session.user;
                                    row.ref_no = d.applicant_id;
                                    row.candidate_name = d.applicant_name;
                                    row.status = d.status;
                                    row.check_name = d.name;
                                    if (row.ref_no) {
                                        frappe.call({
                                            "method": "frappe.client.get",
                                            args: {
                                                "doctype": "Applicant",
                                                "name": row.ref_no
                                            },
                                            callback: function (r) {
                                                if (r.message) {
                                                    if (r.message.client_employee_code) {
                                                        row.emp_code = r.message.client_employee_code;
                                                    } else {
                                                        row.emp_code = "-";
                                                    }
                                                    row.in_date = r.message.in_date;
                                                }
                                                refresh_field("verify_dashboard_list");
                                            }
                                        })
                                    }
                                    if (j == 0) {
                                        row.checks = "Employment Check1";
                                    }
                                    if (j == 1) {
                                        row.checks = "Employment Check2";
                                    }
                                    if (j == 2) {
                                        row.checks = "Employment Check3";
                                    }
                                    if (j == 3) {
                                        row.checks = "Employment Check4";
                                    }
                                    if (j == 4) {
                                        row.checks = "Education Check1";
                                    }
                                    if (j == 5) {
                                        row.checks = "Education Check2";
                                    }
                                    if (j == 6) {
                                        row.checks = "Education Check3";
                                    }
                                    if (j == 7) {
                                        row.checks = "Education Check4";
                                    }
                                    if (j == 8) {
                                        row.checks = "Address Check1";
                                    }
                                    if (j == 9) {
                                        row.checks = "Address Check2";
                                    }
                                    if (j == 10) {
                                        row.checks = "Address Check3";
                                    }
                                    if (j == 11) {
                                        row.checks = "Address Check4";
                                    }
                                    if (j == 12) {
                                        row.checks = "Family Check1";
                                    }
                                    if (j == 13) {
                                        row.checks = "Family Check2";
                                    }
                                    if (j == 14) {
                                        row.checks = "Family Check3";
                                    }
                                    if (j == 15) {
                                        row.checks = "Family Check4";
                                    }
                                    if (j == 16) {
                                        row.checks = "Reference Check1";
                                    }
                                    if (j == 17) {
                                        row.checks = "Reference Check2";
                                    }
                                    if (j == 18) {
                                        row.checks = "Reference Check3";
                                    }
                                    if (j == 19) {
                                        row.checks = "Reference Check4";
                                    }
                                    if (j == 20) {
                                        row.checks = "Civil Check";
                                    }
                                    if (j == 21) {
                                        row.checks = "Criminal Check";
                                    }
                                    if (j == 22) {
                                        row.checks = "ID Check1";
                                    }
                                    if (j == 23) {
                                        row.checks = "ID Check2";
                                    }
                                    if (j == 24) {
                                        row.checks = "ID Check3";
                                    }
                                    if (j == 25) {
                                        row.checks = "ID Check4";
                                    }
                                    if (j == 26) {
                                        row.checks = "ID Check5";
                                    }
                                    if (j == 27) {
                                        row.checks = "ID Check6";
                                    }
                                }
                            })
                        }
                        refresh_field("verify_dashboard_list");
                    }

                }
            })
        }
    },
    ref_id: function (frm) {
        frm.clear_table("verify_dashboard_list");
        frappe.call({
            "method": "bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
            args: {
                limit_page_length: 500,
            },
            callback: function (r) {
                if (r.message) {
                    var b = Object.keys(r.message).length;
                    for (var i = 0; i < b; i++) {
                        var j = i;
                        $.each(r.message[i], function (i, d) {
                            if (d.applicant_id == frm.doc.ref_id) {
                                var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list");
                                // row.pending_checks = c;
                                row.executive = frappe.session.user;
                                row.ref_no = d.applicant_id;
                                row.candidate_name = d.applicant_name;
                                row.status = d.status;
                                row.check_name = d.name;
                                if (row.ref_no) {
                                    frappe.call({
                                        "method": "frappe.client.get",
                                        args: {
                                            "doctype": "Applicant",
                                            "name": row.ref_no
                                        },
                                        callback: function (r) {
                                            if (r.message) {
                                                if (r.message.client_employee_code) {
                                                    row.emp_code = r.message.client_employee_code;
                                                } else {
                                                    row.emp_code = "-";
                                                }
                                                row.in_date = r.message.in_date;
                                            }
                                            refresh_field("verify_dashboard_list");
                                        }
                                    })
                                }
                                if (j == 0) {
                                    row.checks = "Employment Check1";
                                }
                                if (j == 1) {
                                    row.checks = "Employment Check2";
                                }
                                if (j == 2) {
                                    row.checks = "Employment Check3";
                                }
                                if (j == 3) {
                                    row.checks = "Employment Check4";
                                }
                                if (j == 4) {
                                    row.checks = "Education Check1";
                                }
                                if (j == 5) {
                                    row.checks = "Education Check2";
                                }
                                if (j == 6) {
                                    row.checks = "Education Check3";
                                }
                                if (j == 7) {
                                    row.checks = "Education Check4";
                                }
                                if (j == 8) {
                                    row.checks = "Address Check1";
                                }
                                if (j == 9) {
                                    row.checks = "Address Check2";
                                }
                                if (j == 10) {
                                    row.checks = "Address Check3";
                                }
                                if (j == 11) {
                                    row.checks = "Address Check4";
                                }
                                if (j == 12) {
                                    row.checks = "Family Check1";
                                }
                                if (j == 13) {
                                    row.checks = "Family Check2";
                                }
                                if (j == 14) {
                                    row.checks = "Family Check3";
                                }
                                if (j == 15) {
                                    row.checks = "Family Check4";
                                }
                                if (j == 16) {
                                    row.checks = "Reference Check1";
                                }
                                if (j == 17) {
                                    row.checks = "Reference Check2";
                                }
                                if (j == 18) {
                                    row.checks = "Reference Check3";
                                }
                                if (j == 19) {
                                    row.checks = "Reference Check4";
                                }
                                if (j == 20) {
                                    row.checks = "Civil Check";
                                }
                                if (j == 21) {
                                    row.checks = "Criminal Check";
                                }
                                if (j == 22) {
                                    row.checks = "ID Check1";
                                }
                                if (j == 23) {
                                    row.checks = "ID Check2";
                                }
                                if (j == 24) {
                                    row.checks = "ID Check3";
                                }
                                if (j == 25) {
                                    row.checks = "ID Check4";
                                }
                                if (j == 26) {
                                    row.checks = "ID Check5";
                                }
                                if (j == 27) {
                                    row.checks = "ID Check6";
                                }
                            }
                        })
                    }
                    refresh_field("verify_dashboard_list");
                }

            }
        })
    },
    candidate_name: function (frm) {
        frm.clear_table("verify_dashboard_list");
        frappe.call({
            "method": "bvs.background_verification.doctype.verifier_dashboard.verifier_dashboard.get_checks",
            args: {
                limit_page_length: 500,
            },
            callback: function (r) {
                if (r.message) {
                    var b = Object.keys(r.message).length;
                    for (var i = 0; i < b; i++) {
                        var j = i;
                        $.each(r.message[i], function (i, d) {
                            if (d.applicant_name == frm.doc.candidate_name) {
                                var row = frappe.model.add_child(frm.doc, "Verify Dashboard List", "verify_dashboard_list");
                                // row.pending_checks = c;
                                row.executive = frappe.session.user;
                                row.ref_no = d.applicant_id;
                                row.candidate_name = d.applicant_name;
                                row.status = d.status;
                                row.check_name = d.name;
                                if (row.ref_no) {
                                    frappe.call({
                                        "method": "frappe.client.get",
                                        args: {
                                            "doctype": "Applicant",
                                            "name": row.ref_no
                                        },
                                        callback: function (r) {
                                            if (r.message) {
                                                if (r.message.client_employee_code) {
                                                    row.emp_code = r.message.client_employee_code;
                                                } else {
                                                    row.emp_code = "-";
                                                }
                                                row.in_date = r.message.in_date;
                                            }
                                            refresh_field("verify_dashboard_list");
                                        }
                                    })
                                }
                                if (j == 0) {
                                    row.checks = "Employment Check1";
                                }
                                if (j == 1) {
                                    row.checks = "Employment Check2";
                                }
                                if (j == 2) {
                                    row.checks = "Employment Check3";
                                }
                                if (j == 3) {
                                    row.checks = "Employment Check4";
                                }
                                if (j == 4) {
                                    row.checks = "Education Check1";
                                }
                                if (j == 5) {
                                    row.checks = "Education Check2";
                                }
                                if (j == 6) {
                                    row.checks = "Education Check3";
                                }
                                if (j == 7) {
                                    row.checks = "Education Check4";
                                }
                                if (j == 8) {
                                    row.checks = "Address Check1";
                                }
                                if (j == 9) {
                                    row.checks = "Address Check2";
                                }
                                if (j == 10) {
                                    row.checks = "Address Check3";
                                }
                                if (j == 11) {
                                    row.checks = "Address Check4";
                                }
                                if (j == 12) {
                                    row.checks = "Family Check1";
                                }
                                if (j == 13) {
                                    row.checks = "Family Check2";
                                }
                                if (j == 14) {
                                    row.checks = "Family Check3";
                                }
                                if (j == 15) {
                                    row.checks = "Family Check4";
                                }
                                if (j == 16) {
                                    row.checks = "Reference Check1";
                                }
                                if (j == 17) {
                                    row.checks = "Reference Check2";
                                }
                                if (j == 18) {
                                    row.checks = "Reference Check3";
                                }
                                if (j == 19) {
                                    row.checks = "Reference Check4";
                                }
                                if (j == 20) {
                                    row.checks = "Civil Check";
                                }
                                if (j == 21) {
                                    row.checks = "Criminal Check";
                                }
                                if (j == 22) {
                                    row.checks = "ID Check1";
                                }
                                if (j == 23) {
                                    row.checks = "ID Check2";
                                }
                                if (j == 24) {
                                    row.checks = "ID Check3";
                                }
                                if (j == 25) {
                                    row.checks = "ID Check4";
                                }
                                if (j == 26) {
                                    row.checks = "ID Check5";
                                }
                                if (j == 27) {
                                    row.checks = "ID Check6";
                                }
                            }
                        })
                    }
                    refresh_field("verify_dashboard_list");
                }

            }
        })
    },
    refresh: function (frm) {
        frm.disable_save();
    },
    'onload_post_render': function (frm, cdt, cdn) {
        var list = frm.doc.verify_dashboard_list;
        frm.fields_dict.verify_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="ref_no"][data-doctype="Verify Dashboard List"]', function (e) {
            var current_doc = $('.data-row.editable-row').parent().attr("data-name");
            var d = locals["Verify Dashboard List"][current_doc];
            if (d.ref_no) {
                frappe.set_route("Form", "Verify " + d.checks, d.check_name);
            }
        })
    }
});