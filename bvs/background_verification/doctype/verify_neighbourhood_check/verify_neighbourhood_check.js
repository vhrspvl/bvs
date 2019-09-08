// Copyright (c) 2019, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Verify Neighbourhood Check', {
    refresh: function (frm) {
        if (frm.doc.status == "QC Completed") {
            frappe.call({
                "method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
                args: {
                    "applicant": frm.doc.applicant_id,
                    "checks_group": frm.doc.checks_group,
                    "doctype": doctype.name,
                    "check_status": frm.doc.status
                },
                callback: function (r) {
                    if (frm.doc.status == "QC Completed") {
                        if (r.message.doctype) {
                            if (r.message.status != frm.doc.status) {
                                frappe.set_route('Form', r.message.doctype, r.message.name);
                            }
                        } else if (r.message != "Completed") {
                            frappe.set_route('Form', r.message, 'New ' + r.message, { "tat": frm.doc.tat, "applicant_name": frm.doc.applicant_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.applicant_id });
                        } else if (r.message == "Completed") {
                            frappe.set_route('Form', "Applicant", frm.doc.applicant_id);
                        }
                    } else {
                        if (r.message.doctype) {
                            if (r.message.status != frm.doc.status) {
                                frappe.set_route('Form', r.message.doctype, r.message.name);
                            }
                        } else if (r.message != "Completed") {
                            frappe.set_route('Form', r.message, 'New ' + r.message, { "tat": frm.doc.tat, "applicant_name": frm.doc.applicant_name, "customer": frm.doc.customer, "checks_group": frm.doc.checks_group, "applicant_id": frm.doc.applicant_id });
                        } else if (r.message == "Completed") {
                            frappe.set_route('Form', "Applicant", frm.doc.applicant_id);
                        }
                    }
                }
            })
        }
        if ((frm.doc.status == "Execution Completed") && ((frm.doc.result == "Positive") || (frm.doc.result == "Negative") || (frm.doc.result == "Amber") || (frm.doc.result == "Insufficient"))) {
            frappe.set_route("List", "Verify Neighbourhood Check");
        }

    },
    onload: function (frm) {
        frappe.call({
            "method": "bvs.background_verification.doctype.verify_neighbourhood_check.verify_neighbourhood_check.get_check",
            args: {
                applicant_id: frm.doc.applicant_id
            },
            callback: function (r) {
                $.each(r.message, function (i, d) {
                    if (r.message) {
                        frm.set_value("neighbourhood_check_id", d.name);
                    }
                });
            }

        });
    },
    validate: function (frm) {
        if (!frm.doc.client_tat) {
            frappe.call({
                "method": "bvs.background_verification.doctype.verify_employment_check1.verify_employment_check1.get_client_tat",
                args: {
                    checks_group: frm.doc.checks_group
                },
                callback: function (r) {
                    $.each(r.message, function (i, d) {
                        if (r.message) {
                            frm.set_value("client_tat", r.message.tat1)
                            if (frm.doc.client_tat) {
                                frm.set_df_property('client_tat', 'read_only', 1);
                                var tomorrow = moment(frm.doc.in_date).add(frm.doc.client_tat, 'days');
                                frm.set_value("actual_end_date_for_client_tat", tomorrow);
                                if (frm.doc.actual_end_date_for_client_tat.get > frappe.datetime.nowdate()) {
                                    $(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Magenta");
                                } else if (frm.doc.actual_end_date_for_client_tat.get = frappe.datetime.nowdate()) {
                                    $(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Magenta");
                                    frappe.msgprint("Today is Client TAT End Day")
                                } else {
                                    $(cur_frm.fields_dict.actual_end_date_for_client_tat.input).css("borderColor", "Red");
                                }
                            }
                        }
                    });
                }

            });
        }

        if ((frm.doc.result == "Positive") || (frm.doc.result == "Negative") || (frm.doc.result == "Amber") || (frm.doc.result == "Insufficient")) {
            frm.set_value("end_date", (frappe.datetime.nowdate()))
        }
        if (frm.doc.executive == frappe.session.user) {
            if (frm.doc.allocated_for == "QC Pending") {
                frm.set_value("status", "QC Completed")
                frm.set_value("allocated_for", "QC Completed")
            }
            if (frm.doc.allocated_for == "Execution Pending" || frm.doc.status == "Execution Completed") {
                frm.set_value("status", "Execution Completed")
                frappe.call({
                    "method": "bvs.background_verification.doctype.applicant.applicant.update_status",
                    args: {
                        "applicant": frm.doc.applicant_id,
                        "checks_group": frm.doc.checks_group
                    },
                    callback: function (r) {
                        if (r.message == "OK") {
                            frappe.set_route("List", "Verify Neighbourhood Check");
                        }
                    }
                })

            }
        }
    },
    refresh: function (frm) {
        frm.set_df_property('applicant_id', 'read_only', 1);
        frm.set_df_property('applicant_name', 'read_only', 1);
        if (frm.doc.allocated_for) {
            $(cur_frm.fields_dict.allocated_for.input).css("backgroundColor", "DeepPink");
        }
        if (frm.doc.fields != "Updated") {
            frappe.call({
                "method": "frappe.client.get",
                args: {
                    doctype: "Neighbourhood Check",
                    filters: {
                        "name": frm.doc.neighbourhood_check_id
                    }
                },
                callback: function (r) {
                    if (r.message) {
                        frm.set_value('reference_name', r.message.reference_name);
                        frm.set_value('reference_address', r.message.reference_address);
                        frm.set_value('occupation', r.message.address_line3);
                        frm.set_value('contact_no', r.message.contact_number);
                        frm.set_value('relationship_with_candidate', r.message.relationship_with_candidate);
                        frm.set_value('frequent_seen', r.message.frequent_seen);
                        frm.set_value('tenure_of_stay', r.message.tenure_of_stay);
                        frm.set_value('occupation_of_candidate', r.message.occupation_of_candidate);
                        frm.set_value('family_background', r.message.family_background);
                        frm.set_value('conduct_and_character', r.message.conduct_and_character);
                        frm.set_value('financial_strength', r.message.financial_strength);
                        frm.set_value('financial_strength_remarks', r.message.financial_remarks);
                        frm.set_value('political_activity', r.message.political_activity);
                        frm.set_value('political_activity_remarks', r.message.political_remarks);
                        frm.set_value('union_involvement', r.message.union_involvement);
                        frm.set_value('union_involvement_remarks', r.message.union_remarks);
                        frm.set_value('criminal_activity', r.message.criminal_activity);
                        frm.set_value('criminal_activity_remarks', r.message.criminal_remarks);
                        frm.set_value("fields", "Updated")
                    }
                }
            })
        }
        if ((frm.doc.allocated_for == "QC Pending") || (frm.doc.status == "QC Completed")) {
            frm.set_df_property('reference_name', 'read_only', 0);
            frm.set_df_property('reference_address', 'read_only', 0);
            frm.set_df_property('contact_no', 'read_only', 0);
            frm.set_df_property('relationship_with_candidate', 'read_only', 0);
            frm.set_df_property('frequent_seen', 'read_only', 0);
            frm.set_df_property('tenure_of_stay', 'read_only', 0);
            frm.set_df_property('occupation_of_candidate', 'read_only', 0);
            frm.set_df_property('family_background', 'read_only', 0);
            frm.set_df_property('conduct_and_character', 'read_only', 0);
            frm.set_df_property('financial_strength', 'read_only', 0);
            frm.set_df_property('financial_strength_remarks', 'read_only', 0);
            frm.set_df_property('political_activity', 'read_only', 0);
            frm.set_df_property('political_activity_remarks', 'read_only', 0);
            frm.set_df_property('union_involvement', 'read_only', 0);
            frm.set_df_property('union_involvement_remarks', 'read_only', 0);
            frm.set_df_property('criminal_activity', 'read_only', 0);
            frm.set_df_property('criminal_activity_remarks', 'read_only', 0);

        }
    }
});
